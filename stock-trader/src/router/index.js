import Vue from 'vue'
import Router from 'vue-router'
import {routes} from './routes'

// vue-router 플러그인 사용
Vue.use(Router)

// vue-router 설정
export default new Router({
  routes: routes, // 라우팅 설정
  mode: 'history' // hashbang 사용하지 않는 모드 설정
})
