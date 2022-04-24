<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useNoteStore } from '@/stores/note.store'
import type { Note } from '@/models/note.model'
import { useSidebarStore } from '@/stores/sidebar.store'

const route = useRoute()
const router = useRouter()

const noteStore = useNoteStore()
const sidebarStore = useSidebarStore()

noteStore.load()

defaultToFirstNote()

function hideSidebar() {
  sidebarStore.show = false
}

function openNote(note: Note | null) {
  hideSidebar()
  router.push(`/${note?.id ?? 'new'}`)
}

function defaultToFirstNote() {
  if (route.path === '' || route.path === '/') {
    openNote(noteStore.notes.length ? noteStore.notes[0] : null)
  }
}

watch(
  () => route.path,
  () => {
    defaultToFirstNote()
  }
)
</script>

<template>
  <aside :class="{ 'show-sidebar': sidebarStore.show }">
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
        :title="note.title"
        class="flex-row"
      >
        <i class="mr-2" :class="[`bi-${note.icon ?? 'journal-text'}`]"></i>
        <span>{{ note.title }}</span>
      </button>
    </div>
  </aside>
  <div
    class="sidebar-shadow"
    :class="{ 'sidebar-shadow-show': sidebarStore.show }"
    @click="hideSidebar()"
  ></div>
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

      text-overflow: ellipsis;

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

      & > span {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}

.sidebar-shadow {
  display: none;
}

@media screen and (max-width: 1024px) {
  aside {
    position: absolute;
    width: 80%;
    transform: translateX(-100%);
    transition: transform 0.25s ease-out;
    z-index: 5;
  }

  .show-sidebar {
    display: flex;
    flex-direction: column;
    transform: translateX(0);
  }

  .sidebar-shadow {
    display: flex;
    position: absolute;
    right: 0;
    background-color: var(--color-background);
    opacity: 0;
    transition: opacity 0.25s ease-out;
    width: 100%;
    height: 100%;
    z-index: 4;
    pointer-events: none;
  }

  .sidebar-shadow-show {
    opacity: 0.8;
    pointer-events: all;
  }
}
</style>
