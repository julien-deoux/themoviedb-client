<script setup lang="ts">
interface Props {
  selected: boolean,
  name: string,
}

defineProps<Props>()
defineEmits(['click'])
</script>

<template>
  <a
    class="inline-block py-2 px-4 text-center whitespace-nowrap border rounded-xl border-gray text-gray"
    :class="{ 'font-bold': selected, 'text-white': selected, 'bg-gray': selected }"
    @click="$emit('click')"
  >{{ name }}</a>
</template>
