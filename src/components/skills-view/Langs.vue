<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, useTemplateRef } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SubTitle from '../SubTitle.vue';
import Description from '../Description.vue';
import { projectHeight } from '../../utils';
import CSVGFragment from './LangSVGs/CSVGFragment.vue';
import SQLSVGFragment from './LangSVGs/SQLSVGFragment.vue';
import JavaSVGFragment from './LangSVGs/JavaSVGFragment.vue';
import CSharpSVGFragment from './LangSVGs/CSharpSVGFragment.vue';
import JSSVGFragment from './LangSVGs/JSSVGFragment.vue';

gsap.registerPlugin(ScrollTrigger);

let scrollTriggerInstance: ScrollTrigger | null = null;
const containerAnimation = ref<gsap.core.Animation | null>(null)
const pinnedContainer = useTemplateRef<HTMLDivElement | null>('langs-pinned-container')

onMounted(() => {
  const mainContainer = document.querySelector('.main-container') as HTMLElement;
  const shiftingContainer = document.querySelector('#langs-shifting-container') as HTMLElement;

  if (!mainContainer || !shiftingContainer) return;

  const distanceInContainer = (projectHeight(shiftingContainer.offsetWidth)) - 320;

  const diagonalX = - distanceInContainer;
  const diagonalY = - distanceInContainer;

  const scrollDistance = distanceInContainer * 1.5;

  // Crear la animación con ScrollTrigger
  scrollTriggerInstance = ScrollTrigger.create({
    trigger: mainContainer,
    pin: mainContainer,
    start: 'top top-=32px',
    end: `+=${scrollDistance}`,
    scrub: 1,
    anticipatePin: 1,
    pinSpacing: 'margin',
    animation: gsap.to(shiftingContainer, {
      x: diagonalX,
      y: diagonalY,
      ease: 'none'
    })
  });


  containerAnimation.value = scrollTriggerInstance.animation || null

  gsap.to("#motion-circle", {
    motionPath: {
      path: "#motion-path",
      alignOrigin: [0, 0],
      autoRotate: true,
      start: 0,
      end: 1
    },
    scrollTrigger: {
      trigger: mainContainer,
      start: 'top top-=32px',
      end: `+=${scrollDistance}`,
      scrub: true
    },
    ease: 'none',
    transformOrigin: "center center",
    rotateY: 9000,
  });
});

onBeforeUnmount(() => {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
  }
});
</script>

