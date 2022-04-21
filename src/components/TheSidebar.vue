<script setup lang="ts">
import { useNoteStore } from '@/stores/note.store'
import type { Note } from '@/models/note.model'

const noteStore = useNoteStore()

noteStore.load()

function openNote(note: Note | null) {
  noteStore.open(note)
}
</script>

<template>
  <aside>
    <h1><a href="/">Jot-It</a></h1>
    <hr />
    <button class="btn-primary" @click="openNote(null)">
      <i class="bi-plus-lg btn-lg"></i>
    </button>
    <div class="note-list-wrapper">
      <button
        v-for="note in noteStore.notes"
        v-bind:key="note.id"
        @click="openNote(note)"
        class="flex-row"
      >
        <i class="bi-journal-text mr-2"></i>
        <span>{{ note.title }}</span>
      </button>
    </div>
  </aside>
</template>

<style scoped lang="scss">
aside {
  background-color: var(--color-background-soft);
  height: 100%;
  width: 20rem;

  h1 {
    text-align: center;
  }

  & > button {
    width: 100%;
    margin-top: 1rem;
  }

  & > .note-list-wrapper {
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    button {
      background-color: var(--vt-c-black-mute);
      border-bottom: 1px solid var(--color-border);
      color: var(--color-text);

      width: 100%;

      font-size: 1.5rem;
      padding: 0.5rem;

      &:hover {
        background-color: var(--color-background);
      }

      &:active,
      &:focus {
        border: 1px solid var(--color-text);
      }
    }
  }
}
</style>
