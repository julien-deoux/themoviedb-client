<script setup lang="ts">
defineProps(['imageUrl', 'title']);
</script>

<template>
  <div class="w-64 inline-block">
    <div class="relative aspect-video">
      <img class="object-cover rounded-xl" :src="imageUrl" />
      <div class="absolute h-48 w-full bottom-0 opacity-80 rounded-xl bg-gradient-to-t from-black"></div>
      <h3 class="bottom-4 inset-x-center text-center text-gray-200 font-bold text-xl">{{ title }}</h3>
    </div>
  </div>
</template>
