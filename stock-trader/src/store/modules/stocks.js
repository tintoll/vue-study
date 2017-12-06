import stocks from '../../data/stocks';

// vuex를 구성하는 핵심기능이 state, mutations, action, getter 라고 한다.
const state = {
  stocks : []
};

const mutations = {
  // 아래 문법이 특이하다. 나중에 무엇을 의미하는지 공부해야할듯. 함수같음.
  'SET_STOCKS' (state, stocks) {
    state.stocks = stocks;
  },
  'RND_STOCKS' (state) {

  },
};

const actions = {
  // 인자에 왜 {}를 사용할까?
  buyStock : ({commit}, order) => {
    commit();
  },
  initStock: ({ commit }) => {
    commit('SET_STOCKS',stocks);
  },
  randomizeStock: ({ commit }) => {
    commit('RND_STOCKS');
  },
};

const getters = {
  stocks : state => {
    return state.stocks;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
