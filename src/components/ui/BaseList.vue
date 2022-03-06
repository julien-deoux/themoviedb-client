<script setup lang="ts">
import BaseCard, { type CardProps } from './BaseCard.vue'

interface Props {
  cards: CardProps[]
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <template v-if="0 === cards.length">
      <BaseCard v-for="_ in Array(4)" class="grow shrink-0" />
    </template>
    <template v-else>
      <BaseCard
        v-for="card in cards"
        class="grow shrink-0"
        :image-url="card.imageUrl"
        :title="card.title"
      />
    </template>
  </div>
</template>
