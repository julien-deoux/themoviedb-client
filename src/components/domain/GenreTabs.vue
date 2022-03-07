<script setup lang="ts">
import type { Genre } from '@/model/genre'
import { useGenresStore } from '@/stores/genres'
import type { Maybe } from '@/util/maybe'
import type { Tab } from '@/components/ui/BaseTabs.vue'
import BaseTabs from '@/components/ui/BaseTabs.vue'
import { useMoviesStore } from '@/stores/movies'

interface Props {
  genres: Genre[],
  selected: Maybe<number>,
}

defineProps<Props>()

const genresStore = useGenresStore()
const moviesStore = useMoviesStore()

const tabFromGenre = (genre: Genre): Tab => genre

const selectGenre = (id: number): void => {
  genresStore.display(id)
  moviesStore.fetchDiscover(id)
}
</script>

<template>
  <BaseTabs :tabs="genres.map(tabFromGenre)" :selected="selected" @select="selectGenre" />
</template>
