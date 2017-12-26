var API_PATH = 'http://localhost:8080/chat';

var leftEventBus = new Vue();

// 왼쪽 영역 컴포넌트들 
var tabComponent = {
  data: function () {
    return {
      selectedTabType: 'org',
      tabs: [
        { type: 'org', name: '조직' },
        { type: 'community', name: '커뮤니티' },
        { type: 'chat', name: '대화방' }
      ]
    }
  },
  template: `
  <div class="tabs is-centered">
      <ul>
          <li v-for="tab in tabs" :class="(tab.type === selectedTabType) ? 'is-active' : '' ">
              <a @click="selectTab(tab.type, $event)">{{tab.name}}</a>
          </li>
      </ul>
  </div>
  `,
  methods : {
    selectTab : function(type, event) {
      this.selectedTabType = type;
      leftEventBus.$emit('tabClicked',type);
    },
  }
}

var tabContentListComponent = { 
  data : function() {
    return {
      items : [],
      tapType : null
    }
  },
  template: `
    <div class="tab-list-area">
      <ul>
          <li @click="selectTabItem(item)" v-for="item in items">
              <figure class="image is-32x32">
                  <img src="https://bulma.io/images/placeholders/128x128.png">
              </figure>
              <p>{{item.communityName || item.groupName }}</p>
          </li>
      </ul>    
    </div>
  `,
  created : function() {
    leftEventBus.$on('tabClicked', function(value){
      this.getData(value);
    }.bind(this)); // bind를 안해주면 this를 전역객체로 인식함. 
  },
  mounted : function() {
    this.getData('org');
  },
  methods : {
    selectTabItem : function(tapItem){
      leftEventBus.$emit('tabItemClicked', tapItem, this.tapType);
    },
    getData: function (type) {
      var _self = this; // 비동기 통신중에 콜백함수에서는 this가 변하기 때문에 
      var apiUrl = API_PATH;
      _self.tapType = type;
      switch (type) {
        case 'org':
          apiUrl += '/fileCollect/orgCommunity/list?_tigris_sid=691567de0497011ee72238e7f1eca793';
          break;
        case 'community':
          apiUrl += '/fileCollect/community/list?_tigris_sid=691567de0497011ee72238e7f1eca793';
          break;  
        case 'chat':
          apiUrl += '/groups?_tigris_sid=691567de0497011ee72238e7f1eca793';
          break;
        default:
          break;
      }

      Vue.http.get(apiUrl)
        .then(function (response) {
          return response.json();
        }).then(function (jsonData) {
          _self.items = jsonData.data;
        });
    }
  }
}

var leftAreaComponent = {
  template: `
  <div class="column is-3 left-area">
    <tab-component />
    <list-component />
  </div>
  `,
  components: {
    'tabComponent': tabComponent,
    'listComponent': tabContentListComponent
  }
}