<script setup lang="ts">
  import { nextTick, onBeforeMount, onBeforeUnmount, onMounted } from 'vue';
  import { usePageTransition } from '../composables/usePageTransition';
  import { useSoundStore } from '../stores/useSoundStore';
  import gsap from 'gsap'
  import { useTranslation } from 'i18next-vue';

  type Props = {
    beforeBack?: () => void 
  }

  const { triggerTransition } = usePageTransition()
  const st = useSoundStore()
  const { i18next } = useTranslation()
  const { beforeBack } = defineProps<Props>()

  let timeline: gsap.core.Timeline

  function startAnimations() {
    const container = document.getElementById('back-menu-container')
    if(container) {
      const leftArrow = container.querySelector('.back-left') 
      const rightArrow = container.querySelector('.back-right') 
      const text = container.querySelector('.back-text') 
      
      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          toggleActions: 'play reset play reset'
        }
      })

      timeline.fromTo(leftArrow, {
        x: 75
      }, { 
        x: 0,
        ease: 'expo.out',
        duration: 1
      }, 0)

      timeline.fromTo(rightArrow, {
        x: -75
      }, { 
        x: 0,
        ease: 'expo.out',
        duration: 1
      }, 0)

      timeline.fromTo(text, {
        autoAlpha: 0
      }, {
        autoAlpha: 1,
        ease: 'power4.out',
        duration: 1.5
      }, .3)
    }
  }

  function killAnimations() {
    if(timeline) {
      timeline.scrollTrigger?.kill()
      timeline.kill()
    }
  }

  onMounted(() => {
    startAnimations()
    i18next.on('languageChanged', async () => {
      killAnimations()
      await nextTick()
      startAnimations()
    })
  })

  onBeforeUnmount(() => {
    killAnimations()
  })

  function handleHover() {
    st.play(st.sounds['hover-2'])
  }

  function handleBack() {
    killAnimations()
    st.play(st.sounds['select-1'])
    if(beforeBack) beforeBack()
    triggerTransition('/menu')
  }
</script>

<template>
  <div 
    id="back-menu-container" 
    class="flex items-center justify-center cursor-pointer" 
    @click="handleBack" 
    @mouseenter="handleHover"
  >
    <v-icon name="bi-chevron-compact-left" class="size-7 text-ghost-300 back-left"/>
    <span 
      class="back-text text-ghost-300 font-display font-medium text-xl"
    >
    {{ $t('Back to Central Node') }}
    </span>
    <v-icon name="bi-chevron-compact-right" class="size-7 text-ghost-300 back-right"/>
  </div>
</template>

<style scoped>
  #back-menu-container:hover {
    .back-left {
      color: var(--color-ghost-100)
    }
    .back-right {
      color: var(--color-ghost-100)
    }
    .back-text {
      color: var(--color-ghost-100)
    }
  }
</style>