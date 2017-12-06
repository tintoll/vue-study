<template>
  <div>
    <!--
      v-for는 반복을 시켜주는 역할을 함.
      :key는 엘레멘트 순서를 바꿔주는 특수속성인데 커스텀El일때 v-for만사용하면 에러가 나서 추가해주었음
      :stock는 하위 컴포넌트에 데이터를 내려줄때 사용함.
      (v-bind:stock을 줄임 표현임.)
    -->
    <app-stock v-for="stock in stocks"
               :key="stock.id"
               v-bind:propStock="stock"></app-stock>
  </div>
</template>

<script>
  import Stock from './Stock.vue';
  export default {
    // 사용할 컴포넌트를 등록해준다.
    // camelCase로 등록해주면 template에서는 kebab-case로 사용하면된다.
    components : {
      appStock : Stock
    },
    /*
    computed는 인스턴스에 추가되는 계산된 속성이라고 한다.
    화살표 함수는 사용하면 안된다.
    예제 )
    var vm = new Vue({
      data: { a: 1 },
      computed: {
        // get만 가능합니다.
        aDouble: function () {
          return this.a * 2
        },
        // get과 set 입니다.
        aPlus: {
          get: function () {
            return this.a + 1
          },
          set: function (v) {
            this.a = v - 1
          }
        }
      }
    })
    vm.aPlus   // => 2
    vm.aPlus = 3
    vm.a       // => 2
    vm.aDouble // => 4
    */
    computed : {
      stocks() {
        // getter로 현재 state 값을 가져옵니다.
        return this.$store.getters.stocks;
      }
    }
  }
</script>

<style>
</style>
