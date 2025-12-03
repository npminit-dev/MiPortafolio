<script setup lang="ts">
import { ref, onMounted, nextTick, useTemplateRef } from 'vue'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(Flip, ScrollTrigger)

const containerRef = useTemplateRef<HTMLElement>('containerRef')
const items = ref([3, 6, 1, 2, 5, 4])

const animateSort = () => {
  if (!containerRef.value) return
  
  const boxes = containerRef.value.querySelectorAll('.box')
  const tl = gsap.timeline()

  tl.call(() => {
    const state = Flip.getState(boxes)
    items.value = [3, 1, 6, 2, 4, 5]
    nextTick(() => {
      Flip.from(state, {
        duration: 0.5,
        ease: 'power2.inOut',
        absolute: true
      })
    })
  })
  tl.to({}, { duration: 0.5 })
  tl.to({}, { duration: 0.1 })

  tl.call(() => {
    const state = Flip.getState(boxes)
    items.value = [1, 3, 2, 4, 5, 6]
    nextTick(() => {
      Flip.from(state, {
        duration: 0.5,
        ease: 'power2.inOut',
        absolute: true
      })
    })
  })
  tl.to({}, { duration: 0.5 })
  tl.to({}, { duration: 0.1 })

  tl.call(() => {
    const state = Flip.getState(boxes)
    items.value = [1, 2, 3, 4, 5, 6]
    nextTick(() => {
      Flip.from(state, {
        duration: 0.5,
        ease: 'power2.inOut',
        absolute: true
      })
    })
  })
  tl.to({}, { duration: 0.2 })
  
  return tl
}

const animateUnsort = () => {
  if (!containerRef.value) return
  
  const boxes = containerRef.value.querySelectorAll('.box')
  const state = Flip.getState(boxes)
  items.value = [3, 6, 1, 2, 5, 4]
  nextTick(() => {
    Flip.from(state, {
      duration: 0.6,
      ease: 'power2.inOut',
      absolute: true
    })
  })
}

onMounted(() => {
  if (!containerRef.value) return

  ScrollTrigger.create({
    trigger: containerRef.value,
    start: 'center bottom',
    end: 'center top',
    toggleActions: 'play reset play reset',
    onEnter: () => animateSort(),
    onLeave: () => animateUnsort(),
    onEnterBack: () => animateSort(),
    onLeaveBack: () => animateUnsort()
  })
})
</script>

<template>
  <div ref="containerRef" class="flex items-center justify-center gap-2 p-2 flex-nowrap font-display text-xl text-ghost-300 border-[1px] border-ghost-300/20">
    <div 
      v-for="num in items" 
      :key="`container-${num}`"
      class="box-container h-14 w-14"
    >
      <div class="box h-full w-full border-[1px] border-ghost-300/70 bg-void-950 flex items-center justify-center">
        {{ num }}
      </div>
    </div>
  </div>
</template>

<style>

</style>