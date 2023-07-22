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
  <div class="w-full flex flex-row">
    <router-view></router-view>
    <ToastList />
  </div>
</template>
