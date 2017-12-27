
var centerEventBus = new Vue();
var GLB_CHAT_URL = 'http://localhost:8080/chat';
var GLB_FILE_URL = 'http://localhost:8080/file';



var topLeftComponent = {
  data : function(){
    return {
      title : null
    }
  },
  template:`
  <div class="column is-7 title-area">
      {{title}}
  </div>
  `,
  created : function(){
    // 탭에서 커뮤니티나 대화방이 선택되면 문구 변경됨.
    var _self = this;
    leftEventBus.$on('tabItemClicked', function (tapItem, tapType) {
      var title = '';
      switch (tapType) {
        case 'org':
          _self.title = '조직 > '+tapItem.communityName;
          break;
        case 'community':
          _self.title = '커뮤니티 > '+tapItem.communityName;
          break;
        case 'chat':
          _self.title = '대화방 > ' + tapItem.groupName;
          break;
        default:
          break;
      }

    }.bind(this));
  }
}
var topRightComponent = {
  props :[
    'option'
  ],
  data : function(){
    return {
      isOpenFilter : false
    }
  },
  template:`
  <div class="column is-5 field has-addons has-addons-right" style="right:20px;">
      <div class="dropdown is-right" :class="isOpenFilter ? 'is-active' : '' " style="margin-right:10px;">
          <div @click="isOpenFilter = !isOpenFilter"  class="dropdown-trigger">
              <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                  <span class="icon">
                      <i class="fa fa-filter" aria-hidden="true"></i>
                  </span>
              </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
              <div class="dropdown-content">
                  <a href="#" class="dropdown-item">
                      <label class="checkbox">
                          <input type="checkbox" @change="changeIsMine" :checked="this.$props.option.isMine"> 내 파일만 보기
                      </label>
                  </a>
                  <hr class="dropdown-divider">
                  <a class="dropdown-item">
                      <label class="radio">
                          <input type="radio" name="fileType" @change="changeFileType" value="ALL" :checked="this.$props.option.fileType === 'ALL'"> 모든 파일보기
                      </label>
                  </a>
                  <a href="#" class="dropdown-item">
                      <label class="radio">
                          <input type="radio" name="fileType" @change="changeFileType"  value="MEDIA" :checked="this.$props.option.fileType === 'MEDIA'"> 사진/동영상만 보기
                      </label>
                  </a>
                  <a href="#" class="dropdown-item">
                      <label class="radio">
                          <input type="radio" name="fileType" @change="changeFileType"  value="FILE" :checked="this.$props.option.fileType === 'FILE'"> 파일만 보기
                      </label>
                  </a>
                  <hr class="dropdown-divider">
                  <a href="#" class="dropdown-item">
                      <label class="radio">
                          <input type="radio" name="filterType" @change="changeFilterType" value="FILE_NAME" :checked="this.$props.option.filterType === 'FILE_NAME'"> 이름순
                      </label>
                  </a>
                  <a href="#" class="dropdown-item">
                      <label class="radio">
                          <input type="radio" name="filterType" @change="changeFilterType" value="FILE_DATE" :checked="this.$props.option.filterType === 'FILE_DATE'"> 날짜순
                      </label>
                  </a>
                  <hr class="dropdown-divider">
                  <a href="#" class="dropdown-item">
                      <label class="radio">
                          <input type="radio" name="sortType" @change="changeSortType" value="ASC" :checked="this.$props.option.sortType === 'ASC'"> 오름차순
                      </label>
                  </a>
                  <a href="#" class="dropdown-item">
                      <label class="radio">
                          <input type="radio" name="sortType" @change="changeSortType" value="DESC" :checked="this.$props.option.sortType === 'DESC'"> 내림차순
                      </label>
                  </a>
              </div>
          </div>
      </div>
      <p class="control">
          <span class="select">
              <select :checked="this.$props.option.searchType">
                  <option value="FILE_NAME">파일명</option>
                  <option value="SOCIAL_NAME">소유자</option>
              </select>
          </span> 
      </p>
      <p class="control">
          <input class="input" type="text" v-model.trim="this.$props.option.searchKeyword" placeholder="Amount of money">
      </p>  
  </div>
  `,
  mounted : function() {

  },
  methods : {
    changeIsMine(event) {
      this.$emit('changeIsMine');
    },
    changeFileType(event) {
      this.$emit('changeFileType', event.target.value);
    },
    changeFilterType(event) {
      this.$emit('changeFilterType', event.target.value);
    },
    changeSortType(event) {
      this.$emit('changeSortType', event.target.value);
    },
  }
}

