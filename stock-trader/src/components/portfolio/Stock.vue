<template>
  <div class="col-md-4 col-sm-6">
    <div class="panel panel-info">
      <div class="panel-heading">
        <h3 class="panel-title">
            {{ propStock.name }}
            <small>(Price: {{ propStock.price }} | Quantity: {{propStock.quantity }} )</small>
        </h3>
      </div>
      <div class="panel-body">
        <div class="pull-left">
          <input type="number"
                 class="form-control"
                 placeholder="Quantity"
                 v-model.number="quantity"
          />

        </div>
        <div class="pull-right">
          <button
                  class="btn btn-success"
                  @click="sellStock"
                  :disabled="quantity <= 0 || !Number.isInteger(quantity)"
                  > Sell </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  // mapActions 헬퍼를 사용하기 위해
  import { mapActions } from 'vuex';

  export default {
    props : ['propStock'],
    data(){
      return {
        quantity : 0
      }
    },
    methods :  {
      // mapActions 헬퍼를 사용하여 해당 컴포넌트의 속성에 맵핑해줍니다.
      // ...은 sread operator 이다. ?

      ...mapActions({
        placeSellOrder: 'sellStock'
      }),

      sellStock() {
        const order = {
          stockId: this.propStock.id,
          stockPrice: this.propStock.price,
          quantity: this.quantity
        }
        // sellStock action을 placeSellOrder라는 이름의 메소드로 사용합니다.
        this.placeSellOrder(order);
        this.quantity = 0;
      }
    }

  }
</script>

<style>
</style>
