<script setup lang="ts">
import TheSidebar from './TheSidebar.vue'
import NoteHeader from './NoteHeader.vue'
</script>

<template>
  <div class="w-full flex flex-row">
    <TheSidebar />
    <main class="w-full flex flex-1">
      <div class="w-full h-full flex flex-col">
        <NoteHeader />
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>