var topAreaComponent =  {
  props : [
    'option'
  ],
  template: `
  <div class="columns">
    <top-left-component></top-left-component>
    <top-right-component 
          v-on:changeIsMine="changeIsMine" 
          v-on:changeFileType="changeFileType"
          v-on:changeFilterType="changeFilterType" 
          v-on:changeSortType="changeSortType"  
          :option="this.$props.option"></top-right-component>
  </div>
  `,
  components: {
    'topLeftComponent': topLeftComponent,
    'topRightComponent': topRightComponent,
  }, 
  methods : {
    changeIsMine(){
      this.$emit('changeIsMine');
    },
    changeFileType(value){
      this.$emit('changeFileType',value);
    },
    changeFilterType(value) {
      this.$emit('changeFilterType', value);
    },
    changeSortType(value) {
      this.$emit('changeSortType', value);
    },
  }

}


var tableHeaderComponent = {
  template : `
  <div class="columns center-table-header">
    <div class="column is-5">파일명</div>
    <div class="column is-2">소유자</div>
    <div class="column is-3">날짜</div>
    <div class="column is-2">파일크기</div>
  </div>
  `
}
var tableBodyComponent = {
  props :[
    'files'
  ],
  data : function(){
    return {
      selectedFileKey : {type: String}
    }
  },
  template: `
  <div class="field center-table-body">
    <ul @scroll="tableBodyUlScrollEvent">
      <li class="columns" v-for="file in files" @click="selectFile(file)" :class="isFileSelected(file) ? 'on':''" >
        <div class="column is-5 text-ellipsis">
          <img class="file-icon-image" :src="getFileIconUrl(file)" />      
          <span style="vertical-align:middle;">{{file.fileName}}</span>  
        </div>
        <div class="column is-2 text-ellipsis">
          <img class="person-icon-image" :src="'http://localhost:8080/file/profile/'+file.socialId" />     
          <span style="vertical-align:middle;">{{file.socialName}}</span>  
        </div>
        <div class="column is-3">
          {{file.createDt | formatDate}}
        </div>
        <div class="column is-2">
          {{file.fileSize | bytesToSize}}
        </div>
      </li>
    </ul>
  </div>
  `,
  computed : {
    
  },
  created : function() {
    
  },
  methods : {
    getFileKey: function (file) {
      return file.fileId + '|' + file.fileSeq;;
    },
    selectFile: function (file) {
      this.selectedFileKey = this.getFileKey(file);
    },
    isFileSelected: function (file) {
      var result = false;
      result = this.selectedFileKey === this.getFileKey(file);
      return result;
    },
    tableBodyUlScrollEvent(event) {
      var element = event.target;
      var maxHeight = element.scrollHeight;
      var currentScroll = element.offsetHeight + element.scrollTop;
      if (maxHeight <= currentScroll + 20) {
        centerEventBus.$emit('scroll');
      }
    },
  isImage(fileExt) {
      var ext = fileExt.toLowerCase();
      if (ext === 'jpg' || ext === 'jpeg'
        || ext === 'gif' || ext === 'png' || ext === 'bmp') {
        return true;
      } else {
        return false;
      }
    },
  getFileIconUrl(file) {
      var fileIconUrl = '';
      if (this.isImage(file.fileExt)) {
        fileIconUrl = GLB_FILE_URL + '/image/' + file.fileId + '/' + file.fileSeq + '?thumbnail=400';
      } else {
        var ext = file.fileExt.toLowerCase();
        switch (ext) {
          case 'ppt':
          case 'pptx':
            fileIconUrl = GLB_CHAT_URL + '/static/images/icon/file_icon_ppt.png';
            break;
          case 'doc':
          case 'docx':
            fileIconUrl = GLB_CHAT_URL + '/static/images/icon/file_icon_doc.png';
            break;
          case 'xls':
          case 'xlsx':
            fileIconUrl = GLB_CHAT_URL + '/static/images/icon/file_icon_xls.png';
            break;
          case 'hwp':
            fileIconUrl = GLB_CHAT_URL + '/static/images/icon/file_icon_hwp.png';
            break;
          case 'txt':
            fileIconUrl = GLB_CHAT_URL + '/static/images/icon/file_icon_txt.png';
            break;
          case 'pdf':
            fileIconUrl = GLB_CHAT_URL + '/static/images/icon/file_icon_pdf.png';
            break;
          default:
            fileIconUrl = GLB_CHAT_URL + '/static/images/icon/file_icon_file.png';
            break;
        }
      }
      return fileIconUrl;
    }
  },
  filters: {
    bytesToSize : function(bytes) {
      var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes == 0) return 'n/a';
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
    },
    formatDate : function(createDt) {
      var d = new Date(createDt);
      return moment(d).format('YYYY-MM-DD h:mm:ss');
    }
  }
}

