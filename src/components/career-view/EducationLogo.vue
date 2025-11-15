<script setup lang="ts">
import type { ImgHTMLAttributes } from 'vue';

  type Props = {
    imageData: Partial<ImgHTMLAttributes>&{ src: string }
  }

  const props = defineProps<Props>()

</script>

<template>
  <div class="education-logo-container relative h-40 w-40 p-2 rounded-full border-[1px] border-ghost-300 object-contain overflow-hidden">
    <img class="education-logo h-full rounded-full" :="props.imageData">
  </div>
</template>

<style>

</style>