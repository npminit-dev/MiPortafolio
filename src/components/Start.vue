<script setup lang="ts">
import { useSoundStore } from '../stores/useSoundStore';
import { onMounted, ref, watch, nextTick } from 'vue';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { usePageTransition } from '../composables/usePageTransition';

const st = useSoundStore()
const { triggerTransition } = usePageTransition()

const isHovered = ref<boolean>(false)
const isClicked = ref<boolean>(false)
const showSoundPrompt = ref<boolean>(true)
const innerRef = ref<HTMLElement | null>(null)
const outerRef = ref<HTMLElement | null>(null)
const textRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const title1Ref = ref<HTMLElement | null>(null)
const title2Ref = ref<HTMLElement | null>(null)

let hoverTimeline: gsap.core.Timeline | null = null
let splitTitle1: any = null
let splitTitle2: any = null

onMounted(() => {
  animateTextIn()
})

function animateTextIn() {
  nextTick(() => {
    if (!title1Ref.value || !title2Ref.value) return
    
    splitTitle1 = new SplitText(title1Ref.value, { type: 'chars' })
    splitTitle2 = new SplitText(title2Ref.value, { type: 'chars' })
    
    const tl = gsap.timeline()
    
    tl.from(splitTitle1.chars, {
      opacity: 0,
      y: 10,
      stagger: 0.01,
      duration: 0.5,
      ease: 'power2.out'
    })
    
    tl.from(splitTitle2.chars, {
      opacity: 0,
      y: 10,
      stagger: 0.01,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.6')
    
    tl.to([title1Ref.value, title2Ref.value], {
      textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
      duration: 0.5,
      ease: 'power2.inOut'
    }, '-=0.3')
  })
}

function handleAccept() {
  st.play(st.sounds['select-2'])
  
  if (!title1Ref.value || !title2Ref.value) return
  
  const tl = gsap.timeline({
    onComplete: () => {
      st.setSoundEnabled(true)
      showSoundPrompt.value = false
      
      if (splitTitle1) splitTitle1.revert()
      if (splitTitle2) splitTitle2.revert()
      
      nextTick(() => {
        animateMainScreenIn()
      })
    }
  })
  
  tl.to([title1Ref.value, title2Ref.value], {
    textShadow: '0 0 0px rgba(255, 255, 255, 0)',
    duration: 0.2,
    ease: 'power2.in'
  })
  
  tl.to(splitTitle2.chars, {
    opacity: 0,
    y: -10,
    stagger: 0.01,
    duration: 0.3,
    ease: 'back.in(1.7)'
  }, '-=0.1')
  
  tl.to(splitTitle1.chars, {
    opacity: 0,
    y: -10,
    stagger: 0.01,
    duration: 0.3,
    ease: 'back.in(1.7)',
    onStart: () => {
      st.play(st.sounds['background-2'])
    }
  }, '-=0.3')
}

function animateMainScreenIn() {
  if (!containerRef.value) return
  
  gsap.set(containerRef.value, { opacity: 0, scale: 0.9 })
  
  const tl = gsap.timeline()
  
  tl.to(containerRef.value, {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: 'power2.out'
  })
  
  tl.to(innerRef.value, {
    scale: 1.05,
    duration: 0.6,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: 1
  }, '-=0.4')
}

function handleStart() {
  if (isClicked.value) return
  
  isClicked.value = true
  st.play(st.sounds['select-2'])
  
  // Keep hover state
  isHovered.value = true
  
  // Click animation
  if (innerRef.value) {
    gsap.timeline()
      .to(innerRef.value, {
        scale: 0.95,
        duration: 0.1,
        ease: 'power2.in'
      })
      .to(innerRef.value, {
        scale: 1,
        duration: 0.3,
        ease: 'elastic.out(1, 0.6)'
      })
  }
  
  // Trigger page transition to main menu
  triggerTransition('/main')
}

watch(isHovered, (newValue) => {
  if (isClicked.value) return // Don't animate if already clicked
  if (!innerRef.value || !outerRef.value || !textRef.value) return
  
  if (hoverTimeline) {
    hoverTimeline.kill()
  }
  
  hoverTimeline = gsap.timeline()
  
  if (newValue) {
    hoverTimeline
      .to(innerRef.value, {
        width: 375,
        height: 375,
        backgroundColor: 'var(--color-ghost-300)',
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      }, 0)
      .to(outerRef.value, {
        width: 400,
        height: 400,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.inOut'
      }, 0)
      .to(textRef.value, {
        color: 'var(--color-shadow-100)',
        scale: 1.05,
        duration: 0.5,
        ease: 'back.out(1.7)'
      }, 0.1)
  } else {
    hoverTimeline
      .to(innerRef.value, {
        width: 400,
        height: 400,
        backgroundColor: 'transparent',
        opacity: 0.3,
        duration: 0.4,
        ease: 'power2.inOut'
      }, 0)
      .to(outerRef.value, {
        width: 900,
        height: 900,
        opacity: 0.2,
        duration: 0.6,
        ease: 'power2.inOut'
      }, 0)
      .to(textRef.value, {
        color: 'var(--color-ghost-100)',
        scale: 1,
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0)
  }
})

</script>

<template>
  <div
    v-if="showSoundPrompt"
    class="w-full h-full flex flex-col items-center justify-center gap-4 cursor-pointer" 
    @click="handleAccept"
  >
    <h1 
      ref="title1Ref"
      class="text-ghost-100 font-display text-3xl font-light"
    >
      {{ $t('THIS PORTFOLIO HAS SOUND EFFECTS') }}
    </h1>
    <h2 
      ref="title2Ref"
      class="text-ghost-100 font-display text-3xl font-light"
    >
      {{ $t('CLICK ANYWHERE TO ACCEPT') }}
    </h2>
  </div>

  <div 
    v-else
    ref="containerRef"
    id="container" 
    class="w-[500px] h-[500px] flex items-center justify-center"
  >
    <img 
      id="dashed" 
      src="/image/dashed-circle.png" 
      class="absolute h-[500px] w-[500px] object-cover opacity-30"
    >
    
    <div 
      @click="handleStart"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      class="absolute h-[400px] w-[400px] rounded-full flex items-center justify-center cursor-pointer"
    >
      <div 
        ref="innerRef"
        id="inner" 
        class="absolute h-[400px] w-[400px] border-2 border-ghost-300 rounded-full opacity-30 flex items-center justify-center pointer-events-none"
      />
    </div>
    
    <div 
      ref="outerRef"
      id="outer" 
      class="absolute h-[900px] w-[900px] border-[1px] border-ghost-300 rounded-full opacity-20 pointer-events-none"
    />
    
    <h1 
      ref="textRef"
      id="start-text" 
      class="text-3xl font-display text-ghost-100 z-10 pointer-events-none"
    >
      {{ $t('START') }}
    </h1>
  </div>
</template>

<style scoped>
  #dashed {
    stroke-dasharray: 2px 10px;
    animation: rotateDashed 180s linear infinite;
  }

  @keyframes rotateDashed {
    from {
      transform: rotateZ(0deg);
    } to {
      transform: rotateZ(360deg)
    }
  }
</style>