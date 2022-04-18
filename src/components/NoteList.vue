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

    <div class="card-container justify-content-center">
      <router-link
        :to="`/notes/${note.id}`"
        v-for="note in notes"
        v-bind:key="note.id"
        class="card mt-4 ml-4 mr-4"
      >
        <h3 class="card-title">{{ note.title }}</h3>
        <div class="grid">
          <span class="grid-label">Updated:</span>
          <time class="grid-result">{{
            note.updatedDate?.toLocaleString('en-us')
          }}</time>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-container {
  display: flex;
  flex-direction: row;

  .card {
    display: flex;
    flex-direction: column;
    width: 15rem;
    height: 12rem;
    background-color: var(--vt-c-black-mute);
    color: var(--color-text);
    padding: 0.5rem 1rem;
    box-shadow: 5px 5px 10px #00000088;

    &-title {
      text-align: center;
      font-size: 1.5rem;
      font-weight: bold;
    }
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

@media screen and (max-width: 1024px) {
  .card-container {
    flex-direction: column;

    .card {
      flex-direction: row;
      width: initial;
      height: initial;

      &-title {
        text-align: left;
      }
    }
  }

  .grid {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: end;

    .grid-label {
      display: none;
    }
  }
}
</style>
