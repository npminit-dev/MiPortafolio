<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';

const svgRef = ref<SVGSVGElement | null>(null);
let tl: gsap.core.Timeline | null = null;

onMounted(() => {
  if (!svgRef.value) return;

  const svg = svgRef.value;
  
  // Seleccionar todos los paths y circles dentro de este SVG específico
  const paths = svg.querySelectorAll('path');
  const circles = svg.querySelectorAll('circle');

  // Configurar DrawSVG en los paths (ocultos inicialmente)
  gsap.set(paths, { drawSVG: '0%' });
  
  // Configurar los círculos para dibujarse desde las 12 hasta las 6
  gsap.set(circles, { 
    drawSVG: '-25% -27',
    transformOrigin: 'center center'
  });

  // Crear timeline principal con ScrollTrigger
  tl = gsap.timeline({
    scrollTrigger: {
      trigger: svg,
      start: 'top 85%',
      end: 'bottom 85%',
      scrub: 1,
      toggleActions: 'play none none reverse'
    }
  });

  // Obtener elementos por índice dentro de este SVG específico
  const vector7 = paths[0];
  const vector8 = paths[1];
  const vector9 = paths[2];
  const vector10 = paths[3];
  const vector11 = paths[4];
  const vector12 = paths[5];
  
  const topNode = circles[0];
  const middleNode = circles[1];
  const bottomNode = circles[2];

  // Secuencia de animación siguiendo el flujo del circuito
  tl
    // 1. Path inicial desde arriba
    .to(vector7, { drawSVG: '100%', duration: 1 }, 0)
    
    // 2. Top node
    .to(topNode, { drawSVG: '-75% 25%', duration: 0.5 }, 0.8)
    
    // 3. Bifurcación: path central y path hacia middle-node (simultáneos)
    .to(vector9, { drawSVG: '100%', duration: 1.5 }, 1.2)
    .to(vector8, { drawSVG: '100%', duration: 1 }, 1.2)
    
    // 4. Middle node
    .to(middleNode, { drawSVG: '-75% 25%', duration: 0.5 }, 2)
    
    // 5. Path lateral (Vector 12) que sale del top-node
    .to(vector12, { drawSVG: '100%', duration: 1.2 }, 1.5)
    
    // 6. Bottom node
    .to(bottomNode, { drawSVG: '-75% 25%', duration: 0.5 }, 2.5)
    
    // 7. Path de retorno desde middle-node
    .to(vector10, { drawSVG: '-100%', duration: 0.8 }, 2.3)
    
    // 8. Path final hacia abajo
    .to(vector11, { drawSVG: '-100%', duration: 1 }, 2.9);
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
    width="211" 
    height="824" 
    viewBox="0 0 211 824" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    vector-effect="nonscale-stroke"
    stroke-linejoin="round"
    class=""
  >
    <g>
      <circle 
        cx="111.556" 
        cy="263.63" 
        r="17" 
        stroke="var(--color-shadow-500)" 
        stroke-width="2"
        stroke-linejoin="round"
        class="opacity-60"
        fill="none"
      />
      <circle 
        cx="192.471" 
        cy="383.858" 
        r="17" 
        stroke="var(--color-shadow-500)"
        stroke-width="2"
        stroke-linejoin="round"
        class="opacity-60"
        fill="none"
      />
      <circle 
        cx="111.556" 
        cy="544.462" 
        r="17" 
        stroke="var(--color-shadow-500)"
        stroke-width="2"
        stroke-linejoin="round"
        class="opacity-60"
        fill="none"
      />
      <path 
        d="M0.782471 0.944717L111.556 103.523V246.13" 
        stroke="var(--color-shadow-500)"
        stroke-width="2"
        stroke-linejoin="round"
        class="opacity-60"
        fill="none"
      />
      <path 
        d="M111.764 177.026L192.471 257.733V366.358" 
        stroke="var(--color-shadow-500)"
        stroke-width="2"
        stroke-linejoin="round"
        class="opacity-60"
        fill="none"
      />
      <path 
        d="M111.556 281.13V526.962" 
        stroke="var(--color-shadow-500)"
        stroke-width="2"
        stroke-linejoin="round"
        class="opacity-60"
        fill="none"
      />
      <path 
        d="M124.367 532.846L192.919 464.295V401.149" 
        stroke="var(--color-shadow-500)"
        stroke-width="2"
        stroke-linejoin="round"
        class="opacity-60"
        fill="none"
      />
      <path 
        d="M0.867432 823.281L111.556 712.593V561.962" 
        stroke="var(--color-shadow-500)"
        stroke-width="2"
        stroke-linejoin="round"
        class="opacity-60"
        fill="none"
      />
      <path 
        d="M100.475 276.423L54.7356 322.162V593.663L0.603271 647.796" 
        stroke="var(--color-shadow-500)"
        stroke-width="2"
        stroke-linejoin="round"
        class="opacity-60"
        fill="none"
      />
    </g>
  </svg>
</template>

<style scoped>
</style>