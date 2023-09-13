<template>
  <div class="mb-4">
    <label for="searchCuisine" class="block font-medium mb-1">Search by Cuisine:</label>
    <select id="searchCuisine" v-model="data" class="w-full px-3 py-2 rounded border dark:border-black focus:outline-none focus:ring-none dark:bg-slate-400">
      <option :value="null">
        All Cuisines
      </option>
      <option v-for="cuisine in cuisines" :key="cuisine" :value="cuisine">
        {{ cuisine }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { Cuisine } from '@prisma/client'
const cuisines = Object.keys(Cuisine)
const props = defineProps<{
  modelValue: Cuisine | null
}>()
const emit = defineEmits(['update:modelValue'])

const data = useVModel(props, 'modelValue', emit)
</script>
