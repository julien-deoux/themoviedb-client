<script setup lang="ts">
import type { Movie } from '@/model/movie'
import { caseOf, maybeMap, type Maybe } from '@/util/maybe'
import { useRouter } from 'vue-router'
import type { CardProps } from '@/components/ui/BaseCard.vue'
import BaseList from '@/components/ui/BaseList.vue'

interface Props {
  movies: Maybe<Movie[]>
  emptyState?: string
}

const props = defineProps<Props>()

const router = useRouter()

const cardFromMovie = (movie: Movie): CardProps => ({
  imageUrl: movie.smallBackdropUrl,
  title: movie.title,
})
const cardsFromMovies = (movies: Movie[]): CardProps[] => movies.map(cardFromMovie)

const cards = (): Maybe<CardProps[]> => maybeMap(cardsFromMovies)(props.movies)
const selectMovie = (index: number): void => caseOf(props.movies)({
  Nothing: () => { },
  Just: movies => router.push('/movie/' + movies[index].id),
})
</script>

<template>
  <BaseList :cards="cards()" :empty-state="emptyState" @card-select="i => selectMovie(i)" />
</template>
