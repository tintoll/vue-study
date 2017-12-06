// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,  // vue-router 설정을 Vue 인스턴스에 추가
  store, // store를 등록해준다. 이러면 아무컴포넌트에서 접근이 가능하다.
  template: '<App/>',
  components: { App }
})
