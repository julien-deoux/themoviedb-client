<script setup lang="ts">
export interface CardProps {
  imageUrl?: string
  title?: string
}

defineProps<CardProps>()
</script>

<template>
  <div class="max-w-3xl w-72">
    <div class="relative aspect-video">
      <img v-if="imageUrl" class="object-cover rounded-xl" :src="imageUrl" />
      <div v-else class="w-full h-full rounded-xl bg-gray"></div>
      <div
        class="absolute h-full w-full bottom-0 opacity-80 rounded-xl bg-gradient-to-t from-black"
      ></div>
      <h3 v-if="title" class="bottom-4 inset-x-center text-center font-bold text-xl">{{ title }}</h3>
    </div>
  </div>
</template>
