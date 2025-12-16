<script setup lang="ts">
import { onMounted } from "vue";
import LangSwitcher from "./components/LangSwitcher.vue";
import PageTransition from "./components/PageTransition.vue";
import SoundSwitcher from "./components/SoundSwitcher.vue";
import ScrollSmoother from "gsap/dist/ScrollSmoother";
import { useWindowSize } from "@vueuse/core";
import gsap from "gsap";

const { width } = useWindowSize();

gsap.registerPlugin(ScrollSmoother);

onMounted(() => {
  ScrollSmoother.create({
    speed: width.value >= 640 ? 0.75 : 0,
    effects: true,
    smooth: width.value >= 640 ? 2 : 0.5,
    ignoreMobileResize: true,
    normalizeScroll: true,
  });
});
</script>

<template>
  <div class="scroll">
    <div id="smooth-wrapper" class="">
      <div id="smooth-content" class="">
        <router-view />
      </div>
    </div>
    <PageTransition />
    <div class="fixed right-3 top-3 z-10">
      <LangSwitcher />
    </div>
    <div class="fixed right-2 bottom-2 z-10">
      <SoundSwitcher />
    </div>
  </div>
</template>

<style scoped></style>
