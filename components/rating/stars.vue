<template>
  <span class="flex items-center">
    <template v-for="(star, index) in 5" :key="index">
      <FontAwesomeIcon v-if="index <= currentRating" icon="fas fa-star" class="text-yellow-500" />
      <span v-else-if="index - 0.5 === currentRating" class="inline-flex -space-x-[12px]">
        <div class="relative">
          <FontAwesomeIcon icon="fas fa-star" class="text-gray-400" />
          <div class="absolute top-0 left-0 overflow-hidden" style="width: 50%;">
            <FontAwesomeIcon icon="fas fa-star" class="text-yellow-500" />
          </div>
        </div>
      </span>
      <FontAwesomeIcon v-else icon="fas fa-star" class="text-gray-400" />
    </template>
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
    rating: number | 0
}>()

const currentRating = computed(() => {
  return Math.min(Math.max(props.rating, 0), 5)
})
</script>

<style scoped>
.half-star {
  display: inline-block;
  overflow: hidden;
  position: relative;
}

.half-star .fa-star-half {
  position: absolute;
  top: 0;
  left: 0;
  clip-path: polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%);
  transition: width 0.3s; /* Add a transition for smooth animation */
}
</style>
