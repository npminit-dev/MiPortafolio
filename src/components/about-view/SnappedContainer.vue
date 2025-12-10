<script setup lang="ts">
import { onMounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutMe from "./AboutMe.vue";
import Contact from "./Contact.vue";
import Feedback from "./Feedback.vue";

gsap.registerPlugin(ScrollTrigger);

let beforeSnapAnimation: gsap.core.Animation | null = null;
const showAboutMe = ref(false);
const showContact = ref(false);
const showFeedback = ref(false);

onMounted(() => {
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
      },
    }
  );

  gsap.set(["#about-me", "#contact", "#feedback"], { autoAlpha: 0 });

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

  // Timeline principal controlada por scroll
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#general-container",
      start: "top top",
      end: "+=5000", // Distancia total de scroll (ajusta según necesites)
      scrub: true,
      pin: true,
      pinSpacing: "margin",
      anticipatePin: 1,
      onEnter: setLightLangAndSound,
      onEnterBack: setLightLangAndSound,
      onLeave: revertLightLangAndSound,
      onLeaveBack: revertLightLangAndSound,
      onUpdate: (self) => {
        const progress = self.progress;

        if (progress < 0.33) {
          if (!showAboutMe.value) showAboutMe.value = true;
          if (showContact.value) showContact.value = false;
          if (showFeedback.value) showFeedback.value = false;
        } else if (progress >= 0.33 && progress < 0.66) {
          if (showAboutMe.value) showAboutMe.value = false;
          if (!showContact.value) showContact.value = true;
          if (showFeedback.value) showFeedback.value = false;
        } else {
          if (showAboutMe.value) showAboutMe.value = false;
          if (showContact.value) showContact.value = false;
          if (!showFeedback.value) showFeedback.value = true;
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
});
</script>

<template>
  <div
    id="general-container"
    class="relative w-screen h-screen flex items-center justify-center"
  >
    <div
      id="white-rounded"
      class="absolute top-0 inset-x-0 bg-ghost-300 w-screen h-[100vw] flex items-center justify-center"
    />
    <div id="snap-outer-container" class="absolute inset-0 w-screen h-screen">
      <div id="snap-inner-container" class="relative w-full h-full">
        <div id="about-me" class="absolute inset-0 w-full h-full">
          <AboutMe v-if="showAboutMe" />
        </div>
        <div id="contact" class="absolute inset-0 w-full h-full">
          <Contact v-if="showContact" />
        </div>
        <div id="feedback" class="absolute inset-0 w-full h-full">
          <Feedback v-if="showFeedback" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
