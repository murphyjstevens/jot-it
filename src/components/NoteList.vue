<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { router } from '@/router'

import { useNoteStore } from '@/stores/note.store'
import type { Note } from '@/models/note.model'

const noteStore = useNoteStore()

noteStore.load()

const notes: Ref<Array<Note>> = ref(noteStore.notes)

function navigateToNote() {
  router.push({ name: 'NewNoteItem' })
}
</script>

<template>
  <div class="flex-column">
    <button class="btn-primary" @click="navigateToNote()">
      <i class="bi-plus-lg btn-lg"></i>
    </button>

    <div class="container flex-row justify-content-center">
      <div
        v-for="note in notes"
        v-bind:key="note.id"
        class="card flex-column mt-4 ml-4 mr-4"
      >
        <router-link class="card-title" :to="`/notes/${note.id}`">{{
          note.title
        }}</router-link>
        <div class="grid">
          <span>Updated:</span>
          <span class="grid-result">{{
            note.updatedDate?.toLocaleDateString('en-us')
          }}</span>
        </div>
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
