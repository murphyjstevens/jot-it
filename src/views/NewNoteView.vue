<script setup lang="ts">
import { NoteEdit } from '@/components/note'
import { NoteHeader } from '@/components/note'
</script>

<template>
  <main class="flex flex-col flex-1">
    <NoteHeader />
    <div class="mb-2 flex flex-col flex-1 overflow-auto">
      <NoteEdit />
    </div>
  </main>
</template>
