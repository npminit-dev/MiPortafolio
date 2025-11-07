<script setup lang="ts">
import { ref } from 'vue';
import GradientDark from '../components/backgrounds/GradientDark.vue';
import SoundPrompt from '../components/start-view/SoundPrompt.vue';
import StartButton from '../components/start-view/StartButton.vue';

const showSoundPrompt = ref<boolean>(true)

function handleSoundAccepted() {
  showSoundPrompt.value = false
}
</script>

<template>
  <div class="relative h-screen w-screen overflow-hidden">
    <GradientDark>
      <main class="h-full w-full flex items-center justify-center">
        <SoundPrompt 
          v-if="showSoundPrompt"
          @accept="handleSoundAccepted"
        />
        
        <StartButton v-else />
      </main>
    </GradientDark>
  </div>
</template>

<style scoped>

</style>