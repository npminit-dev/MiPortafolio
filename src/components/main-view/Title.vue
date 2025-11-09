<script setup lang="ts">
import { onMounted } from "vue";
import { gsap } from "gsap";
import { useSoundStore } from '../../stores/useSoundStore';

const st = useSoundStore()

function animateEnter() {
  const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.5 });

  const titleName = document.getElementById("title-name");
  const titleSurname = document.getElementById("title-surname");
  const titleRole = document.getElementById("title-role");
  const lines = document.getElementsByClassName("grow-line");
  const openSlash = document.getElementById("open-slash");
  const closeSlash = document.getElementById("close-slash");

  // Estado inicial
  gsap.set([titleName, titleSurname, titleRole], { opacity: 0 });
  gsap.set(lines, { scaleX: 0, transformOrigin: "left center" });
  gsap.set(lines[1], { transformOrigin: "right center" });
  gsap.set(openSlash, { x: -30, opacity: 0 });
  gsap.set(closeSlash, { x: 30, opacity: 0 });

  // 🔹 Animar nombre y apellido simultáneamente (scramble + fade in)
  tl.to(titleName, {
    duration: 1.2,
    opacity: 1,
    scrambleText: { text: "JORGE", chars: "upperCase", speed: 3 },
    ease: "linear",
    textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
    onStart: () => {
      st.play(st.sounds['transition-2'])
    },
  });
  tl.to(
    titleSurname,
    {
      duration: 1.2,
      opacity: 1,
      scrambleText: { text: "BALSAMO", chars: "upperCase", speed: 3 },
      textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
      ease: "linear",
    },
    "<" // al mismo tiempo
  );

  // 🔹 Animar líneas (una de izquierda a derecha, la otra al revés)
  tl.to(
    lines,
    {
      duration: 0.8,
      scaleX: 1,
      stagger: 0,
    },
    "0.7"
  );

  tl.to(
    openSlash,
    {
      x: 0,
      opacity: 1,
      duration: 1.2,
      textShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
    },
    "0.7"
  );

  tl.to(
    closeSlash,
    {
      x: 0,
      opacity: 1,
      duration: 1.2,
      textShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
    },
    "0.7"
  );

  // 🔹 Animar subtítulo (scramble + fade in)
  tl.to(
    titleRole,
    {
      duration: 2,
      opacity: 1,
      scrambleText: { text: "SOFTWARE DEVELOPER", chars: "upperCase", speed: 4 },
      textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
    },
    "1.2"
  );
}

onMounted(() => {
  animateEnter();
});
</script>

<template>
  <div class="flex items-center justify-center">
    <div id="open-slash" class="text-7xl font-light font-display text-ghost-300">
      {{ "/" }}
    </div>
    <div class="relative flex flex-col items-center justify-center">
      <h1
        id="title-container"
        class="font-mono text-5xl text-ghost-100 flex flex-col items-center justify-center"
      >
        <span id="title-name" class="invisible-text">JORGE</span>
        <span id="title-surname" class="invisible-text">BALSAMO</span>
        <div class="flex flex-col items-center justify-center">
          <div class="relative flex flex-col w-full my-1">
            <div class="grow-line bg-ghost-300 h-[1px] mb-[1px] w-full"></div>
            <div class="grow-line bg-ghost-300 h-[1px] w-full"></div>
          </div>
          <span id="title-role" class="font-mono font-light text-xl invisible-text">
            {{ $t("SOFTWARE DEVELOPER") }}
          </span>
        </div>
      </h1>
    </div>
    <div id="close-slash" class="text-7xl font-light font-display text-ghost-300">
      {{ "\\" }}
    </div>
  </div>
</template>

<style scoped>
.invisible-text {
  opacity: 0;
  visibility: visible; /* ocupa espacio, pero invisible */
}
</style>
