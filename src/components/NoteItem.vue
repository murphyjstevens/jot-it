<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'
import MarkdownIt from 'markdown-it'
import highlightJs from 'highlight.js'

import { useNoteStore } from '@/stores/note.store'
import { useSidebarStore } from '@/stores/sidebar.store'
import type { Note } from '@/models/note.model'

import iconList from '../assets/bootstrap-icon-list.json'

const noteStore = useNoteStore()
const sidebarStore = useSidebarStore()

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

const note: Ref<Note> = ref({} as Note)
loadNote()

const markdownHtml: Ref<string> = computed(() =>
  markdownIt.render(note.value.markdownText)
)

const canSave: Ref<boolean> = computed(() => !!note.value.title)

const canNotSaveReason: Ref<string> = computed(() =>
  !note.value.title ? 'The title is required' : ''
)

noteStore.$subscribe(() => {
  loadNote()
})

function loadNote() {
  note.value = noteStore.currentNote
    ? ({ ...noteStore.currentNote } as Note)
    : ({ markdownText: '', icon: 'journal' } as Note)
}

function save() {
  if (canSave.value) {
    noteStore.saveNote(note.value)
  }
}

function showSidebar() {
  sidebarStore.show = true
}
</script>

<template>
  <div class="note-wrapper flex-column">
    <div class="action-bar flex-row mt-2">
      <button class="hamburger-button" @click="showSidebar()">
        <i class="bi-list"></i>
      </button>
      <time class="mr-2" v-if="note?.updatedDate" title="Last Updated">{{
        note.updatedDate.toLocaleString()
      }}</time>
      <button
        class="btn-primary"
        @click="save()"
        :disabled="!canSave"
        :title="canNotSaveReason"
      >
        Save
      </button>
    </div>
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
  </div>
</template>

<style scoped lang="scss">
// breakpoints: 1024, 768, 640
.note-wrapper {
  height: 100%;
  width: 100%;
}

.action-bar {
  justify-content: flex-end;

  .hamburger-button {
    display: none;
  }
}

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
  .note-wrapper {
    width: 100%;
  }

  .action-bar {
    justify-content: space-between;

    .hamburger-button {
      display: flex;
    }

    time {
      display: none;
    }
  }

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
