<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SubTitle from './SubTitle.vue';

gsap.registerPlugin(ScrollTrigger);

const generateStarData = (count: number) => {
  return Array.from({ length: count }, () => ({
    size: Math.floor(Math.random() * 3) + 1,
    offsetX: (Math.random() - 0.5) * 80,
    offsetY: (Math.random() - 0.5) * 80
  }));
};

const layer1Stars = ref(generateStarData(64));
const layer2Stars = ref(generateStarData(64));
const layer3Stars = ref(generateStarData(64));
const layer4Stars = ref(generateStarData(64));

onMounted(() => {
  const container = document.getElementById('stars-container');

  ScrollTrigger.create({
    trigger: container,
    start: 'bottom bottom',
    end: '+=400%',
    pin: true,
    scrub: 1,
    anticipatePin: 1,
    onUpdate: (self) => {
      const progress = self.progress;
      gsap.to('.star-layer', {
        z: (index) => (index * -300) + (progress * 6000),
        duration: 0.1
      });
    }
  });
});
</script>

<template>
  <div class="w-screen flex flex-col items-center justify-center">
    <SubTitle text="MODULE: OPERATIONAL PHILOSOPHY" class="mt-36 mb-16"/>
    <div 
      id="stars-container" 
      class="relative h-screen w-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-0% from-transparent to-40% to-shadow-100"
    >
      <!-- Capa 1 - Más cercana -->
      <div class="star-layer absolute h-screen w-screen grid grid-rows-8 grid-cols-8" style="transform: translateZ(0px)">
        <div 
          v-for="(star, i) in layer1Stars"
          :key="`l1-${i}`"
          class="star bg-ghost-100 self-center justify-self-center rounded-full relative"
          :style="{
            width: `${star.size}px`,
            height: `${star.size}px`,
            transform: `translate(${star.offsetX}%, ${star.offsetY}%)`
          }"
        />
      </div>
      
      <!-- Capa 2 -->
      <div class="star-layer absolute h-screen w-screen grid grid-rows-8 grid-cols-8" style="transform: translateZ(-300px)">
        <div 
          v-for="(star, i) in layer2Stars"
          :key="`l2-${i}`"
          class="star bg-ghost-100/80 self-center justify-self-center rounded-full relative"
          :style="{
            width: `${star.size}px`,
            height: `${star.size}px`,
            transform: `translate(${star.offsetX}%, ${star.offsetY}%)`
          }"
        />
      </div>
      
      <!-- Capa 3 -->
      <div class="star-layer absolute h-screen w-screen grid grid-rows-8 grid-cols-8" style="transform: translateZ(-600px)">
        <div 
          v-for="(star, i) in layer3Stars"
          :key="`l3-${i}`"
          class="star bg-ghost-100/60 self-center justify-self-center rounded-full relative"
          :style="{
            width: `${star.size}px`,
            height: `${star.size}px`,
            transform: `translate(${star.offsetX}%, ${star.offsetY}%)`
          }"
        />
      </div>
      
      <!-- Capa 4 - Más lejana -->
      <div class="star-layer absolute h-screen w-screen grid grid-rows-8 grid-cols-8" style="transform: translateZ(-900px)">
        <div 
          v-for="(star, i) in layer4Stars"
          :key="`l4-${i}`"
          class="star bg-ghost-100/40 self-center justify-self-center rounded-full relative"
          :style="{
            width: `${star.size}px`,
            height: `${star.size}px`,
            transform: `translate(${star.offsetX}%, ${star.offsetY}%)`
          }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
#stars-container {
  perspective: 600px;
  transform-style: preserve-3d;
}

.star-layer {
  transform-style: preserve-3d;
}

.star {
  filter: drop-shadow(0 0 3px white)
}
</style>