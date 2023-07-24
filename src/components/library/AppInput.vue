<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  },
})
</script>

<template>
  <input
    v-model="value"
    class="py-3 px-5 bg-zinc-800 border border-zinc-700 rounded-lg text-inherit disabled:cursor-not-allowed disabled:opacity-30"
  />
</template>
