<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SubTitle from '../SubTitle.vue';
import { useTranslation } from 'i18next-vue';
import { useSoundStore } from '../../stores/useSoundStore';

gsap.registerPlugin(ScrollTrigger);

const generateStarData = (count: number) => {
  return Array.from({ length: count }, () => ({
    size: Math.floor(Math.random() * 3) + 1,
    offsetX: Math.random() * 100,
    offsetY: Math.random() * 100
  }));
};

const layer1Stars = ref(generateStarData(36));
const layer2Stars = ref(generateStarData(36));
const layer3Stars = ref(generateStarData(36));
const layer4Stars = ref(generateStarData(36));
const layer5Stars = ref(generateStarData(36));
const layer6Stars = ref(generateStarData(36));
const layer7Stars = ref(generateStarData(36));
const layer8Stars = ref(generateStarData(36));

const text1 = ref(false);
const text2 = ref(false);
const text3 = ref(false);
const text4 = ref(false);

const { i18next } = useTranslation()
const st = useSoundStore()

const VISIBILITY_THRESHOLD = -250;
const INVISIBILITY_THRESHOLD = 350;

let scrollTriggerInstance: ScrollTrigger | null = null;
let mainTimeline: gsap.core.Timeline | null = null;

const playTransition = () => {
  const sound = st.sounds['transition-1'].howl
  if(sound.playing()) sound.stop()
  sound.play()
}

