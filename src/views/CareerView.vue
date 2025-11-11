<script setup lang="ts">
import gsap from 'gsap';
import GradientViolet from '../components/backgrounds/GradientViolet.vue';
import { onMounted } from 'vue';
import MainTitle from '../components/career-view/MainTitle.vue';


onMounted(() => {
  // gsap.fromTo('.drawing-circle', {
  //   drawSVG: '-25% -25%',
  // }, {
  //   drawSVG: '0% 100%',
  //   duration: 1.5,
  //   ease: 'power4.inOut',
  //   scrollTrigger: '.drawing-circle'
  // })

})

</script>

<template>
  <main class="relative w-screen overflow-clip min-h-screen flex flex-col items-center">
    <GradientViolet class="fixed h-screen w-screen left-0 top-0 -z-30"/>
    <MainTitle/>
    <!-- <div class="h-fit w-fit">
      <svg width="168" height="168" viewBox="0 0 168 168" stroke-width="1" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle class="drawing-circle" cx="84" cy="84" r="83.5" stroke="white"/>
      </svg>
    </div> -->
  </main>
</template>

<style scoped>

</style>