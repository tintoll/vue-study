<template>
  <div>
    <app-stock v-for="stock in stocks"
               :key="stock.id"
               :propStock="stock" ></app-stock>
  </div>
</template>

<script>
  // mapGetters 헬퍼를 사용하기 위해
  import { mapGetters } from 'vuex';
  import Stock from './Stock.vue';
  export default {
    /*
    data() {
      return {
        stocks : []
      }
    },
    */
    components: {
      appStock: Stock
    },
    // mapGetters 헬퍼를 사용하여 필요한 state를 맵핑해줍니다.
    computed: {
      ...mapGetters({
        stocks : 'stockPortfolio'
      })
    }
  }
</script>

<style>
</style>
