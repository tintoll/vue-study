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
               v-bind:stock="stock"></app-stock>
  </div>
</template>

<script>
  import Stock from './Stock.vue';
  export default {
    data() {
      return {
        stocks : [
          {id:1, name: 'BENZ', price : 200},
          {id:2, name: 'AUDI', price : 150},
          {id:3, name: 'HONDA', price : 180},
          {id:4, name: 'LEXUS', price : 195},
        ]
      }
    },

    // 사용할 컴포넌트를 등록해준다.
    // camelCase로 등록해주면 template에서는 kebab-case로 사용하면된다.
    components : {
      appStock : Stock
    }
  }
</script>

<style>
</style>
