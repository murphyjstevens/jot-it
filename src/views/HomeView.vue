<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

import type { Note } from '@/models'
import { useNoteStore } from '@/stores'
import { watch } from 'vue'

const route = useRoute()
const router = useRouter()

const noteStore = useNoteStore()

function defaultToFirstNote() {
  if (route.path === '' || route.path === '/') {
    const note: Note | null = noteStore.notes.length ? noteStore.notes[0] : null
    router.replace(`/${note?.id ?? 'new'}`)
  }
}

watch(
  () => route.path,
  () => {
    defaultToFirstNote()
  },
  { immediate: true }
)
</script>

<template>
  <main class="flex flex-col flex-1"></main>
</template>
