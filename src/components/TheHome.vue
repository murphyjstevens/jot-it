<script setup lang="ts">
import TheSidebar from './TheSidebar.vue'
</script>

<template>
  <div class="home-wrapper flex-row">
    <TheSidebar />
    <main class="flex-1">
      <router-view></router-view>
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
</style>
