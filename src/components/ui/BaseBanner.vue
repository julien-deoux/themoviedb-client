<script setup lang="ts">
import Heading1 from '@/components/ui/Heading1.vue'

interface Props {
  imageUrl?: string
  title: string
  subtitle?: string
}

defineProps<Props>()
</script>

<template>
  <div class="relative bg-black bg-opacity-50">
    <img class="-z-10 absolute w-full h-full object-cover" :src="imageUrl" />
    <div class="p-20 pt-36 bg-gradient-to-t from-gray-dark via-transparent">
      <Heading1>{{ title }}</Heading1>
      <h2 class="text-3xl my-5">{{ subtitle }}</h2>
      <div class="my-5 w-2/3">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
