<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'
import { useApiConfigStore } from '@/stores/apiConfig';
import { useMoviesStore } from '@/stores/movies';
import { buildBackdropUrl } from '@/util/movieUtil';

const moviesStore = useMoviesStore()
moviesStore.fetchPopular()

const apiConfigStore = useApiConfigStore()
</script>

<template>
  <div class="px-20">
    <h1 class="font-bold text-4xl my-10">Les films du moment</h1>
    <div class="flex overflow-x-auto gap-4">
      <BaseCard
        v-for="movie in moviesStore.popular"
        class="grow shrink-0"
        :image-url="buildBackdropUrl(apiConfigStore.imageUrl, 'w780', movie)"
        :title="movie.title"
      />
    </div>
  </div>
</template>
