<script setup lang="ts">
import { useMoviesStore } from '@/stores/movies'
import { MaybeType } from '@/util/maybe'
import BaseBanner from '@/components/ui/BaseBanner.vue'
import { onMounted } from 'vue'

const moviesStore = useMoviesStore()
onMounted(() => moviesStore.fetchMostPopular())
</script>

<template>
  <BaseBanner
    v-if="MaybeType.Nothing === moviesStore.mostPopular.type"
    title="Bienvenue"
    paragraph="Chargement des films les plus populaires en cours"
  />
  <BaseBanner
    v-else
    :image-url="moviesStore.mostPopular.value.originalBackdropUrl"
    title="Visionnage recommandé"
    :subtitle="moviesStore.mostPopular.value.title"
    :paragraph="moviesStore.mostPopular.value.overview"
  />
</template>
