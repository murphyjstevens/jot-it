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
  <div class="note-display-wrapper">
    <div class="note-title mt-2">
      <h1 class="green">
        <i
          class="note-icon"
          :class="[`bi-${noteStore.currentNote?.icon ?? 'journal'}`]"
        ></i>
        <span class="ml-2">{{ noteStore.currentNote?.title }}</span>
      </h1>
    </div>
    <div v-html="markdownHtml" class="markdown-display"></div>
  </div>
</template>

<style scoped lang="scss">
// breakpoints: 1024, 768, 640
.note-display-wrapper {
  padding: 0 1.5rem;
}
.note-title {
  border-bottom: 1px solid var(--color-border);
}
</style>
