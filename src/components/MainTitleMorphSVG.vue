<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";
import { gsap } from "gsap";

// Definición de tipos
interface Props {
  start: string;
  middle: string;
  end: string;
}

// Props del componente
const { paths } = defineProps<{
  paths: Props;
}>();

const morphPath = useTemplateRef<SVGPathElement>('morphPath');
const svgContainer = useTemplateRef<SVGSVGElement>('svgContainer');

onMounted(() => {
  if (morphPath.value && svgContainer.value) {
    // Timeline de animaciones usando solo MorphSVG
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#maintitle-container',
        start: 'top bottom',
        end: 'bottom top',
        toggleActions: 'play pause play pause',
        immediateRender: true
      }
    });

    // 0. Estado inicial: path comienza como línea (invisible)
    gsap.set(morphPath.value, {
      attr: { d: paths.start },
      opacity: 0
    });

    // 1. Aparecer (fade in de la línea)
    tl.to(morphPath.value, {
      opacity: 1,
      duration: 0.3,
      delay: 1
    });

    // 2. Morph de línea a rectángulo
    tl.to(morphPath.value, {
      morphSVG: {
        shape: paths.middle,
        origin: '50% 50%'
      },
      duration: 0.5,
      ease: "power2.out",
      delay: .5
    });

    // 3. Pequeña pausa
    tl.to({}, { duration: 0.3 });

    // 4. Morph de rectángulo a cuerpo
    tl.to(morphPath.value, {
      morphSVG: {
        shape: paths.end,
        origin: '50% 50%'
      },
      duration: .8,
      fill: '#c9d6e811',
      ease: "power2.out"
    });
  }
});
</script>

<template>
  <div class="self-center justify-self-end">
    <svg ref="svgContainer" width="250" height="350" viewBox="0 0 338 800" fill="none" vector-effect="nonscaling-stroke"
      xmlns="http://www.w3.org/2000/svg">
      <path ref="morphPath" :d="paths.start" stroke="white" />
    </svg>
  </div>
</template>

<style scoped></style>