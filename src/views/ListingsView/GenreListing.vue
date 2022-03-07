<script setup lang="ts">
import type { Genre } from '@/model/genre'
import type { Movie } from '@/model/movie'
import { useMoviesStore } from '@/stores/movies'
import MovieList from '../../components/domain/MovieList.vue'

interface Props {
  genre: Genre
}

const props = defineProps<Props>()

const moviesStore = useMoviesStore()

const movies = (): Movie[] => moviesStore.discover(props.genre.id)
</script>

<template>
  <MovieList :movies="movies()" />
</template>
