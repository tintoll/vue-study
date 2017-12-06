<template>
  <div class="col-md-4 col-sm-6">
    <div class="panel panel-success">
      <div class="panel-heading">
        <h3 class="panel-title">
            {{ propStock.name }}
            <small>(Price: {{ propStock.price }} )</small>
        </h3>
      </div>
      <div class="panel-body">
        <div class="pull-left">
          <input type="number"
                 class="form-control"
                 placeholder="Quantity"
                 v-model.number="quantity"
          />
          <!--
            v-model 데이터를 연결해주는 역할을 한다.
            .number는 무슨역할이지? 문자열을 숫자로 변경해준다.
            -->
        </div>
        <div class="pull-right">
          <!--
            @click는 클릭이벤트를 나타냄. v-on:click의 단축형태이다.
            :disabled 는 표현식값에 따라 true이면 사용못하게하고 false 사용되게해준다.
           -->
          <button
                  class="btn btn-success"
                  @click="buyStock"
                  :disabled="quantity <= 0 || !Number.isInteger(quantity)"
                  > Buy </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    props : ['propStock'], // 상위 컴포넌트에서 내려주는 Data

    // 이 컴포넌트에서 사용할 Data
    data() {
        return {
          quantity : 0
        }
    },
    // 이 컴포넌트에서 사용할 methods
    methods : {
      buyStock() {
        const order = {
          stockId : this.propStock.id,
          stockPrice : this.propStock.price,
          quantity : this.quantity,
        }
        this.$store.dispatch('buyStock', order);
        this.quantity = 0;
      }
    }
  }
</script>

<style>
</style>
