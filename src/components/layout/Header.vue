<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="bg-[#121821d0] backdrop-blur">
    <nav class="h-24 px-20 flex items-center">
      <RouterLink to="/" class="text-4xl">Coucou</RouterLink>
      <RouterLink to="/listings">Listes</RouterLink>
      <RouterLink to="/favourites">Favoris</RouterLink>
    </nav>
  </header>
</template>
