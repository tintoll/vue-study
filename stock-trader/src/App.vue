<template>
  <div class="container">
    <app-header></app-header>
    <div class="row">
      <div class="col-md-12">
        <router-view></router-view> <!-- 라우팅 시작점 -->
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  components : {
    'appHeader' : Header
  },
  // created()함수는 인스턴스가 작성된 후 동기적으로 호출되는 함수임.
  created() {
    // 컴포넌트 내에서 store 에 접근 하는 방법은 this.$store 입니다.
    // store에 등록된 action을 사용합니다.
    this.$store.dispatch('initStock');
  }
}

</script>

<style>
  body {
    padding: 30px;
  }
</style>
