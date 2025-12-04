<script setup lang="ts">
import gsap from 'gsap'
import { onMounted, onBeforeUnmount, nextTick } from 'vue'
import { SplitText } from 'gsap/all'
import { useTranslation } from 'i18next-vue'
import { useSoundStore } from '../stores/useSoundStore'
import { ScrollTrigger } from 'gsap/all'

interface Props {
  titleKey: string
  subtitleKey: string
  descriptionKey: string
  showCircle?: boolean
  descriptionWidth?: string
  spinningImage?: string
  imageSize?: number
  imageOpacity?: number
}

const props = withDefaults(defineProps<Props>(), {
  showCircle: true,
  descriptionWidth: '500px',
  spinningImage: '/image/dashed-circle-hd.png',
  imageSize: 1000,
  imageOpacity: 30
})

const { i18next } = useTranslation()
const st = useSoundStore()

let tl: gsap.core.Timeline | null = null
let splitInstances: SplitText[] = []

async function startAnimation() {

  const titleText = new SplitText('#animated-title', { type: 'chars' })
  const logText = new SplitText('#animated-subtitle', { type: 'chars' })
  const pText = new SplitText('#animated-description', { type: 'chars, lines' })
  const circle = document.getElementById('rotating-circle')

  splitInstances = [titleText, logText, pText]

  tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#maintitle-container',
      start: () => 'top bottom',
      end: () => 'bottom top',
      toggleActions: 'play pause play pause',
      onLeave: () => {
        st.sounds['loading-1'].howl.pause()
      },
      onLeaveBack: () => {
        st.sounds['loading-1'].howl.pause()
      }
    }
  })

  tl.set([titleText.chars, logText.chars, pText.chars], { opacity: 0 })

  // Circulo
  tl.to(circle, {
    rotateZ: 360,
    repeat: -1,
    duration: 160,
    ease: 'linear'
  }, 0)

  // Título
  tl.fromTo(
    titleText.chars,
    { opacity: 1 },
    {
      stagger: 0.05,
      duration: 0.1,
      textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
      onStart: function () {
        gsap.set('#animated-title', { opacity: 1 })
        st.play(st.sounds['loading-1'])
      },
      onComplete: function () {
        st.sounds['loading-1'].howl.stop()
      },
    },
    0.5
  )

  // Subtitle
  tl.fromTo(
    logText.chars,
    { opacity: 1 },
    {
      stagger: 0.01,
      duration: 0.1,
      textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
      onStart: function () {
        gsap.set('#animated-subtitle', { opacity: 1 })
        st.play(st.sounds['loading-1'])
      },
      onComplete: function () {
        st.sounds['loading-1'].howl.stop()
      }
    },
    '>.5'
  )

  // Description
  tl.fromTo(
    pText.chars,
    { opacity: 1 },
    {
      stagger: 0.004,
      duration: 0.1,
      textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
      onStart: function () {
        st.play(st.sounds['loading-1'])
        gsap.set('#animated-description', { opacity: 1 })

      },
      onComplete: function () {
        st.sounds['loading-1'].howl.stop()
      },

    },
    '>.5'
  )
}

function killAnimation() {
  if (tl) {
    tl.kill()
    tl.scrollTrigger?.kill()
    tl = null
  }

  if (st.sounds['loading-1']?.howl) {
    st.sounds['loading-1'].howl.stop()
  }

  splitInstances.forEach(function (instance) {
    instance.revert()
  })
  splitInstances = []
}

onMounted(function () {

  document.fonts.addEventListener('loadingdone', async () => {
    startAnimation()

    i18next.on('languageChanged', async () => {
      killAnimation()
      await nextTick()
      startAnimation()
    })
  })
})

onBeforeUnmount(function () {
  killAnimation()
})
</script>

<template>
  <div id="maintitle-container" class="relative h-screen w-screen grid grid-cols-[40%_60%]">
    <!-- Slot para componentes SVG animados (como Body) -->
    <slot name="animated-body" />

    <div class="relative flex flex-col items-start justify-center mr-12">
      <h1 id="animated-title" class="text-ghost-100 font-mono font-light text-4xl opacity-0">
        {{ $t(props.titleKey) }}
      </h1>
      <h2 id="animated-subtitle" class="font-display font-normal text-ghost-200 text-xl my-4 text-left opacity-0">
        {{ $t(props.subtitleKey) }}
        <div v-if="showCircle" class="inline-block border-[1px] border-ghost-100 h-3 w-3 rounded-full opacity-0"></div>
      </h2>
      <p id="animated-description"
        class="font-display font-light text-ghost-200 text-lg text-left break-normal leading-tight opacity-0"
        :style="{ width: props.descriptionWidth }">
        {{ $t(props.descriptionKey) }}
      </p>
    </div>

    <div class="absolute h-full w-full flex items-center justify-center object-contain mask-fade">
      <img id="rotating-circle" :src="props.spinningImage" :class="`absolute opacity-${props.imageOpacity}`"
        :style="{ width: props.imageSize, height: props.imageSize }" alt="" />
      <div class="absolute border-[1px] border-ghost-100 rounded-full"
        :style="{ height: `${props.imageSize + 200}px`, width: `${props.imageSize + 200}px`, opacity: `${props.imageOpacity - 10}%` }">
      </div>
    </div>
  </div>
</template>

<style scoped>
.mask-fade {
  mask-image: linear-gradient(to bottom,
      transparent 20%,
      black 60%,
      black 40%,
      transparent 80%);
  mask-size: 100% 100%;
  mask-repeat: no-repeat;
}
</style>