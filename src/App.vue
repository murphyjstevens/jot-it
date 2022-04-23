<script setup lang="ts">
import ToastList from './components/ToastList.vue'
import { useToastStore } from './stores/toast.store'
import TheSidebar from './components/TheSidebar.vue'
import NoteItem from './components/NoteItem.vue'

const toastStore = useToastStore()

window.addEventListener('error', function (event: ErrorEvent) {
  toastStore.addError(event.error)
  return false
})
</script>

<template>
  <div class="app-wrapper flex-row">
    <TheSidebar />
    <main class="flex-1">
      <NoteItem />
    </main>

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

main {
  width: 100%;
  padding: 0px 10px;
}
</style>
