<script setup lang="ts">
import { type Maybe, equals, Just } from '@/util/maybe'
import BaseTab from "./BaseTab.vue"
export interface Tab {
  id: number,
  name: string,
}

interface Props {
  tabs: Tab[],
  selected: Maybe<number>,
}

interface Emits {
  (e: 'select', id: number): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <div class="flex flex-wrap gap-2 my-5">
    <BaseTab
      v-for="tab in tabs"
      class="flex-1 justify-between"
      :name="tab.name"
      :selected="equals(selected)(Just(tab.id))"
      @click="$emit('select', tab.id)"
    />
  </div>
</template>
