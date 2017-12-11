import Vue from 'vue';

// 공통으로 사용하기 위해서 따로 빼냄.
export const loadData = ({commit}) => {
  // Promise를 리턴함.
  Vue.http.get('data.json')
          .then( response => response.json() )
          .then( data => {
            if(data) {
              const stocks = data.stocks;
              const funds = data.funds;
              const stockPortfolio = data.stockPortfolio;

              const portfolio = {
                stockPortfolio,
                funds
              }
              commit('SET_STOCKS', stocks);
              commit('SET_PORTFOLIO', portfolio);
            }
          });
};

