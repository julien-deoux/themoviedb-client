<script setup lang="ts">
import type { Genre } from '@/model/genre'
import type { Movie } from '@/model/movie'
import { useMoviesStore } from '@/stores/movies'
import type { Maybe } from '@/util/maybe'
import { onMounted } from 'vue'
import MovieList from '../../components/domain/MovieList.vue'

interface Props {
  genre: Genre
}

const props = defineProps<Props>()

const moviesStore = useMoviesStore()

const movies = (): Maybe<Movie[]> => moviesStore.discover(props.genre.id)

onMounted(() => window.addEventListener('scroll', () => {
  if (document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight - 100) {
    moviesStore.fetchDiscover(props.genre.id)
  }
}))
</script>

<template>
  <MovieList :movies="movies()" />
</template>
