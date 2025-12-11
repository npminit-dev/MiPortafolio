<script setup lang="ts">
type Props = {
  scrollSection: number;
};

const { scrollSection } = defineProps<Props>();
</script>

<template>
  <div class="absolute left-4 bottom-4 flex items-center justify-center">
    <svg
      class="z-10"
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        id="scroll-progress"
        cx="30"
        cy="30"
        r="28"
        stroke="var(--color-void-600)"
        stroke-width="3"
        stroke-linecap="round"
      />
    </svg>
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="absolute"
    >
      <circle cx="30" cy="30" r="28" stroke="var(--color-ghost-200)" stroke-width="5" />
    </svg>
    <span id="scroll-progress-page" class="absolute text-2xl font-display font-medium">{{
      scrollSection
    }}</span>
  </div>
</template>
