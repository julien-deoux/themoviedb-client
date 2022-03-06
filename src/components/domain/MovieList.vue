<script setup lang="ts">
import type { Movie } from '@/model/movie'
import type { CardProps } from '../ui/BaseCard.vue'
import BaseList from '../ui/BaseList.vue'

interface Props {
  movies: Movie[]
}

defineProps<Props>()

const cardFromMovie = (movie: Movie): CardProps => ({
  imageUrl: movie.smallBackdropUrl,
  title: movie.title
})
</script>

<template>
  <BaseList :cards="movies.map(cardFromMovie)" />
</template>