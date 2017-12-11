import Vue from 'vue';
import Vuex from 'vuex';

import stocks from './modules/stocks';
import portfolio from './modules/portpolio';

import * as actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  actions, // 액션을 추가 하여줌. 모듈에 액션이 없고 공통으로 사용할 액션을 등록가능하네.
  modules : {
    stocks,
    portfolio
  }
});
