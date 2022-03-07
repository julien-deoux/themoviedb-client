<script setup lang="ts">
import GenreListing from './GenreListing.vue'
import { useGenresStore } from '@/stores/genres'
import { onMounted } from 'vue'
import GenreTabs from '@/components/domain/GenreTabs.vue'
import { MaybeType } from '@/util/maybe'

const genresStore = useGenresStore()
onMounted(() => genresStore.fetchGenres())
</script>

<template>
  <main class="px-20 pt-24">
    <GenreTabs :genres="genresStore.genres" :selected="genresStore.displayed" />
    <GenreListing
      v-if="MaybeType.Just === genresStore.displayedGenre.type"
      :genre="genresStore.displayedGenre.value"
    />
  </main>
</template>
