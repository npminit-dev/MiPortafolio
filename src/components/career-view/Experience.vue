<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import { onMounted, onBeforeUnmount, nextTick } from "vue";
import { useTranslation } from "i18next-vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/all";
import { useWindowSize } from "@vueuse/core";

type Props = {
  company: string;
  role: string;
  description: string;
  hasFlip?: boolean;
};

const props = defineProps<Props>();
const uniqueID = uuidv4();
const { i18next } = useTranslation();
const { width } = useWindowSize();

let timeline: gsap.core.Timeline | null = null;
let scrollTriggerInstance: ScrollTrigger | null = null;
let splitInstances: SplitText[] = [];
let flipTimeline: gsap.core.Timeline | null = null;
let flipScrollTrigger: ScrollTrigger | null = null;
const mm = gsap.matchMedia();

onMounted(async () => {
  await document.fonts.ready;
  startAnimation();

  mm.add("(min-width: 768px)", () => {
    setTimeout(() => {
      startFlipAnimation();
    }, 100);
  });

  i18next.on("languageChanged", async () => {
    killAnimations();
    await nextTick();
    startAnimation();
  });
});

onBeforeUnmount(() => {
  i18next.off("languageChanged");
  killAnimations();
});

function startAnimation() {
  // Crear timeline con todas las animaciones secuenciales
  timeline = gsap.timeline({
    paused: true,
  });

  mm.add("(min-width: 768px)", () => {
    // Estado inicial de todos los elementos SVG
    gsap.set(`#experience-svg-circle-${uniqueID}`, { drawSVG: "50% 50%" });
    gsap.set(`#experience-svg-line1-${uniqueID}`, { drawSVG: "0% 0%" });
    gsap.set(`#experience-svg-line2-${uniqueID}`, { drawSVG: "50% 50%" });
    gsap.set(`#experience-image-${uniqueID}`, { rotateY: 270 });

    // 1. Animar el círculo
    timeline!.to(`#experience-svg-circle-${uniqueID}`, {
      drawSVG: "0% 100%",
      ease: "power3.in",
      duration: 0.6,
    });

    /* 2. Animar imagen */
    timeline!.fromTo(
      `#experience-image-${uniqueID}`,
      { rotateY: 270 },
      {
        transformStyle: "preserve-3d",
        rotateY: 0,
        duration: 1.3,
        ease: "power4.out",
      },
      0
    );

    // 3. Animar línea 1
    timeline!.to(
      `#experience-svg-line1-${uniqueID}`,
      {
        drawSVG: "0% 100%",
        ease: "linear",
        duration: 0.1,
      },
      0.6
    );

    // 4. Animar línea 2
    timeline!.to(
      `#experience-svg-line2-${uniqueID}`,
      {
        drawSVG: "0% 100%",
        ease: "power4.out",
        duration: 0.2,
      },
      0.7
    );

    Draggable.create(`#experience-image-${uniqueID}`, {
      type: "rotation",
      minDuration: 1,
      maxDuration: 2,
      inertia: true,
      snap: () => {
        return 0;
      },
      onDragStart: () => {
        console.log("dragged");
      },
    });
  });

  // SplitText para los elementos de texto
  const h4Split = new SplitText(`#experience-company-${uniqueID}`, {
    type: "chars, words",
  });
  const h5Split = new SplitText(`#experience-role-${uniqueID}`, { type: "chars, words" });
  const pSplit = new SplitText(`#experience-description-${uniqueID}`, {
    type: "lines, words",
  });

  splitInstances = [h4Split, h5Split, pSplit];

  // Estado inicial: todos invisibles
  gsap.set([h4Split.chars, h5Split.chars, pSplit.lines], { opacity: 0 });

  // 5. Animar textos (todos empiezan al mismo tiempo)
  const textStartTime = timeline.duration() - 0.6;

  // H4 - caracteres con stagger levemente mayor
  timeline.to(
    h4Split.chars,
    {
      opacity: 1,
      duration: 0.3,
      stagger: 0.02,
      ease: "power2.out",
    },
    textStartTime
  );

  // H5 - caracteres con stagger levemente mayor
  timeline.to(
    h5Split.chars,
    {
      opacity: 1,
      duration: 0.3,
      stagger: 0.02,
      ease: "power2.out",
    },
    textStartTime
  );

  // P - palabras con stagger menor
  timeline.to(
    pSplit.lines,
    {
      opacity: 1,
      duration: 1,
      stagger: 0.05,
      ease: "power2.out",
    },
    textStartTime
  );

  // ScrollTrigger controla la timeline
  scrollTriggerInstance = ScrollTrigger.create({
    trigger: `#experience-${uniqueID}`,
    start: "top 90%",
    end: "bottom 20%",
    animation: timeline,
    toggleActions:
      width.value >= 768
        ? props.hasFlip
          ? "play none none none"
          : "play reverse play reverse"
        : "play none none none",
  });
}

