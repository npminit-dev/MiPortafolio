<script setup lang="ts">
import gsap from "gsap";
import { useTranslation } from "i18next-vue";
import { nextTick, onBeforeUnmount, onMounted } from "vue";
import { SplitText } from "gsap/all";
import { useSoundStore } from "../../stores/useSoundStore";
import { sleep } from "../../utils";

const { i18next } = useTranslation();
const st = useSoundStore();

let tl: gsap.core.Timeline | null = null;
let pSplit: SplitText | null = null;

onMounted(async () => {
  stopAllDrawingSounds();
  gsap.set("#aboutme-container", { autoAlpha: 0 });
  await document.fonts.ready;
  gsap.set("#aboutme-container", { autoAlpha: 1 });
  startAnimations();

  i18next.on("languageChanged", async () => {
    killAnimations();
    await nextTick();
    await nextTick();
    startAnimations();
  });
});

onBeforeUnmount(() => {
  stopAllDrawingSounds();
  killAnimations();
});

async function playDrawingSounds() {
  await sleep(400);
  st.play(st.sounds["streak-3"]);
  await sleep(250);
  st.play(st.sounds["streak-1"]);
  await sleep(200);
  st.play(st.sounds["streak-2"]);
  await sleep(175);
  st.play(st.sounds["streak-3"]);
  await sleep(175);
  st.play(st.sounds["streak-2"]);
  await sleep(200);
  st.play(st.sounds["streak-2"]);
  await sleep(200);
  st.play(st.sounds["streak-2"]);
  await sleep(200);
  st.play(st.sounds["streak-4"]);
}

function stopAllDrawingSounds() {
  st.sounds["streak-1"].howl.stop();
  st.sounds["streak-2"].howl.stop();
  st.sounds["streak-3"].howl.stop();
  st.sounds["streak-4"].howl.stop();
}

function startAnimations() {
  tl = gsap.timeline();
  pSplit = SplitText.create(".aboutme-p", { type: "lines, words" });

  playDrawingSounds();

  tl.fromTo(
    "#aboutme-picture-draw",
    {
      drawSVG: "0% 100%",
    },
    {
      drawSVG: "100% 100%",
      duration: 1.5,
      ease: "linear",
      delay: 0.5,
      onInterrupt: stopAllDrawingSounds,
    },
    0
  )
    .fromTo(
      "#aboutme-title",
      {
        y: 10,
        autoAlpha: 0,
      },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.4,
      },
      0.5
    )
    .fromTo(
      "#aboutme-subtitle",
      {
        y: 10,
        autoAlpha: 0,
      },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.4,
      },
      ">"
    )
    .fromTo(
      pSplit.lines,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.1,
      },
      ">"
    );
}

function killAnimations() {
  tl?.scrollTrigger?.kill();
  tl?.kill();
  pSplit?.revert();
}
</script>

<template>
  <div
    id="aboutme-container"
    class="relative h-screen w-screen flex items-center justify-evenly px-8"
  >
    <div id="aboutme-picture-container" class="flex items-center justify-center">
      <img
        id="aboutme-picture"
        class="size-96"
        src="/image/myself-pencil-art.png"
        alt="image pencil art of myself"
      />
      <svg height="384" viewBox="0 0 579 514" fill="none" class="absolute">
        <path
          id="aboutme-picture-draw"
          d="M112.2 52.53L477.7 101.53L98.1997 160.03L483.7 226.03L91.1997 269.53L523.7 344.03L6.69971 357.53L571.7 429.53L69.6997 460.53"
          stroke="#C9D6E8"
          stroke-width="106"
        />
      </svg>
    </div>
    <div
      id="aboutme-text-container"
      class="flex flex-col items-center justify-center font-display text-center"
    >
      <h2 id="aboutme-title" class="font-semibold text-2xl text-void-600">
        {{ $t("Hello! Thank you for visiting my website :)") }}
      </h2>

      <p id="aboutme-subtitle" class="text-xl font-medium text-void-700 mb-3 mt-1">
        {{ $t("Let me tell you a little more about myself...") }}
      </p>

      <p
        class="aboutme-p text-lg text-void-800 leading-tight min-w-[400px] max-w-[550px]"
      >
        {{
          $t("My name is Jorge Balsamo, and I live in Moreno, Buenos Aires, Argentina.")
        }}
      </p>

      <p
        class="aboutme-p text-lg text-void-800 leading-tight min-w-[400px] max-w-[550px] mt-2"
      >
        {{
          $t(
            "I enjoy technology, reading books, playing video games, and exercising to balance my lifestyle. I'm a good cook, I can play musical instruments like the drums and guitar, and I keep my house tidy and clean."
          )
        }}
      </p>

      <p
        class="aboutme-p text-lg text-void-800 leading-tight min-w-[400px] max-w-[550px] mt-2"
      >
        {{
          $t(
            "I'm a curious and self-taught person: when something challenges me, I research, experiment, and learn until I solve it. I feel comfortable working in a team and contributing ideas, and professionally, I'm motivated by building useful tools and continuing to grow as a developer."
          )
        }}
      </p>

      <p
        class="aboutme-p text-lg text-void-800 leading-tight min-w-[400px] max-w-[550px] mt-2"
      >
        {{
          $t(
            "I believe that technology shouldn't distance us from what makes us human and connects us to others, and that technological progress is most meaningful when it accompanies and respects human needs."
          )
        }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
