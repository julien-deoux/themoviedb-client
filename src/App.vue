<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useApiConfigStore } from './stores/apiConfig'
import Header from './components/layout/Header.vue'
import { onMounted } from 'vue'

const apiConfigStore = useApiConfigStore()

onMounted(() => apiConfigStore.fetchSecureBaseUrl())
</script>

<template>
  <Header class="fixed w-full z-50" />
  <RouterView />
</template>
