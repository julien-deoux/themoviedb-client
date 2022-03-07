<script setup lang="ts">
import { useMoviesStore } from '@/stores/movies'
import Heading1 from '@/components/ui/Heading1.vue'
import type { Movie } from '@/model/movie'
import MovieList from '@/components/domain/MovieList.vue'
import { maybeMap, type Maybe } from '@/util/maybe'

const moviesStore = useMoviesStore()

const movies = (): Maybe<Movie[]> => maybeMap(<T>(arr: T[]) => arr.slice(1))(moviesStore.popularMovies)
</script>

<template>
  <div class="px-20 pb-20">
    <Heading1>Les films du moment</Heading1>
    <MovieList :movies="movies()" />
  </div>
</template>