// Nueva función después de startAnimation()
function startFlipAnimation() {
  if (!props.hasFlip) return;

  const flipElement = document.getElementById("exp-educ-flip");
  const targetContainer = document.getElementById("flip-target");
  const endTrigger = document.getElementById("education-outer-container");

  if (!flipElement || !targetContainer || !endTrigger) {
    console.warn("FLIP: Elementos no encontrados aún");
    return;
  }

  // Estado inicial: invisible
  gsap.set(flipElement, { opacity: 0 });

  // Guardar estado inicial
  const state = Flip.getState(flipElement);

  // Mover al destino
  targetContainer.appendChild(flipElement);

  // Crear animación FLIP (sin opacity aquí)
  flipTimeline = Flip.from(state, {
    duration: 1,
    rotateX: 540,
    rotateY: -180,
    ease: "linear",
    absolute: true,
    paused: true,
  });

  // ScrollTrigger con control de opacidad
  flipScrollTrigger = ScrollTrigger.create({
    trigger: `#experience-${uniqueID}`,
    endTrigger: "#education-outer-container",
    start: "center center",
    end: "bottom bottom",
    scrub: true,
    animation: flipTimeline,
    anticipatePin: 1,
    onUpdate: (self) => {
      if (self.progress > 0) {
        gsap.set(flipElement, { opacity: 1 });
      } else {
        gsap.set(flipElement, { opacity: 0 });
      }
    },
    onEnter() {
      gsap.set(`#experience-svg-circle-${uniqueID}`, { opacity: 0 });
    },
    onLeaveBack() {
      gsap.set(`#experience-svg-circle-${uniqueID}`, { opacity: 1 });
    },
  });
}

function killAnimations() {
  mm.kill();

  if (timeline) {
    timeline.kill();
    timeline = null;
  }
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
    scrollTriggerInstance = null;
  }

  // Agregar esto para el FLIP
  if (flipTimeline) {
    flipTimeline.kill();
    flipTimeline = null;
  }
  if (flipScrollTrigger) {
    flipScrollTrigger.kill();
    flipScrollTrigger = null;
  }

  // Revertir SplitText
  splitInstances.forEach((instance) => {
    instance.revert();
  });
  splitInstances = [];
}

function transitionElementVerify(): boolean {
  return props.hasFlip && document.getElementById("exp-educ-flip") === null;
}
</script>

<template>
  <article
    :id="`experience-${uniqueID}`"
    class="grid grid-cols-1 md:grid-cols-[40%_60%] my-14 gap-4"
  >
    <div class="hidden md:inline-block relative self-center justify-self-end">
      <div
        :id="`experience-image-${uniqueID}`"
        class="absolute left-2 inset-y-2 flex items-center justify-center bg-ghost-200 border-ghost-300 border-[1px] rounded-full h-36 w-36 overflow-hidden z-50"
      >
        <slot
          class="h-full w-full object-cover flex items-center justify-center bg-ghost-200"
        >
          <div
            class="h-full w-full font-display font-bold text-2xl text-deep-teal-shadow bg-ghost-200 flex items-center justify-center overflow-hidden leading-0 select-none"
          >
            {{ props.company.slice(2, -2) }}
          </div>
        </slot>
      </div>
      <svg
        :id="`experience-svg-${uniqueID}`"
        width="293"
        height="160"
        viewBox="0 0 293 160"
        fill="none"
        class=""
      >
        <circle
          :id="`experience-svg-circle-${uniqueID}`"
          cx="80"
          cy="80"
          r="79.5"
          stroke="var(--color-ghost-300)"
        />
        <line
          :id="`experience-svg-line1-${uniqueID}`"
          x1="160"
          y1="79.5"
          x2="292"
          y2="79.5"
          stroke="var(--color-ghost-300)"
        />
        <line
          :id="`experience-svg-line2-${uniqueID}`"
          x1="292.5"
          y1="48"
          x2="292.5"
          y2="113"
          stroke="var(--color-ghost-300)"
        />
      </svg>
      <div
        id="exp-educ-flip"
        class="absolute inset-y-0 left-0 h-40 w-40 border-[1px] flex items-center justify-center border-ghost-300 opacity-0 rounded-full"
        v-if="transitionElementVerify()"
      >
        <div class="h-32 w-32 border-[1px] border-ghost-300 opacity-0 rounded-full"></div>
      </div>
    </div>
    <div class="font-display text-start max-w-[600px]">
      <h4
        :id="`experience-company-${uniqueID}`"
        class="font-medium text-2xl text-center md:text-left text-ghost-100"
      >
        {{ $t(props.company) }}
      </h4>
      <h5
        :id="`experience-role-${uniqueID}`"
        class="font-normal text-xl text-center md:text-left text-ghost-200"
      >
        {{ $t(props.role) }}
      </h5>
      <p
        :id="`experience-description-${uniqueID}`"
        class="w-[100dvw] px-2 sm:px-3 md:px-0 md:w-[550px] text-center md:text-left leading-tight font-light text-sm sm:text-base md:text-lg text-ghost-100 my-2"
      >
        {{ $t(props.description) }}
      </p>
    </div>
  </article>
</template>

<style></style>
