<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watchEffect } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutMe from "./AboutMe.vue";
import Contact from "./Contact.vue";
import Feedback from "./Feedback.vue";
import SnapScrollProgress from "./SnapScrollProgress.vue";
import { useSoundStore } from "../../stores/useSoundStore";
import { v4 } from "uuid";

gsap.registerPlugin(ScrollTrigger);

const st = useSoundStore();
const showAboutMe = ref<boolean>(false);
const showContact = ref<boolean>(false);
const showFeedback = ref<boolean>(false);
const scrollSection = ref<number>(1);

let beforeSnapAnimation: gsap.core.Animation | null = null;
let tl: gsap.core.Timeline | null = null;

onMounted(() => {
  startAnimations();
});

onBeforeUnmount(() => {
  st.clearFXs();
  killAnimations();
});

function setLightLangAndSound() {
  gsap.to("#sound-switcher-container", {
    backgroundColor: "var(--color-ghost-300)",
    borderColor: "var(--color-void-600)",
    duration: 0.3,
  });
  gsap.to("#sound-switcher-wave", {
    stroke: "var(--color-void-800)",
    duration: 0.3,
  });
  gsap.to("#lang-switcher-ring", {
    borderColor: "var(--color-void-600)",
    duration: 0.3,
  });
  gsap.to(".lang-icon-container", {
    borderColor: "var(--color-void-600)",
  });
}

function revertLightLangAndSound() {
  gsap.to("#sound-switcher-container", {
    backgroundColor: "var(--color-void-950)",
    borderColor: "var(--color-ghost-200)",
    duration: 0.3,
  });
  gsap.to("#sound-switcher-wave", {
    stroke: "var(--color-ghost-300)",
    duration: 0.3,
  });
  gsap.to("#lang-switcher-ring", {
    borderColor: "var(--color-ghost-300)",
    duration: 0.3,
  });
  gsap.to(".lang-icon-container", {
    borderColor: "var(--color-ghost-300)",
  });
}

function startAnimations() {
  beforeSnapAnimation = gsap.fromTo(
    "#white-rounded",
    {
      filter: "drop-shadow(0 -10px 10px #fff)",
      autoAlpha: 0.8,
      borderRadius: "100%",
    },
    {
      filter: "drop-shadow(0 -50px 100px #fff)",
      autoAlpha: 1,
      borderRadius: "25%",
      ease: "power2.in",
      scaleX: 4,
      height: "100vh",
      scrollTrigger: {
        trigger: "#white-rounded",
        start: "top bottom",
        end: "top top",
        scrub: true,
        onLeave: () => gsap.set("#white-rounded", { filter: "none" }),
        onLeaveBack: () => gsap.set("#white-rounded", { filter: "none" }),
      },
    }
  );

  gsap.set(["#about-me", "#contact", "#feedback"], { autoAlpha: 0 });

  // Timeline principal controlada por scroll
  tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#general-container",
      start: "top top",
      end: "+=5000", // Distancia total de scroll (ajusta según necesites)
      scrub: true,
      pin: true,
      pinSpacing: "margin",
      anticipatePin: 1,
      onEnter: () => {
        setLightLangAndSound();
        st.play(st.sounds["transition-5"]);
      },
      onEnterBack: setLightLangAndSound,
      onLeaveBack: revertLightLangAndSound,
      onUpdate: (self) => {
        const progress = self.progress;
        if (progress < 0.33) {
          if (showContact.value) showContact.value = false;
          if (showFeedback.value) showFeedback.value = false;
          if (!showAboutMe.value) showAboutMe.value = true;
          if (scrollSection.value !== 1) st.play(st.sounds["transition-5"]);
          scrollSection.value = 1;
        } else if (progress >= 0.33 && progress < 0.66) {
          if (showAboutMe.value) showAboutMe.value = false;
          if (showFeedback.value) showFeedback.value = false;
          if (!showContact.value) showContact.value = true;
          if (scrollSection.value !== 2) st.play(st.sounds["transition-5"]);
          scrollSection.value = 2;
        } else {
          if (showAboutMe.value) showAboutMe.value = false;
          if (showContact.value) showContact.value = false;
          if (!showFeedback.value) showFeedback.value = true;
          if (scrollSection.value !== 3) st.play(st.sounds["transition-5"]);
          scrollSection.value = 3;
        }
      },
    },
  });

  tl.to("#about-me", {
    autoAlpha: 1,
    duration: 0.05,
  })
    .to({}, { duration: 0.25 })
    .to("#about-me", {
      autoAlpha: 0,
      duration: 0.03,
    })
    .to("#contact", {
      autoAlpha: 1,
      duration: 0.03,
    })
    .to({}, { duration: 0.27 })
    .to("#contact", {
      autoAlpha: 0,
      duration: 0.03,
    })
    .to("#feedback", {
      autoAlpha: 1,
      duration: 0.03,
    })
    .to({}, { duration: 0.31 });
  tl.fromTo(
    "#scroll-progress",
    {
      drawSVG: "-25% -25%",
    },
    {
      drawSVG: "-25% 75%",
      repeat: 2,
      duration: 0.33,
    },
    0
  );
}

function killAnimations() {
  beforeSnapAnimation?.scrollTrigger?.kill();
  beforeSnapAnimation?.kill();
  tl?.scrollTrigger?.kill();
  tl?.kill();
  revertLightLangAndSound();
}
</script>

<template>
  <div
    id="general-container"
    class="relative w-[100dvw] h-[100dvh] flex items-center justify-center"
  >
    <div
      id="white-rounded"
      class="absolute top-0 inset-x-0 bg-ghost-300 w-[100dvw] h-[100dvh] flex items-center justify-center"
    />
    <div id="snap-outer-container" class="absolute inset-0 w-[100dvw] h-[100dvh]">
      <div id="snap-inner-container" class="relative w-full h-full">
        <div id="about-me" class="absolute inset-0 w-full h-full">
          <AboutMe v-if="showAboutMe" :key="v4()" />
        </div>
        <div id="contact" class="absolute inset-0 w-full h-full">
          <Contact v-if="showContact" :key="v4()" />
        </div>
        <div id="feedback" class="absolute inset-0 w-full h-full">
          <Feedback v-if="showFeedback" :key="v4()" />
        </div>
      </div>
      <SnapScrollProgress :scroll-section />
    </div>
  </div>
</template>

<style scoped></style>
