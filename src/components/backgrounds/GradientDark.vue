<script setup lang="ts">
</script>

<template>
  <div id="background">
    <slot/>
  </div>
</template>

<style scoped>
#background {
  height: 100%;
  width: 100%;
  background: linear-gradient(220deg, var(--color-void-950), var(--color-void-600));
  background-size: 400% 400%;

  -webkit-animation: AnimationName 10s ease infinite;
  -moz-animation: AnimationName 10s ease infinite;
  animation: AnimationName 10s ease infinite;
}

@-webkit-keyframes AnimationName {
  0% {
    background-position: 50% 0%
  }

  50% {
    background-position: 50% 100%
  }

  100% {
    background-position: 50% 0%
  }
}

@-moz-keyframes AnimationName {
  0% {
    background-position: 50% 0%
  }

  50% {
    background-position: 50% 100%
  }

  100% {
    background-position: 50% 0%
  }
}

@keyframes AnimationName {
  0% {
    background-position: 50% 0%
  }

  50% {
    background-position: 50% 100%
  }

  100% {
    background-position: 50% 0%
  }
}
</style>