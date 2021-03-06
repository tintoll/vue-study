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
    state.stocks.forEach( stock => {
      stock.price = Math.round(stock.price * (1 + Math.random() - 0.5));
    });
  }
};

const actions = {
  // 인자에 왜 {}를 사용할까?
  // 원래 context가 넘어오는데 context.commit를 바로 사용할려고
  buyStock : ({commit}, order) => {
    commit('BUY_STOCK', order);
  },
  initStock: ({ commit }) => {
    commit('SET_STOCKS',stocks);
  },
  randomizeStocks: ({ commit }) => {
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
