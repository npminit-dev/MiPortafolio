<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SubTitle from '../SubTitle.vue';
import Description from '../Description.vue';
import { projectHeight } from '../../utils';

gsap.registerPlugin(ScrollTrigger);

let scrollTriggerInstance: ScrollTrigger | null = null;

onMounted(() => {
  const mainContainer = document.querySelector('.main-container') as HTMLElement;
  const pinnedContainer = document.getElementById('langs-pinned-container')
  const shiftingContainer = document.querySelector('#langs-shifting-container') as HTMLElement;

  if (!mainContainer || !shiftingContainer) return;

  // Distancia en el eje del contenedor (antes de la rotación)
  const distanceInContainer = (projectHeight(shiftingContainer.offsetWidth)) - 110;

  // Como el contenedor está rotado 45°, el desplazamiento es el mismo en X e Y
  const diagonalX = - distanceInContainer;
  const diagonalY = - distanceInContainer;

  // El "end" debe ser proporcional a la distancia diagonal real
  // Con 45°, la distancia diagonal es: distancia * sqrt(2)
  // Pero como movemos tanto X como Y, usamos la distancia del contenedor directamente
  const scrollDistance = distanceInContainer * 1.5; // Ajusta este multiplicador si es necesario

  // Crear la animación con ScrollTrigger
  scrollTriggerInstance = ScrollTrigger.create({
    trigger: mainContainer,
    pin: mainContainer,
    start: 'bottom bottom',
    end: `+=${scrollDistance}`,
    scrub: 1,
    // markers: true,
    anticipatePin: 1,
    pinSpacing: 'margin',
    animation: gsap.to(shiftingContainer, {
      x: diagonalX,
      y: diagonalY,
      ease: 'none'
    })
  });


  ScrollTrigger.create({
    trigger: '#middle-span',
    start: `center center+=${pinnedContainer?.offsetHeight! / 2}px`,
    end: `center center-=200px${pinnedContainer?.offsetHeight! / 2}px`,
    anticipatePin: 1,
    containerAnimation: scrollTriggerInstance.animation,
    markers: true,
    onEnter: () => {
      console.log('entered')
    },
    onLeave: () => {
      console.log('leaved')
    },
    onEnterBack: () => {
      console.log('entered back')
    },
    onLeaveBack: () => {
      console.log('leaved back')
    },
  })


});

onBeforeUnmount(() => {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
  }
});
</script>

<template>
  <div
    class="main-container relative w-screen min-h-screen flex flex-col items-center justify-between border-4 border-yellow-500">
    <div class="flex flex-col items-center justify-center mt-16 mb-8">
      <SubTitle class="mb-4" text="LAYER: CODE DIRECTIVES" simple />
      <Description simple
        content="This layer defines the logical instructions that govern execution flow, coordinating how processes activate, respond, and adapt." />
    </div>

    <!-- Diagonal Scroll elements -->
    <div class="border-4 border-white box-content w-full">
      <div id="langs-masked-container" class="h-[calc(100vh-200px)] px-[calc(50dvw)] w-full">
        <div id="langs-pinned-container" class="h-full w-fit border-4 border-blue-500">
          <div id="langs-shifting-container"
            class="relative w-[2000px] rotate-z-45 -mx-14 -my-14 h-full bg-gradient-to-r origin-[left_center] flex items-center justify-between">
            <!-- <span
              class="start-span h-40 w-40 flex items-center justify-center rounded-full border-white border-[1px] -rotate-z-45">
              lorem
            </span> -->
            <svg class="absolute inset-y-0 left-0" width="2001" height="500" viewBox="0 0 2001 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="77" cy="250.028" r="76.5" stroke="white" />
              <circle id="middle-span" cx="1000" cy="250.028" r="76.5" stroke="white" />
              <circle cx="1923" cy="250.028" r="76.5" stroke="white" />
              <path
                d="M130.659 194.578C216.101 68.3593 409.966 -97.5987 501.89 248.318C593.814 594.235 846.251 454.086 948.428 308.068"
                stroke="white" />
              <path
                d="M1047.1 186.829C1132.54 60.6107 1326.41 -105.347 1418.33 240.569C1510.25 586.486 1776.8 459.743 1878.98 313.725"
                stroke="white" />
            </svg>

            <!-- <span
              class="end-span flex items-center justify-center h-40 w-40 rounded-full border-white border-[1px] -rotate-z-45">
              ipsum
            </span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#langs-masked-container {
  mask-image: linear-gradient(180deg, transparent 0%, black 10%, black 90%, transparent 100%);
}

#langs-pinned-container {
  transform-style: preserve-3d;
}
</style>