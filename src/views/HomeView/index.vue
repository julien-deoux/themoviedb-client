<script setup lang="ts">
import Popular from './Popular.vue'
import HomeBanner from './HomeBanner.vue'
import { useMoviesStore } from '@/stores/movies'
import { onMounted } from 'vue'

const moviesStore = useMoviesStore()
onMounted(() => moviesStore.fetchPopular())
</script>

<template>
  <main>
    <HomeBanner />
    <Popular />
  </main>
</template>
