<script setup lang='ts'>
  import { useSoundStore } from '../../stores/useSoundStore.ts'

  const soundSt = useSoundStore()

  function toggle() {
    if(soundSt.isSoundEnabled) {
      soundSt.setSoundEnabled(false)
    } else soundSt.setSoundEnabled(true)
  }

</script>

<template>
  <button type="button" @click="soundSt.setSoundEnabled(true)">activate</button>
  <br>
  <button type="button" @click="soundSt.play(soundSt.sounds['background-2'])">play background</button>
  <br>
  <button type="button" @click="soundSt.play(soundSt.sounds['select-1'])">play fx</button>
  <br>
  <button type="button" @click="soundSt.play(soundSt.sounds['select-2'])">play fx</button>
  <br>
  <button type="button" @click="soundSt.play(soundSt.sounds['select-3'])">play fx</button>
  <br>
  <button type="button" @click="soundSt.play(soundSt.sounds['select-4'])">play fx</button>
  <br>
  <button type="button" @click="soundSt.play(soundSt.sounds['select-5'])">play fx</button>

  <br>
  <button @click="toggle">
    toggle volume
  </button>
</template>