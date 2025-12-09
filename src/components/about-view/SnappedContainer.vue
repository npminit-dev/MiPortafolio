<script setup lang="ts">
  import { onMounted } from 'vue';
  import gsap from 'gsap';
import AboutMe from './AboutMe.vue';
import Contact from './Contact.vue';
import Feedback from './Feedback.vue';

  let beforeSnapAnimation: gsap.core.Animation|null = null

  onMounted(() => {
    beforeSnapAnimation = gsap.fromTo('#white-rounded', {
      filter: 'drop-shadow(0 -10px 10px #fff)',
      autoAlpha: .8,
      borderRadius: '100%'
    }, {
      filter: 'drop-shadow(0 -50px 100px #fff)',
      autoAlpha: 1,
      borderRadius: '25%',
      ease: 'power2.in',
      scaleX: 4,
      scrollTrigger: {
        trigger: '#white-rounded',
        start: 'top bottom',
        end: 'top top',
        scrub: true,
      }
    })
  })

</script>

<template>
  <div id="general-container" class="relative w-screen h-screen flex items-center justify-center z-[1000]">  
    <div id="white-rounded" class="absolute top-0 inset-x-0 bg-ghost-300 w-screen h-[100vw] flex items-center justify-center"/>
    <div id="snap-outer-container" class="absolute inset-0 w-screen h-screen">
      <div id="snap-inner-container">
        <!-- <AboutMe/> -->
        <!-- <Contact/> -->
        <Feedback/>
      </div>
    </div>
  </div>
</template>

<style scoped></style>