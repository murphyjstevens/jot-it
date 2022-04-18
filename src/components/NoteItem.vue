<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'

import { router } from '@/router'
import { useNoteStore } from '@/stores/note.store'
import type { Note } from '@/models/note.model'

const route = useRoute()
const noteStore = useNoteStore()
const markdownIt = new MarkdownIt()

const noteId: number = +route.params.id

noteStore.load()

const note: Ref<Note> = ref(
  noteStore.notes.find((n) => n.id === noteId) ?? ({ markdownText: '' } as Note)
)

const isMarkdownVisible = ref(true)
const isDisplayVisible = ref(true)

const markdownHtml: Ref<string> = computed(() =>
  markdownIt.render(note.value.markdownText)
)

const canSave: Ref<boolean> = computed(
  () => !!note?.value?.markdownText && !!note.value.title
)

function setVisible(isVisible: boolean, isMarkdown: boolean): void {
  if (isMarkdown) {
    isMarkdownVisible.value = isVisible
  } else {
    isDisplayVisible.value = isVisible
  }
}

function goTo(tag: string) {
  router.push(`#${tag}`)
}

function save() {
  if (canSave.value) {
    noteStore.saveNote(note.value)
  }
}
</script>

<template>
  <div class="flex-column align-items-center">
    <div class="note-wrapper flex-column align-items-stretch mt-1">
      <div class="flex-row justify-content-end">
        <span class="mr-2" v-if="note?.updatedDate">
          <time title="Last Updated">{{
            note.updatedDate.toLocaleString()
          }}</time>
        </span>
        <button class="btn-primary" @click="save()" :disabled="!canSave">
          Save
        </button>
      </div>
      <div class="note-input-row">
        <div class="note-input-wrapper flex-column">
          <label for="title">Title</label>
          <input id="title" v-model="note.title" />
        </div>
        <div class="markdown-column-spacer"></div>
        <div class="note-input-wrapper flex-column"></div>
      </div>
      <div
        id="markdown"
        class="markdown-wrapper justify-content-space-between mt-2"
      >
        <button
          title="Show markdown"
          @click="setVisible(true, true)"
          class="floating-show floating-show-markdown"
          :class="{ 'hiding-show hiding-show-markdown': isMarkdownVisible }"
        >
          <i class="bi-eye-fill"></i>
        </button>
        <button
          title="Show display"
          @click="setVisible(true, false)"
          class="floating-show floating-show-display"
          :class="{ 'hiding-show hiding-show-display': isDisplayVisible }"
        >
          <i class="bi-eye-fill"></i>
        </button>
        <div
          class="flex-column markdown-column"
          :class="{
            'minimized-column': !isMarkdownVisible,
            'maximized-column': !isDisplayVisible,
          }"
        >
          <div class="flex-row justify-content-space-between mr-1 ml-1">
            <label for="markdown">Markdown</label>
            <button
              title="Hide markdown"
              @click="setVisible(false, true)"
              :disabled="!isDisplayVisible"
              class="hide-button mb-1"
            >
              <i class="bi-eye-slash-fill"></i>
            </button>
            <button
              title="Go to display"
              @click="goTo('display')"
              class="goto-button mb-1"
            >
              <i class="bi-eyeglasses"></i>
            </button>
          </div>
          <textarea
            id="markdown"
            v-model="note.markdownText"
            class="markdown-area"
          ></textarea>
        </div>
        <div
          class="markdown-column-spacer"
          :class="{
            'minimized-column': !isDisplayVisible || !isMarkdownVisible,
          }"
        ></div>
        <div
          class="flex-column markdown-column"
          :class="{
            'minimized-column': !isDisplayVisible,
            'maximized-column': !isMarkdownVisible,
          }"
        >
          <div
            id="display"
            class="flex-row justify-content-space-between mr-1 ml-1"
          >
            <label for="html">Display</label>
            <button
              title="Hide display"
              @click="setVisible(false, false)"
              :disabled="!isMarkdownVisible"
              class="hide-button mb-1"
            >
              <i class="bi-eye-slash-fill"></i>
            </button>
            <button
              title="Go to display"
              @click="goTo('markdown')"
              class="goto-button mb-1"
            >
              <i class="bi-pencil-fill"></i>
            </button>
          </div>
          <div id="html" v-html="markdownHtml" class="markdown-area"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// breakpoints: 1024, 768, 640
.note-wrapper {
  width: 1000px;
}

.note-input-row {
  display: flex;
  flex-direction: row;

  .note-input-wrapper {
    flex: 1;
  }
}

.markdown-wrapper {
  display: flex;
  flex-direction: row;
}

.markdown-column {
  width: 50%;
  transition: width 0.5s ease-out, opacity 0.5s ease-in;
  z-index: 2;
}

.markdown-column-spacer {
  width: 1rem;
  transition: width 0.5s ease-out;
  z-index: 2;
}

.minimized-column {
  overflow: hidden;
  width: 0px;
  opacity: 0;
  transition: width 0.5s ease-out, opacity 0.5s ease-in;

  textarea {
    text-overflow: clip;
    overflow: hidden;
    white-space: pre;
  }
}

.maximized-column {
  width: 100%;
  transition: width 0.5s ease-out;
}

.markdown-area {
  height: 500px;
  background-color: var(--vt-c-black-mute);
  color: inherit;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 12px 20px;
}

.floating-show {
  position: absolute;
  width: 1.5rem;
  top: 2rem;
  transition: transform 0.5s ease-out, opacity 0.5s ease-in 0.3s;
  z-index: 1;

  &-markdown {
    left: -1.5rem;
    border-radius: 10px 0px 0px 10px;
    padding: 2px 0 2px 5px;
  }

  &-display {
    right: -1.5rem;
    border-radius: 0px 10px 10px 0px;
    padding: 2px 2px 2px 0;
  }
}

.hiding-show {
  opacity: 0;
  transition: transform 0.5s ease-out, opacity 0.2s linear;

  &-markdown {
    transform: translateX(3rem);
  }

  &-display {
    transform: translateX(-3rem);
  }
}

.goto-button {
  display: none;
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
  .markdown-column-spacer {
    display: none;
  }

  .floating-show {
    display: none;
  }

  .minimized-column {
    overflow: inherit;
    width: inherit;
    opacity: inherit;

    textarea {
      text-overflow: inherit;
      overflow: inherit;
      white-space: inherit;
    }
  }

  .hide-button {
    display: none;
  }

  .goto-button {
    display: inherit;
  }
}
</style>
