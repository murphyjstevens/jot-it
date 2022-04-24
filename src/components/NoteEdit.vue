<script setup lang="ts">
import { computed, ref, watch, type Ref } from 'vue'
import MarkdownIt from 'markdown-it'
import highlightJs from 'highlight.js'

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
  }
)
</script>

<template>
  <div class="note-input-row mt-2">
    <select v-model="note.icon">
      <option v-for="icon in iconList" v-bind:key="icon">{{ icon }}</option>
    </select>
    <h2 class="note-input-wrapper flex-column">
      <i class="note-icon" :class="[`bi-${note.icon}`]"></i>
      <input id="title" v-model="note.title" placeholder="Title" />
    </h2>
  </div>
  <div id="markdown" class="markdown-wrapper justify-content-space-between">
    <div class="flex-column markdown-column mb-4">
      <textarea
        id="markdown"
        v-model="note.markdownText"
        class="markdown-area"
      ></textarea>
    </div>
    <div class="flex-column markdown-column mb-4">
      <div
        id="html"
        v-html="markdownHtml"
        class="markdown-area markdown-display"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// breakpoints: 1024, 768, 640

.note-input-row {
  display: flex;
  flex-direction: row;

  .note-input-wrapper {
    flex-grow: 1;

    & > input {
      font-size: 1.5rem;
      padding-left: 2.5rem;
    }
  }

  .note-icon {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 2rem;
    margin-left: 0.25rem;
    font-size: 1.5rem;
    z-index: 2;
  }
}

.markdown-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.markdown-column {
  height: 50%;
  transition: width 0.5s ease-out, opacity 0.5s ease-in;
}

.markdown-area {
  flex: 1;
  background-color: var(--vt-c-black-mute);
  border: 1px solid var(--color-border);
  color: inherit;
  padding: 12px 20px;
  overflow: auto;
}

@media screen and (max-width: 1024px) {
  .note-input-row {
    flex-direction: column;
  }

  .markdown-wrapper {
    flex-direction: column;
  }

  .markdown-column {
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>
