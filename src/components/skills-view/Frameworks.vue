<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import { frameworks } from "../../data/framewors.ts";
import { useSoundStore } from "../../stores/useSoundStore";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";
import { useWindowSize } from "@vueuse/core";

const categories = Object.keys(frameworks) as (keyof typeof frameworks)[];
const currentCategory = ref<keyof typeof frameworks>("FRONTEND");
const hoveredTool = ref<string | null>(null);
const isAnimating = ref(false);
const st = useSoundStore();
const { width } = useWindowSize();

const toolsToShow = computed(() => frameworks[currentCategory.value]);

let circleAnimations: gsap.core.Tween[] = [];
let categoryTimeline: gsap.core.Timeline | null = null;
let textSplit: any = null;

// Inicializar círculos sin dibujar
const initializeCircles = () => {
  const circles = document.querySelectorAll(".fw-circle");
  circles.forEach((circle) => {
    gsap.set(circle, { drawSVG: "0% 0%" });
  });
};

// Animación de hover en círculos
const animateCircle = (iconName: string, draw: boolean) => {
  const circle = document.querySelector(`.fw-circle-${iconName}`);
  if (!circle || isAnimating.value) return;

  const tween = gsap.to(circle, {
    drawSVG: draw ? "-50% -150%" : "0%",
    duration: 0.35,
    ease: draw ? "power1.out" : "power1.in",
  });

  circleAnimations.push(tween);
};

// Manejar cambio de hover
watch(hoveredTool, (newTool, oldTool) => {
  if (isAnimating.value) return;

  if (oldTool && oldTool !== newTool) {
    const oldToolData = toolsToShow.value.find((t) => t.toolName === oldTool);
    if (oldToolData) {
      animateCircle(oldToolData.iconName, false);
    }
  }
  if (newTool) {
    const newToolData = toolsToShow.value.find((t) => t.toolName === newTool);
    if (newToolData) {
      animateCircle(newToolData.iconName, true);
      const sound = st.sounds["hover-3"].howl;
      sound.stop();
      sound.play();
    }

    // Animar texto con SplitText
    animateToolName();
  }
});

// Animación del nombre de la tool con SplitText
const animateToolName = () => {
  // Esperar dos frames para asegurar que el v-if renderizó el elemento
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const textElement = document.querySelector(".fw-toolname");
      if (!textElement) return;

      // Crear split del texto
      if (textSplit) {
        textSplit.revert();
      }

      textSplit = new SplitText(textElement, { type: "chars" });

      // Animar cada letra
      gsap.fromTo(
        textSplit.chars,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.00001,
          stagger: 0.1 / textSplit.chars.length,
          ease: "none",
        }
      );
    });
  });
};

// Animación de cambio de categoría
const animateCategoryChange = async (newCat: keyof typeof frameworks) => {
  if (isAnimating.value) return;

  isAnimating.value = true;
  hoveredTool.value = null;
  st.play(st.sounds["select-3"]);

  // Ocultar todos los círculos inmediatamente
  const allCircles = document.querySelectorAll(".fw-circle");
  gsap.set(allCircles, { drawSVG: "0%" });

  categoryTimeline = gsap.timeline({
    onComplete: () => {
      isAnimating.value = false;
    },
  });

  const currentLogos = document.querySelectorAll(".fw-logo");
  const verticalLines = document.querySelectorAll(".fw-vline");
  const horizontalLines = document.querySelectorAll(".fw-hline");

  // Salida: logos desaparecen con stagger
  categoryTimeline.to(currentLogos, {
    opacity: 0,
    scale: 0.8,
    duration: 0.3,
    stagger: 0.03,
    ease: "power2.in",
  });

  // Salida: líneas se escalan a 0
  categoryTimeline.to(verticalLines, {
    scaleY: 0,
    duration: 0.3,
    ease: "power2.inOut",
  });

  categoryTimeline.to(
    horizontalLines,
    {
      scaleX: 0,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        currentCategory.value = newCat;
      },
    },
    "<"
  );

  // Entrada: líneas reaparecen
  categoryTimeline.to(verticalLines, {
    scaleY: 1,
    duration: 0.3,
    ease: "power2.out",
    onStart: () => {
      st.play(st.sounds["transition-4"]);
    },
  });

  categoryTimeline.to(
    horizontalLines,
    {
      scaleX: 1,
      duration: 0.3,
      ease: "power2.out",
    },
    "<"
  );

  // Entrada: logos aparecen con stagger (esperamos a que el DOM se actualice)
  categoryTimeline.call(
    () => {
      nextTick();
      const newLogos = document.querySelectorAll(".fw-logo");

      // Inicializar círculos de la nueva sección sin dibujar
      const newCircles = document.querySelectorAll(".fw-circle");
      gsap.set(newCircles, { drawSVG: "0%" });

      gsap.fromTo(
        newLogos,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          stagger: 0.04,
          ease: "power2.out",
        }
      );
    },
    [],
    "-=0.15"
  );
};

