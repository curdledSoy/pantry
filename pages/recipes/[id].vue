<template>
  <div>
    <header class="flex justify-between">
      <RecipeAuthor :author="recipe?.author" />
      <div class="flex flex-col w-md max-w-md break-normal">
        <h1 class="text-3xl font-semibold mb-2">
          {{ recipe.title }}
        </h1>
        <RatingStars :rating="recipe?._avg.value" />
        <p class="text-gray-600 mb-4 w-sm dark:text-gray-400">
          {{ recipe.description }}
        </p>
        <RecipeTags :tags="recipe?.tags" />
      </div>
    </header>
    <main class="flex justify-evenly">
      <section name="instructions" class="text-left break-normal">
        <h2 class="text-lg font-semibold mb-1">
          Directions
        </h2>
        <p>{{ recipe?.instructions }}</p>
      </section>
      <RecipeIngredientsList :ingredients="recipe?.recipeIngredients" />
    </main>
    <footer>
      <RecipeReviews :ratings="recipe.ratings" />
    </footer>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const { data: recipe, error } = await useFetch(`/api/recipe/${route.params.id}`)

if (error.value || !recipe.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

</script>
