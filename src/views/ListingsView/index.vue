<script setup lang="ts">
import GenreListing from './GenreListing.vue'
import { useGenresStore } from '@/stores/genres'
import { onMounted } from 'vue'

const genresStore = useGenresStore()
onMounted(() => genresStore.fetchGenres())

</script>

<template>
  <div class="px-20 pt-24">
    <GenreListing v-for="genre in genresStore.genres" :genre="genre" />
  </div>
</template>
