<template>
  <Card size="md">
    <template #main>
      <img class="h-full w-full object-cover ">
    </template>
    <template #overlay>
      <NuxtLink :to="'/recipes/' + recipe.id">
        <div class="text-white text-center">
          <h2 class="text-xl font-semibold">
            {{ recipe.title }}
          </h2>
          <p class="text-sm text-ellipsis max-w-16 break-words text-center p-3">
            {{ recipe.description }}
          </p>
        </div>
      </NuxtLink>
    </template>
    <template #details>
      <NuxtLink :to="`/people/${recipe.author.id}`">
        <PersonCard :person="recipe.author" size="sm" />
      </NuxtLink>
    </template>
  </Card>
</template>

<script lang="ts" setup>
export interface Props {recipe: {id: number, title: string, description: string, author: {id: number, username: string}}}
defineProps<Props>()
</script>
