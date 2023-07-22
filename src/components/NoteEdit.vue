<script setup lang="ts">
import { computed, ref, watch, type Ref } from 'vue'
import MarkdownIt from 'markdown-it'
import highlightJs from 'highlight.js'

import { AppInput, AppSelect, AppTextarea } from '@/components/library'
import { useNoteStore } from '@/stores/note.store'
import type { Note } from '@/models/note.model'

import iconList from '../assets/bootstrap-icon-list.json'

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
  <div class="pt-2 px-2 flex flex-col lg:flex-row">
    <AppSelect v-model="note.icon" class="mb-2 lg:me-2 lg:mb-0">
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
  <div id="markdown" class="p-2 flex flex-col flex-1 justify-between">
    <div class="mb-2 flex flex-col flex-1 basis-0">
      <AppTextarea
        id="markdown"
        v-model="note.markdownText"
        class="flex-1 bg-zinc-800 border border-zinc-700"
      />
    </div>
    <div class="flex flex-col flex-1 basis-0 overflow-y-scroll">
      <div
        id="html"
        v-html="markdownHtml"
        class="p-5 flex-1 bg-zinc-800 border-1 border-zinc-700 markdown-display"
      ></div>
    </div>
  </div>
</template>
