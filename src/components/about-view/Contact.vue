<script setup lang="ts">
import ContactForm from "./ContactForm.vue";
import gsap from "gsap";
import { onBeforeUnmount, onMounted } from "vue";
import { sleep } from "../../utils";
import { useSoundStore } from "../../stores/useSoundStore";

const st = useSoundStore();

onMounted(() => {
  startAnimations();
});

onBeforeUnmount(() => {
  stopAllDrawingSounds();
});

async function startDrawingSounds() {
  await sleep(500);
  st.play(st.sounds["streak-2"]);
  await sleep(190);
  st.play(st.sounds["streak-3"]);
  await sleep(190);
  st.play(st.sounds["streak-1"]);
  await sleep(190);
  st.play(st.sounds["streak-2"]);
  await sleep(190);
  st.play(st.sounds["streak-3"]);
  await sleep(190);
  st.play(st.sounds["streak-1"]);
  await sleep(190);
  st.play(st.sounds["streak-2"]);
  await sleep(200);
  st.play(st.sounds["streak-4"]);
  await sleep(200);
}

function stopAllDrawingSounds() {
  st.sounds["streak-1"].howl.stop();
  st.sounds["streak-2"].howl.stop();
  st.sounds["streak-3"].howl.stop();
  st.sounds["streak-4"].howl.stop();
}

function startAnimations() {
  startDrawingSounds();
  gsap.fromTo(
    "#contact-picture-draw",
    {
      drawSVG: "0% 100%",
    },
    {
      drawSVG: "100% 100%",
      duration: 1.5,
      ease: "linear",
      delay: 0.5,
      onInterrupt: stopAllDrawingSounds,
    }
  );
}
</script>

<template>
  <div class="h-screen w-screen flex items-center justify-evenly">
    <ContactForm />
    <div class="flex items-center justify-center">
      <img class="h-[480px]" src="/image/myself-working-pencil-art.png" alt="" />
      <svg class="absolute" width="489" height="435" viewBox="0 0 489 435" fill="none">
        <path
          id="contact-picture-draw"
          d="M44.8623 44.3159L472.362 83.3159L12.3623 127.816L477.862 160.316L14.8623 222.816L466.362 241.316L5.8623 291.816L473.362 320.816L4.8623 372.316L486.862 389.816"
          stroke="#C9D6E8"
          stroke-width="89"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped></style>
