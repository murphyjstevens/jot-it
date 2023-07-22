<script setup lang="ts">
import { computed, type Ref } from 'vue'
import MarkdownIt from 'markdown-it'
import highlightJs from 'highlight.js'

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

const markdownHtml: Ref<string> = computed(() =>
  markdownIt.render(noteStore.currentNote?.markdownText ?? '')
)
</script>

<template>
  <div class="px-3">
    <div class="border-b-2 border-zinc-700 mt-2">
      <h1 class="mb-2 text-2xl text-emerald-500">
        <i :class="[`bi-${noteStore.currentNote?.icon ?? 'journal'}`]"></i>
        <span class="ms-2">{{ noteStore.currentNote?.title }}</span>
      </h1>
    </div>
    <div v-html="markdownHtml" class="markdown-display mt-2"></div>
  </div>
</template>
