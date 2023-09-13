<template>
  <figure class="text-sm flex items-center" :class="size === 'md' ? 'flex-col' : 'space-x-1'">
    <img class="rounded-full bg-gray-100 overflow-hidden" :class="size === 'md' ? 'h-32 w-32' : 'h-16 w-16'">
    <figcaption class="mb-1 font-semibold">
      {{ person.username }}
    </figcaption>
  </figure>
</template>

<script lang="ts" setup>
export interface Props {person: {username: string}, size: 'sm' | 'md'}
withDefaults(defineProps<Props>(), { size: 'md' })
</script>
