<template>
  <section name="reviews" class="text-left break-normal mt-2">
    <div class="flex justify-between">
      <h2 class="text-lg font-semibold mb-1">
        Reviews
      </h2>
      <h2 class="text-lg font-semibold mb-1">
        Add Review
      </h2>
    </div>

    <ul class="flex flex-col gap-2">
      <li v-for="rating in ratings" :key="rating.id" class="flex items-center text-center justify-between ">
        <div class="flex justify-between w-96">
          <NuxtLink :to="`/people/${rating.user.id}`">
            <PersonCard size="sm" :person="rating.user" />
          </NuxtLink>
          <RatingStars :rating="rating.value" />
        </div>

        <blockquote class="h-16 w-96 overflow-auto text-ellipsis">
          <p class="text-ellipsis ">
            {{ 'lorem '.repeat(1000) }}
          </p>
        </blockquote>
      </li>
      <li v-if="!ratings || ratings.length === 0">
        No Reviews.
        Yet.....
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
defineProps<{ ratings: Array<{ id: number, value: number, user: { id: number, username: string } }> | null }>()
</script>
