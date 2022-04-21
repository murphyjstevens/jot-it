<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'
import MarkdownIt from 'markdown-it'

import { useNoteStore } from '@/stores/note.store'
import type { Note } from '@/models/note.model'

const noteStore = useNoteStore()
const markdownIt = new MarkdownIt()

const note: Ref<Note> = ref({} as Note)
loadNote()

const markdownHtml: Ref<string> = computed(() =>
  markdownIt.render(note.value.markdownText)
)

const canSave: Ref<boolean> = computed(
  () => !!note?.value?.markdownText && !!note.value.title
)

noteStore.$subscribe(() => {
  loadNote()
})

function loadNote() {
  note.value = noteStore.currentNote
    ? ({ ...noteStore.currentNote } as Note)
    : ({ markdownText: '' } as Note)
}

function save() {
  if (canSave.value) {
    noteStore.saveNote(note.value)
  }
}
</script>

<template>
  <div class="note-wrapper flex-column">
    <div class="flex-row justify-content-end mt-2">
      <span class="mr-2" v-if="note?.updatedDate">
        <time title="Last Updated">{{
          note.updatedDate.toLocaleString()
        }}</time>
      </span>
      <button class="btn-primary" @click="save()" :disabled="!canSave">
        Save
      </button>
    </div>
    <div class="note-input-row mt-2">
      <h2 class="note-input-wrapper flex-column">
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
        <div id="html" v-html="markdownHtml" class="markdown-area"></div>
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

.note-input-row {
  display: flex;
  flex-direction: row;

  .note-input-wrapper {
    flex-grow: 1;

    & > input {
      font-size: 1.5rem;
    }
  }
}

.markdown-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.markdown-column {
  flex: 1;
  transition: width 0.5s ease-out, opacity 0.5s ease-in;
  border-top: 1px solid var(--color-border);
}

.markdown-area {
  flex: 1;
  background-color: var(--vt-c-black-mute);
  color: inherit;
  padding: 12px 20px;
}

@media screen and (max-width: 1024px) {
  .note-wrapper {
    width: 100%;
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
