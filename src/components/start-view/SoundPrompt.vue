<script setup lang="ts">
import { ref, nextTick, onMounted } from "vue";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useSoundStore } from "../../stores/useSoundStore";
import { useTranslation } from "i18next-vue";
import { useWindowSize } from "@vueuse/core";

const emit = defineEmits<{
  accept: [];
}>();

const st = useSoundStore();
const { i18next } = useTranslation();
const { width } = useWindowSize();

const title1Ref = ref<HTMLElement | null>(null);
const title2Ref = ref<HTMLElement | null>(null);

let splitTitle1: any = null;
let splitTitle2: any = null;

onMounted(async () => {
  gsap.set("#sound-prompt-container", { autoAlpha: 0 });
  await document.fonts.ready;
  gsap.set("#sound-prompt-container", { autoAlpha: 1 });
  animateTextIn();

  i18next.on("languageChanged", async () => {
    await nextTick();
    animateTextIn();
  });
});

function animateTextIn() {
  nextTick(() => {
    if (!title1Ref.value || !title2Ref.value) return;

    splitTitle1 = new SplitText(title1Ref.value, { type: "chars, words" });
    splitTitle2 = new SplitText(title2Ref.value, { type: "chars, words" });

    const tl = gsap.timeline();

    tl.from(splitTitle1.chars, {
      opacity: 0,
      y: width.value >= 768 ? 10 : width.value > 640 ? 8 : 6,
      stagger: 0.01,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.25,
    });

    tl.from(
      splitTitle2.chars,
      {
        opacity: 0,
        y: width.value >= 768 ? 10 : width.value > 640 ? 8 : 6,
        stagger: 0.01,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.6"
    );

    const mm = gsap.matchMedia([title1Ref.value, title2Ref.value]);

    mm.add("(min-width: 640px)", () => {
      tl.to(
        [title1Ref.value, title2Ref.value],
        {
          textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
          duration: 0.5,
          ease: "power2.inOut",
        },
        "-=0.3"
      );
    });
  });
}

function handleAccept() {
  st.play(st.sounds["select-1"]);

  if (!title1Ref.value || !title2Ref.value) return;

  const tl = gsap.timeline({
    onComplete: () => {
      st.setSoundEnabled(true);

      if (splitTitle1) splitTitle1.revert();
      if (splitTitle2) splitTitle2.revert();

      emit("accept");
    },
  });

  tl.to([title1Ref.value, title2Ref.value], {
    textShadow: "0 0 0px rgba(255, 255, 255, 0)",
    duration: 0.2,
    ease: "power2.in",
  });

  tl.to(
    splitTitle2.chars,
    {
      opacity: 0,
      y: width.value >= 768 ? -10 : width.value > 640 ? -8 : -6,
      stagger: 0.01,
      duration: 0.3,
      ease: "back.in(1.7)",
    },
    "-=0.1"
  );

  tl.to(
    splitTitle1.chars,
    {
      opacity: 0,
      y: width.value >= 768 ? -10 : width.value > 640 ? -8 : -6,
      stagger: 0.01,
      duration: 0.3,
      ease: "back.in(1.7)",
      onStart: () => {
        st.play(st.sounds["background-2"]);
      },
    },
    "-=0.3"
  );
}
</script>

<template>
  <div
    id="sound-prompt-container"
    class="w-full h-full flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 cursor-pointer"
    @click="handleAccept"
  >
    <h1
      ref="title1Ref"
      class="text-ghost-100 font-display text-xl sm:text-2xl md:text-3xl font-light text-center leading-tight"
    >
      {{ $t("THIS WEBSITE HAS SOUND EFFECTS") }}
    </h1>
    <h2
      ref="title2Ref"
      class="text-ghost-100 font-display text-xl sm:text-2xl md:text-3xl font-light text-center leading-tight"
    >
      {{ $t("CLICK ANYWHERE TO ACCEPT") }}
    </h2>
  </div>
</template>
