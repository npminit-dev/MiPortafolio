<script setup lang="ts">
import { watch, nextTick, useTemplateRef } from 'vue'
import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { usePageTransition } from '../composables/usePageTransition'
import { useSoundStore } from '../stores/useSoundStore'

// Register MorphSVG
gsap.registerPlugin(MorphSVGPlugin)

const { isTransitioning, completeTransition } = usePageTransition()
const st = useSoundStore()

// Use useTemplateRef instead of ref
const containerRef = useTemplateRef<HTMLDivElement>('container')
const svgRef = useTemplateRef<SVGElement>('svg')
const pathRef = useTemplateRef<SVGPathElement>('path')

// Initial small circle path (center of screen)
const initialPath = "M 500,500 m -10,0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0"

// Large organic blob
const blobPath = "M 500,20 L 550,280 L 800,150 L 680,380 L 950,450 L 700,550 L 880,800 L 600,700 L 550,980 L 450,700 L 200,850 L 320,550 L 50,480 L 280,400 L 120,150 L 400,300 Z"

watch(isTransitioning, (newValue) => {
  if (newValue) {
    // Wait for DOM to update
    nextTick(() => {  
      if (pathRef.value && svgRef.value && containerRef.value) {
        animateTransition()
      } else {
      }
    })
  }
})

function animateTransition() {
  if (!pathRef.value || !svgRef.value || !containerRef.value) {
    return
  }

  const tl = gsap.timeline({
    onComplete: () => {
      completeTransition()
    }
  })

  // Make container visible
  gsap.set(containerRef.value, { opacity: 1 })

  // Wait 1 second
  tl.to({}, { 
    duration: 1,
  })

  // Morph from circle to blob (1 second)
  tl.to(pathRef.value, {
    morphSVG: blobPath,
    duration: 1,
    ease: 'power2.inOut',
    onStart: () => {
      st.play(st.sounds['transition-1'])
    }
  })

  // Scale up to fill screen (same time as morph)
  tl.to(svgRef.value, {
    scale: 4,
    duration: 1,
    ease: 'power2.inOut',
  }, '<')
  
  // Fade out (1 second)
  tl.to(containerRef.value, {
    opacity: 0,
    duration: .5,
    ease: 'power2.inOut',
    onComplete: () => {
      // Reset for next use
      gsap.set(containerRef.value, { opacity: 0 })
      gsap.set(svgRef.value, { scale: 1 })
      gsap.set(pathRef.value, { morphSVG: initialPath })
    }
  })
}

</script>

<template>
  <div 
    v-if="isTransitioning"
    ref="container"
    class="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-transparent"
    style="opacity: 0"
  >
    <svg
      ref="svg"
      viewBox="0 0 1000 1000"
      class="w-full h-full"
      style="filter: blur(30px)"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        ref="path"
        :d="initialPath"
        fill="#ddd"
      />
    </svg>
  </div>
</template>