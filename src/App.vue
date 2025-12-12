<script setup lang="ts">
import { onMounted } from "vue";
import LangSwitcher from "./components/LangSwitcher.vue";
import PageTransition from "./components/PageTransition.vue";
import SoundSwitcher from "./components/SoundSwitcher.vue";
import gsap from "gsap";
import ScrollSmoother from "gsap/dist/ScrollSmoother";

gsap.registerPlugin(ScrollSmoother);

onMounted(() => {
  const mm = gsap.matchMedia();

  const sm = ScrollSmoother.create({
    speed: 0.75,
    effects: true,
    smooth: 2,
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
    <div class="fixed right-3 top-3">
      <LangSwitcher />
    </div>
    <div class="fixed right-2 bottom-2">
      <SoundSwitcher />
    </div>
  </div>
</template>

<style scoped></style>
