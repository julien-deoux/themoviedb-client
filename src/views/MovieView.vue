<script setup lang="ts">
import type { Movie } from '@/model/movie'
import { useMoviesStore } from '@/stores/movies'
import { MaybeType, type Maybe } from '@/util/maybe'
import BaseBanner from '../components/ui/BaseBanner.vue'

interface Props {
  movieId: number
}

const props = defineProps<Props>()

const moviesStore = useMoviesStore()

const movie: Maybe<Movie> = moviesStore.movieFromId(props.movieId)
</script>

<template>
  <main>
    <BaseBanner
      v-if="MaybeType.Nothing === movie.type"
      title="Bienvenue"
      paragraph="Chargement des films les plus populaires en cours"
    />
    <BaseBanner
      v-else
      :image-url="movie.value.originalBackdropUrl"
      title="Visionnage recommandé"
      :subtitle="movie.value.title"
      :paragraph="movie.value.overview"
    />
  </main>
</template>
