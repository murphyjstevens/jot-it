<script setup lang="ts">
import { computed, type Ref } from '@vue/reactivity'

import type { Toast } from '@/models/toast.model'
import { ToastType } from '@/models/toast-type.enum'
import { useToastStore } from '@/stores/toast.store'

const toastStore = useToastStore()

const toasts: Ref<Array<Toast>> = computed(() => toastStore.toasts)
</script>

<template>
  <ul class="toast-wrapper flex-column">
    <li
      class="toast"
      :class="{
        error: toast.type === ToastType.Error,
        success: toast.type === ToastType.Success,
      }"
      v-for="toast in toasts"
      v-bind:key="toast.id"
    >
      <h3>{{ toast.title }}</h3>
      <span>{{ toast.message }}</span>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.toast-wrapper {
  position: fixed;
  right: 2rem;
  top: 2rem;
  z-index: 99;

  color: var(--color-text);
  list-style-type: none;
  margin: 0;
  padding: 0;

  .toast {
    width: 300px;
    padding: 1rem;
    border-radius: 5px;
    z-index: 99;

    &:not(:first-child) {
      margin-top: 1rem;
    }
  }

  .error {
    background-color: rgb(226, 72, 72);
  }

  .success {
    background-color: rgb(47, 131, 61);
  }
}
</style>
