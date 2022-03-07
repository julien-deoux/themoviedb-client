<script setup lang="ts">
import type { Movie } from '@/model/movie'
import { useMoviesStore } from '@/stores/movies'
import { caseOf, maybeMap, type Maybe } from '@/util/maybe'
import type { CardProps } from '../ui/BaseCard.vue'
import BaseList from '../ui/BaseList.vue'

interface Props {
  movies: Maybe<Movie[]>
  emptyState?: string
}

const props = defineProps<Props>()

const moviesStore = useMoviesStore()

const cardFromMovie = (movie: Movie): CardProps => ({
  imageUrl: movie.smallBackdropUrl,
  title: movie.title,
})
const cardsFromMovies = (movies: Movie[]): CardProps[] => movies.map(cardFromMovie)

const cards = (): Maybe<CardProps[]> => maybeMap(cardsFromMovies)(props.movies)
const selectMovie = (index: number): void => caseOf(props.movies)({
  Nothing: () => { },
  Just: movies => moviesStore.addFavourite(movies[index].id),
})
</script>

<template>
  <BaseList :cards="cards()" :empty-state="emptyState" @card-select="i => selectMovie(i)" />
</template>
