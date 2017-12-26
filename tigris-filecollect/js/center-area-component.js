






var topLeftComponent = {
  data : function(){
    return {
      title : null
    }
  },
  template:`
  <div class="column is-7" style="font-size:1.5rem;">
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
  template:`
  <div class="column is-5 field has-addons has-addons-right" style="right:20px;">
      <div class="dropdown is-active is-right" style="margin-right:10px;">
          <div class="dropdown-trigger">
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
                          <input type="checkbox" > 내 파일만 보기
                      </label>
                  </a>
                  <hr class="dropdown-divider">
                  <a class="dropdown-item">
                      <label class="radio">
                          <input type="radio" name="foobar" checked> 모든 파일보기
                      </label>
                  </a>
                  <a href="#" class="dropdown-item">
                      <label class="radio">
                          <input type="radio" name="foobar"> 사진/동영상만 보기
                      </label>
                  </a>
                  <a href="#" class="dropdown-item">
                      <label class="radio">
                          <input type="radio" name="foobar"> 파일만 보기
                      </label>
                  </a>
                  <hr class="dropdown-divider">
                  <a href="#" class="dropdown-item">
                      <label class="radio">
                          <input type="radio" name="test" > 이름순
                      </label>
                  </a>
                  <a href="#" class="dropdown-item">
                      <label class="radio">
                          <input type="radio" name="test" checked> 날짜순
                      </label>
                  </a>
                  <hr class="dropdown-divider">
                  <a href="#" class="dropdown-item">
                      <label class="radio">
                          <input type="radio" name="order" > 오름차순
                      </label>
                  </a>
                  <a href="#" class="dropdown-item">
                      <label class="radio">
                          <input type="radio" name="order" checked> 내림차순
                      </label>
                  </a>
              </div>
          </div>
      </div>
      <p class="control">
          <span class="select">
              <select>
                  <option>파일명</option>
                  <option>소유자</option>
              </select>
          </span> 
      </p>
      <p class="control">
          <input class="input" type="text" placeholder="Amount of money">
      </p>  
  </div>
  `
}

var topAreaComponent =  {
  template: `
  <div class="columns">
    <top-left-component></top-left-component>
    <top-right-component></top-right-component>
  </div>
  `,
  components: {
    'topLeftComponent': topLeftComponent,
    'topRightComponent': topRightComponent,
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
  template: `
  <div class="column is-9 center-area">
    <top-area-component></top-area-component>
    <table-header-component></table-header-component>
    <table-body-component></table-body-component>
  </div>
  `,
  components : {
    'topAreaComponent': topAreaComponent,
    'tableHeaderComponent': tableHeaderComponent,
    'tableBodyComponent': tableBodyComponent,
  }
}