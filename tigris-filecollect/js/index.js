
// 미리 하위 컴포넌트들을 선언해 주어야한다.

// 최상단 컴포넌트 
var headerTitleComponent = {
  template : '<h1 class = "title custom-header"> 파일 모아보기 </h1>'  
}

var mainContentComponent = {
  template : `
  <div class="columns contents-area">
    <left-area-component />
    <center-area-component />
  </div>
  `,
  components : {
    'leftAreaComponent': leftAreaComponent,
    'centerAreaComponent': centerAreaComponent
  }
}

// vue resource를 사용할수 있도록 등록해줘야함. 
// Vue.use();
var rootVm = new Vue({
  el : '#main',
  data : {

  },
  components : {
    'headerTitle': headerTitleComponent,
    'mainContent': mainContentComponent
  }
});
Vue.config.devtools = true;