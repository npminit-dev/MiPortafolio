<script setup lang="ts">
  import { nextTick, onMounted } from 'vue';
  import gsap from 'gsap';
  import { useTranslation } from 'i18next-vue';
  import { v4 as uuidv4 } from 'uuid';
import { useSoundStore } from '../../stores/useSoundStore';

  type Props = {
    text: string
  }

  const props = defineProps<Props>()
  const { i18next, t } = useTranslation()
  const st = useSoundStore()
  const id = uuidv4()

  onMounted(async () => {
    startAnimation()

    i18next.on('languageChanged', async () => {
      killAnimation()
      await nextTick()
      startAnimation()
    })
  })

  function startAnimation() {
    gsap.fromTo(`#subtitle-${id}`, {
      opacity: 0
    }, {
      scrambleText: {
        text: props.text.toUpperCase(),
        chars: 'upperCase',
        speed: 5,
      },
      scrollTrigger: {
        trigger: `#subtitle-box-${id}`,
        start: 'top bottom',
        end: 'bottom top',
        toggleActions: 'play reset play reset',
      },
      opacity: 1,
      duration: 1,
      onStart: () => {
        const isPlaying = st.sounds['loading-5'].howl.playing()
        if(isPlaying) st.sounds['loading-5'].howl.stop()
        st.sounds['loading-5'].howl.play()
      },
      onComplete: () => {
        st.sounds['loading-5'].howl.stop()
      },
    })
  }

  function killAnimation() {
    const animation = gsap.getById(`#subtitle-${id}`)
    if(animation) animation.kill()
  }
  
</script>


<template>
  <h3 :id="`subtitle-box-${id}`" class="text-2xl font-mono text-ghost-100">
    [<span :id="`subtitle-${id}`" class="">{{$t(props.text.toUpperCase())}}</span>]
  </h3>
</template>

<style>

</style>

