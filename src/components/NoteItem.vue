<script setup lang="ts">
import { computed, ref } from 'vue'
import MarkdownIt from 'markdown-it'

const markdownIt = new MarkdownIt()

const markdown = ref('')
const isMarkdownVisible = ref(true)
const isDisplayVisible = ref(true)

const markdownHtml = computed(() => markdownIt.render(markdown.value))

function setVisible(isVisible: boolean, isMarkdown: boolean): void {
  if (isMarkdown) {
    isMarkdownVisible.value = isVisible
  } else {
    isDisplayVisible.value = isVisible
  }
}
</script>

<template>
  <div class="flex-row justify-content-center mt-1">
    <div class="markdown-wrapper flex-row justify-content-space-between">
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
            class="mb-1"
          >
            <i class="bi-eye-slash-fill"></i>
          </button>
        </div>
        <textarea
          id="markdown"
          v-model="markdown"
          class="markdown-area"
        ></textarea>
      </div>
      <div
        class="markdown-column-spacer"
        :class="{ 'minimized-column': !isDisplayVisible || !isMarkdownVisible }"
      ></div>
      <div
        class="flex-column markdown-column"
        :class="{
          'minimized-column': !isDisplayVisible,
          'maximized-column': !isMarkdownVisible,
        }"
      >
        <div class="flex-row justify-content-space-between mr-1 ml-1">
          <label for="html">Display</label>
          <button
            title="Hide display"
            @click="setVisible(false, false)"
            :disabled="!isMarkdownVisible"
            class="mb-1"
          >
            <i class="bi-eye-slash-fill"></i>
          </button>
        </div>
        <div id="html" v-html="markdownHtml" class="markdown-area"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.markdown-wrapper {
  width: 1000px;
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
}

.minimized-column textarea {
  text-overflow: clip;
  overflow: hidden;
  white-space: pre;
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
}

.hiding-show {
  opacity: 0;
  transition: transform 0.5s ease-out, opacity 0.2s linear;
}

.floating-show-markdown {
  left: -1.5rem;
  border-radius: 10px 0px 0px 10px;
}

.hiding-show-markdown {
  transform: translateX(3rem);
}

.floating-show-display {
  right: -1.5rem;
  border-radius: 0px 10px 10px 0px;
}

.hiding-show-display {
  transform: translateX(-3rem);
}
</style>
