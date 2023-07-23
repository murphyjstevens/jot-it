<script setup lang="ts">
import TheSidebar from './TheSidebar.vue'
import NoteHeader from './NoteHeader.vue'
</script>

<template>
  <div class="w-full flex flex-row">
    <TheSidebar />
    <main class="flex flex-col flex-1">
      <NoteHeader />
      <div class="mb-2 flex flex-col flex-1 overflow-scroll">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>
