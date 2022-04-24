<script setup lang="ts">
import ToastList from './components/ToastList.vue'
import { useToastStore } from './stores/toast.store'

const toastStore = useToastStore()

window.addEventListener('error', function (event: ErrorEvent) {
  toastStore.addError(event.error)
  return false
})
</script>

<template>
  <div class="app-wrapper flex-row">
    <router-view></router-view>
    <ToastList />
  </div>
</template>

<style lang="scss">
@import 'normalize.css/normalize.css';
@import 'bootstrap-icons/font/bootstrap-icons.css';
@import 'highlight.js/scss/dark.scss';

@import './assets/base.css';
@import './assets/button.scss';
@import './assets/flex.css';
@import './assets/input.scss';
@import './assets/spacing.scss';
@import './assets/markdown.scss';

.app-wrapper {
  width: 100%;
}
</style>
