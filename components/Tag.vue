<template>
  <li class="bg-gray-200 dark:text-black py-1 px-2 rounded">
    {{ tag.name }}
  </li>
</template>

<script lang="ts" setup>
defineProps<{tag: {name: string, id: number}}>()
</script>
