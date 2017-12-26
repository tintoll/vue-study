






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
    <div class="column is-2">날짜</div>
    <div class="column is-2">파일크기</div>
  </div>
  `
}
var tableBodyComponent = {
  template: `
  <div id="table-body" class="field">
    <ul>
      <li>
      </li>
    </ul>
  </div>
  `,
  created : function() {
    // 조회 조건에 맞는 데이터를 가져와야합니다. 
    leftEventBus.$on('tabItemClicked', function (tapItem, tapType) {
      
    });
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
        rowCount : 10
      }
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
    <table-body-component></table-body-component>
  </div>
  `,
  components : {
    'topAreaComponent': topAreaComponent,
    'tableHeaderComponent': tableHeaderComponent,
    'tableBodyComponent': tableBodyComponent,
  },
  methods : {
    changeIsMine(){
      this.option.isMine = !this.option.isMine;
    },
    changeFileType(value) {
      this.option.fileType = value;
    },
    changeFilterType(value) {
      this.option.filterType = value;
    },
    changeSortType(value) {
      this.option.sortType = value;
    },
  }
}