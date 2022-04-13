<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
</script>

<template>
  <div class="app-wrapper flex-column">
    <TheHeader />

    <main class="align-center">
      <router-view></router-view>
    </main>
  </div>
</template>

<style lang="scss">
@import 'bootstrap-icons/font/bootstrap-icons.css';

@import './assets/base.css';
@import './assets/flex.css';
@import './assets/inputs.css';
@import './assets/spacing.scss';

main {
  width: 100%;
  padding: 0px 10px;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}
</style>
