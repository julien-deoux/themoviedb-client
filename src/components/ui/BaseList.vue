<script setup lang="ts">
import { MaybeType, type Maybe } from '@/util/maybe'
import BaseCard, { type CardProps } from './BaseCard.vue'

interface Props {
  cards: Maybe<CardProps[]>
  emptyState?: string
}

interface Emits {
  (e: 'cardSelect', id: number): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <template v-if="MaybeType.Nothing === cards.type">
      <BaseCard v-for="_ in Array(4)" class="grow shrink-0" />
    </template>
    <template v-else>
      <p v-if="0 === cards.value.length">{{ emptyState || 'Cette liste est vide.' }}</p>
      <BaseCard
        v-for="(card, i) in cards.value"
        class="grow shrink-0"
        :image-url="card.imageUrl"
        :title="card.title"
        @click="$emit('cardSelect', i)"
      />
    </template>
  </div>
</template>