var centerAreaComponent = {
  data : function() {
    return {
      tapItem : null,
      tapType : null,
      option : {
        searchKeyword : null,
        searchType: 'FILE_NAME',
        sortType: 'DESC',
        filterType: 'FILE_DATE',
        fileType: 'ALL',
        isMine : false,
        page : 1,
        rowCount : 20
      },
      files : []
    }
  },
  template: `
  <div class="column is-9 center-area">
    <top-area-component 
        v-on:changeIsMine="changeIsMine" 
        v-on:changeFileType="changeFileType"
        v-on:changeFilterType="changeFilterType" 
        v-on:changeSortType="changeSortType" 
        :option="option"></top-area-component>
    <table-header-component></table-header-component>
    <table-body-component :files="files" ></table-body-component>
  </div>
  `,
  components : {
    'topAreaComponent': topAreaComponent,
    'tableHeaderComponent': tableHeaderComponent,
    'tableBodyComponent': tableBodyComponent,
  },
  created : function() {
    var _self = this;
    leftEventBus.$on('tabItemClicked', function (tapItem, tapType) {
      _self.tapItem = tapItem;
      _self.tapType = tapType;
      _self.getFiles(1);
    });

    centerEventBus.$on('scroll', function () {
      _self.page = _self.page + 1;
      _self.getFiles(_self.page);
    });
  },
  methods : {
    changeIsMine(){
      this.option.isMine = !this.option.isMine;
      this.getFiles(1);
    },
    changeFileType(value) {
      this.option.fileType = value;
      this.getFiles(1);
    },
    changeFilterType(value) {
      this.option.filterType = value;
      this.getFiles(1);
    },
    changeSortType(value) {
      this.option.sortType = value;
      this.getFiles(1);
    },
    getFiles(page) {
      this.page = page;
      var _self = this;
      if (!_self.tapType) {
        return ;
      }

      var params = Object.assign({}, this.option);
      if(params.isMine) {
        params.isMine = 'Y';
      }else {
        params.isMine = 'N';
      }
      var url = API_PATH;
      if (this.tapType === 'chat') {
        url += '/fileCollect/chat/' + this.tapItem.groupId +'/files?_tigris_sid=55839585082649b03dd13213a26c9073';
      } else {
        url += '/fileCollect/community/' + this.tapItem.communityId + '/files?_tigris_sid=55839585082649b03dd13213a26c9073';
      }
      Vue.http.get(url, { params : params})
        .then(function (response) {
          return response.json();
        }).then(function (jsonData) {
          if(_self.page === 1) {
            _self.files = jsonData.data;
          } else {
            _self.files = _self.files.concat(jsonData.data);
          }
        });
    }
  }
}