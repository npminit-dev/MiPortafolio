<script setup lang="ts">
</script>

<template>
  <div id="background">
    <slot />
  </div>
</template>

<style scoped>
#background {
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg,var(--color-void-900), var(--color-void-800), var(--color-shadow-100));
  background-size: 180% 180%;
  animation: gradient-animation 21s ease infinite;;
}

@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
</style>