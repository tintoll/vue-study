
const BUY_STOCK = 'BUY_STOCK';
const SELL_STOCK = 'SELL_STOCK';


// state에는 해당 컴포넌트 내/외부에서 사용할 데이타들을 미리 정의 해놓고 어디에서나 접근해서 사용 할 수 있게 해줍니다.
const state = {
  funds : 10000,
  stocks : []
}

// muntation은 vuex에서 state를 변경 할 수 있는 유일한 방법입니다. 주로 action에서 commit함수를 통해 mutation을 호출하고 필요한 변수를 전달하는 방식으로 많이 사용합니다.
const mutations = {
  BUY_STOCK(state,{stockId, quantity, stockPrice}) {
    // 현재 나의 포트폴리오 stocks 목록에 있는지 있으면 가져온다.
    const record = state.stocks.find(element => {
      element.id === stockId;
    });
    if(record) {
      // 있으면 현재 수량에 새로오는 수량을 더해준다.
      record.quantity += quantity;
    } else {
      // 없으면 추가 해준다.
      state.stocks.push({
        id : stockId,
        quantity : quantity
      });
    }
    // 전체 돈에서 추가한 금액을 빼준다.
    state.funds -= (stockPrice * quantity);
  },

  SELL_STOCK(state,{stockId, quantity, stockPrice}) {
    const record = state.stocks.find(element => element.id = stockId );
    if(record.quantity > quantity) {
      // 내가 가지고 있는 수량보다 작으면 그수량만큼 빼주고
      record.quantity -= quantity;
    } else {
      // 아니면 목록에서 삭제 하여 준다.
      state.stocks.splice(state.stocks.indexOf(record), 1);
    }
  }


}

const actions = {
  sellStock({commit}, order) {
    commit(SELL_STOCK, order);
  }
}

// getter를 사용하는 목적은 프로젝트 어디서나 state의 상태를 좀더 쉽게 조회하기 위함입니다.
const getters = {
  stockPortfolio(state, getters) {
    return state.stocks.map(stock => {
      const record = getters.stocks.find(element => element.id === stock.id);
      return {
        id : stock.id,
        quantity : stock.quantity,
        name : record.name,
        price : record.price
      }
    });
  },
  funds(state) {
    return state.funds;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
