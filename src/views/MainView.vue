<script setup lang="ts">
import { ref, provide, onMounted } from 'vue';

import GradientDark from "../components/backgrounds/GradientDark.vue";
import ProgressBar from '../components/main-view/ProgressBar.vue';
import Menu from '../components/main-view/Menu.vue';

const loadingFinished = ref<boolean>(false);

onMounted(() => {
  const alreadyLoaded = sessionStorage.getItem('loadingFinished');
  if (alreadyLoaded === 'true') {
    loadingFinished.value = true;
  }
});

provide('endLoading', () => {
  loadingFinished.value = true;
  sessionStorage.setItem('loadingFinished', 'true');
});
</script>

<template>
  <div class="fixed h-screen w-screen -z-10">
    <GradientDark />
  </div>

  <main class="w-screen min-h-screen flex items-center justify-center">
    <ProgressBar v-if="!loadingFinished" />
    <Menu v-if="loadingFinished" />
  </main>
</template>

<style scoped></style>
