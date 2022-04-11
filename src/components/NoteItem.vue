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
      <div
        class="flex-column markdown-column"
        :class="{ hidden: !isMarkdownVisible }"
      >
        <div class="flex-row justify-content-space-between mr-1 ml-1">
          <label for="markdown">Markdown</label>
          <button
            @click="setVisible(false, true)"
            :disabled="!isDisplayVisible"
            class="mb-1"
          >
            Hide
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
        :class="{ hidden: !isDisplayVisible || !isMarkdownVisible }"
      ></div>
      <div
        class="flex-column markdown-column"
        :class="{ hidden: !isDisplayVisible }"
      >
        <div class="flex-row justify-content-space-between mr-1 ml-1">
          <label for="html">Display</label>
          <button
            @click="setVisible(false, false)"
            :disabled="!isMarkdownVisible"
            class="mb-1"
          >
            Hide
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
  width: 100%;
}

.markdown-column-spacer {
  width: 1rem;
}

.markdown-area {
  height: 500px;
  background-color: var(--vt-c-black-mute);
  color: inherit;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 12px 20px;
}
</style>
