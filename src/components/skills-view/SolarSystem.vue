<script setup lang="ts">
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

// Props
defineProps<{
  height?: number;
}>();

// Constante de velocidad global (multiplicador)
const SPEED_MULTIPLIER = 1;

// Referencias a los elementos
const svgRef = ref<SVGSVGElement | null>(null);
const mm = gsap.matchMedia();

onMounted(() => {
  if (!svgRef.value) return;

  const animateSolarFlare = () => {
    const minBlur = 40;
    const maxBlur = 50;
    const minDuration = 0.01;
    const maxDuration = 0.02;

    const randomBlur = gsap.utils.random(minBlur, maxBlur);
    const randomDuration = gsap.utils.random(minDuration, maxDuration);

    gsap.to("#sun", {
      filter: `drop-shadow(0 0 ${randomBlur}px var(--color-ghost-300))`,
      duration: randomDuration,
      ease: "linear",
      onComplete: animateSolarFlare, // Llamar recursivamente
    });
  };

  mm.add("(min-width: 768px)", () => {
    // Iniciar la animación
    animateSolarFlare();
  });

  // Velocidades orbitales (en segundos) con resonancias
  const orbitalPeriods = {
    planet1: 8 * SPEED_MULTIPLIER,
    planet2: 24 * SPEED_MULTIPLIER,
    planet3: 28 * SPEED_MULTIPLIER,
    planet4: 30 * SPEED_MULTIPLIER,
    planet5: 48 * SPEED_MULTIPLIER,
    planet6: 56 * SPEED_MULTIPLIER,
    planet7: 96 * SPEED_MULTIPLIER,
    planet8: 110 * SPEED_MULTIPLIER,
  };

  // Animar planetas sin lunas usando MotionPath
  gsap.to("#planet1", {
    duration: orbitalPeriods.planet1,
    repeat: -1,
    ease: "none",
    motionPath: {
      path: "#orbit1",
      align: "#orbit1",
      autoRotate: false,
      alignOrigin: [0.5, 0.5],
      start: -0.5,
      end: 1.5,
    },
  });

  gsap.to("#planet2", {
    duration: orbitalPeriods.planet2,
    repeat: -1,
    ease: "none",
    motionPath: {
      path: "#orbit2",
      align: "#orbit2",
      autoRotate: false,
      alignOrigin: [0.5, 0.5],
      start: 0.5,
      end: -1.5,
    },
  });

  gsap.to("#planet3", {
    duration: orbitalPeriods.planet3,
    repeat: -1,
    ease: "none",
    motionPath: {
      path: "#orbit3",
      align: "#orbit3",
      autoRotate: false,
      alignOrigin: [0.5, 0.5],
      start: -0.5,
      end: 1.5,
    },
  });

  gsap.to("#planet4", {
    duration: orbitalPeriods.planet4,
    repeat: -1,
    ease: "none",
    motionPath: {
      path: "#orbit4",
      align: "#orbit4",
      autoRotate: false,
      alignOrigin: [0.5, 0.5],
    },
  });

  gsap.to("#planet5", {
    duration: orbitalPeriods.planet5,
    repeat: -1,
    ease: "none",
    motionPath: {
      path: "#orbit5",
      align: "#orbit5",
      autoRotate: false,
      alignOrigin: [0.5, 0.5],
      start: -0.5,
      end: 1.5,
    },
  });

  // Planeta 6 con luna - El planeta sigue su órbita
  gsap.to("#planet6-with-moon", {
    duration: orbitalPeriods.planet6,
    repeat: -1,
    ease: "none",
    motionPath: {
      path: "#orbit6",
      align: "#orbit6",
      autoRotate: false,
      alignOrigin: [0.5, 0.5],
    },
  });

  // Luna del planeta 6 - Orbita alrededor del planeta usando MotionPath
  gsap.to("#planet6-moon", {
    duration: orbitalPeriods.planet6 / 20, // 4x más rápida
    repeat: -1,
    ease: "none",
    motionPath: {
      path: "#planet6-moon-orbit-path",
      align: "#planet6-moon-orbit-path",
      autoRotate: false,
      alignOrigin: [0.5, 0.5],
    },
  });

  // Planeta 7 con luna - El planeta sigue su órbita
  gsap.to("#planet7-with-moon", {
    duration: orbitalPeriods.planet7,
    repeat: -1,
    ease: "none",
    motionPath: {
      path: "#orbit7",
      align: "#orbit7",
      autoRotate: false,
      alignOrigin: [0.5, 0.5],
      start: -0.5,
      end: 1.5,
    },
  });

  // Luna del planeta 7 - Orbita alrededor del planeta usando MotionPath
  gsap.to("#planet7-moon", {
    duration: orbitalPeriods.planet7 / 35, // 4x más rápida
    repeat: -1,
    ease: "none",
    motionPath: {
      path: "#planet7-moon-orbit-path",
      align: "#planet7-moon-orbit-path",
      autoRotate: false,
      alignOrigin: [0.5, 0.5],
    },
  });

  // Planeta 8
  gsap.to("#planet8", {
    duration: orbitalPeriods.planet8,
    repeat: -1,
    ease: "none",
    motionPath: {
      path: "#orbit8",
      align: "#orbit8",
      autoRotate: false,
      alignOrigin: [0.5, 0.5],
      start: -0.5,
      end: 1.5,
    },
  });
});
</script>

