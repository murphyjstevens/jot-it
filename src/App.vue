<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import ToastList from './components/ToastList.vue'
import { useToastStore } from './stores/toast.store'

const toastStore = useToastStore()

window.addEventListener('error', function (event: ErrorEvent) {
  console.log(event)
  toastStore.addError(event.error)
  return false
})
</script>

<template>
  <div class="app-wrapper flex-column">
    <TheHeader />

    <ToastList />

    <main class="align-center">
      <router-view></router-view>
    </main>
  </div>
</template>

<style lang="scss">
@import 'bootstrap-icons/font/bootstrap-icons.css';

@import './assets/base.css';
@import './assets/button.scss';
@import './assets/flex.css';
@import './assets/input.scss';
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
