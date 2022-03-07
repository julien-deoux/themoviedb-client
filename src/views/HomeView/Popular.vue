<script setup lang="ts">
import { useMoviesStore } from '@/stores/movies'
import Heading1 from '@/components/ui/Heading1.vue'
import { orDefault } from '@/util/maybe'
import type { Movie } from '@/model/movie'
import MovieList from '../../components/domain/MovieList.vue'
import { onMounted } from 'vue'

const moviesStore = useMoviesStore()
onMounted(() => moviesStore.fetchPopular())

const movies = (): Movie[] => orDefault<Movie[]>([])(moviesStore.popular)
</script>

<template>
  <div class="px-20 pb-20">
    <Heading1>Les films du moment</Heading1>
    <MovieList :movies="movies()" />
  </div>
</template>
