<template>
  <section>
    <h2 class="text-lg font-semibold mb-1">
      Ingredients
    </h2>
    <table class="table-auto">
      <thead class="text-left">
        <tr>
          <th>Name</th>
          <th>
            Quantity
          </th>
          <th>UoM</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="recipeIngredient in ingredients" :key="recipeIngredient.ingredient.id">
          <td>{{ recipeIngredient.ingredient.name }}</td>
          <td>{{ recipeIngredient.quantity }}</td>
          <td>{{ recipeIngredient.unit }}</td>
        </tr>
        <tr v-if=" ingredients.length === 0">
          No Ingredients to be found
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts" setup>
defineProps<{ingredients: Array<{ingredient: {id: number, name: string }, quantity: number, unit: string}>}>()
</script>
