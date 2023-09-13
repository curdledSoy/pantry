<template>
  <div>
    <div class="flex items-center justify-between">
      <PersonCard :person="person" />
      <div class="flex space-x-2">
        <div class="text-center">
          <h1 class="text-xl font-bold">
            {{ person._count.followers }}
          </h1>
          <p> Followers </p>
        </div>
        <div class="text-center">
          <h1 class="text-xl font-bold">
            {{ person._count.following }}
          </h1>
          <p> Following </p>
        </div>
        <div class="text-center">
          <h1 class="text-xl font-bold">
            {{ person._count.recipes }}
          </h1>
          <p> Recipes </p>
        </div>
        <div class="text-center">
          <h1 class="text-xl font-bold">
            {{ person._count.ratings }}
          </h1>
          <p> Ratings </p>
        </div>
        <div class="text-center">
          <h1 class="text-xl font-bold">
            {{ person._count.reviews }}
          </h1>
          <p> Reviews </p>
        </div>
      </div>
    </div>
    <div>
      <h1 class="text-2xl font-thin mb-4">
        Recipes
      </h1>
      <div>
        <NuxtLink v-for="recipe in person.recipes" :key="recipe.id" :to="`/recipes/${recipe.id}`">
          <div>
            {{ recipe.title }}
          </div>
        </NuxtLink>
      </div>
    </div>
    <div>
      <h1 class="text-2xl font-thin mb-4">
        Reviews
      </h1>
      <div>
        <div v-for="review in person.reviews" :key="review.recipe.id">
          Recipe: {{ review.recipe.title }}
          {{ review.text }}
        </div>
      </div>
    </div>
    <div>
      <h1 class="text-2xl font-thin mb-4">
        Ratings
      </h1>
      <div>
        <div v-for="rating in person.ratings" :key="rating.id">
          Recipe: <NuxtLink :to="`/recipes/${rating.recipe.id}`">
            {{ rating.recipe.title }}
          </NuxtLink>
          Author: <NuxtLink :to="`/people/${rating.recipe.author.id}`">
            {{ rating.recipe.author.username }}
          </NuxtLink>

          Rating: {{ rating.value }}/5
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const { userId } = route.params
const { data: person } = await useFetch(`/api/people/${userId}`)
</script>
