<script setup lang="ts">
import { ref, watch, nextTick, watchEffect, onMounted } from "vue";
import { gsap } from "gsap";
import { useSoundStore } from "../../stores/useSoundStore.ts";
import { usePageTransition } from "../../composables/usePageTransition";
import { useTranslation } from "i18next-vue";

const st = useSoundStore();
const { triggerTransition } = usePageTransition();
const { i18next } = useTranslation();

const isHovered = ref<boolean>(false);
const isClicked = ref<boolean>(false);
const innerRef = ref<HTMLElement | null>(null);
const outerRef = ref<HTMLElement | null>(null);
const textRef = ref<HTMLElement | null>(null);
const containerRef = ref<HTMLElement | null>(null);

let hoverTimeline: gsap.core.Timeline | null = null;

onMounted(() => {
  animateIn();
});

watchEffect(() => {
  i18next.language;
  scrambleButtonText();
});

function animateIn() {
  if (!containerRef.value) return;

  gsap.set(containerRef.value, { opacity: 0, scale: 0.9 });

  const tl = gsap.timeline();

  tl.to(containerRef.value, {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: "power2.out",
  });

  tl.to(
    innerRef.value,
    {
      scale: 1.05,
      duration: 0.6,
      ease: "power1.inOut",
      yoyo: true,
      repeat: 1,
    },
    "-=0.4"
  );

  scrambleButtonText();
}

function handleStart() {
  if (isClicked.value) return;

  isClicked.value = true;
  st.play(st.sounds["select-2"]);

  isHovered.value = true;

  if (innerRef.value) {
    gsap
      .timeline()
      .to(innerRef.value, {
        scale: 0.95,
        duration: 0.12,
        ease: "power2.in",
      })
      .to(innerRef.value, {
        scale: 1,
        duration: 0.3,
        ease: "elastic.out(1, 0.3)",
      });
  }

  triggerTransition("/menu");
}

function scrambleButtonText() {
  nextTick(() => {
    if (!textRef.value) return;
    gsap.to(textRef.value, {
      duration: 0.6,
      scrambleText: {
        text: textRef.value.textContent as string,
        chars: "upperCase",
        speed: 2,
      },
    });
  });
}

watch(isHovered, (newValue) => {
  if (isClicked.value) return;
  if (!innerRef.value || !outerRef.value || !textRef.value) return;

  if (hoverTimeline) {
    hoverTimeline.kill();
  }

  hoverTimeline = gsap.timeline();

  if (newValue) {
    hoverTimeline
      .to(
        innerRef.value,
        {
          width: 375,
          height: 375,
          backgroundColor: "var(--color-ghost-300)",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        0
      )
      .to(
        outerRef.value,
        {
          width: 400,
          height: 400,
          opacity: 1,
          duration: 0.6,
          ease: "power2.inOut",
        },
        0
      )
      .to(
        textRef.value,
        {
          color: "var(--color-shadow-100)",
          scale: 1.05,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        0.1
      );
  } else {
    hoverTimeline
      .to(
        innerRef.value,
        {
          width: 400,
          height: 400,
          backgroundColor: "transparent",
          opacity: 0.4,
          duration: 0.4,
          ease: "power2.inOut",
        },
        0
      )
      .to(
        outerRef.value,
        {
          width: 900,
          height: 900,
          opacity: 0.3,
          duration: 0.6,
          ease: "power2.inOut",
        },
        0
      )
      .to(
        textRef.value,
        {
          color: "var(--color-ghost-100)",
          scale: 1,
          duration: 0.5,
          ease: "power2.inOut",
        },
        0
      );
  }
});
</script>

<template>
  <div
    ref="containerRef"
    id="container"
    class="size-[500px] flex items-center justify-center overflow-visible"
  >
    <img
      id="dashed"
      src="/image/dashed-circle.png"
      class="absolute min-h-[500px] min-w-[500px] max-w-[500px] max-h-[500px] opacity-40"
    />

    <div
      @click="handleStart"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      class="absolute size-[400px] rounded-full flex items-center justify-center cursor-pointer"
    >
      <div
        ref="innerRef"
        id="inner"
        class="absolute size-[400px] border-2 border-ghost-300 rounded-full opacity-40 flex items-center justify-center pointer-events-none"
      />
    </div>

    <div
      ref="outerRef"
      id="outer"
      class="absolute size-[700px] sm:size-[800px] md:size-[900px] border-[1px] border-ghost-300 rounded-full opacity-30 pointer-events-none"
    />

    <h1
      ref="textRef"
      id="start-text"
      class="text-3xl font-display text-ghost-100 z-10 pointer-events-none"
    >
      {{ $t("START") }}
    </h1>
  </div>
</template>

<style scoped>
#dashed {
  stroke-dasharray: 2px 10px;
  animation: rotateDashed 180s linear infinite;
}

@keyframes rotateDashed {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}

#container:hover #dashed {
  opacity: 1;
  transition-duration: 0.7s;
  transition-delay: 0.3s;
}
</style>
