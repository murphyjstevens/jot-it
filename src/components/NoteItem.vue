<script setup lang="ts">
import { computed, ref } from 'vue'
import MarkdownIt from 'markdown-it'
import { router } from '@/router';

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

function goTo(tag: string) {
  router.push(`#${tag}`)
}
</script>

<template>
  <div class="flex-row justify-content-center mt-1">
    <div id="markdown" class="markdown-wrapper justify-content-space-between">
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
</template>

<style scoped lang="scss">
// breakpoints: 1024, 768, 640
.markdown-wrapper {
  display: flex;
  flex-direction: row;
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
  }

  &-display {
    right: -1.5rem;
    border-radius: 0px 10px 10px 0px;
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
  .markdown-wrapper {
    flex-direction: column;
    width: 100%;
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
