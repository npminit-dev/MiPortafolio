<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import gsap from "gsap";
import { onMounted, ref } from "vue";

type Props = {
  height?: number;
};

type Temp = {
  id: number;
  top: string;
  left: string;
  size: string;
};

const { height = 1180 } = defineProps<Props>();
const { width } = useWindowSize();
let tl: gsap.core.Timeline | null = null;
const stars = ref<Array<Temp>>([]);

// Cantidad total de estrellas
const TOTAL_STARS = width.value >= 768 ? 300 : 100;

onMounted(() => {
  const temp = [];

  for (let i = 0; i < TOTAL_STARS; i++) {
    const r = Math.random();
    const top = Math.pow(r, 0.4) * 100;
    const left = Math.random() * 100;
    const size = Math.random() < 0.7 ? 1 : Math.random() < 0.5 ? 2 : 3;

    temp.push({
      id: i,
      top: `${top}%`,
      left: `${left}%`,
      size: `${size}px`,
    });
  }

  stars.value = temp;

  function hideDots() {
    gsap.to([".first-dots", ".second-dots", ".third-dots"], {
      autoAlpha: 0,
      duration: 0.5,
    });
  }

  function showDots() {
    gsap.to([".first-dots", ".second-dots", ".third-dots"], {
      autoAlpha: 1,
      duration: 0.5,
    });
  }

  gsap.set(".first-dots", { autoAlpha: 0 });
  gsap.set(".second-dots", { autoAlpha: 0 });
  gsap.set(".third-dots", { autoAlpha: 0 });

  tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#convergent-dots-container",
      start: "top bottom-=100px",
      end: "bottom top",
      scrub: true,
      onEnter: showDots,
      onLeave: hideDots,
      onEnterBack: showDots,
      onLeaveBack: hideDots,
    },
  });

  // puntos
  tl.fromTo(
    ".first-dots",
    {
      autoAlpha: 1,
    },
    {
      motionPath: {
        path: "#path-1",
        align: "#path-1",
        start: 0,
        end: 1,
      },
      filter:
        width.value >= 768
          ? "drop-shadow(0px 0px 10px #ffffff) drop-shadow(0px 0px 10px #ffffff)"
          : "none",
      stagger: -0.1,
      duration: 6,
    },
    0
  )

    .fromTo(
      ".second-dots",
      {
        autoAlpha: 1,
      },
      {
        motionPath: {
          path: "#path-2",
          align: "#path-2",
          start: 0,
          end: 1,
        },
        filter:
          width.value >= 768
            ? "drop-shadow(0px 0px 10px #ffffff) drop-shadow(0px 0px 10px #ffffff)"
            : "none",
        stagger: 0.1,
        duration: 6,
      },
      0
    )

    .fromTo(
      ".third-dots",
      {
        autoAlpha: 1,
      },
      {
        motionPath: {
          path: "#path-3",
          align: "#path-3",
          start: 0,
          end: 1,
        },
        filter:
          width.value >= 768
            ? "drop-shadow(0px 0px 10px #ffffff) drop-shadow(0px 0px 10px #ffffff)"
            : "none",
        stagger: 0.1,
        duration: 6,
      },
      0
    )

    // estrellas
    .fromTo(
      "#stars-container",
      {
        translateY: 0,
      },
      {
        translateY: "-25%",
        duration: 6,
      },
      2
    );
});
</script>

