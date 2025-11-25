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

const playTransition = () => {
  const sound = st.sounds['transition-1'].howl
  if(sound.playing()) sound.stop()
  sound.play()
}

const startAnimations = () => {
  const container = document.getElementById('stars-container');

  scrollTriggerInstance = ScrollTrigger.create({
    trigger: container,
    start: 'bottom bottom',
    end: '+=650%',
    pin: true,
    toggleActions: 'play reset reset reset',
    scrub: 1,
    anticipatePin: 1,
    pinSpacing: 'margin',
    onUpdate: (self) => {
      const progress = self.progress;
      
      // Animar las capas de estrellas
      gsap.to('.star-layer', {
        z: (index) => (index * -300) + (progress * 2250),
        duration: 0.1
      });

      // Animar los textos
      const text1Z = -250 + (progress * 2250);
      const text2Z = -866.67 + (progress * 2250);
      const text3Z = -1483.33 + (progress * 2250);
      const text4Z = -2100 + (progress * 2250);

      gsap.to('#text-1', {
        z: text1Z,
        duration: 0.1
      });

      gsap.to('#text-2', {
        z: text2Z,
        duration: 0.1
      });

      gsap.to('#text-3', {
        z: text3Z,
        duration: 0.1
      });

      gsap.to('#text-4', {
        z: text4Z,
        duration: 0.1
      });

      // Control de visibilidad para TEXTO 1
      if (text1Z > VISIBILITY_THRESHOLD && text1Z < INVISIBILITY_THRESHOLD) {
        if (!text1.value) {
          text1.value = true;
          playTransition()
          gsap.to('#text-1', {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      } else if (text1Z >= INVISIBILITY_THRESHOLD && text1.value) {
        text1.value = false;
        gsap.to('#text-1', {
          opacity: 0,
          duration: 0.5
        });
      } else if (text1Z <= VISIBILITY_THRESHOLD && text1.value) {
        text1.value = false;
        gsap.to('#text-1', {
          opacity: 0,
          duration: 0.5
        });
      }

      // Control de visibilidad para TEXTO 2
      if (text2Z > VISIBILITY_THRESHOLD && text2Z < INVISIBILITY_THRESHOLD) {
        if (!text2.value) {
          text2.value = true;
          playTransition();
          gsap.to('#text-2', {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      } else if (text2Z >= INVISIBILITY_THRESHOLD && text2.value) {
        text2.value = false;
        gsap.to('#text-2', {
          opacity: 0,
          duration: 0.5
        });
      } else if (text2Z <= VISIBILITY_THRESHOLD && text2.value) {
        text2.value = false;
        gsap.to('#text-2', {
          opacity: 0,
          duration: 0.5
        });
      }

      // Control de visibilidad para TEXTO 3
      if (text3Z > VISIBILITY_THRESHOLD && text3Z < INVISIBILITY_THRESHOLD) {
        if (!text3.value) {
          text3.value = true;
          playTransition();
          gsap.to('#text-3', {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      } else if (text3Z >= INVISIBILITY_THRESHOLD && text3.value) {
        text3.value = false;
        gsap.to('#text-3', {
          opacity: 0,
          duration: 0.5
        });
      } else if (text3Z <= VISIBILITY_THRESHOLD && text3.value) {
        text3.value = false;
        gsap.to('#text-3', {
          opacity: 0,
          duration: 0.5
        });
      }

      // Control de visibilidad para TEXTO 4
      if (text4Z > VISIBILITY_THRESHOLD && text4Z < INVISIBILITY_THRESHOLD) {
        if (!text4.value) {
          text4.value = true;
          playTransition();
          gsap.to('#text-4', {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      } else if (text4Z >= INVISIBILITY_THRESHOLD && text4.value) {
        text4.value = false;
        gsap.to('#text-4', {
          opacity: 0,
          duration: 0.5
        });
      } else if (text4Z <= VISIBILITY_THRESHOLD && text4.value) {
        text4.value = false;
        gsap.to('#text-4', {
          opacity: 0,
          duration: 0.5
        });
      }
    }
  });
};

const killAnimations = () => {
  // Matar el ScrollTrigger
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
    scrollTriggerInstance = null;
  }

  // Matar todas las animaciones GSAP activas
  gsap.killTweensOf('.star-layer');
  gsap.killTweensOf('#text-1');
  gsap.killTweensOf('#text-2');
  gsap.killTweensOf('#text-3');
  gsap.killTweensOf('#text-4');

  // Resetear estados
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
        style="transform: translateZ(-400px)">
        <div v-for="(star, i) in layer2Stars" :key="`l2-${i}`" class="star bg-ghost-100 rounded-full absolute" :style="{
          width: `${star.size}px`,
          height: `${star.size}px`,
          left: `${star.offsetX}%`,
          top: `${star.offsetY}%`
        }" />
      </div>

      <div class="star-layer absolute h-screen w-screen grid grid-rows-6 grid-cols-6"
        style="transform: translateZ(-800px)">
        <div v-for="(star, i) in layer3Stars" :key="`l3-${i}`" class="star bg-ghost-100 rounded-full absolute" :style="{
          width: `${star.size}px`,
          height: `${star.size}px`,
          left: `${star.offsetX}%`,
          top: `${star.offsetY}%`
        }" />
      </div>

      <div class="star-layer absolute h-screen w-screen grid grid-rows-6 grid-cols-6"
        style="transform: translateZ(-1200px)">
        <div v-for="(star, i) in layer4Stars" :key="`l4-${i}`" class="star bg-ghost-100 rounded-full absolute" :style="{
          width: `${star.size}px`,
          height: `${star.size}px`,
          left: `${star.offsetX}%`,
          top: `${star.offsetY}%`
        }" />
      </div>

      <div class="star-layer absolute h-screen w-screen grid grid-rows-6 grid-cols-6"
        style="transform: translateZ(-1600px)">
        <div v-for="(star, i) in layer5Stars" :key="`l5-${i}`" class="star bg-ghost-100 rounded-full absolute" :style="{
          width: `${star.size}px`,
          height: `${star.size}px`,
          left: `${star.offsetX}%`,
          top: `${star.offsetY}%`
        }" />
      </div>

      <div class="star-layer absolute h-screen w-screen grid grid-rows-6 grid-cols-6"
        style="transform: translateZ(-2000px)">
        <div v-for="(star, i) in layer6Stars" :key="`l6-${i}`" class="star bg-ghost-100 rounded-full absolute" :style="{
          width: `${star.size}px`,
          height: `${star.size}px`,
          left: `${star.offsetX}%`,
          top: `${star.offsetY}%`
        }" />
      </div>

      <div class="star-layer absolute h-screen w-screen grid grid-rows-6 grid-cols-6"
        style="transform: translateZ(-2400px)">
        <div v-for="(star, i) in layer7Stars" :key="`l6-${i}`" class="star bg-ghost-100 rounded-full absolute" :style="{
          width: `${star.size}px`,
          height: `${star.size}px`,
          left: `${star.offsetX}%`,
          top: `${star.offsetY}%`
        }" />
      </div>

      <div class="star-layer absolute h-screen w-screen grid grid-rows-6 grid-cols-6"
        style="transform: translateZ(-2800px)">
        <div v-for="(star, i) in layer8Stars" :key="`l6-${i}`" class="star bg-ghost-100 rounded-full absolute" :style="{
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
        style="transform: translateZ(-975px); opacity: 0;">
        {{ $t('Across multiple learning cycles, D-095 displays a persistent expansion of technical range, integrating new tools with unusual efficiency. His reliance on generative AI functions as an auxiliary processor, accelerating comprehension and solution-building. Evaluators note his ability to convert complex systems into clear, accessible explanations that strengthen team alignment.') }}
      </p>

      <p id="text-3" 
        class="absolute text-center text-xl font-display text-ghost-100 w-[500px] leading-tight"
        style="transform: translateZ(-1700px); opacity: 0;">
        {{ $t('Behavioral scans show that D-095 operates from a stable ethical lattice grounded in humility, respect, and tolerance. He engages proactively in communication loops, ensuring shared clarity of objectives and reducing operational drift. Analysts report that this consistent initiative enhances cohesion, positioning him as both a dependable technician and a stabilizing presence within collaborative units.') }}
      </p>

      <p id="text-4" 
        class="absolute text-center text-xl font-display text-ghost-100 w-[500px] leading-tight"
        style="transform: translateZ(-2275px); opacity: 0;">
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