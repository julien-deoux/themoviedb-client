<script setup lang="ts">
interface Props {
  selected: boolean
  name: string
}

defineProps<Props>()
defineEmits(['click'])
</script>

<template>
  <button
    class="inline-block py-2 px-4 whitespace-nowrap border rounded-xl border-gray text-gray"
    :class="{ 'text-white': selected, 'bg-gray': selected }"
    @click="$emit('click')"
  >{{ name }}</button>
</template>