<template>
  <div
    class="main-container relative w-screen min-h-screen flex flex-col items-center justify-between  border-yellow-500">
    <div class="flex flex-col items-center justify-center mt-16 mb-8">
      <SubTitle class="mb-4" text="LAYER: CODE DIRECTIVES" simple />
      <Description simple withSounds
        content="This layer defines the logical instructions that govern execution flow, coordinating how processes activate, respond, and adapt." />
    </div>

    <!-- Diagonal Scroll elements -->
    <div class=" border-white box-content w-full">
      <div id="langs-masked-container" class="h-[calc(100vh-200px)] px-[calc(50dvw)] w-full">
        <div ref="langs-pinned-container" class="h-full w-fit ">
          <div id="langs-shifting-container"
            class="relative w-[4152px] rotate-z-45  h-full bg-gradient-to-r origin-[left_center] flex items-center justify-between">
            <!-- SVG SVG SVG -->
            <svg class="-rotate-z-45 -mx-56" width="4152" height="3290" viewBox="0 0 3290 3290" fill="none"
              xmlns="http://www.w3.org/2000/svg">

              <!-- motion path -->
              <path id="motion-path"
                d="M 30.5448 -65.5434 C 116.4795 -192.2542 311.1807 -359.0486 402.5141 -12.5415 C 493.8476 333.9655 761.2598 206.3865 864.0137 59.7919 C 870.0135 51.5294 921.4683 -15.3601 953.8658 -65.3122 C 1039.7976 -192.0215 1234.3369 -358.7573 1325.6745 -12.253 C 1417.0045 334.2576 1684.3615 206.7945 1787.1112 60.2042 C 1803.6504 37.6263 1844.4081 -19.1261 1875.5632 -66.3184 C 1961.4979 -193.0249 2156.1997 -359.8243 2247.5297 -13.3137 C 2338.8666 333.1898 2606.1601 205.4227 2708.9168 58.8253 C 2734.0616 24.064 2786.7834 -49.7721 2797.6517 -67.669 C 2883.9611 -194.7502 3079.1579 -361.9174 3170.0424 -14.9613 C 3260.9339 331.9877 3529.09 203.6408 3632.2781 56.6121"
                stroke="transparent" />

              <!-- lang svg fragments -->
              <!-- Esto es demasiado tedioso de hacer -->
              <CSVGFragment :pinned-container="pinnedContainer" :container-animation="containerAnimation" />
              <SQLSVGFragment :pinned-container="pinnedContainer" :container-animation="containerAnimation" />
              <JavaSVGFragment :pinned-container="pinnedContainer" :container-animation="containerAnimation" />
              <CSharpSVGFragment :pinned-container="pinnedContainer" :container-animation="containerAnimation" />
              <JSSVGFragment :pinned-container="pinnedContainer" :container-animation="containerAnimation" />

              <!-- Curved Connectors -->
              <path
                d="M414.427 324.563C564.79 295.73 820.406 315.463 639.971 625.063C459.536 934.663 738.929 1033.52 915.245 1002.52"
                stroke="var(--color-shadow-500)" />
              <path
                d="M1066.99 977.539C1217.35 948.705 1472.97 968.439 1292.54 1278.04C1112.1 1587.64 1391.49 1686.5 1567.81 1655.5"
                stroke="var(--color-shadow-500)" />
              <path
                d="M1719.41 1628.41C1869.77 1599.58 2125.39 1619.31 1944.95 1928.91C1764.52 2238.51 2043.91 2337.37 2220.23 2306.37"
                stroke="var(--color-shadow-500)" />
              <path
                d="M2371.96 2279.84C2522.85 2251.01 2779.36 2270.74 2598.3 2580.34C2417.23 2889.94 2697.6 2988.8 2874.53 2957.8"
                stroke="var(--color-shadow-500)" />

              <defs>
                <clipPath id="clip0_2084_108">
                  <rect width="104" height="104" fill="white" transform="translate(939.68 939.138)" />
                </clipPath>
                <clipPath id="clip1_2084_108">
                  <rect width="32" height="32" fill="white" transform="translate(836.408 833.177)" />
                </clipPath>
                <clipPath id="clip2_2084_108">
                  <rect width="38" height="38" fill="white" transform="translate(1110.41 1106.03)" />
                </clipPath>
                <clipPath id="clip3_2084_108">
                  <rect width="31" height="31" fill="white" transform="translate(1486.91 1482.45)" />
                </clipPath>
                <clipPath id="clip4_2084_108">
                  <rect width="32" height="32" fill="white" transform="translate(2137.41 2131.59)" />
                </clipPath>
                <clipPath id="clip5_2084_108">
                  <rect width="31" height="31" fill="white" transform="translate(2454 2419.11) rotate(90)" />
                </clipPath>
                <clipPath id="clip6_2084_108">
                  <rect width="45" height="44" fill="white" transform="translate(3138 2917.59)" />
                </clipPath>
                <clipPath id="clip7_2084_108">
                  <rect width="33" height="36" fill="white" transform="translate(3081.91 2771.87)" />
                </clipPath>
                <clipPath id="clip8_2084_108">
                  <rect width="33" height="33" fill="white" transform="translate(3080.66 3076.43)" />
                </clipPath>
              </defs>
            </svg>

            <div id="motion-circle" class="absolute h-8 w-8 rounded-full border-[1px] border-shadow-500 transform-3d -z-10">
            </div>

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