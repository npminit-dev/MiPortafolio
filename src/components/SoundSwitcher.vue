<script setup lang="ts">
import { useTemplateRef, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { useSoundStore } from '../stores/useSoundStore'

const st = useSoundStore()
const svgRef = useTemplateRef<SVGSVGElement>('svg')
const waveRef = useTemplateRef<SVGPolylineElement>('wave')

let pointAnimations: gsap.core.Tween[] = []

const width = 35
const amplitude = 40
const frequency = 2
const segments = 10
const interval = width / segments

onMounted(() => {
  initializeWave()
  startWaveAnimation()
})

onUnmounted(() => {
  pointAnimations.forEach(anim => anim.kill())
  pointAnimations = []
})

function initializeWave() {
  if (!svgRef.value || !waveRef.value) return

  waveRef.value.points.clear()

  for (let i = 0; i < segments; i++) {
    const point = svgRef.value.createSVGPoint()
    point.x = i * interval
    point.y = 0
    waveRef.value.points.appendItem(point)
  }
}

function startWaveAnimation() {
  if (!waveRef.value) return
  const points = waveRef.value.points
  gsap.defaults({ ease: 'sine.inOut' })

  for (let i = 0; i < segments; i++) {
    const point = points.getItem(i)
    const norm = i / (segments - 1)

    const anim = gsap.to(point, {
      y: -amplitude / 2,
      repeat: -1,
      yoyo: true,
      duration: 1,
    }).progress(norm * frequency)

    pointAnimations.push(anim)
  }
}

function handleToggle() {
  st.setSoundEnabled(!st.isSoundEnabled)
}
</script>

<template>
  <button
    id="sound-switcher-container"
    ref="container"
    @click="handleToggle"
    class="relative flex items-center justify-center w-10 h-10 p-2 rounded-full border-[1px] transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 overflow-hidden bg-radial to-void-800 from-void-950 z-10"
    :class="st.isSoundEnabled 
      ? 'border-ghost-100' 
      : 'border-ghost-300/40'"
  >
    <div class="w-full h-full overflow-hidden flex items-center justify-center">
      <!-- Wave SVG -->
      <svg
        ref="svg"
        viewBox="-9 -19 50 20"
        class="w-12 h-6 flex items-center"
        :class="st.isSoundEnabled ? 'opacity-100' : 'opacity-40'"
      >
        <polyline 
          ref="wave"
          fill="none"
          :stroke="st.isSoundEnabled ? 'var(--color-ghost-100)' : 'var(--color-ghost-300)'"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </button>
</template>

<style scoped>
button:hover {
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  transition-duration: 600ms;
}
</style>
