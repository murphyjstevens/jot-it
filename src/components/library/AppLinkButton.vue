<script setup lang="ts">
import { ButtonVariant } from '@/models/library/button-variant.enum'
import { ButtonColor } from '@/models/library/button-color.enum'

defineProps<{
  variant: ButtonVariant | string
  color: ButtonColor | string
  to: string
}>()
</script>

<template>
  <router-link
    :to="to"
    class="group py-2 px-4 flex flex-row justify-center border border-transparent rounded-md cursor-pointer active:ring focus:ring disabled:opacity-20 disabled:pointer-events-none disabled:ring-0"
    :class="[
      {
        'bg-transparent': variant === ButtonVariant.Text,
        'bg-emerald-600 text-zinc-100':
          variant === ButtonVariant.Default && color === ButtonColor.Primary,
        'text-emerald-600':
          variant === ButtonVariant.Text && color === ButtonColor.Primary,
        'text-inherit': color === ButtonColor.Default,
      },
    ]"
  >
    <!-- Button overlay (for hover shading) -->
    <span
      class="w-full h-full absolute top-0 left-0 bg-white opacity-0 border rounded-md transition-opacity pointer-events-none group-hover:opacity-10 group-disabled:pointer-events-auto group-disabled:cursor-not-allowed group-disabled:opacity-0"
    ></span>

    <!-- Button underlay (for click events) -->
    <span class="w-full h-full absolute top-0 left-0"></span>
    <slot></slot>
  </router-link>
</template>
