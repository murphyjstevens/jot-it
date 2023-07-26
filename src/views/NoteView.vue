<script setup lang="ts">
import { NoteHeader } from '@/components/note'
</script>

<template>
  <main class="flex flex-col flex-1">
    <NoteHeader />
    <div class="mb-2 flex flex-col flex-1 overflow-auto">
      <router-view></router-view>
    </div>
  </main>
</template>
