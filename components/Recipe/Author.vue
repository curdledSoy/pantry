<template>
  <div>
    <NuxtLink :to="`/people/${author.id}`">
      <PersonCard :person="author" />
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ author: { id: number, username: string } }>()
</script>
