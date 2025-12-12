<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";

type Props = {
  containerAnimation: gsap.core.Animation;
  width?: number;
};

const { containerAnimation, width = 838 } = defineProps<Props>();

const svgRef = ref<SVGSVGElement | null>(null);
let tl: gsap.core.Timeline | null = null;

onMounted(() => {
  if (!svgRef.value) return;

  const svg = svgRef.value;

  // Seleccionar todos los paths y circles
  const paths = svg.querySelectorAll("path");
  const circles = svg.querySelectorAll("circle");

  // Configurar DrawSVG en los paths (ocultos inicialmente)
  gsap.set(paths, { drawSVG: "0% 0%" });

  // Configurar los círculos para dibujarse desde las 9 (izquierda) hasta las 3 (derecha)
  gsap.set(circles, {
    drawSVG: "50% 50%",
    transformOrigin: "center center",
  });

  // Crear timeline principal con ScrollTrigger
  tl = gsap.timeline({
    scrollTrigger: {
      trigger: svg,
      containerAnimation: containerAnimation,
      start: "top center+=20%",
      end: "bottom center-=20%",
      scrub: 1,
      toggleActions: "play reverse play reverse",
    },
  });

  // Mapeo de elementos por ID
  const nodeStart = svg.querySelector("#node-start") as SVGCircleElement;
  const node1Top = svg.querySelector("#node-1-top") as SVGCircleElement;
  const node1Bottom = svg.querySelector("#node-1-bottom") as SVGCircleElement;
  const node2Top = svg.querySelector("#node-2-top") as SVGCircleElement;
  const nodeEnd = svg.querySelector("#node-end") as SVGCircleElement;

  const lineBeforeStart = svg.querySelector("#linea-beforestart") as SVGPathElement;
  const lineStartToEnd = svg.querySelector("#line-starttoend") as SVGPathElement;
  const vector17 = svg.querySelector("#Vector\\ 17") as SVGPathElement;
  const vector18 = svg.querySelector("#Vector\\ 18") as SVGPathElement;
  const vector20 = svg.querySelector("#Vector\\ 20") as SVGPathElement;
  const vector21 = svg.querySelector("#Vector\\ 21") as SVGPathElement;
  const vector22 = svg.querySelector("#Vector\\ 22") as SVGPathElement;
  const vector23 = svg.querySelector("#Vector\\ 23") as SVGPathElement;
  const vector19 = svg.querySelector("#Vector\\ 19") as SVGPathElement;
  const lineAfterEnd = svg.querySelector("#line-afterend") as SVGPathElement;

  // Secuencia de animación siguiendo el flujo del circuito de izquierda a derecha
  tl
    // 1. Línea inicial antes del nodo de inicio
    .fromTo(
      lineBeforeStart,
      { drawSVG: "100% 100%" },
      { drawSVG: "0% 100%", duration: 0.1 },
      0
    )

    // 2. Nodo de inicio (se dibuja de izquierda a derecha)
    .to(nodeStart, { drawSVG: "0% 100%", duration: 0.4 }, 0.2)

    // 3. Línea principal horizontal que conecta todo
    .fromTo(
      lineStartToEnd,
      { drawSVG: "0% 0%" },
      { drawSVG: "0% 100%", duration: 3 },
      0.5
    )

    // 4. Bifurcación superior (Vector 17 hacia node-1-top)
    .to(vector17, { drawSVG: "100%", duration: 1 }, 0.8)

    // 5. Nodo superior 1
    .to(node1Top, { drawSVG: "0% 100%", duration: 0.4 }, 1.6)

    // 6. Bifurcación hacia node-2-top (Vector 18)
    .to(vector18, { drawSVG: "100%", duration: 1.2 }, 1.8)

    // 7. Nodo superior 2
    .to(node2Top, { drawSVG: "0% 100%", duration: 0.4 }, 2.8)

    // 8. Línea de retorno desde node-2-top (Vector 19)
    .fromTo(vector19, { drawSVG: "100% 100%" }, { drawSVG: "0% 100%", duration: 1.5 }, 3)

    // 9. Bifurcación central (Vector 20 desde node-1-top)
    .to(vector20, { drawSVG: "100%", duration: 1 }, 2)

    // 10. Bifurcación inferior (Vector 21 hacia node-1-bottom)
    .to(vector21, { drawSVG: "100%", duration: 1.2 }, 1)

    // 11. Nodo inferior
    .to(node1Bottom, { drawSVG: "0% 100%", duration: 0.4 }, 2)

    // 12. Línea de retorno desde node-1-bottom (Vector 22)
    .to(vector22, { drawSVG: "100%", duration: 0.8 }, 2.2)

    // 13. Línea inferior larga (Vector 23)
    .to(vector23, { drawSVG: "100%", duration: 1.5 }, 2.3)

    // 14. Nodo final
    .to(nodeEnd, { drawSVG: "0% 100%", duration: 0.4 }, 4)

    // 15. Línea final después del nodo de fin
    .to(lineAfterEnd, { drawSVG: "100%", duration: 0.3 }, 4.3);
});

