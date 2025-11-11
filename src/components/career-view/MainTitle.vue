<script setup lang="ts">
import gsap from 'gsap'
import GradientViolet from '../components/backgrounds/GradientViolet.vue'
import { onMounted, onBeforeUnmount, nextTick } from 'vue'
import { SplitText } from 'gsap/all'
import { useTranslation } from 'i18next-vue'
import { useSoundStore } from '../../stores/useSoundStore'
import Body from './Body.vue'

const { i18next } = useTranslation()
const st = useSoundStore()

let tl: gsap.core.Timeline | null = null
let splitInstances: SplitText[] = []

function startAnimation() {
  killAnimation() // limpiar si ya existía algo

  const titleText = new SplitText('#career-title', { type: 'chars' })
  const logText = new SplitText('#career-sub-log', { type: 'chars' })
  const pText = new SplitText('#career-sub-p', { type: 'chars, lines' })

  splitInstances = [titleText, logText, pText]

  tl = gsap.timeline()

  // Estado inicial: invisibles
  tl.set([titleText.chars, logText.chars, pText.chars], { opacity: 0 })

  // Título
  tl.fromTo(
    titleText.chars,
    { opacity: 1 },
    {
      stagger: 0.05,
      duration: 0.1,
      onStart: function () {
        st.play(st.sounds['loading-1'])
      },
      onComplete: function () {
        st.sounds['loading-1'].howl.stop()
      }
    },
    0.5
  )

  // Log
  tl.fromTo(
    logText.chars,
    { opacity: 1 },
    {
      stagger: 0.01,
      duration: 0.1,
      onStart: function () {
        st.play(st.sounds['loading-1'])
      },
      onComplete: function () {
        st.sounds['loading-1'].howl.stop()
      }
    },
    1.2
  )

  // Párrafo
  tl.fromTo(
    pText.chars,
    { opacity: 1 },
    {
      stagger: 0.004,
      duration: 0.1,
      onStart: function () {
        st.play(st.sounds['loading-1'])
      },
      onComplete: function () {
        st.sounds['loading-1'].howl.stop()
      }
    },
    2
  )
}

function killAnimation() {
  if (tl) {
    tl.kill()
    tl = null
  }

  // detener sonido si sigue activo
  if (st.sounds['loading-1']?.howl) {
    st.sounds['loading-1'].howl.stop()
  }

  // revertir SplitText (quita los spans)
  splitInstances.forEach(function (instance) {
    instance.revert()
  })
  splitInstances = []
}

onMounted(function () {
  startAnimation()

  i18next.on('languageChanged', async () => {
    killAnimation()
    await nextTick()
    await nextTick()
    startAnimation()
  })
})

onBeforeUnmount(function () {
  killAnimation()
})

function test() {
  const toMove = document.getElementById('carrer-translation-circle')
}
</script>

<template>
  <div class="relative h-screen w-screen grid grid-cols-[40%_60%]">
    <Body/>
    <div class="flex flex-col items-start justify-center mr-12">
      <h1 id="career-title" class="text-ghost-100 font-mono font-light text-4xl">
        {{ $t('CAREER') }}
      </h1>
      <h2 id="career-sub-log" class="font-display font-normal text-ghost-200 text-xl my-4 text-left">
        {{ $t('[LOG: CAREER ANALYSIS — SUBJECT D-095]') }}
        <div id="carrer-translation-circle" class="inline-block border-[1px] border-ghost-100 h-3 w-3 rounded-full opacity-0"></div>
      </h2>
      <p id="career-sub-p" class="font-display font-light text-ghost-200 w-[500px] text-lg text-left break-normal">
        {{
          $t(
            "This simulation provides an analytical reconstruction of subject D-231’s professional records, academic conditioning, and behavioral directives. Extracted data is processed through the system’s evaluation core to determine operational stability and response accuracy. Findings contribute to the ongoing assessment of the subject’s technical cognition and adaptive progression."
          )
        }}
      </p>
    </div>
  </div>
</template>