<template>
   <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand">Stock Trader</router-link>
      </div>

      <div class="collapse navbar-collapse" >
        <ul class="nav navbar-nav">
          <router-link to="/portfolio" activeClass="active" tag="li"><a>Portfolio</a></router-link>
          <router-link to="/stocks" activeClass="active" tag="li"><a>Stocks</a></router-link>
        </ul>
        <!-- Funds 요소 추가 Start main.js에 등록한 currency 필터 추가-->
        <strong class="navbar-text navbar-right">Funds: {{ funds | currency }}</strong>
        <!-- Funds 요소 추가 End -->
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#" @click="endDay">End Day</a></li>
          <li class="dropdown"
              :class="{open: isDropDownOpen}"
              @click="isDropDownOpen = !isDropDownOpen">
            <a
                href="#"
                class="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false">Save&amp;Load<span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#" @click="saveData">Save Data</a></li>
              <li><a href="#" @click="loadData">Load Data</a></li>
            </ul>
          </li>
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
</template>

<script>
  import {mapActions} from 'vuex';
  export default {
    data() {
      return {
        isDropDownOpen : false
      }
    },
    computed : {
      funds() {
        return this.$store.getters.funds;
      }
    },
    methods : {
      /*
      ...mapActions([
        'randomizeStocks'
      ]),
      */
      // 액션이 여러개 많아지면 이름이 중복될수 있어서 아래와같이 객체형태로
      // 명을 지정하는 방식으로 사용될수 있다.
      ...mapActions({
        randomizeStocks:'randomizeStocks',
        fetchData : 'loadData'
      }),
      endDay() {
        this.randomizeStocks();
      },
      saveData() {
        const data = {
          funds: this.$store.getters.funds,
          stockPortfolio : this.$store.getters.stockPortfolio,
          stocks : this.$store.getters.stocks
        };
        // vue-resource는 this.$http뒤에 필요한 메소드를 붙혀서 사용함.
        // put을 사용할때는 '테이블이름.데이터타입'과 같이 데이터를 저장할 위치와
        // 형태를 결정해주고 추가할 데이터를 변수에 넘겨준다.
        this.$http.put('data.json', data);
      },
      loadData() {
        this.fetchData();
      }
    }
  }
</script>

<style>
</style>
