<template>
  <div class="container">
    <app-header></app-header>
    <div class="row">
      <div class="col-md-12">
        <!--여기에 animation 이 적용되는 transition 영역을 만들어줍니다.-->
        <transition name="slide" mode="out-in">
          <router-view></router-view> <!-- 라우팅 시작점 -->
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import Header from './components/Header.vue';

export default {
  components : {
    'appHeader' : Header
  },
  methods : {
    ...mapActions({
      fetchData : 'loadData'
    })
  },

  // created()함수는 인스턴스가 작성된 후 동기적으로 호출되는 함수임.
  created() {
    // 컴포넌트 내에서 store 에 접근 하는 방법은 this.$store 입니다.
    // store에 등록된 action을 사용합니다.
    // this.$store.dispatch('initStock');

    // 초기시 firebase에서 데이터를 가져옵니다.
    this.fetchData();
  }
}

</script>

<style>
  body {
    padding: 30px;
  }
  .slide-enter-active {
    animation: slide-in 200ms ease-out forwards;
  }
  .slide-leave-active {
    animation: slide-out 200ms ease-out forwards;
  }
  @keyframes slide-in {
    from {
      transform: translateY(-30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes slide-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(-30px);
      opacity: 0;
    }
  }
</style>
