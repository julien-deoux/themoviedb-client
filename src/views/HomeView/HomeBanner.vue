<script setup lang="ts">
import { useMoviesStore } from '@/stores/movies'
import { caseOf, MaybeType } from '@/util/maybe'
import BaseBanner from '@/components/ui/BaseBanner.vue'
import { useRouter } from 'vue-router'

const moviesStore = useMoviesStore()

const router = useRouter()

const openMovie = (): void => caseOf(moviesStore.mostPopular)({
  Nothing: () => { },
  Just: movie => router.push('/movie/' + movie.id),
})
</script>

<template>
  <BaseBanner v-if="MaybeType.Nothing === moviesStore.mostPopular.type" title="Bienvenue">
    <p>Chargement des films les plus populaires en cours</p>
  </BaseBanner>
  <BaseBanner
    v-else
    :image-url="moviesStore.mostPopular.value.originalBackdropUrl"
    title="Visionnage recommandé"
    :subtitle="moviesStore.mostPopular.value.title"
  >
    <p class="mb-4">{{ moviesStore.mostPopular.value.overview }}</p>
    <button
      class="py-2 px-4 rounded-xl bg-gray-light text-gray-dark border-none"
      @click="openMovie()"
    >En savoir plus</button>
  </BaseBanner>
</template>
