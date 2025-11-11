<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useSoundStore } from '../../stores/useSoundStore';
import { useTranslation } from 'i18next-vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Props = {
  company: string,
  role: string,
  description: string
}

const props = defineProps<Props>()
const uniqueID = uuidv4()
const st = useSoundStore()
const { i18next } = useTranslation()

let timeline: gsap.core.Timeline | null = null
let scrollTriggerInstance: ScrollTrigger | null = null

onMounted(() => {
  killAnimations()
  startAnimation()

  i18next.on('languageChanged', async () => {
    killAnimations()
    await nextTick()
    startAnimation()
  })
})

onBeforeUnmount(() => {
  killAnimations()
})

function startAnimation() {
  // Estado inicial de todos los elementos
  gsap.set(`#experience-svg-circle-${uniqueID}`, { drawSVG: '50% 50%' })
  gsap.set(`#experience-svg-line1-${uniqueID}`, { drawSVG: '0% 0%' })
  gsap.set(`#experience-svg-line2-${uniqueID}`, { drawSVG: '50% 50%' })

  // Crear timeline con todas las animaciones secuenciales
  timeline = gsap.timeline({
    paused: true
  })

  // 1. Animar el círculo
  timeline.to(`#experience-svg-circle-${uniqueID}`, {
    drawSVG: '0% 100%',
    ease: 'power3.in',
    duration: 0.6
  })

  // 2. Animar línea 1
  timeline.to(`#experience-svg-line1-${uniqueID}`, {
    drawSVG: '0% 100%',
    ease: 'linear',
    duration: 0.1
  })

  // 3. Animar línea 2
  timeline.to(`#experience-svg-line2-${uniqueID}`, {
    drawSVG: '0% 100%',
    ease: 'power4.out',
    duration: 0.2
  })

  // ScrollTrigger controla la timeline
  scrollTriggerInstance = ScrollTrigger.create({
    trigger: `#experience-${uniqueID}`,
    start: 'top 95%',
    end: 'bottom 30%',
    animation: timeline,
    toggleActions: 'play reverse play reverse'
  })
}

function killAnimations() {
  if (timeline) {
    timeline.kill()
    timeline = null
  }
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill()
    scrollTriggerInstance = null
  }
}
</script>

<template>
  <div :id="`experience-${uniqueID}`" class="grid grid-cols-[40%_60%] my-12 gap-4">
    <svg :id="`experience-svg-${uniqueID}`" width="293" height="160" viewBox="0 0 293 160" fill="none"
      class="self-center justify-self-end">
      <circle :id="`experience-svg-circle-${uniqueID}`" cx="80" cy="80" r="79.5" stroke="var(--color-ghost-300)" />
      <line :id="`experience-svg-line1-${uniqueID}`" x1="160" y1="79.5" x2="292" y2="79.5"
        stroke="var(--color-ghost-300)" />
      <line :id="`experience-svg-line2-${uniqueID}`" x1="292.5" y1="48" x2="292.5" y2="113"
        stroke="var(--color-ghost-300)" />
    </svg>

    <div class="font-display text-start max-w-[500px]">
      <h4 :id="`experience-company-${uniqueID}`" class="font-medium text-2xl text-ghost-100">
        {{ $t(props.company) }}
      </h4>
      <h5 :id="`experience-role-${uniqueID}`" class="font-normal text-xl text-ghost-200">
        {{ $t(props.role) }}
      </h5>
      <p :id="`experience-description-${uniqueID}`" class="leading-tight font-light text-ghost-100 my-2">
        {{ $t(props.description) }}
      </p>
    </div>
  </div>
</template>

<style></style>