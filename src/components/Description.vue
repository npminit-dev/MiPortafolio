<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, useTemplateRef } from "vue";
import gsap from "gsap";
import { useTranslation } from "i18next-vue";
import { SplitText } from "gsap/all";
import { useSoundStore } from "../stores/useSoundStore";

type Props = {
  content: string;
  simple?: boolean;
  duration?: number;
  withSounds?: boolean;
};

const p = useTemplateRef<HTMLParagraphElement>("p");
const {
  content,
  simple = false,
  duration = 0.8,
  withSounds = true,
} = defineProps<Props>();
const { i18next } = useTranslation();
const st = useSoundStore();

let animations: Array<gsap.core.Tween | gsap.core.Timeline | gsap.core.Animation> = [];
let splits: Array<SplitText> = [];

const playLoading: ScrollTrigger.Callback = () => {
  if (withSounds) {
    st.play(st.sounds["loading-2"]);
  }
};

const stopLoading: ScrollTrigger.Callback = () => {
  if (withSounds) {
    st.sounds["loading-2"].howl.stop();
  }
};

function startAnimations() {
  const text = SplitText.create(p.value, { type: "chars, words" });
  splits.push(text);

  let animation = gsap.fromTo(
    text.chars,
    {
      autoAlpha: 0,
    },
    {
      autoAlpha: 1,
      duration: 0.0000001,
      stagger: duration / text.chars.length,
      scrollTrigger: {
        trigger: p.value,
        start: "top bottom",
        end: "bottom top",
        once: simple,
        toggleActions: simple ? "play none none none" : "play reset play reset",
        onEnter: playLoading,
        onEnterBack: playLoading,
        onLeave: stopLoading,
        onLeaveBack: stopLoading,
      },
      onComplete: stopLoading,
    }
  );
  animations.push(animation);
}

function killAnimations() {
  splits.forEach((split) => {
    split.revert();
  });
  animations.forEach((anim) => {
    anim.scrollTrigger?.kill();
    anim.kill();
  });
}

onMounted(async () => {
  await document.fonts.ready;
  startAnimations();
  i18next.on("languageChanged", async () => {
    killAnimations();
    await nextTick();
    await nextTick();
    startAnimations();
  });
});

onBeforeUnmount(() => {
  killAnimations();
});
</script>

<template>
  <p
    ref="p"
    class="max-w-[650px] text-center text-lg font-display text-ghost-200 leading-tight break-normal"
  >
    {{ $t(content) }}
  </p>
</template>

<style scoped></style>
