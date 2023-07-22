<script setup lang="ts">
import { ButtonVariant } from '@/models/library/button-variant.enum'
import { ButtonColor } from '@/models/library/button-color.enum'

defineProps<{
  variant: ButtonVariant | string
  color: ButtonColor | string
}>()
</script>

<template>
  <button
    class="group py-2 px-4 flex flex-row justify-center border border-transparent rounded-md cursor-pointer"
    :class="[
      {
        'bg-transparent': variant === ButtonVariant.Text,
        'bg-emerald-600 text-zinc-100':
          variant === ButtonVariant.Default && color === ButtonColor.Primary,
        'text-emerald-600':
          variant === ButtonVariant.Text && color === ButtonColor.Primary,
      },
    ]"
  >
    <span
      class="w-full h-full absolute top-0 left-0 bg-white opacity-0 border rounded-md pointer-events-none group-hover:opacity-10"
    ></span>
    <slot></slot>
  </button>
</template>