// Manejar cambio de categoría
const handleCategoryChange = (cat: keyof typeof frameworks) => {
  if (isAnimating.value || currentCategory.value === cat) return;

  animateCategoryChange(cat);
};

const startAnimations = () => {
  // Pequeño delay para asegurar que el DOM está listo
  setTimeout(() => {
    initializeCircles();

    const logos = document.querySelectorAll(".fw-logo");
    gsap.to(logos, {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      stagger: 0.04,
      ease: "power2.out",
    });
  }, 50);
};

const killAnimations = () => {
  circleAnimations.forEach((anim) => anim.kill());
  circleAnimations = [];

  if (categoryTimeline) {
    categoryTimeline.kill();
    categoryTimeline = null;
  }

  if (textSplit) {
    textSplit.revert();
    textSplit = null;
  }
};

onMounted(() => {
  startAnimations();
});

onUnmounted(() => {
  killAnimations();
});
</script>

<template>
  <div class="w-full flex flex-col items-center justify-center py-12 z-50">
    <!-- SELECTOR -->
    <nav
      class="flex flex-wrap justify-center md:justify-normal md:flex-nowrap gap-4 md:gap-6 mb-2 md:mb-10"
    >
      <button
        v-for="cat in categories"
        :key="cat"
        class="text-ghost-200 font-display font-semibold text-2xl cursor-pointer transition-opacity"
        :class="currentCategory === cat ? 'opacity-100' : 'opacity-40 hover:opacity-80'"
        @click="handleCategoryChange(cat)"
        @mouseenter="!isAnimating && st.play(st.sounds['hover-2'])"
        :disabled="isAnimating"
      >
        {{ $t(cat) }}
      </button>
    </nav>

    <!-- HOVER NAME -->
    <div class="h-16 flex items-center">
      <span
        v-if="hoveredTool"
        class="fw-toolname font-display font-medium text-xl md:text-2xl text-ghost-300 tracking-normal"
      >
        {{ $t(hoveredTool) }}
      </span>
    </div>

    <!-- GRID -->
    <div class="relative flex items-center justify-center h-[50vh] w-fit">
      <!-- items -->
      <div
        class="grid"
        :class="
          toolsToShow.length === 12
            ? 'grid-rows-3 grid-cols-4'
            : 'grid-rows-2 grid-cols-3'
        "
      >
        <div
          v-for="tool in toolsToShow"
          :key="tool.toolName"
          class="fw-logo self-center justify-self-center m-8 group cursor-pointer flex items-center justify-center opacity-0"
          @mouseenter="!isAnimating && (hoveredTool = tool.toolName)"
          @mouseleave="
            !isAnimating && hoveredTool === tool.toolName && (hoveredTool = null)
          "
        >
          <v-icon
            :name="tool.iconName"
            class="text-ghost-300 duration-200 size-18 transition-colors"
            :style="
              hoveredTool === tool.toolName
                ? `color: ${tool.color || 'var(--color-ghost-300)'}`
                : ''
            "
          />
          <svg
            :width="width >= 768 ? '100' : '90'"
            :height="width >= 768 ? '100' : '90'"
            viewBox="0 0 100 100"
            fill="none"
            class="absolute"
          >
            <circle
              :style="{
                stroke: tool.toolName
                  ? `${tool.color || 'var(--color-ghost-300)'}`
                  : 'var(--color-ghost-300)',
              }"
              :class="`fw-circle fw-circle-${tool.iconName} opacity-70`"
              :r="49.5"
              cx="50"
              cy="50"
              stroke-width="1"
              fill="none"
            />
          </svg>
        </div>
      </div>
      <!-- grid-lines -->
      <div
        class="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
      >
        <!-- vertical -->
        <div class="absolute h-full w-full flex items-center justify-evenly">
          <div
            class="fw-vline h-full w-[1px] bg-gradient-to-t from-transparent via-ghost-300/50 to-transparent"
          ></div>
          <div
            class="fw-vline h-full w-[1px] bg-gradient-to-t from-transparent via-ghost-300/50 to-transparent"
          ></div>
          <div
            v-if="toolsToShow.length === 12"
            class="fw-vline h-full w-[1px] bg-gradient-to-t from-transparent via-ghost-300/50 to-transparent"
          ></div>
        </div>
        <!-- horizontal -->
        <div class="absolute h-full w-full flex flex-col items-center justify-evenly">
          <div
            class="fw-hline w-full h-[1px] bg-gradient-to-r from-transparent via-ghost-300/50 to-transparent"
          ></div>
          <div
            v-if="toolsToShow.length === 12"
            class="fw-hline w-full h-[1px] bg-gradient-to-r from-transparent via-ghost-300/50 to-transparent"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
