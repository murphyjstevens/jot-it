<script setup lang="ts">
import { computed, ref, watch, type Ref } from 'vue'
import highlightJs from 'highlight.js'
import MarkdownIt from 'markdown-it'

import iconList from '@/assets/bootstrap-icon-list.json'
import { AppInput, AppSelect, AppTextarea } from '@/components/library'
import type { Note } from '@/models/note.model'
import { useNoteStore } from '@/stores/note.store'

const noteStore = useNoteStore()

const markdownIt: MarkdownIt = new MarkdownIt({
  breaks: true,
  linkify: true,
  highlight: function (str, lang) {
    if (lang && highlightJs.getLanguage(lang)) {
      try {
        return highlightJs.highlight(str, { language: lang }).value
      } catch (error) {
        console.error(error)
      }
    }

    return ''
  },
})

noteStore.setEditNote()
const note: Ref<Note> = ref(noteStore.editNote)

const markdownHtml: Ref<string> = computed(() =>
  markdownIt.render(note.value.markdownText)
)

watch(
  () => noteStore.currentNote,
  () => {
    noteStore.setEditNote()
    note.value = noteStore.editNote
  }
)
</script>

<template>
  <div class="px-2 pt-2 flex flex-col md:flex-row">
    <AppSelect v-model="note.icon" class="mb-2 md:me-2 md:mb-0">
      <option v-for="icon in iconList" v-bind:key="icon">{{ icon }}</option>
    </AppSelect>
    <h2 class="flex flex-col flex-1">
      <i
        class="h-full w-8 ms-1 absolute flex justify-center items-center text-lg z-10"
        :class="[`bi-${note.icon}`]"
      ></i>
      <AppInput
        class="ps-10 text-lg"
        v-model="note.title"
        placeholder="Title"
      />
    </h2>
  </div>
  <div
    id="markdown"
    class="p-2 flex flex-col flex-1 justify-between overflow-hidden md:flex-row"
  >
    <div class="mb-2 flex flex-col flex-1 basis-0 md:mb-0 md:me-1">
      <AppTextarea
        id="markdown"
        v-model="note.markdownText"
        class="flex-1 bg-zinc-800 border border-zinc-700 resize-none"
      />
    </div>
    <div class="flex flex-col flex-1 basis-0 overflow-y-auto md:ms-1">
      <div
        id="html"
        v-html="markdownHtml"
        class="px-5 py-3 flex-1 bg-zinc-800 border border-zinc-700 rounded-lg markdown-display"
      ></div>
    </div>
  </div>
</template>
