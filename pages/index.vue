<template>
  <div :key="route.query" class="flex flex-col">
    <h1 class="text-3xl font-semibold mb-4">
      Recipe List
    </h1>

    <SearchTitle v-model="searchTitle" />
    <SearchCuisine v-model="searchCuisine" />
    <SearchDifficulty v-model="searchDifficulty" />

    <TransitionGroup
      tag="ul"
      name="recipes"
      class="flex flex-wrap gap-2 content-start pl-2"
    >
      <template v-if="recipes && recipes.length">
        <li
          v-for="recipe in recipes"
          :key="`recipe-${recipe.id}`"
          class="mb-2 p-2 recipes-move"
        >
          <RecipeCard :recipe="recipe" />
        </li>
      </template>
      <li v-else-if="pending" class="mb-2 p-2 recipes-move">
        Loading......
      </li>
      <li v-else class="mb-2 p-2 recipes-move">
        No Recipes
      </li>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { Cuisine, Difficulty } from '@prisma/client'

const route = useRoute()
const searchTitle = useState<string | null>(
  'searchRecipesByTitle',
  () => (route.query?.title as string) ?? null
)
const searchCuisine = useState<Cuisine | null>(
  'searchRecipesByCuisine',
  () => (route.query.cuisine as Cuisine) ?? null
)
const searchDifficulty = useState<Difficulty | null>(
  'searchRecipesByDifficulty',
  () => (route.query.difficulty as Difficulty) ?? null
)
const query = computed(() => {
  return {
    cuisine: searchCuisine.value,
    title: searchTitle.value,
    difficulty: searchDifficulty.value
  }
})
const { data: recipes, pending } = await useFetch('/api/recipe', {
  query
})

watch([searchTitle, searchCuisine, searchDifficulty], () => {
  navigateTo({
    query: {
      ...(searchTitle.value && { title: searchTitle.value }),
      ...(searchCuisine.value && { cuisine: searchCuisine.value }),
      ...(searchDifficulty.value && { difficulty: searchDifficulty.value })
    }
  })
})
</script>

<style scoped>
.recipes-move,
.recipes-enter-active,
.recipes-leave-active,
.recipes-enter-from,
.recipes-leave-to {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Enter Animation */
.recipes-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.recipes-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Leave Animation */
.recipes-leave-from {
  opacity: 1;
  transform: scale(1);
}

.recipes-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
