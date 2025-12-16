<script setup lang="ts">
import gsap from "gsap";
import { useTranslation } from "i18next-vue";
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { SplitText } from "gsap/all";
import { useSoundStore } from "../../stores/useSoundStore";
import BackToMenu from "../BackToMenu.vue";

const { i18next } = useTranslation();
const hasScored = ref<boolean | null>(null);
const improvementSuggest = ref<string | null>(null);
const st = useSoundStore();
const mm = gsap.matchMedia();

let tl: gsap.core.Timeline | null = null;
let titleSplit: SplitText | null = null;
let pSplit: SplitText | null = null;

onMounted(async () => {
  st.clearFXs();
  gsap.set("#feedback-container", { autoAlpha: 0 });
  await document.fonts.ready;
  gsap.set("#feedback-container", { autoAlpha: 1 });
  startAnimations();
  i18next.on("languageChanged", async () => {
    killAnimations();
    st.clearFXs();
    await nextTick();
    await nextTick();
    startAnimations();
  });
});

onBeforeUnmount(() => {
  killAnimations();
  st.clearFXs();
  i18next.off("languageChanged");
});

function startAnimations() {
  tl = gsap.timeline();
  titleSplit = SplitText.create("#feedback-form-title", { type: "words, chars" });
  pSplit = SplitText.create("#feedback-form-p", { type: "words, chars" });

  mm.add("(min-width: 768px)", () => {
    tl!
      .call(
        () => {
          st.play(st.sounds["streak-1"]);
        },
        undefined,
        0.5
      )
      .call(
        () => {
          st.play(st.sounds["streak-2"]);
        },
        undefined,
        0.64
      )
      .call(
        () => {
          st.play(st.sounds["streak-3"]);
        },
        undefined,
        0.78
      )
      .call(
        () => {
          st.play(st.sounds["streak-2"]);
        },
        undefined,
        0.92
      )
      .call(
        () => {
          st.play(st.sounds["streak-1"]);
        },
        undefined,
        1.06
      )
      .call(
        () => {
          st.play(st.sounds["streak-2"]);
        },
        undefined,
        1.2
      )
      .call(
        () => {
          st.play(st.sounds["streak-3"]);
        },
        undefined,
        1.34
      )
      .call(
        () => {
          st.play(st.sounds["streak-2"]);
        },
        undefined,
        1.48
      )
      .call(
        () => {
          st.play(st.sounds["streak-1"]);
        },
        undefined,
        1.62
      )
      .call(
        () => {
          st.play(st.sounds["streak-2"]);
        },
        undefined,
        1.76
      )
      .call(
        () => {
          st.play(st.sounds["streak-2"]);
        },
        undefined,
        1.9
      );

    tl!.fromTo(
      "#feedback-picture-draw",
      {
        drawSVG: "0% 100%",
      },
      {
        drawSVG: "0% 0%",
        duration: 1.5,
        ease: "linear",
        delay: 0.5,
      },
      0
    );
  });

  tl.fromTo(
    titleSplit.chars,
    {
      autoAlpha: 0,
      y: -10,
    },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.4,
      stagger: () => Math.random() * 0.5,
    },
    "<.1"
  ).fromTo(
    pSplit.chars,
    {
      autoAlpha: 0,
      y: -5,
    },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.4,
      stagger: () => Math.random() * 0.4,
    },
    "<.5"
  );
}

function killAnimations() {
  tl?.scrollTrigger?.kill();
  tl?.kill();
  titleSplit?.revert();
  pSplit?.revert();
  mm.revert();
}

function handleSuggestSubmit(e: FormDataEvent) {
  e.preventDefault();
  hasScored.value = true;
}
</script>

<template>
  <div
    id="feedback-container"
    class="h-screen w-screen flex items-center justify-evenly px-8"
  >
    <div class="relative hidden md:flex items-center justify-center">
      <img class="h-[500px] saturate-200" src="/image/hand-with-ideas.png" alt="" />
      <svg
        class="absolute"
        height="520"
        viewBox="0 0 682 741"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="feedback-picture-draw"
          d="M16.8555 55.4399L661.355 85.4399L10.3555 152.44L650.355 189.44L5.85547 249.94L639.855 299.44L5.85547 353.94L637.355 383.94L5.85547 450.94L617.855 463.94L92.3555 535.44H626.855L213.355 643.44L656.855 610.94L496.855 690.94"
          stroke="#C9D6E8"
          stroke-width="111"
        />
      </svg>
    </div>
    <div
      class="flex flex-col items-center justify-center font-display text-center -mt-12 md:mt-0"
    >
      <h2 id="feedback-form-title" class="text-2xl font-semibold text-void-800">
        {{ $t("Help me improve this site!") }}
      </h2>
      <p
        id="feedback-form-p"
        class="text-lg font-medium text-void-800 mt-4 mb-8 leading-tight max-w-[300px]"
      >
        {{
          $t(
            "Do you like how this website looks? The style, the fonts, the animations, the concept? If not, how could I improve it?"
          )
        }}
      </p>
      <div id="transition-component">
        <transition name="fade" mode="out-in">
          <div class="flex items-center justify-center" v-if="hasScored === null">
            <div
              @click="hasScored = true"
              class="w-12 h-12 mr-4 border-[1px] border-void-800 flex items-center justify-center rounded-full cursor-pointer group hover:bg-void-800 duration-200"
            >
              <v-icon
                name="bi-hand-thumbs-up"
                class="size-6 text-void-800 group-hover:text-ghost-300"
              />
            </div>
            <div
              @click="hasScored = false"
              class="w-12 h-12 border-[1px] border-void-800 flex items-center justify-center rounded-full cursor-pointer group hover:bg-void-800 duration-200"
            >
              <v-icon
                name="bi-hand-thumbs-down"
                class="size-6 text-void-800 group-hover:text-ghost-300"
              />
            </div>
          </div>
          <div v-else-if="hasScored">
            <h2 class="text-lg text-void-800 font-medium">
              {{ $t("Thank you for your feedback!") }}
            </h2>
          </div>
          <div v-else>
            <form
              class="border-[1px] border-void-800 rounded-sm p-3 w-72"
              :onsubmit="handleSuggestSubmit"
            >
              <label class="flex flex-col items-start justify-center mb-3">
                <span class="font-medium text-void-600">{{ $t("Details") }}</span>
                <textarea
                  class="w-full resize-none border-[1px] border-void-600/30 rounded-sm h-32 p-1 focus:border-void-600 focus:bg-ghost-200/20 duration-300 leading-tight"
                  v-model="improvementSuggest"
                  :placeholder="$t('')"
                  required
                  minlength="10"
                  maxlength="500"
                />
              </label>
              <button
                class="border-[1px] font-semibold border-void-600 rounded-sm w-full px-2 py-1 flex items-center justify-center cursor-pointer hover:bg-void-800 hover:text-ghost-100 duration-200"
              >
                {{ $t("SEND") }}
              </button>
            </form>
          </div>
        </transition>
      </div>
      <BackToMenu
        class="absolute bottom-6 inset-x-2"
        inverted
        simple
        :before-back="() => st.resetBackgrounds()"
      />
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease-out;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}

#transition-component {
  opacity: 0;
  animation: appearElement 0.5s ease-out 1.8s forwards;
}

@keyframes appearElement {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
