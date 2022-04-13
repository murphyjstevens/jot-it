<template>
  <div class="container flex-row justify-content-center">
    <div class="card flex-column mt-4">
      <router-link class="card-title" to="/Notes/1">Note link</router-link>
      <div class="grid">
        <span>Creator:</span>
        <span class="grid-result">Murphy</span>

        <span>Updated:</span>
        <span class="grid-result">12/2/2020</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 15rem;
  height: 12rem;
  background-color: var(--vt-c-black-mute);
  padding: 0.5rem 1rem;
  box-shadow: 5px 5px 10px #00000088;

  &-title {
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
  }
}

.grid {
  display: grid;
  grid-template-columns: 3.5rem auto;
  column-gap: 0.5rem;

  &-result {
    text-align: right;
  }
}
</style>
