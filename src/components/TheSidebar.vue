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
  <aside
    class="-translate-x-full absolute hidden h-full w-80 flex-col justify-stretch bg-zinc-900 border-r-2 border-zinc-700 z-20 lg:translate-x-0 lg:relative lg:flex"
    :class="{ '!flex !translate-x-0': sidebarStore.show }"
  >
    <h1 class="text-center">
      <a href="/">Jot-It</a>
    </h1>
    <hr class="border-zinc-700" />
    <button
      class="bg-emerald-500 transition-all mx-3 my-4 hover:brightness-75 hover:bg-emerald-500"
      @click="openNote(null)"
    >
      <i class="bi-plus-lg btn-lg"></i>
    </button>
    <div class="flex flex-col overflow-y-auto">
      <button
        v-for="note in noteStore.notes"
        v-bind:key="note.id"
        @click="openNote(note)"
        :title="note.title"
        class="px-2 py-2 mx-3 flex flex-row bg-zinc-900 transition-colors text-ellipsis hover:bg-zinc-700"
      >
        <i class="mr-2" :class="[`bi-${note.icon ?? 'journal-text'}`]"></i>
        <span class="overflow-hidden text-ellipsis">{{ note.title }}</span>
      </button>
    </div>
  </aside>
  <div
    class="w-full h-full absolute right-0 flex bg-black opacity-0 transition-opacity pointer-events-none z-10 lg:hidden"
    :class="{ 'opacity-80 pointer-events-auto': sidebarStore.show }"
    @click="hideSidebar()"
  ></div>
</template>
