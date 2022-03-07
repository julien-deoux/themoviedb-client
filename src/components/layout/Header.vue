<script setup lang="ts">
import { RouterLink } from 'vue-router'
import logoUrl from '@/assets/logo.svg'
</script>

<template>
  <header class="bg-[#121821d0] backdrop-blur">
    <nav class="h-24 px-20 flex items-center">
      <RouterLink class="mx-5" to="/">
        <img class="h-5" :src="logoUrl" />
      </RouterLink>
      <RouterLink class="mx-5 hover:underline" to="/listings">Listes</RouterLink>
      <RouterLink class="mx-5 hover:underline" to="/favourites">Favoris</RouterLink>
    </nav>
  </header>
</template>