onUnmounted(() => {
  if (tl) {
    tl.kill();
  }
});
</script>

<template>
  <svg
    ref="svgRef"
    :width
    viewBox="0 0 838 225"
    fill="none"
    vector-effect="non-scaling-stroke"
    stroke-linejoin="round"
  >
    <g id="CircuitHorizontal">
      <g clip-path="url(#clip0_2176_2)">
        <circle
          id="node-start"
          cx="45.5"
          cy="138.5"
          r="17"
          stroke="var(--color-shadow-500)"
          stroke-width="2"
          vector-effect="non-scaling-stroke"
          class="opacity-40"
          fill="none"
        />
        <circle
          id="node-1-top"
          cx="391.5"
          cy="74.5"
          r="17"
          stroke="var(--color-shadow-500)"
          stroke-width="2"
          vector-effect="non-scaling-stroke"
          class="opacity-40"
          fill="none"
        />
        <circle
          id="node-1-bottom"
          cx="333.5"
          cy="207"
          r="17"
          stroke="var(--color-shadow-500)"
          stroke-width="2"
          vector-effect="non-scaling-stroke"
          class="opacity-40"
          fill="none"
        />
        <circle
          id="node-2-top"
          cx="583.5"
          cy="17.5"
          r="17"
          stroke="var(--color-shadow-500)"
          stroke-width="2"
          vector-effect="non-scaling-stroke"
          class="opacity-40"
          fill="none"
        />
        <circle
          id="node-end"
          cx="792.5"
          cy="138.5"
          r="17"
          stroke="var(--color-shadow-500)"
          stroke-width="2"
          vector-effect="non-scaling-stroke"
          class="opacity-40"
          fill="none"
        />
        <path
          id="Vector 17"
          d="M60 129L156.5 73.2857H374"
          stroke="var(--color-shadow-500)"
          stroke-width="2"
          vector-effect="non-scaling-stroke"
          class="opacity-40"
          fill="none"
        />
        <path
          id="Vector 18"
          d="M266 74L365.593 16.5H566.5"
          stroke="var(--color-shadow-500)"
          stroke-width="2"
          vector-effect="non-scaling-stroke"
          class="opacity-40"
          fill="none"
        />
        <path
          id="Vector 19"
          d="M778.5 129.831L598.66 26"
          stroke="var(--color-shadow-500)"
          stroke-width="2"
          vector-effect="non-scaling-stroke"
          class="opacity-40"
          fill="none"
        />
        <path
          id="Vector 20"
          d="M408.5 74H481L592.717 138.5"
          stroke="var(--color-shadow-500)"
          stroke-width="2"
          vector-effect="non-scaling-stroke"
          class="opacity-40"
          fill="none"
        />
        <path
          id="Vector 21"
          d="M101 139L219.646 207.5H316"
          stroke="var(--color-shadow-500)"
          stroke-width="2"
          vector-effect="non-scaling-stroke"
          class="opacity-40"
          fill="none"
        />
        <path
          id="Vector 22"
          d="M348.33 198.5L451.5 138.935"
          stroke="var(--color-shadow-500)"
          stroke-width="2"
          vector-effect="non-scaling-stroke"
          class="opacity-40"
          fill="none"
        />
        <path
          id="Vector 23"
          d="M350.5 206.5H569L687 138.373"
          stroke="var(--color-shadow-500)"
          stroke-width="2"
          vector-effect="non-scaling-stroke"
          class="opacity-40"
          fill="none"
        />
        <path
          id="line-afterend"
          d="M810 138.5H838"
          stroke="var(--color-shadow-500)"
          stroke-width="2"
          vector-effect="non-scaling-stroke"
          class="opacity-40"
          fill="none"
        />
        <path
          id="linea-beforestart"
          d="M28.2568 138.176H0.705078"
          stroke="var(--color-shadow-500)"
          stroke-width="2"
          vector-effect="non-scaling-stroke"
          class="opacity-40"
          fill="none"
        />
        <line
          id="line-starttoend"
          x1="63"
          y1="138.5"
          x2="776"
          y2="138.5"
          stroke="var(--color-shadow-500)"
          stroke-width="2"
          vector-effect="non-scaling-stroke"
          class="opacity-40"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_2176_2">
        <rect width="838" height="225" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>

<style scoped></style>
