<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useApiConfigStore } from './stores/apiConfig'

const apiConfigStore = useApiConfigStore()
apiConfigStore.fetchSecureBaseUrl()
</script>

<template>
  <RouterView />
</template>
