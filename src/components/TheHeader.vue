<script setup lang="ts">
import { router } from '@/router'

function navigateToNote() {
  router.push({ name: 'NewNoteItem' })
}
</script>

<template>
  <header class="flex-row justify-content-space-between">
    <h1><router-link to="/">Jot-It</router-link></h1>
    <button class="btn-primary" @click="navigateToNote()">
      <i class="bi-plus-lg"></i>
    </button>
    <div></div>
  </header>
</template>

<style scoped lang="scss">
header {
  align-items: center;
  padding: 0 2rem;
  background-color: var(--color-background-soft);

  h1,
  div {
    width: 5rem;
  }

  button {
    font-size: 1.5rem;
  }
}
</style>
