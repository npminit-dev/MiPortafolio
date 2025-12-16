<script setup lang="ts">
import gsap from "gsap";
import { onMounted, onBeforeUnmount, nextTick } from "vue";
import { SplitText } from "gsap/all";
import { useTranslation } from "i18next-vue";
import { useSoundStore } from "../stores/useSoundStore";
import { useWindowSize } from "@vueuse/core";

interface Props {
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  descriptionWidth?: string;
  spinningImage?: string;
  imageSize?: number;
  imageOpacity?: number;
}

const props = withDefaults(defineProps<Props>(), {
  descriptionWidth: "500px",
  spinningImage: "/image/dashed-circle-hd.png",
  imageSize: 1000,
  imageOpacity: 30,
});

const { i18next } = useTranslation();
const st = useSoundStore();
const { width } = useWindowSize();

let titleText: SplitText | null = null;
let logText: SplitText | null = null;
let pText: SplitText | null = null;
let tl: gsap.core.Timeline | null = null;

async function startAnimation() {
  titleText = new SplitText("#animated-title", { type: "chars" });
  logText = new SplitText("#animated-subtitle", { type: "chars" });
  pText = new SplitText("#animated-description", { type: "chars, lines" });
  const circle = document.getElementById("rotating-circle");

  tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#maintitle-container",
      start: () => "top bottom",
      end: () => "bottom top",
      toggleActions: "play pause play pause",
      onLeave: () => {
        st.sounds["loading-1"].howl.pause();
      },
      onLeaveBack: () => {
        st.sounds["loading-1"].howl.pause();
      },
    },
  });

  tl.set([titleText.chars, logText.chars, pText.chars], { opacity: 0 });

  // Circulo
  tl.to(
    circle,
    {
      rotateZ: 360,
      repeat: -1,
      duration: 160,
      ease: "linear",
    },
    0
  );

  // Título
  tl.fromTo(
    titleText.chars,
    { opacity: 1 },
    {
      stagger: 0.05,
      duration: 0.1,
      textShadow: width.value >= 640 ? "0 0 20px rgba(255, 255, 255, 0.3)" : "none",
      onStart: function () {
        gsap.set("#animated-title", { opacity: 1 });
        st.play(st.sounds["loading-1"]);
      },
      onComplete: function () {
        st.sounds["loading-1"].howl.stop();
      },
    },
    0.5
  );

  // Subtitle
  tl.fromTo(
    logText.chars,
    { opacity: 1 },
    {
      stagger: 0.01,
      duration: 0.1,
      textShadow: width.value >= 640 ? "0 0 20px rgba(255, 255, 255, 0.3)" : "none",
      onStart: function () {
        gsap.set("#animated-subtitle", { opacity: 1 });
        st.play(st.sounds["loading-1"]);
      },
      onComplete: function () {
        st.sounds["loading-1"].howl.stop();
      },
    },
    ">.5"
  );

  // Description
  tl.fromTo(
    pText.chars,
    { opacity: 1 },
    {
      stagger: 0.004,
      duration: 0.1,
      textShadow: width.value >= 640 ? "0 0 20px rgba(255, 255, 255, 0.3)" : "none",
      onStart: function () {
        st.play(st.sounds["loading-1"]);
        gsap.set("#animated-description", { opacity: 1 });
      },
      onComplete: function () {
        st.sounds["loading-1"].howl.stop();
      },
    },
    ">.5"
  );
}

function killAnimation() {
  if (tl) {
    tl.scrollTrigger?.kill();
    tl.kill();
    tl = null;
  }

  if (st.sounds["loading-1"]?.howl) {
    st.sounds["loading-1"].howl.stop();
  }

  titleText?.revert();
  pText?.revert();
  logText?.revert();
}

onMounted(async function () {
  await document.fonts.ready;
  startAnimation();
  i18next.on("languageChanged", handleLanguageChange);
});

onBeforeUnmount(function () {
  i18next.off("languageChanged", handleLanguageChange);
  killAnimation();
  st.clearFXs();
});

async function handleLanguageChange() {
  st.clearFXs();
  killAnimation();
  await nextTick();
  await nextTick();
  await nextTick();
  startAnimation();
}
</script>

<template>
  <div
    id="maintitle-container"
    class="relative h-[100dvh] w-[100dvw] grid grid-cols-1 md:grid-cols-[40%_60%]"
  >
    <!-- Slot para componentes SVG animados (como Body) -->
    <slot name="animated-body" class="absolute inset-0 md:static" />

    <div
      class="relative flex flex-col items-center md:items-start justify-center mr-0 md:mr-12"
    >
      <h1
        id="animated-title"
        class="text-ghost-100 font-mono font-light text-3xl md:text-4xl opacity-0"
      >
        {{ $t(props.titleKey) }}
      </h1>
      <h2
        id="animated-subtitle"
        class="font-display font-normal text-ghost-200 text-lg sm:text-xl my-4 text-left opacity-0"
      >
        {{ $t(props.subtitleKey) }}
      </h2>
      <p
        id="animated-description"
        class="font-display font-light text-ghost-100 text-sm sm:text-base md:text-lg text-center md:text-left leading-tight opacity-0"
        :style="{ width: width >= 640 ? props.descriptionWidth : '300px' }"
      >
        {{ $t(props.descriptionKey) }}
      </p>
    </div>

    <div
      class="absolute h-full w-full flex items-center justify-center object-contain mask-fade -z-10"
    >
      <img
        id="rotating-circle"
        :src="props.spinningImage"
        :class="`absolute opacity-${props.imageOpacity}`"
        :style="{
          width: props.imageSize,
          height: props.imageSize,
          minWidth: '550px',
          minHeight: '550px',
        }"
        alt=""
      />
      <div
        class="absolute border-[1px] border-ghost-100 rounded-full max-w-[675px] max-h-[675px] sm:max-h-[800px] sm:max-w-[800px] md:max-h-none md:max-w-none"
        :style="{
          height: `${props.imageSize + 200}px`,
          width: `${props.imageSize + 200}px`,
          opacity: `${props.imageOpacity - 10}%`,
        }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.mask-fade {
  mask-image: linear-gradient(
    to bottom,
    transparent 20%,
    black 60%,
    black 40%,
    transparent 80%
  );
  mask-size: 100% 100%;
  mask-repeat: no-repeat;

  @media screen and (max-width: 767px) {
    mask-image: linear-gradient(
      to right,
      transparent 10%,
      black 60%,
      black 40%,
      transparent 90%
    );
    mask-size: 100% 100%;
    mask-repeat: no-repeat;
  }
}
</style>
