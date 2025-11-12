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
  background: linear-gradient(90deg, var(--color-deep-teal-shadow), var(--color-shadow-100));
  background-size: 400% 400%;
  animation: gradient-animation 21s ease infinite;
  -o-animation: gradient-animation 21s ease infinite;
  -moz-animation: gradient-animation 21s ease infinite;
  -webkit-animation: gradient-animation 21s ease infinite;
}

@-webkit-keyframes gradient-animation {
  0% {
    background-position: 0% 50%
  }

  50% {
    background-position: 100% 51%
  }

  100% {
    background-position: 0% 50%
  }
}

@-moz-keyframes gradient-animation {
  0% {
    background-position: 0% 50%
  }

  50% {
    background-position: 100% 51%
  }

  100% {
    background-position: 0% 50%
  }
}

@-o-keyframes gradient-animation {
  0% {
    background-position: 0% 50%
  }

  50% {
    background-position: 100% 51%
  }

  100% {
    background-position: 0% 50%
  }
}

@keyframes gradient-animation {
  0% {
    background-position: 0% 50%
  }

  50% {
    background-position: 100% 51%
  }

  100% {
    background-position: 0% 50%
  }
}
</style>