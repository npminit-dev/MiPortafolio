<script setup lang="ts">
import { onMounted, onBeforeUnmount, useTemplateRef } from "vue";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useWindowSize } from "@vueuse/core";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

interface Props {
  height?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  height: 553,
});

const svgRef = useTemplateRef("svgRef");
const { width } = useWindowSize();
let scrollTriggerInstance: ScrollTrigger | null = null;

function startAnimation() {
  if (svgRef.value) {
    // Seleccionar elementos por nivel
    const raiz = svgRef.value.querySelector("#raiz");
    const lineasNivel1 = svgRef.value.querySelectorAll(".linea-nivel-1");
    const nodosNivel1 = svgRef.value.querySelectorAll(".nodo-nivel-1");
    const lineasNivel2 = svgRef.value.querySelectorAll(".linea-nivel-2");
    const nodosNivel2 = svgRef.value.querySelectorAll(".nodo-nivel-2");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svgRef.value,
        start: "center bottom",
        end: "center top",
        toggleActions:
          width.value >= 768 ? "play reverse play reverse" : "play none none none",
        onRefresh: (self) => {
          scrollTriggerInstance = self;
        },
      },
    });

    scrollTriggerInstance = tl.scrollTrigger as ScrollTrigger;

    tl.fromTo(
      raiz,
      {
        drawSVG: "-25% -25%",
      },
      {
        drawSVG: "-75% 25%",
        duration: 0.65,
        ease: "power2.in",
      }
    )
      .fromTo(
        lineasNivel1,
        {
          drawSVG: "0% 0%",
        },
        {
          drawSVG: "0% 100%",
          duration: 0.65,
          ease: "power2.out",
        },
        "-=0.1"
      )
      .fromTo(
        nodosNivel1,
        {
          drawSVG: "-25% -25%",
        },
        {
          drawSVG: "-75% 25%",
          duration: 0.65,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .fromTo(
        lineasNivel2,
        {
          drawSVG: "0% 0%",
        },
        {
          drawSVG: "0% 100%",
          duration: 0.65,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .fromTo(
        nodosNivel2,
        {
          drawSVG: "-25% -25%",
        },
        {
          drawSVG: "-75% 25%",
          duration: 0.65,
          ease: "power2.out",
        },
        "-=0.4"
      );
  }
}

function killAnimations() {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
  }
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

onMounted(() => {
  startAnimation();
});

onBeforeUnmount(() => {
  killAnimations();
});
</script>

<template>
  <svg
    ref="svgRef"
    :height="props.height"
    viewBox="0 0 664 553"
    fill="none"
    style="width: auto; display: block"
    preserveAspectRatio="xMidYMid meet"
  >
    <!-- Líneas nivel 1 (raíz a hijos) -->
    <line
      class="linea-nivel-1"
      x2="184.565"
      y2="187.277"
      x1="303.867"
      y1="94.4783"
      stroke="var(--color-shadow-500)"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
      stroke-linecap="round"
    />
    <line
      class="linea-nivel-1"
      x1="359.928"
      y1="94.4943"
      x2="478.943"
      y2="187.779"
      stroke="var(--color-shadow-500)"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
      stroke-linecap="round"
    />

    <!-- Líneas nivel 2 (hijos a nietos) -->
    <line
      class="linea-nivel-2"
      x1="144.611"
      y1="243.978"
      x2="60.8378"
      y2="450.315"
      stroke="var(--color-shadow-500)"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
      stroke-linecap="round"
    />
    <line
      class="linea-nivel-2"
      x2="157.12"
      y2="444.655"
      x1="157.12"
      y1="246.113"
      stroke="var(--color-shadow-500)"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
      stroke-linecap="round"
    />
    <line
      class="linea-nivel-2"
      x1="170.658"
      y1="243.716"
      x2="259.577"
      y2="447.813"
      stroke="var(--color-shadow-500)"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
      stroke-linecap="round"
    />
    <line
      class="linea-nivel-2"
      x1="494.314"
      y1="243.833"
      x2="403.828"
      y2="447.336"
      stroke="var(--color-shadow-500)"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
      stroke-linecap="round"
    />
    <line
      class="linea-nivel-2"
      x2="507.331"
      y2="444.805"
      x1="507.331"
      y1="246.263"
      stroke="var(--color-shadow-500)"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
      stroke-linecap="round"
    />
    <line
      class="linea-nivel-2"
      x1="520.857"
      y1="243.444"
      x2="609.816"
      y2="447.984"
      stroke="var(--color-shadow-500)"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
      stroke-linecap="round"
    />

    <!-- Nodos nivel 2 (6 nietos/hojas) -->
    <circle
      class="nodo-nivel-2"
      cx="39.9021"
      cy="480.979"
      r="35.824"
      stroke="white"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
    />
    <circle
      class="nodo-nivel-2"
      cx="156.911"
      cy="480.979"
      r="35.824"
      stroke="white"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
    />
    <circle
      class="nodo-nivel-2"
      cx="273.92"
      cy="480.979"
      r="35.824"
      stroke="white"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
    />
    <circle
      class="nodo-nivel-2"
      cx="390.646"
      cy="480.979"
      r="35.824"
      stroke="white"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
    />
    <circle
      class="nodo-nivel-2"
      cx="507.372"
      cy="480.979"
      r="35.824"
      stroke="white"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
    />
    <circle
      class="nodo-nivel-2"
      cx="624.098"
      cy="480.979"
      r="35.824"
      stroke="white"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
    />
    <!-- Nodos nivel 1 (2 hijos) -->
    <circle
      class="nodo-nivel-1"
      cx="156.911"
      cy="210.277"
      r="35.824"
      stroke="white"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
    />
    <circle
      class="nodo-nivel-1"
      cx="507.372"
      cy="210.277"
      r="35.824"
      stroke="white"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
    />

    <!-- Raíz (nivel 0) -->
    <circle
      id="raiz"
      cx="332"
      cy="72.0214"
      r="35.824"
      stroke="white"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
    />
  </svg>
</template>

<style scoped></style>
