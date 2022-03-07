<script setup lang="ts">
import { useMoviesStore } from '@/stores/movies'
import MovieList from '@/components/domain/MovieList.vue'
import Heading1 from '@/components/ui/Heading1.vue'

const moviesStore = useMoviesStore()
</script>

<template>
  <main class="px-20 pt-24">
    <Heading1>Favoris</Heading1>
    <MovieList :movies="moviesStore.favourites" empty-state="Vous n'avez aucun favori." />
  </main>
</template>
