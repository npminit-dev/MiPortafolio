<script setup lang="ts">
import { onMounted } from 'vue';
import LangSwitcher from './components/LangSwitcher.vue';
import PageTransition from './components/PageTransition.vue';
import SoundSwitcher from './components/SoundSwitcher.vue';
import gsap from 'gsap';
import ScrollSmoother from 'gsap/dist/ScrollSmoother';

gsap.registerPlugin(ScrollSmoother)

onMounted(() => {
  ScrollSmoother.create({
    speed: .75,
    effects: true,
    smooth: 2
  })
})

</script>

<template>
  <div class="scroll">
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <router-view/>
      </div>
    </div>
    <PageTransition />
    <div class="fixed right-3 top-3">
      <LangSwitcher/>
    </div>
    <div class="fixed right-2 bottom-2">
      <SoundSwitcher/>
    </div>
    <p class="fixed bottom-2 left-2 font-display text-ghost-100">
      {{ $t('Made with ♥') }}
    </p>
  </div>
</template>


