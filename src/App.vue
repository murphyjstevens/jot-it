<script setup lang="ts">
import { TheSidebar, ToastList } from '@/components'
import { useToastStore } from './stores'

const toastStore = useToastStore()

window.addEventListener('error', function (event: ErrorEvent) {
  toastStore.addError(event.error)
  return false
})
</script>

<template>
  <div class="w-full flex flex-row">
    <TheSidebar />
    <router-view></router-view>
    <ToastList />
  </div>
</template>
