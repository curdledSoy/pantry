<template>
  <section name="tags">
    <ul class="flex space-x-2 mb-4">
      <Tag v-for="tag in tags" :key="tag.id" :tag="tag" />
    </ul>
  </section>
</template>

<script lang="ts" setup>
defineProps<{tags: Array<{name: string, id: number}>}>()
</script>
