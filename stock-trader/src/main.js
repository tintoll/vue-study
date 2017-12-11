// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store';
import VueResource from 'vue-resource';

Vue.config.productionTip = false

Vue.use(VueResource); // VueResource 사용등록
Vue.http.options.root = ''; // Firebase DB 주소


// 프로젝트 어디서나 사용할수 있는 전역 filter를 등록한다.
Vue.filter('currency', value => {
  return '$' + value.toLocaleString();
  // toLocaleString() 함수는 현재 지역에 맞는 format으로 전달해준다.
  // 한국에서 숫자일경우 10,000 으로 변환되고
  // 한국에서 날짜일 경우 "2017. 12. 7. 오후 5:47:29"
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,  // vue-router 설정을 Vue 인스턴스에 추가
  store, // store를 등록해준다. 이러면 아무컴포넌트에서 접근이 가능하다.
  template: '<App/>',
  components: { App }
})
