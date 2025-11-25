<script setup lang="ts">
import { onMounted, onBeforeUnmount, useTemplateRef } from 'vue'
import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger)

interface Props {
  height?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  height: 553
})

const svgRef = useTemplateRef('svgRef')
let scrollTriggerInstance: ScrollTrigger | null = null

function startAnimation() {
  if (svgRef.value) {
    // Seleccionar elementos por nivel
    const raiz = svgRef.value.querySelector('#raiz')
    const lineasNivel1 = svgRef.value.querySelectorAll('.linea-nivel-1')
    const nodosNivel1 = svgRef.value.querySelectorAll('.nodo-nivel-1')
    const lineasNivel2 = svgRef.value.querySelectorAll('.linea-nivel-2')
    const nodosNivel2 = svgRef.value.querySelectorAll('.nodo-nivel-2')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svgRef.value,
        start: 'top 90%',
        end: 'bottom top',
        toggleActions: 'play reset play reset',
        onRefresh: (self) => {
          scrollTriggerInstance = self
        }
      }
    })

    scrollTriggerInstance = tl.scrollTrigger as ScrollTrigger

    tl.fromTo(raiz, {
      drawSVG: '-25% -25%'
    }, {
      drawSVG: '-75% 25%',
      duration: 0.65,
      ease: 'power2.in'
    })
      .fromTo(lineasNivel1, {
        drawSVG: '0% 0%'
      }, {
        drawSVG: '0% 100%',
        duration: 0.65,
        ease: 'power2.out'
      }, '-=0.1')
      .fromTo(nodosNivel1, {
        drawSVG: '-25% -25%'
      }, {
        drawSVG: '-75% 25%',
        duration: 0.65,
        ease: 'power2.out'
      }, '-=0.4')
      .fromTo(lineasNivel2, {
        drawSVG: '0% 0%'
      }, {
        drawSVG: '0% 100%',
        duration: 0.65,
        ease: 'power2.out'
      }, '-=0.4')
      .fromTo(nodosNivel2, {
        drawSVG: '-25% -25%'
      }, {
        drawSVG: '-75% 25%',
        duration: 0.65,
        ease: 'power2.out'
      }, '-=0.4')
  }
}

function killAnimations() {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill()
  }
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
}

onMounted(() => {
  startAnimation()
})

onBeforeUnmount(() => {
  killAnimations()
})
</script>

<template>
  <svg ref="svgRef" :height="props.height" viewBox="0 0 505 553" fill="none" style="width: auto; display: block;"
    preserveAspectRatio="xMidYMid meet">
    <!-- Raíz (nivel 0) -->
    <circle id="raiz" cx="253.204" cy="40.1238" r="35.824" stroke="white" stroke-width="2"
      vector-effect="non-scaling-stroke" />

    <!-- Líneas nivel 1 (raíz a hijos) -->
    <line class="linea-nivel-1" x1="224.133" y1="61.0736" x2="133.853" y2="217.443" stroke="white" stroke-width="1"
      vector-effect="non-scaling-stroke" stroke-linecap="round" />
    <line class="linea-nivel-1" x1="282.748" y1="60.639" x2="373.53" y2="217.878" stroke="white" stroke-width="1"
      vector-effect="non-scaling-stroke" stroke-linecap="round" />

    <!-- Nodos nivel 1 (2 hijos) -->
    <circle class="nodo-nivel-1" cx="116.369" cy="249.322" r="35.824" stroke="white" stroke-width="2"
      vector-effect="non-scaling-stroke" />
    <circle class="nodo-nivel-1" cx="390.996" cy="249.595" r="35.824" stroke="white" stroke-width="2"
      vector-effect="non-scaling-stroke" />

    <!-- Líneas nivel 2 (hijos a nietos) -->
    <line class="linea-nivel-2" x1="101.679" y1="281.462" x2="49.4654" y2="476.326" stroke="white" stroke-width="1"
      vector-effect="non-scaling-stroke" stroke-linecap="round" />
    <line class="linea-nivel-2" x1="132.861" y1="281.462" x2="185.075" y2="476.326" stroke="white" stroke-width="1"
      vector-effect="non-scaling-stroke" stroke-linecap="round" />
    <line class="linea-nivel-2" x1="375.405" y1="282.498" x2="323.192" y2="477.361" stroke="white" stroke-width="1"
      vector-effect="non-scaling-stroke" stroke-linecap="round" />
    <line class="linea-nivel-2" x1="406.588" y1="282.498" x2="458.801" y2="477.361" stroke="white" stroke-width="1"
      vector-effect="non-scaling-stroke" stroke-linecap="round" />

    <!-- Nodos nivel 2 (4 nietos/hojas) -->
    <circle class="nodo-nivel-2" cx="38.7651" cy="510.877" r="35.824" stroke="white" stroke-width="2"
      vector-effect="non-scaling-stroke" />
    <circle class="nodo-nivel-2" cx="192.099" cy="511.763" r="35.824" stroke="white" stroke-width="2"
      vector-effect="non-scaling-stroke" />
    <circle class="nodo-nivel-2" cx="315.248" cy="512.677" r="35.824" stroke="white" stroke-width="2"
      vector-effect="non-scaling-stroke" />
    <circle class="nodo-nivel-2" cx="466.223" cy="512.876" r="35.824" stroke="white" stroke-width="2"
      vector-effect="non-scaling-stroke" />
  </svg>
</template>

<style scoped></style>