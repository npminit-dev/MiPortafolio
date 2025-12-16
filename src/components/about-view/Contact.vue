<script setup lang="ts">
import ContactForm from "./ContactForm.vue";
import gsap from "gsap";
import { nextTick, onBeforeUnmount, onMounted } from "vue";
import { useSoundStore } from "../../stores/useSoundStore";
import { useTranslation } from "i18next-vue";

const st = useSoundStore();
const mm = gsap.matchMedia();
const { i18next } = useTranslation();

let tl: gsap.core.Timeline | null = null;

onMounted(() => {
  startAnimations();
  i18next.on("languageChanged", languageChangeHandler);
});

onBeforeUnmount(() => {
  i18next.off("languageChanged", languageChangeHandler);
  killAnimations();
});

async function languageChangeHandler() {
  killAnimations();
  await nextTick();
  startAnimations();
}

function startAnimations() {
  mm.add("(min-width: 768px)", () => {
    tl = gsap.timeline();

    tl.call(
      function () {
        st.play(st.sounds["streak-2"]);
      },
      undefined,
      0.5
    )
      .call(
        function () {
          st.play(st.sounds["streak-3"]);
        },
        undefined,
        0.69
      )
      .call(
        function () {
          st.play(st.sounds["streak-1"]);
        },
        undefined,
        0.88
      )
      .call(
        function () {
          st.play(st.sounds["streak-2"]);
        },
        undefined,
        1.07
      )
      .call(
        function () {
          st.play(st.sounds["streak-3"]);
        },
        undefined,
        1.26
      )
      .call(
        function () {
          st.play(st.sounds["streak-1"]);
        },
        undefined,
        1.45
      )
      .call(
        function () {
          st.play(st.sounds["streak-2"]);
        },
        undefined,
        1.64
      )
      .call(
        function () {
          st.play(st.sounds["streak-4"]);
        },
        undefined,
        1.84
      );

    tl.fromTo(
      "#contact-picture-draw",
      {
        drawSVG: "0% 100%",
      },
      {
        drawSVG: "100% 100%",
        duration: 1.5,
        ease: "linear",
        delay: 0.5,
      },
      0
    );
  });
}

function killAnimations() {
  if (tl) {
    tl.kill();
    tl = null;
  }

  mm.revert();
}
</script>

<template>
  <div class="h-screen w-screen flex items-center justify-evenly">
    <ContactForm class="-mt-12 md:mt-0" />
    <div class="hidden md:flex items-center justify-center">
      <img class="h-[325px]" src="/image/myself-working-pencil-art.png" alt="" />
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
