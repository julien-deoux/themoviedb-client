<script setup lang="ts">
import type { Genre } from '@/model/genre'
import type { Movie } from '@/model/movie'
import { useMoviesStore } from '@/stores/movies'
import { orDefault } from '@/util/maybe'
import { onMounted } from 'vue'
import MovieList from '../../components/domain/MovieList.vue'
import Heading1 from '../../components/ui/Heading1.vue'

interface Props {
  genre: Genre
}

const props = defineProps<Props>()

const moviesStore = useMoviesStore()
onMounted(() => moviesStore.fetchDiscover(props.genre.id))

const movies = (): Movie[] => orDefault<Movie[]>([])(moviesStore.discover(props.genre.id))
</script>

<template>
  <Heading1>{{ genre.name }}</Heading1>
  <MovieList :movies="movies()" />
</template>
