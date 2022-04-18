<template>
  <header class="flex-row justify-content-space-between">
    <h1><router-link to="/">Jot-It</router-link></h1>
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
}
</style>
