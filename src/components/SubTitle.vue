<script setup lang="ts">
import { nextTick, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { useTranslation } from "i18next-vue";
import { v4 as uuidv4 } from "uuid";

type Props = {
  text: string;
  simple?: boolean;
};

const { text, simple } = defineProps<Props>();
const { i18next } = useTranslation();
const id = uuidv4();

onMounted(async () => {
  startAnimation();

  i18next.on("languageChanged", async () => {
    killAnimation();
    await nextTick();
    await nextTick();
    startAnimation();
  });
});

onBeforeUnmount(() => {
  killAnimation();
});

function startAnimation() {
  gsap.fromTo(
    `#subtitle-${id}`,
    {
      opacity: 0,
    },
    {
      scrambleText: {
        text: document.getElementById(`subtitle-${id}`)?.textContent || "",
        chars: "upperCase",
        speed: 5,
      },
      scrollTrigger: {
        trigger: `#subtitle-box-${id}`,
        start: "top bottom",
        end: "bottom top",
        toggleActions: simple ? "play none none none" : "play reset play reset",
      },
      opacity: 1,
      duration: 1,
    }
  );
}

function killAnimation() {
  const animation = gsap.getById(`#subtitle-${id}`);
  if (animation) {
    animation.kill();
    animation.scrollTrigger?.kill();
  }
}
</script>

<template>
  <h3
    :id="`subtitle-box-${id}`"
    class="md:text-2xl sm:text-xl text-base text-center font-body text-ghost-100"
  >
    [<span :id="`subtitle-${id}`" class="">{{ $t(text.toUpperCase()) }}</span
    >]
  </h3>
</template>

<style></style>
