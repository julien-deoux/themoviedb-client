<script setup lang="ts">
import { useApiConfigStore } from '@/stores/apiConfig';
import { useMoviesStore } from '@/stores/movies';
import { buildBackdropUrl } from '@/util/movieUtil';

const moviesStore = useMoviesStore()
moviesStore.fetchMostPopular()

const apiConfigStore = useApiConfigStore()

const imageUrl = () => buildBackdropUrl(apiConfigStore.imageUrl, 'original', moviesStore.mostPopular)
</script>

<template>
  <div class="relative bg-black bg-opacity-50">
    <img class="-z-10 absolute w-full h-full object-cover" :src="imageUrl()" />
    <div class="p-20">
      <h1 class="text-gray-200 text-4xl font-bold my-10">Visionnage recommandé</h1>
      <h2 class="text-gray-200 text-3xl my-5">{{ moviesStore.mostPopular?.title }}</h2>
      <p class="text-gray-200 text-xl my-5">{{ moviesStore.mostPopular?.overview }}</p>
    </div>
  </div>
</template>
