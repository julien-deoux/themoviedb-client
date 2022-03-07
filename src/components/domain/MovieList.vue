<script setup lang="ts">
import type { Movie } from '@/model/movie'
import { MaybeType, type Maybe } from '@/util/maybe'
import { useRouter } from 'vue-router'
import BaseCard from '@/components/ui/BaseCard.vue'
import { useMoviesStore } from '@/stores/movies'

interface Props {
  movies: Maybe<Movie[]>
  emptyState?: string
}

defineProps<Props>()

const moviesStore = useMoviesStore()
const router = useRouter()

const selectMovie = (movieId: number): void => {
  router.push('/movie/' + movieId)
}
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <template v-if="MaybeType.Nothing === movies.type">
      <BaseCard v-for="_ in Array(4)" class="grow shrink-0" />
    </template>
    <template v-else>
      <p v-if="0 === movies.value.length">{{ emptyState || 'Cette liste est vide.' }}</p>
      <BaseCard
        v-for="movie in movies.value"
        class="grow shrink-0"
        :image-url="movie.smallBackdropUrl"
        :title="movie.title"
        @click="selectMovie(movie.id)"
      >
        <div v-if="moviesStore.favouriteIds.has(movie.id)" class="py-2 px-4">🤍</div>
      </BaseCard>
    </template>
  </div>
</template>