const checkTextVisibility = (textZ: number, textRef: any, textId: string) => {
  if (textZ > VISIBILITY_THRESHOLD && textZ < INVISIBILITY_THRESHOLD) {
    if (!textRef.value) {
      textRef.value = true;
      playTransition();
      gsap.to(textId, {
        autoAlpha: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  } else if ((textZ >= INVISIBILITY_THRESHOLD || textZ <= VISIBILITY_THRESHOLD) && textRef.value) {
    textRef.value = false;
    gsap.to(textId, {
      autoAlpha: 0,
      duration: 0.5
    });
  }
};

const startAnimations = () => {
  const container = document.getElementById('stars-container');

  mainTimeline = gsap.timeline({
    paused: true
  });

  const starLayers = gsap.utils.toArray('.star-layer');
  starLayers.forEach((layer: any, index: number) => {
    const startZ = index * -300;
    const endZ = startZ + 2250;
    
    mainTimeline!.fromTo(layer, 
      { z: startZ },
      { z: endZ, ease: 'none' },
      0
    );
  });

  const textConfigs = [
    { id: '#text-1', startZ: -250 },
    { id: '#text-2', startZ: -866.67 },
    { id: '#text-3', startZ: -1483.33 },
    { id: '#text-4', startZ: -2100 }
  ];

  textConfigs.forEach(config => {
    const endZ = config.startZ + 2250;
    mainTimeline!.fromTo(config.id,
      { z: config.startZ },
      { z: endZ, ease: 'none' },
      0
    );
  });

  // ScrollTrigger que controla la timeline
  scrollTriggerInstance = ScrollTrigger.create({
    trigger: container,
    start: 'bottom bottom',
    end: '+=650%',
    pin: true,
    scrub: 1,
    anticipatePin: 1,
    pinSpacing: 'margin',
    animation: mainTimeline,
    onUpdate: (self) => {
      const progress = self.progress;

      const text1Z = -250 + (progress * 2250);
      const text2Z = -866.67 + (progress * 2250);
      const text3Z = -1483.33 + (progress * 2250);
      const text4Z = -2100 + (progress * 2250);

      checkTextVisibility(text1Z, text1, '#text-1');
      checkTextVisibility(text2Z, text2, '#text-2');
      checkTextVisibility(text3Z, text3, '#text-3');
      checkTextVisibility(text4Z, text4, '#text-4');
    }
  });
};

const killAnimations = () => {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
    scrollTriggerInstance = null;
  }

  if (mainTimeline) {
    mainTimeline.kill();
    mainTimeline = null;
  }

  gsap.killTweensOf('#text-1');
  gsap.killTweensOf('#text-2');
  gsap.killTweensOf('#text-3');
  gsap.killTweensOf('#text-4');

  text1.value = false;
  text2.value = false;
  text3.value = false;
  text4.value = false;

  st.sounds['transition-1'].howl.stop()
};

onMounted(() => {
  startAnimations();

  i18next.on('languageChanged', async () => {
    killAnimations()
    await nextTick()
    startAnimations()
  })
});

onBeforeUnmount(() => {
  killAnimations();
});
</script>

<template>
  <div class="w-screen flex flex-col items-center justify-center">
    <SubTitle text="MODULE: OPERATIONAL PHILOSOPHY" class="mt-36 mb-16" />
    <div id="stars-container"
      class="relative h-screen w-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-0% from-transparent via-50% via-shadow-100 to-transparent to-100%">

      <!-- Capas de estrellas -->
      <div class="star-layer absolute h-screen w-screen grid grid-rows-8 grid-cols-8"
        style="transform: translateZ(0px)">
        <div v-for="(star, i) in layer1Stars" :key="`l1-${i}`" class="star bg-ghost-100 rounded-full absolute" :style="{
          width: `${star.size}px`,
          height: `${star.size}px`,
          left: `${star.offsetX}%`,
          top: `${star.offsetY}%`
        }" />
      </div>

      <div class="star-layer absolute h-screen w-screen grid grid-rows-6 grid-cols-6"
        style="transform: translateZ(-300px)">
        <div v-for="(star, i) in layer2Stars" :key="`l2-${i}`" class="star bg-ghost-100 rounded-full absolute" :style="{
          width: `${star.size}px`,
          height: `${star.size}px`,
          left: `${star.offsetX}%`,
          top: `${star.offsetY}%`
        }" />
      </div>

      <div class="star-layer absolute h-screen w-screen grid grid-rows-6 grid-cols-6"
        style="transform: translateZ(-600px)">
        <div v-for="(star, i) in layer3Stars" :key="`l3-${i}`" class="star bg-ghost-100 rounded-full absolute" :style="{
          width: `${star.size}px`,
          height: `${star.size}px`,
          left: `${star.offsetX}%`,
          top: `${star.offsetY}%`
        }" />
      </div>

      <div class="star-layer absolute h-screen w-screen grid grid-rows-6 grid-cols-6"
        style="transform: translateZ(-900px)">
        <div v-for="(star, i) in layer4Stars" :key="`l4-${i}`" class="star bg-ghost-100 rounded-full absolute" :style="{
          width: `${star.size}px`,
          height: `${star.size}px`,
          left: `${star.offsetX}%`,
          top: `${star.offsetY}%`
        }" />
      </div>

      <div class="star-layer absolute h-screen w-screen grid grid-rows-6 grid-cols-6"
        style="transform: translateZ(-1200px)">
        <div v-for="(star, i) in layer5Stars" :key="`l5-${i}`" class="star bg-ghost-100 rounded-full absolute" :style="{
          width: `${star.size}px`,
          height: `${star.size}px`,
          left: `${star.offsetX}%`,
          top: `${star.offsetY}%`
        }" />
      </div>

      <div class="star-layer absolute h-screen w-screen grid grid-rows-6 grid-cols-6"
        style="transform: translateZ(-1500px)">
        <div v-for="(star, i) in layer6Stars" :key="`l6-${i}`" class="star bg-ghost-100 rounded-full absolute" :style="{
          width: `${star.size}px`,
          height: `${star.size}px`,
          left: `${star.offsetX}%`,
          top: `${star.offsetY}%`
        }" />
      </div>

      <div class="star-layer absolute h-screen w-screen grid grid-rows-6 grid-cols-6"
        style="transform: translateZ(-1800px)">
        <div v-for="(star, i) in layer7Stars" :key="`l7-${i}`" class="star bg-ghost-100 rounded-full absolute" :style="{
          width: `${star.size}px`,
          height: `${star.size}px`,
          left: `${star.offsetX}%`,
          top: `${star.offsetY}%`
        }" />
      </div>

      <div class="star-layer absolute h-screen w-screen grid grid-rows-6 grid-cols-6"
        style="transform: translateZ(-2100px)">
        <div v-for="(star, i) in layer8Stars" :key="`l8-${i}`" class="star bg-ghost-100 rounded-full absolute" :style="{
          width: `${star.size}px`,
          height: `${star.size}px`,
          left: `${star.offsetX}%`,
          top: `${star.offsetY}%`
        }" />
      </div>

      <!-- Textos parallax -->
      <p id="text-1" 
        class="absolute text-center text-xl font-display text-ghost-100 w-[500px] leading-tight"
        style="transform: translateZ(-250px); opacity: 0;">
        {{ $t('In current operational records, D-095 is identified as an engineer driven by disciplined curiosity and affinity for well-structured workflows. Though accustomed to defined roles, he demonstrates notable adaptability, calibrating his methods under high-pressure conditions while preserving strong standards of code quality whenever mission timing allows.') }}
      </p>

      <p id="text-2" 
        class="absolute text-center text-xl font-display text-ghost-100 w-[500px] leading-tight"
        style="transform: translateZ(-866.67px); opacity: 0;">
        {{ $t('Across multiple learning cycles, D-095 displays a persistent expansion of technical range, integrating new tools with unusual efficiency. His reliance on generative AI functions as an auxiliary processor, accelerating comprehension and solution-building. Evaluators note his ability to convert complex systems into clear, accessible explanations that strengthen team alignment.') }}
      </p>

      <p id="text-3" 
        class="absolute text-center text-xl font-display text-ghost-100 w-[500px] leading-tight"
        style="transform: translateZ(-1483.33px); opacity: 0;">
        {{ $t('Behavioral scans show that D-095 operates from a stable ethical lattice grounded in humility, respect, and tolerance. He engages proactively in communication loops, ensuring shared clarity of objectives and reducing operational drift. Analysts report that this consistent initiative enhances cohesion, positioning him as both a dependable technician and a stabilizing presence within collaborative units.') }}
      </p>

      <p id="text-4" 
        class="absolute text-center text-xl font-display text-ghost-100 w-[500px] leading-tight"
        style="transform: translateZ(-2100px); opacity: 0;">
        {{ $t('Conclusion: Long-term projections indicate that D-095 will continue refining his methodologies, merging disciplined structure with adaptive insight. His trajectory suggests a constant upward drift in capability, driven by curiosity, ethical stability, and a sustained commitment to elevating every system he becomes part of.') }}
      </p>
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
</style>