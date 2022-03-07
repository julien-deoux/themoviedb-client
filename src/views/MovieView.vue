<script setup lang="ts">
import type { Movie } from '@/model/movie'
import { useMoviesStore } from '@/stores/movies'
import { caseOf, MaybeType, type Maybe } from '@/util/maybe'
import { useRoute } from 'vue-router'
import BaseBanner from '@/components/ui/BaseBanner.vue'

const moviesStore = useMoviesStore()
const route = useRoute()

const movie: Maybe<Movie> = moviesStore.movieFromId(+route.params.id)

/**
 * Duct tape fix for linter issue
 * 
 * Somehow, v-on-click forgets that Typescript infers type Just<Movie> for movie,
 * which forces us to re-do the test in separate functions, even though we know that
 * these functions are never going to get called on Nothing.
 */
const favourite = (): void => caseOf(movie)({
  Nothing: () => { },
  Just: value => moviesStore.addFavourite(value.id),
})
const unfavourite = (): void => caseOf(movie)({
  Nothing: () => { },
  Just: value => moviesStore.removeFavourite(value.id)
})
</script>

<template>
  <main>
    <BaseBanner v-if="MaybeType.Nothing === movie.type" title="Erreur">
      <p>Il semblerait que ce film n'existe pas...</p>
    </BaseBanner>
    <BaseBanner v-else :image-url="movie.value.originalBackdropUrl" :title="movie.value.title">
      <p class="mb-4">{{ movie.value.overview }}</p>
      <button
        v-if="!moviesStore.favouriteIds.has(movie.value.id)"
        class="py-2 px-4 rounded-xl border border-gray-light bg-gray-light text-gray-dark"
        @click="favourite()"
      >Ajouter aux favoris</button>
      <button v-else class="py-2 px-4 rounded-xl border" @click="unfavourite()">Retirer des favoris</button>
    </BaseBanner>
  </main>
</template>