<template>
  <div
    id="convergent-dots-container"
    class="w-dvw relative flex items-center justify-center -mt-2 overflow-visible"
  >
    <svg width="675" :height viewBox="0 0 675 1180" fill="none">
      <path
        d="M321.71 4.14156C403.93 76.7261 519.038 270.717 321.71 466.001C124.381 661.286 331.987 797.949 460.456 841.869C560.019 880.704 676.284 1001.93 344.834 1176.13"
        stroke="transparent"
        id="path-1"
      />
      <path
        d="M664.721 4.14156C515.055 30.9563 182.4 137.309 215.723 341.174C254.263 576.959 576.078 457.68 398.791 687.916C275.895 847.517 330.702 1085.98 337.126 1174.74"
        stroke="transparent"
        id="path-2"
      />
      <path
        d="M10.6709 4.0704C169.831 47.4858 487.715 187.984 485.97 402.655C483.79 670.994 294.504 685.84 191.633 736.902C128.406 768.287 -61.2779 926.779 320.269 1173.15"
        stroke="transparent"
        id="path-3"
      />
    </svg>

    <div class="first-dots h-1 w-1 absolute bg-ghost-300 rounded-full"></div>
    <div class="first-dots h-[6px] w-[6px] absolute bg-ghost-300 rounded-full"></div>
    <div class="first-dots h-1 w-1 absolute bg-ghost-300 rounded-full"></div>
    <div class="first-dots h-1 w-1 absolute bg-ghost-300 rounded-full"></div>
    <div class="first-dots h-1 w-1 absolute bg-ghost-300 rounded-full"></div>
    <div class="first-dots h-[6px] w-[6px] absolute bg-ghost-300 rounded-full"></div>
    <div class="first-dots h-2 w-2 absolute bg-ghost-300 rounded-full"></div>
    <div class="first-dots h-[6px] w-[6px] absolute bg-ghost-300 rounded-full"></div>
    <div class="first-dots h-1 w-1 absolute bg-ghost-300 rounded-full"></div>
    <div class="first-dots h-[6px] w-[6px] absolute bg-ghost-300 rounded-full"></div>
    <div class="first-dots h-2 w-2 absolute bg-ghost-300 rounded-full"></div>
    <div class="first-dots h-[6px] w-[6px] absolute bg-ghost-300 rounded-full"></div>
    <div class="first-dots h-1 w-1 absolute bg-ghost-300 rounded-full"></div>
    <div class="first-dots h-1 w-1 absolute bg-ghost-300 rounded-full"></div>
    <div class="first-dots h-[6px] w-[6px] absolute bg-ghost-300 rounded-full"></div>
    <div class="first-dots h-1 w-1 absolute bg-ghost-300 rounded-full"></div>

    <div class="second-dots h-1 w-1 absolute bg-ghost-300 rounded-full"></div>
    <div class="second-dots h-1 w-1 absolute bg-ghost-300 rounded-full"></div>
    <div class="second-dots h-1 w-1 absolute bg-ghost-300 rounded-full"></div>
    <div class="second-dots h-[6px] w-[6px] absolute bg-ghost-300 rounded-full"></div>
    <div class="second-dots h-1 w-1 absolute bg-ghost-300 rounded-full"></div>
    <div class="second-dots h-1 w-1 absolute bg-ghost-300 rounded-full"></div>
    <div class="second-dots h-[6px] w-[6px] absolute bg-ghost-300 rounded-full"></div>
    <div class="second-dots h-2 w-2 absolute bg-ghost-300 rounded-full"></div>
    <div class="second-dots h-[6px] w-[6px] absolute bg-ghost-300 rounded-full"></div>
    <div class="second-dots h-1 w-1 absolute bg-ghost-300 rounded-full"></div>
    <div class="second-dots h-1 w-1 absolute bg-ghost-300 rounded-full"></div>
    <div class="second-dots h-[6px] w-[6px] absolute bg-ghost-300 rounded-full"></div>
    <div class="second-dots h-1 w-1 absolute bg-ghost-300 rounded-full"></div>
    <div class="second-dots h-1 w-1 absolute bg-ghost-300 rounded-full"></div>
    <div class="second-dots h-1 w-1 absolute bg-ghost-300 rounded-full"></div>
    <div class="second-dots h-[6px] w-[6px] absolute bg-ghost-300 rounded-full"></div>

    <div class="third-dots h-1 w-1 absolute bg-ghost-300 rounded-full"></div>
    <div class="third-dots h-[6px] w-[6px] absolute bg-ghost-300 rounded-full"></div>
    <div class="third-dots h-1 w-1 absolute bg-ghost-300 rounded-full"></div>
    <div class="third-dots h-[6px] w-[6px] absolute bg-ghost-300 rounded-full"></div>
    <div class="third-dots h-2 w-2 absolute bg-ghost-300 rounded-full"></div>
    <div class="third-dots h-[6px] w-[6px] absolute bg-ghost-300 rounded-full"></div>
    <div class="third-dots h-1 w-1 absolute bg-ghost-300 rounded-full"></div>
    <div class="third-dots h-1 w-1 absolute bg-ghost-300 rounded-full"></div>
    <div class="third-dots h-[6px] w-[6px] absolute bg-ghost-300 rounded-full"></div>
    <div class="third-dots h-1 w-1 absolute bg-ghost-300 rounded-full"></div>
    <div class="third-dots h-1 w-1 absolute bg-ghost-300 rounded-full"></div>
    <div class="third-dots h-1 w-1 absolute bg-ghost-300 rounded-full"></div>
    <div class="third-dots h-[6px] w-[6px] absolute bg-ghost-300 rounded-full"></div>
    <div class="third-dots h-2 w-2 absolute bg-ghost-300 rounded-full"></div>
    <div class="third-dots h-[6px] w-[6px] absolute bg-ghost-300 rounded-full"></div>
    <div class="third-dots h-1 w-1 absolute bg-ghost-300 rounded-full"></div>

    <div
      id="stars-container"
      class="absolute px-8 h-full w-full inset-x-0 -bottom-1/4 overflow-visible"
    >
      <div
        v-for="star in stars"
        :key="star.id"
        class="absolute rounded-full bg-ghost-300"
        :style="{
          top: star.top,
          left: star.left,
          width: star.size,
          height: star.size,
        }"
      ></div>
    </div>
  </div>
</template>

<style scoped></style>
