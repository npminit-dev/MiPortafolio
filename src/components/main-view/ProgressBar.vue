<script setup lang="ts">
import { onMounted, onBeforeUnmount, useTemplateRef, inject } from "vue";
import gsap from "gsap";
import { useSoundStore } from "../../stores/useSoundStore";
import { useTranslation } from "i18next-vue";
import DNA from "./DNA.vue";
import { useWindowSize } from "@vueuse/core";

const paragraphs: string[] = [
  "INITIALIZING DEVELOPER CORE MODULES...",
  "COMPILING EXPERIENCE TIMELINE...",
  "CONNECTING TO KNOWLEDGE DATABASE...",
  "LOADING SKILL MATRIX...",
  "BIO-SYNC COMPLETE.",
];

const text = useTemplateRef<HTMLHeadingElement>("text");
const system = useTemplateRef<HTMLSpanElement>("system");
const spinner = useTemplateRef<HTMLSpanElement>("spinner");
const container = useTemplateRef<HTMLDivElement>("container");
const endLoading = inject<Function>("endLoading");

const st = useSoundStore();
const { t, i18next } = useTranslation();
const { width } = useWindowSize();

// 🔹 Timelines y control
let mainTl: gsap.core.Timeline | null = null;
let textTl: gsap.core.Timeline | null = null;
let finalTl: gsap.core.Timeline | null = null;
let spinnerInterval: number | null = null;
let spinnerIndex = 0;
const spinnerChars = ["|", "/", "-", "\\"];

const killAnimations = () => {
  if (container.value) gsap.killTweensOf(container.value.querySelectorAll("*"));
  mainTl?.kill();
  textTl?.kill();
  finalTl?.kill();
  mainTl = null;
  textTl = null;
  finalTl = null;
  stopSpinner();
};

const stopSounds = () => {
  st.sounds["loading-2"].howl.stop();
};

// 🔹 Spinner control
const startSpinner = () => {
  spinner.value!.classList.replace("font-display", "font-mono");
  if (spinnerInterval) clearInterval(spinnerInterval);
  spinnerIndex = 0;
  spinner.value!.textContent = spinnerChars[spinnerIndex];
  spinnerInterval = window.setInterval(() => {
    spinnerIndex = (spinnerIndex + 1) % spinnerChars.length;
    spinner.value!.textContent = spinnerChars[spinnerIndex];
  }, 100);
};

const stopSpinner = () => {
  if (spinnerInterval) {
    clearInterval(spinnerInterval);
    spinnerInterval = null;
  }
  if (spinner.value) {
    spinner.value.classList.replace("font-mono", "font-display");
    spinner.value.textContent = "OK";
  }
};

onMounted(async () => {
  await document.fonts.ready;
  startAnimations();
  i18next.on("languageChanged", handleLanguageChange);
});

onBeforeUnmount(() => {
  i18next.off("languageChanged", handleLanguageChange);
  stopSounds();
  killAnimations();
  st.clearFXs();
});

async function handleLanguageChange() {
  stopSounds();
  killAnimations();
  st.clearFXs();
  startAnimations();
}

const startAnimations = () => {
  mainTl = gsap.timeline();

  mainTl.set(text.value, { textContent: t(paragraphs[0]), opacity: 1 });
  mainTl.set(system.value, { opacity: 1 });
  mainTl.set(spinner.value, { opacity: 1, textContent: "" });
  mainTl.set("#progress-bar", { width: 0, opacity: 1 });
  mainTl.set("#progress-fill", { width: 0 });

  gsap.fromTo(
    "#dna",
    {
      opacity: 0,
    },
    {
      opacity: 0.1,
      duration: 1,
      delay: 0.5,
    }
  );

  mainTl.fromTo(
    "#progress-bar",
    { width: "0%" },
    {
      width: "100%",
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        // 🔹 comienza la carga real → activar spinner
        startSpinner();

        gsap.to("#progress-fill", {
          width: "100%",
          ease: "steps(100)",
          duration: 4,
          onStart: () => {
            st.play(st.sounds["loading-2"]);
          },
          onComplete: () => {
            stopSpinner(); // 🔹 detener spinner → mostrar OK
            st.sounds["loading-2"].howl.stop();
            st.play(st.sounds["select-4"]);

            finalTl = gsap.timeline({ delay: 1.5 });

            const finalText = t(paragraphs[paragraphs.length - 1]);
            const chars = finalText.split("");

            chars.forEach((_, i) => {
              const visible = finalText.slice(0, chars.length - i - 1);
              finalTl!.to(text.value, {
                textContent: visible,
                duration: 0.3 / chars.length,
                ease: "none",
              });
            });

            finalTl.to(
              [system.value, text.value, spinner.value],
              {
                opacity: 0,
                duration: 0.3,
                ease: "power1.inOut",
              },
              "<"
            );

            finalTl.fromTo(
              "#progress-bar",
              {
                width: "100%",
              },
              {
                width: "0%",
                opacity: 0,
                ease: "power2.inOut",
                duration: 0.5,
              },
              "<0.1"
            );

            finalTl.to(
              "#dna",
              {
                opacity: 0,
                duration: 1,
                onComplete: () => {
                  endLoading!();
                },
              },
              "<"
            );
          },
        });
      },
    }
  );

  textTl = gsap.timeline({ delay: 0.8 });
  const totalDuration = 5.4;
  const scrambleDuration = 0.5;
  const pauseDuration =
    (totalDuration - scrambleDuration * (paragraphs.length - 1)) /
    (paragraphs.length - 1);

  paragraphs.slice(1).forEach((phrase) => {
    textTl!.to(text.value, {
      duration: scrambleDuration,
      scrambleText: {
        text: t(phrase),
        chars: "upperCase",
        speed: 3,
        revealDelay: 0,
        tweenLength: true,
      },
      ease: "none",
    });
    textTl!.to({}, { duration: pauseDuration });
  });
};
</script>

<template>
  <div
    ref="container"
    id="progress-container"
    class="w-[650px] flex flex-col items-start justify-center gap-[2px] px-2 sm:px-0"
  >
    <DNA />
    <div class="flex items-center justify-between w-full">
      <div class="min-h-[26px] sm:min-h-[unset]">
        <span
          ref="system"
          class="inline font-display font-normal text-ghost-100 sm:text-lg md:text-xl"
          >{{ width <= 640 ? "" : "[SYSTEM]: " }}
        </span>
        <h1
          ref="text"
          class="inline font-display font-light text-ghost-100 sm:text-lg md:text-xl"
        ></h1>
      </div>
      <span
        ref="spinner"
        class="hidden sm:inline font-mono text-ghost-200 text-lg pr-1"
      ></span>
    </div>

    <div
      id="progress-bar"
      class="w-0 h-3 relative flex items-center justify-start border-[1px] border-ghost-200/50 p-[2px]"
    >
      <div id="progress-fill" class="h-full w-0 bg-ghost-200" />
    </div>
  </div>
</template>
