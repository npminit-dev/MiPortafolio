<script setup lang="ts">
import { ref } from "vue";
import GradientDark from "../components/backgrounds/GradientDark.vue";
import SoundPrompt from "../components/start-view/SoundPrompt.vue";
import StartButton from "../components/start-view/StartButton.vue";

const showSoundPrompt = ref<boolean>(true);

function handleSoundAccepted() {
  showSoundPrompt.value = false;
}
</script>

<template>
  <div class="relative h-[100dvh] w-screen overflow-hidden">
    <GradientDark>
      <main class="h-full w-full flex items-center justify-center">
        <template v-if="showSoundPrompt">
          <SoundPrompt v-if="showSoundPrompt" @accept="handleSoundAccepted" />
        </template>
        <template v-else>
          <StartButton />
        </template>
      </main>
    </GradientDark>
  </div>
</template>

<style scoped></style>
