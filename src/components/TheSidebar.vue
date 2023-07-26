<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { AppButton } from '@/components/library'
import type { Note } from '@/models/note.model'
import { useNoteStore, useSidebarStore } from '@/stores'

const route = useRoute()
const router = useRouter()

const noteStore = useNoteStore()
const sidebarStore = useSidebarStore()

let dragIndex: number | null = null
let dragAbove = false

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

function dragStart(index: number) {
  dragIndex = index
}

function dragEnd() {
  dragIndex = null
}

function dragOver(event: any) {
  event.preventDefault()

  const element = getNoteButton(event.target)

  if (element) {
    const boundingRect = element.getBoundingClientRect()
    const offset = boundingRect.y + boundingRect.height / 2
    if (event.clientY - offset > 0) {
      dragAbove = false
      element.style['border-bottom'] = 'solid 4px blue'
      element.style['border-top'] = ''
    } else {
      dragAbove = true
      element.style['border-top'] = 'solid 4px blue'
      element.style['border-bottom'] = ''
    }
  }
}

function dragLeave(event: any) {
  const element = getNoteButton(event.target)

  element.style['border-bottom'] = ''
  element.style['border-top'] = ''
}

function drop(event: any, index: number) {
  const element = getNoteButton(event.target)

  element.style['border-bottom'] = ''
  element.style['border-top'] = ''

  if (index === dragIndex || dragIndex === null) {
    return
  }

  let newIndex = index
  if (dragIndex < index && dragAbove) {
    newIndex--
  } else if (dragIndex > index && !dragAbove) {
    newIndex++
  }

  noteStore.reorderNotes(dragIndex, newIndex)
}

function getNoteButton(element: any): any | null {
  if (element.name === 'note-button') {
    return element
  }

  if (element?.parentNode?.name === 'note-button') {
    return element.parentNode
  } else {
    return null
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
    class="-translate-x-full fixed h-full w-80 flex flex-col justify-stretch bg-zinc-900 border-r-2 border-zinc-700 z-20 transition-transform lg:translate-x-0 lg:relative"
    :class="{ '!translate-x-0': sidebarStore.show }"
  >
    <h1 class="my-4 text-4xl text-center">
      <a href="/">Jot-It</a>
    </h1>
    <hr class="border-zinc-700" />
    <AppButton
      class="mx-3 my-4 text-lg"
      color="primary"
      variant="default"
      @click="openNote(null)"
    >
      <i class="bi-plus-lg btn-lg"></i>
    </AppButton>
    <div class="py-2 flex flex-col overflow-y-auto">
      <AppButton
        v-for="(note, index) in noteStore.notes"
        v-bind:key="note.id"
        name="note-button"
        @click="openNote(note)"
        draggable="true"
        @dragend="dragEnd()"
        @dragover="dragOver($event)"
        @dragleave="dragLeave($event)"
        @dragstart="dragStart(index)"
        @drop="drop($event, index)"
        :title="note.title"
        color="default"
        variant="text"
        class="mx-4 !justify-start"
      >
        <i class="mr-2" :class="[`bi-${note.icon ?? 'journal-text'}`]"></i>
        <span class="overflow-hidden text-ellipsis">{{ note.title }}</span>
      </AppButton>
    </div>
  </aside>
  <div
    class="w-full h-full fixed right-0 flex bg-black opacity-0 transition-opacity pointer-events-none z-10 lg:hidden"
    :class="{ 'opacity-80 pointer-events-auto': sidebarStore.show }"
    @click="hideSidebar()"
  ></div>
</template>
