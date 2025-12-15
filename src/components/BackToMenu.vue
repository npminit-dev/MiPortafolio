<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted } from "vue";
import { usePageTransition } from "../composables/usePageTransition";
import { useSoundStore } from "../stores/useSoundStore";
import gsap from "gsap";
import { useTranslation } from "i18next-vue";

type Props = {
  beforeBack?: () => void;
  inverted?: boolean;
  simple?: boolean;
};

const { triggerTransition } = usePageTransition();
const st = useSoundStore();
const { i18next } = useTranslation();
const { beforeBack, inverted = false, simple = false } = defineProps<Props>();

let timeline: gsap.core.Timeline;

const getColorClass = () =>
  !inverted
    ? "text-ghost-300 hover:text-ghost-100"
    : "text-void-600 hover:text-void-950 font-semibold";

function startAnimations() {
  const container = document.getElementById("back-menu-container");
  if (container) {
    const leftArrow = container.querySelector(".back-left");
    const rightArrow = container.querySelector(".back-right");
    const text = container.querySelector(".back-text");

    timeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        toggleActions: !simple ? "play reset play reset" : "play none none noe",
      },
    });

    timeline.fromTo(
      leftArrow,
      {
        x: 75,
      },
      {
        x: 0,
        ease: "expo.out",
        duration: 1,
      },
      0
    );

    timeline.fromTo(
      rightArrow,
      {
        x: -75,
      },
      {
        x: 0,
        ease: "expo.out",
        duration: 1,
      },
      0
    );

    timeline.fromTo(
      text,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        ease: "power4.out",
        duration: 1.5,
      },
      0.3
    );
  }
}

function killAnimations() {
  if (timeline) {
    timeline.scrollTrigger?.kill();
    timeline.kill();
  }
}

onMounted(async () => {
  await document.fonts.ready;
  startAnimations();
  i18next.on("languageChanged", async () => {
    killAnimations();
    await nextTick();
    await nextTick();
    startAnimations();
  });
});

onBeforeUnmount(() => {
  st.clearFXs();
  killAnimations();
});

function handleHover() {
  st.play(st.sounds["hover-2"]);
}

function handleBack() {
  killAnimations();
  st.play(st.sounds["select-1"]);
  if (beforeBack) beforeBack();
  triggerTransition("/menu");
}
</script>

<template>
  <div
    id="back-menu-container"
    class="flex items-center justify-center cursor-pointer z-10"
    @click="handleBack"
    @mouseenter="handleHover"
  >
    <v-icon
      name="bi-chevron-compact-left"
      class="size-7 back-left"
      :class="getColorClass()"
    />
    <span
      class="back-text font-display font-medium text-lg md:text-xl"
      :class="getColorClass()"
    >
      {{ $t("Back to Central Node") }}
    </span>
    <v-icon
      name="bi-chevron-compact-right"
      class="size-7 back-right"
      :class="getColorClass()"
    />
  </div>
</template>

<style scoped></style>
