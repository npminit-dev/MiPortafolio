<script setup langt="ts">
import GradientDark from "../components/backgrounds/GradientDark.vue";
import DNA from '../components/main-view/DNA.vue';
import ProgressBar from '../components/main-view/ProgressBar.vue';
</script>

<template>
  <div class="fixed h-screen w-screen -z-10">
    <GradientDark />
  </div>
  <main class="w-screen min-h-screen flex items-center justify-center">
    <ProgressBar/>
  </main>
</template>

<style scoped></style>
