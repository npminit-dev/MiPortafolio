<script setup lang="ts">
import { ref, provide, onMounted } from "vue";

import GradientDark from "../components/backgrounds/GradientDark.vue";
import ProgressBar from "../components/main-view/ProgressBar.vue";
import Menu from "../components/main-view/Menu.vue";

const loadingFinished = ref<boolean | null>(true);

onMounted(() => {
  // const alreadyLoaded = sessionStorage.getItem("loadingFinished");
  // if (alreadyLoaded === "true") {
  //   loadingFinished.value = true;
  // } else {
  //   loadingFinished.value = false;
  // }
});

provide("endLoading", () => {
  // loadingFinished.value = true;
  // sessionStorage.setItem("loadingFinished", "true");
});
</script>

<template>
  <div class="fixed h-[100dvh] w-screen -z-10">
    <GradientDark />
  </div>

  <main class="w-screen h-[100dvh] flex items-center justify-center">
    <ProgressBar v-if="loadingFinished === false" />
    <Menu v-else-if="loadingFinished === true" />
    <span v-else />
  </main>
</template>

<style scoped></style>
