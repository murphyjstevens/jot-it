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
  <select
    v-model="value"
    class="py-3 px-5 bg-zinc-800 border border-zinc-700 rounded-lg text-inherit cursor-pointer outline-emerald-600 focus-visible:outline focus-within:outline disabled:cursor-not-allowed disabled:opacity-30"
  >
    <slot></slot>
  </select>
</template>
