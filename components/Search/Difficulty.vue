<template>
  <div class="mb-4">
    <label for="searchDifficulty" class="block font-medium mb-1">Search by Difficulty:</label>
    <select id="searchDifficulty" v-model="data" class="w-full px-3 py-2 rounded border dark:border-black focus:outline-none focus:ring-none dark:bg-slate-400">
      <option :value="null">
        All Levels
      </option>
      <option v-for="level in difficultyLevels" :key="level" :value="level">
        {{ level }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { Difficulty } from '@prisma/client'
const difficultyLevels = Object.keys(Difficulty)
const props = defineProps<{
  modelValue: Difficulty | null
}>()
const emit = defineEmits(['update:modelValue'])

const data = useVModel(props, 'modelValue', emit)
</script>
