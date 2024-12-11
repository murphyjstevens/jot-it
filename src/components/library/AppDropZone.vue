<script setup lang="ts">
import { onMounted, onUnmounted, ref, type Ref } from 'vue'

const emit = defineEmits<{
  (e: 'dropped', files: Array<File>): void
}>()

const events = ['dragenter', 'dragover', 'dragleave', 'drop']
let active: Ref<boolean> = ref(false)
let inactiveTimeout: NodeJS.Timeout | undefined = undefined

function setActive() {
  active.value = true
  clearTimeout(inactiveTimeout)
}
function setInactive() {
  inactiveTimeout = setTimeout(() => {
    active.value = false
  }, 50)
}

function onDrop(e: DragEvent) {
  setInactive()
  emit('dropped', [...e.dataTransfer?.files ?? []])
}

function preventDefaults(e: any) {
  e.preventDefault()
}

onMounted(() => {
  events.forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults)
  })
})

onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults)
  })
})
</script>

<template>
  <div
    :data-active="active"
    @dragenter.prevent="setActive"
    @dragover.prevent="setActive"
    @dragleave.prevent="setInactive"
    @drop.prevent="onDrop"
    :class="{ 'outline-2 outline-dashed': active }"
  >
    <slot :dropZoneActive="active"></slot>
  </div>
</template>