<template>
  <svg
    ref="svgRef"
    :height="height || 600"
    viewBox="0 0 1008 1008"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Sol (centro) -->
    <path
      fill="#010101"
      d="M446.303 503.999a57.697 57.697 0 1 0 115.394 0a57.697 57.697 0 1 0 -115.394 0"
      id="sun"
    />
    <!-- Órbitas (visibles) -->
    <path
      id="orbit1"
      stroke="var(--color-shadow-500)"
      vector-effect="non-scaling-stroke"
      d="M427.1554 504a76.8446 76.8446 0 1 0 153.6892 0a76.8446 76.8446 0 1 0 -153.6892 0"
    />
    <path
      id="orbit2"
      stroke="var(--color-shadow-500)"
      vector-effect="non-scaling-stroke"
      d="M387.056 504a116.944 116.944 0 1 0 233.888 0a116.944 116.944 0 1 0 -233.888 0"
    />
    <path
      id="orbit3"
      stroke="var(--color-shadow-500)"
      vector-effect="non-scaling-stroke"
      d="M361.94 504a142.06 142.06 0 1 0 284.12 0a142.06 142.06 0 1 0 -284.12 0"
    />
    <path
      id="orbit4"
      stroke="var(--color-shadow-500)"
      vector-effect="non-scaling-stroke"
      d="M334.789 504a169.211 169.211 0 1 0 338.422 0a169.211 169.211 0 1 0 -338.422 0"
    />
    <path
      id="orbit5"
      stroke="var(--color-shadow-500)"
      vector-effect="non-scaling-stroke"
      d="M288.526 504a215.474 215.474 0 1 0 430.948 0a215.474 215.474 0 1 0 -430.948 0"
    />
    <path
      id="orbit6"
      stroke="var(--color-shadow-500)"
      vector-effect="non-scaling-stroke"
      d="M126.623 504a377.377 377.377 0 1 0 754.754 0a377.377 377.377 0 1 0 -754.754 0"
    />
    <path
      id="orbit7"
      stroke="var(--color-shadow-500)"
      vector-effect="non-scaling-stroke"
      d="M246.406 496.641a257.594 257.594 0 1 0 515.188 0a257.594 257.594 0 1 0 -515.188 0"
    />
    <path
      id="orbit8"
      stroke="var(--color-shadow-500)"
      vector-effect="non-scaling-stroke"
      d="M25.734 503.999a478.266 478.266 0 1 0 956.532 0a478.266 478.266 0 1 0 -956.532 0"
    />
    <!-- Planetas sin lunas -->
    <path
      id="planet1"
      fill="var(--color-ghost-300)"
      d="M500.3115 426.656a3.6885 3.6885 0 1 0 7.3769 0a3.6885 3.6885 0 1 0 -7.3769 0"
    />
    <path
      id="planet2"
      fill="var(--color-ghost-300)"
      d="M498.4936 621.443a5.5064 5.5064 0 1 0 11.0128 0a5.5064 5.5064 0 1 0 -11.0128 0"
    />
    <path
      id="planet3"
      fill="var(--color-ghost-300)"
      d="M497.998 361.44a6.002 6.002 0 1 0 12.0041 0a6.002 6.002 0 1 0 -12.0041 0"
    />
    <path
      id="planet4"
      fill="var(--color-ghost-300)"
      d="M499.1548 673.711a4.8453 4.8453 0 1 0 9.6905 0a4.8453 4.8453 0 1 0 -9.6905 0"
    />
    <path
      id="planet5"
      fill="var(--color-ghost-300)"
      d="M486.4223 288.025a17.5777 17.5777 0 1 0 35.1554 0a17.5777 17.5777 0 1 0 -35.1554 0"
    />
    <!-- Planeta 6 con luna -->
    <g id="planet6-with-moon">
      <path
        fill="var(--color-ghost-300)"
        d="M482.9299 126.123a21.0701 21.0701 0 1 0 42.1402 0a21.0701 21.0701 0 1 0 -42.1402 0"
      />
      <!-- Órbita de la luna del planeta 6 (relativa al planeta) -->
      <path
        id="planet6-moon-orbit-path"
        stroke="var(--color-shadow-500)"
        stroke-width="0.5"
        vector-effect="non-scaling-stroke"
        d="M477.2181 126.122a26.7819 26.7819 0 1 0 53.5638 0a26.7819 26.7819 0 1 0 -53.5638 0"
      />
      <!-- Luna del planeta 6 -->
      <path
        id="planet6-moon"
        fill="var(--color-ghost-300)"
        d="M502.3319 153.154a1.6681 1.6681 0 1 0 3.3362 0a1.6681 1.6681 0 1 0 -3.3362 0"
      />
    </g>
    <!-- Planeta 7 con luna -->
    <g id="planet7-with-moon">
      <path
        fill="var(--color-ghost-300)"
        d="M495.1888 753.927a8.8113 8.8113 0 1 0 17.6225 0a8.8113 8.8113 0 1 0 -17.6225 0"
      />
      <!-- Órbita de la luna del planeta 7 (relativa al planeta) -->
      <path
        id="planet7-moon-orbit-path"
        stroke="var(--color-shadow-500)"
        stroke-width="0.5"
        vector-effect="non-scaling-stroke"
        d="M490.2554 753.928a13.7446 13.7446 0 1 0 27.4892 0a13.7446 13.7446 0 1 0 -27.4892 0"
      />
      <!-- Luna del planeta 7 -->
      <path
        id="planet7-moon"
        fill="var(--color-ghost-300)"
        d="M502.6651 740.145a1.3349 1.3349 0 1 0 2.6698 0a1.3349 1.3349 0 1 0 -2.6698 0"
      />
    </g>
    <!-- Planeta 8 -->
    <path
      id="planet8"
      fill="var(--color-ghost-300)"
      d="M484.155 982.765a19.845 19.845 0 1 0 39.69 0a19.845 19.845 0 1 0 -39.69 0"
    />
  </svg>
</template>

<style scoped>
#sun {
  filter: drop-shadow(0 0 50px white);
}
</style>
