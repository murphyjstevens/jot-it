<script setup lang="ts">
import TheSidebar from './TheSidebar.vue'
import NoteHeader from './NoteHeader.vue'
</script>

<template>
  <div class="home-wrapper flex-row">
    <TheSidebar />
    <main class="flex-1">
      <div class="note-wrapper flex-column">
        <NoteHeader />
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.home-wrapper {
  width: 100%;
}

main {
  width: 100%;
  padding: 0px 10px;
}

.note-wrapper {
  height: 100%;
  width: 100%;
}
</style>
