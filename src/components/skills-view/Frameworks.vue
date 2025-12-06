<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import { Frameworks } from "../../utils";
import { useSoundStore } from "../../stores/useSoundStore";
import { gsap } from "gsap";
import { SplitText } from 'gsap/all';

const categories = Object.keys(Frameworks) as (keyof typeof Frameworks)[];
const currentCategory = ref<keyof typeof Frameworks>("FRONTEND");
const hoveredTool = ref<string | null>(null);
const isAnimating = ref(false);
const st = useSoundStore();

const toolsToShow = computed(() => Frameworks[currentCategory.value]);

let circleAnimations: gsap.core.Tween[] = [];
let categoryTimeline: gsap.core.Timeline | null = null;
let textSplit: any = null;

// Inicializar círculos sin dibujar
const initializeCircles = () => {
  const circles = document.querySelectorAll('[class*="-circle"]');
  circles.forEach((circle) => {
    gsap.set(circle, { drawSVG: "0% 0%" });
  });
};

// Animación de hover en círculos
const animateCircle = (iconName: string, draw: boolean) => {
  const circle = document.querySelector(`.${iconName}-circle`);
  if (!circle || isAnimating.value) return;

  const tween = gsap.to(circle, {
    drawSVG: draw ? "-25% -125%" : "0%",
    duration: .4,
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
      const sound = st.sounds['hover-3'].howl
      sound.stop()
      sound.play()
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
      const textElement = document.querySelector(".tool-name-text");
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
          duration: 0.001,
          stagger: .05,
          ease: "none",
        }
      );
    });
  });
};

// Animación de cambio de categoría
const animateCategoryChange = async (newCat: keyof typeof Frameworks) => {
  if (isAnimating.value) return;

  isAnimating.value = true;
  hoveredTool.value = null;
  st.play(st.sounds['select-3'])

  // Ocultar todos los círculos inmediatamente
  const allCircles = document.querySelectorAll('[class*="-circle"]');
  gsap.set(allCircles, { drawSVG: "0%" });

  categoryTimeline = gsap.timeline({
    onComplete: () => {
      isAnimating.value = false;
    },
  });

  const currentLogos = document.querySelectorAll(".grid > div");
  const verticalLines = document.querySelectorAll(
    "#ver-lines-box > div"
  );
  const horizontalLines = document.querySelectorAll(
    "#hor-lines-box > div"
  );

  // Salida: logos desaparecen con stagger
  categoryTimeline.to(currentLogos, {
    opacity: 0,
    scale: 0.8,
    duration: 0.3,
    stagger: 0.03,
    ease: "power2.in",
  });

  // Salida: líneas se escalan a 0
  categoryTimeline.to(
    verticalLines,
    {
      scaleY: 0,
      duration: 0.3,
      ease: "power2.inOut",
    },
  );

  categoryTimeline.to(
    horizontalLines,
    {
      scaleX: 0,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        currentCategory.value = newCat;
      }
    },
    "<"
  );

  // Entrada: líneas reaparecen
  categoryTimeline.to(verticalLines, {
    scaleY: 1,
    duration: 0.3,
    ease: "power2.out",
    onStart: () => {
      st.play(st.sounds['transition-4'])
    }
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
      const newLogos = document.querySelectorAll(".grid > div");

      // Inicializar círculos de la nueva sección sin dibujar
      const newCircles = document.querySelectorAll('[class*="-circle"]');
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
const handleCategoryChange = (cat: keyof typeof Frameworks) => {
  if (isAnimating.value || currentCategory.value === cat) return;

  animateCategoryChange(cat);
};

const startAnimations = () => {
  // Pequeño delay para asegurar que el DOM está listo
  setTimeout(() => {
    initializeCircles();

    const logos = document.querySelectorAll(".grid > div");
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
    <nav class="flex gap-6 mb-10">
      <button v-for="cat in categories" :key="cat"
        class="text-ghost-200 font-display font-semibold text-2xl cursor-pointer transition-opacity"
        :class="currentCategory === cat ? 'opacity-100' : 'opacity-40 hover:opacity-80'"
        @click="handleCategoryChange(cat)" @mouseenter="!isAnimating && st.play(st.sounds['hover-2'])"
        :disabled="isAnimating">
        {{ cat }}
      </button>
    </nav>

    <!-- HOVER NAME -->
    <div class="h-16 flex items-center ">
      <span v-if="hoveredTool" class="tool-name-text font-display font-medium text-2xl text-ghost-300 tracking-normal">
        {{ $t(hoveredTool) }}
      </span>
    </div>

    <!-- GRID -->
    <div class="relative flex items-center justify-center h-[50vh] w-fit">
      <!-- items -->
      <div class="grid" :class="toolsToShow.length === 12
          ? 'grid-rows-3 grid-cols-4'
          : 'grid-rows-2 grid-cols-3'
        ">
        <div v-for="tool in toolsToShow" :key="tool.toolName"
          class="self-center justify-self-center m-8 group cursor-pointer flex items-center justify-center opacity-0 group"
          @mouseenter="!isAnimating && (hoveredTool = tool.toolName)" @mouseleave="
            !isAnimating && hoveredTool === tool.toolName && (hoveredTool = null)
            ">
          <v-icon :name="tool.iconName" class="text-ghost-300 group-hover:text-ghost-100 duration-200 size-18" />
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" class="absolute">
            <circle :class="tool.iconName + '-circle opacity-70'" r="49.5" cx="50" cy="50" stroke-width="1"
              stroke="var(--color-ghost-300)" fill="none" />
          </svg>
        </div>
      </div>
      <!-- grid-lines -->
      <div class="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
        <!-- vertical -->
        <div id="ver-lines-box" class="absolute h-full w-full flex items-center justify-evenly">
          <div class="h-full w-[1px] bg-gradient-to-t from-transparent via-ghost-300/50 to-transparent"></div>
          <div class="h-full w-[1px] bg-gradient-to-t from-transparent via-ghost-300/50 to-transparent"></div>
          <div v-if="toolsToShow.length === 12"
            class="h-full w-[1px] bg-gradient-to-t from-transparent via-ghost-300/50 to-transparent"></div>
        </div>
        <!-- horizontal -->
        <div id="hor-lines-box" class="absolute h-full w-full flex flex-col items-center justify-evenly">
          <div class="w-full h-[1px] bg-gradient-to-r from-transparent via-ghost-300/50 to-transparent"></div>
          <div v-if="toolsToShow.length === 12"
            class="w-full h-[1px] bg-gradient-to-r from-transparent via-ghost-300/50 to-transparent"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped></style>
