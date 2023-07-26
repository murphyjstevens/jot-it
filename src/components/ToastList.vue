<script setup lang="ts">
import { computed, type Ref } from 'vue'

import { type Toast, ToastType } from '@/models'
import { useToastStore } from '@/stores'

const toastStore = useToastStore()

const toasts: Ref<Array<Toast>> = computed(() => toastStore.toasts)
</script>

<template>
  <ul class="p-0 m-0 fixed right-8 top-8 list-none z-40 flex-column">
    <li
      class="w-80 p-4 rounded-lg mt-4 first:mt-0"
      :class="{
        'bg-red-600': toast.type === ToastType.Error,
        'bg-green-600': toast.type === ToastType.Success,
      }"
      v-for="toast in toasts"
      v-bind:key="toast.id"
    >
      <h3>{{ toast.title }}</h3>
      <span>{{ toast.message }}</span>
    </li>
  </ul>
</template>
