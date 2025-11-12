<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useSoundStore } from '../../stores/useSoundStore';
import { useTranslation } from 'i18next-vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

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
let splitInstances: SplitText[] = []

onMounted(() => {
  killAnimations()
  startAnimation()

  i18next.on('languageChanged', async () => {
    killAnimations()
    await nextTick()
    await nextTick()
    startAnimation()
  })
})

onBeforeUnmount(() => {
  killAnimations()
})

function startAnimation() {
  // Estado inicial de todos los elementos SVG
  gsap.set(`#experience-svg-circle-${uniqueID}`, { drawSVG: '50% 50%' })
  gsap.set(`#experience-svg-line1-${uniqueID}`, { drawSVG: '0% 0%' })
  gsap.set(`#experience-svg-line2-${uniqueID}`, { drawSVG: '50% 50%' })

  // SplitText para los elementos de texto
  const h4Split = new SplitText(`#experience-company-${uniqueID}`, { type: 'chars' })
  const h5Split = new SplitText(`#experience-role-${uniqueID}`, { type: 'chars' })
  const pSplit = new SplitText(`#experience-description-${uniqueID}`, { type: 'words' })
  
  splitInstances = [h4Split, h5Split, pSplit]

  // Estado inicial: todos invisibles
  gsap.set([h4Split.chars, h5Split.chars, pSplit.words], { opacity: 0 })

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

  // 4. Animar textos (todos empiezan al mismo tiempo)
  const textStartTime = timeline.duration()

  // H4 - caracteres con stagger levemente mayor
  timeline.to(h4Split.chars, {
    opacity: 1,
    duration: 0.3,
    stagger: 0.02,
    textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
    ease: 'power2.out'
  }, textStartTime)

  // H5 - caracteres con stagger levemente mayor
  timeline.to(h5Split.chars, {
    opacity: 1,
    duration: 0.3,
    stagger: 0.02,
    textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
    ease: 'power2.out'
  }, textStartTime)

  // P - palabras con stagger menor
  timeline.to(pSplit.words, {
    opacity: 1,
    duration: 1,
    stagger: 0.007,
    ease: 'power2.out'
  }, textStartTime)

  // ScrollTrigger controla la timeline
  scrollTriggerInstance = ScrollTrigger.create({
    trigger: `#experience-${uniqueID}`,
    start: 'top 90%',
    end: 'bottom 20%',
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
  
  // Revertir SplitText
  splitInstances.forEach(instance => {
    instance.revert()
  })
  splitInstances = []
}
</script>

<template>
  <div :id="`experience-${uniqueID}`" class="grid grid-cols-[35%_65%] my-14 gap-4">
    <svg :id="`experience-svg-${uniqueID}`" width="293" height="160" viewBox="0 0 293 160" fill="none"
      class="self-center justify-self-end">
      <circle :id="`experience-svg-circle-${uniqueID}`" cx="80" cy="80" r="79.5" stroke="var(--color-ghost-300)" />
      <line :id="`experience-svg-line1-${uniqueID}`" x1="160" y1="79.5" x2="292" y2="79.5"
        stroke="var(--color-ghost-300)" />
      <line :id="`experience-svg-line2-${uniqueID}`" x1="292.5" y1="48" x2="292.5" y2="113"
        stroke="var(--color-ghost-300)" />
    </svg>

    <div class="font-display text-start max-w-[600px]">
      <h4 :id="`experience-company-${uniqueID}`" class="font-medium text-2xl text-ghost-100">
        {{ $t(props.company) }}
      </h4>
      <h5 :id="`experience-role-${uniqueID}`" class="font-normal text-xl text-ghost-200">
        {{ $t(props.role) }}
      </h5>
      <p :id="`experience-description-${uniqueID}`" class="leading-tight font-light text-lg text-ghost-100 my-2">
        {{ $t(props.description) }}
      </p>
    </div>
  </div>
</template>

<style></style>