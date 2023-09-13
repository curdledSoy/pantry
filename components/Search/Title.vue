<template>
  <div class="mb-4">
    <label for="searchTitle" class="block font-medium mb-1">Search by Title:</label>
    <input id="searchTitle" v-model="data" type="text" placeholder="E.g. Lemon P.." class="w-full px-3 py-2 rounded border dark:border-black focus:outline-none focus:ring-none dark:bg-slate-400 placeholder-white">
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: string | null
}>()
const emit = defineEmits(['update:modelValue'])

const data = useVModel(props, 'modelValue', emit)

</script>
