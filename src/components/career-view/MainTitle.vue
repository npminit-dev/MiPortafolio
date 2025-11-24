<script setup lang="ts">
import gsap from 'gsap'
import { onMounted, onBeforeUnmount, nextTick } from 'vue'
import { SplitText } from 'gsap/all'
import { useTranslation } from 'i18next-vue'
import { useSoundStore } from '../../stores/useSoundStore'

interface Props {
  titleKey: string
  subtitleKey: string
  descriptionKey: string
  showCircle?: boolean
  descriptionWidth?: string
  spinningImage?: string
  imageSize?: string
  imageOpacity?: string
}

const props = withDefaults(defineProps<Props>(), {
  showCircle: true,
  descriptionWidth: '500px',
  spinningImage: '/image/dashed-circle-hd.png',
  imageSize: '1000px',
  imageOpacity: '40'
})

const { i18next } = useTranslation()
const st = useSoundStore()

let tl: gsap.core.Timeline | null = null
let splitInstances: SplitText[] = []

function startAnimation() {
  killAnimation()

  const titleText = new SplitText('#animated-title', { type: 'chars' })
  const logText = new SplitText('#animated-subtitle', { type: 'chars' })
  const pText = new SplitText('#animated-description', { type: 'chars, lines' })
  const circle = document.getElementById('rotating-circle')

  splitInstances = [titleText, logText, pText]

  tl = gsap.timeline()

  tl.set([titleText.chars, logText.chars, pText.chars], { opacity: 0 })

  // Circulo
  tl.to(circle, {
    rotateZ: 360,
    repeat: -1,
    duration: 120,
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
        st.play(st.sounds['loading-1'])
      },
      onComplete: function () {
        st.sounds['loading-1'].howl.stop()
      }
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
      },
      onComplete: function () {
        st.sounds['loading-1'].howl.stop()
      }
    },
    '>.5'
  )
}

function killAnimation() {
  if (tl) {
    tl.kill()
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
</script>

<template>
  <div class="relative h-screen w-screen grid grid-cols-[40%_60%]">
    <!-- Slot para componentes SVG animados (como Body) -->
    <slot name="animated-body" />

    <div class="relative flex flex-col items-start justify-center mr-12">
      <h1 id="animated-title" class="text-ghost-100 font-mono font-light text-4xl">
        {{ $t(titleKey) }}
      </h1>
      <h2 id="animated-subtitle" class="font-display font-normal text-ghost-200 text-xl my-4 text-left">
        {{ $t(subtitleKey) }}
        <div 
          v-if="showCircle"
          class="inline-block border-[1px] border-ghost-100 h-3 w-3 rounded-full opacity-0"
        ></div>
      </h2>
      <p 
        id="animated-description" 
        class="font-display font-light text-ghost-200 text-lg text-left break-normal leading-tight"
        :style="{ width: descriptionWidth }"
      >
        {{ $t(descriptionKey) }}
      </p>
    </div>

    <div class="absolute h-full w-full flex items-center justify-center object-contain mask-fade">
      <img
        id="rotating-circle"
        :src="spinningImage"
        :class="`opacity-${imageOpacity}`"
        :style="{ width: imageSize, height: imageSize }"
        alt=""
      />
    </div>
  </div>
</template>

<style scoped>
.mask-fade {
  mask-image: linear-gradient(
    to bottom,
    transparent 20%,
    black 60%,
    black 40%,
    transparent 80%
  );
  mask-size: 100% 100%;
  mask-repeat: no-repeat;
}
</style>