<script setup lang="ts">
import { computed, ref } from 'vue'
import MarkdownIt from 'markdown-it'

const markdownIt = new MarkdownIt()

const markdown = ref('')

const markdownHtml = computed(() => markdownIt.render(markdown.value))
</script>

<template>
  <div class="flex-row justify-content-center mt-1">
    <div class="markdown-wrapper flex-row justify-content-space-between">
      <div class="flex-column markdown-column">
        <label for="markdown">Markdown</label>
        <textarea
          id="markdown"
          v-model="markdown"
          class="markdown-area mr-1"
        ></textarea>
      </div>
      <div class="flex-column markdown-column">
        <label for="html">Display</label>
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
