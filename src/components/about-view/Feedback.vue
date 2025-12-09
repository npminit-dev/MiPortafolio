<script setup lang="ts">
import gsap from 'gsap';
import { useTranslation } from 'i18next-vue';
import { onMounted } from 'vue';

const { i18next } = useTranslation()

onMounted(() => {
  startAnimations()
})

function startAnimations() {
  gsap.fromTo('#feedback-picture-draw', {
    drawSVG: '0% 100%'
  }, {
    drawSVG: '0% 0%',
    duration: 1.5,
    ease: 'linear',
    delay: .5
  })
}

</script>

<template>
  <div class="h-screen w-screen flex items-center justify-evenly px-8">
    <div class="relative flex items-center justify-center">
      <img class="h-[500px] saturate-200" src="/image/hand-with-ideas.png" alt="">
      <svg class="absolute" height="520" viewBox="0 0 682 741" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          id="feedback-picture-draw"
          d="M16.8555 55.4399L661.355 85.4399L10.3555 152.44L650.355 189.44L5.85547 249.94L639.855 299.44L5.85547 353.94L637.355 383.94L5.85547 450.94L617.855 463.94L92.3555 535.44H626.855L213.355 643.44L656.855 610.94L496.855 690.94"
          stroke="#C9D6E8" stroke-width="111" />
      </svg>
    </div>
    <div class="flex flex-col items-center justify-center font-display text-center">
      <h2 class="text-2xl font-semibold text-void-800">{{ $t('Help me improve this site!') }}</h2>
      <p class="text-lg font-medium text-void-800 mt-4 mb-8 leading-tight max-w-[300px]">{{ $t('Do you like how this website looks? The style, the fonts, the animations, the concept? If not, how could I improve it?') }}</p>
      <div class="flex items-center justify-center">
        <div class="w-12 h-12 mr-4 border-[1px] border-void-800 flex items-center justify-center rounded-full cursor-pointer group hover:bg-void-800 duration-200">
          <v-icon name="bi-hand-thumbs-up" class="size-6 text-void-800 group-hover:text-ghost-300"/>
        </div>
        <div class="w-12 h-12 border-[1px] border-void-800 flex items-center justify-center rounded-full cursor-pointer group hover:bg-void-800 duration-200">
          <v-icon name="bi-hand-thumbs-down" class="size-6 text-void-800 group-hover:text-ghost-300"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>