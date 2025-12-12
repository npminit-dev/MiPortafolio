<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import { useSoundStore } from "../../stores/useSoundStore";
import type { MenuItem } from "../../types/globals";
import { usePageTransition } from "../../composables/usePageTransition";
import { useTranslation } from "i18next-vue";

const st = useSoundStore();
const { i18next } = useTranslation();
const pgTransition = usePageTransition();
const selected = ref<string | null>(null);
const prevSelected = ref<string | null>(null);
const interactions = ref<boolean>(false);

const menuItems: Array<MenuItem> = [
  { text: "CAREER", href: "/career" },
  { text: "SKILLS", href: "/skills" },
  { text: "ABOUT", href: "/about" },
];

// --- CONFIGURACIÓN ---
let delay = 2; // segundos antes de empezar animación
const TOTAL_ANIMATION_DURATION = 0.2; // duración total deseada para toda la animación (en segundos)
// ----------------------

let masterTimeline: gsap.core.Timeline | null = null;

function startAnimations() {
  // evitar que se dispare dos veces
  if (masterTimeline) {
    return;
  }

  interactions.value = false; // 🔒 bloquear interacción
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    onComplete: () => {
      interactions.value = true;
      st.sounds["loading-1"].howl.stop();
    },
  });

  const items = document.querySelectorAll(".nav-item-text");

  // Calcular el total de caracteres para inferir el delay
  let totalChars = 0;
  items.forEach((item) => {
    const text = item.textContent || "";
    totalChars += text.length;
  });

  // Calcular delay entre letras para que la duración total sea constante
  const LETTER_DELAY = totalChars > 0 ? TOTAL_ANIMATION_DURATION / totalChars : 0.01;

  // Inicialmente invisibles
  gsap.set(items, { opacity: 0 });

  // Esperar delay inicial
  tl.to(
    {},
    {
      duration: delay,
      onComplete: () => {
        st.play(st.sounds["loading-1"]);
      },
    }
  );

  // Crear animaciones encadenadas
  items.forEach((item) => {
    const split = new SplitText(item, { type: "chars" });
    const chars = split.chars;

    gsap.set(chars, { opacity: 0 });

    gsap.set(item, { opacity: 1 });

    chars.forEach((char, idx) => {
      tl.set(
        char,
        { opacity: 1 },
        tl.duration() + idx * LETTER_DELAY // efecto cadena letra a letra
      );
    });

    // actualizar tiempo final antes del siguiente ítem
    tl.to({}, { duration: LETTER_DELAY });
  });

  masterTimeline = tl;
}

function killAnimations() {
  if (masterTimeline) {
    masterTimeline.kill();
    masterTimeline.clear();
    masterTimeline = null;
  }

  st.sounds["loading-1"].howl.stop();
  // Limpiar todos los SplitText anteriores
  const items = document.querySelectorAll(".nav-item-text");
  items.forEach((item) => {
    // Revertir el split text si existe
    const split = new SplitText(item, { type: "chars" });
    split.revert();
  });
}

function sectionChange(href: string) {
  if (!interactions.value) return; // no permitir clic durante animación
  st.play(st.sounds["select-1"]);
  interactions.value = false;
  pgTransition.triggerTransition(href);
}

function hoverItem(text: string) {
  if (!interactions.value) return; // evitar hover durante animación
  prevSelected.value = selected.value;
  selected.value = text;
  st.play(st.sounds["hover-2"]);
}

onMounted(async () => {
  gsap.set("#navitems-container", { autoAlpha: 0 });
  await document.fonts.ready;
  gsap.set("#navitems-container", { autoAlpha: 1 });
  startAnimations();
  i18next.on("languageChanged", async () => {
    delay = 0.25;
    prevSelected.value = null;
    selected.value = null;
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
  <nav id="navitems-container">
    <ul
      class="flex flex-col items-center justify-center"
      :class="[interactions ? 'pointer-events-auto' : 'pointer-events-none']"
    >
      <li
        v-for="{ text, href } in menuItems"
        @click="sectionChange(href)"
        @mouseenter="hoverItem(text)"
        class="nav-item relative flex items-center justify-center cursor-pointer my-[2px] sm:my-0"
      >
        <span
          :key="selected || 'null'"
          class="absolute -left-4 opacity-0 h-1 w-1 rounded-full bg-ghost-300"
          :class="[
            text === selected
              ? 'left-ball'
              : text === prevSelected
              ? 'left-ball-out'
              : 'hidden',
          ]"
        />
        <a
          class="nav-item-text font-display font-light text-2xl sm:text-xl text-white duration-100"
          :class="{ 'shadowed-text': text === selected }"
        >
          {{ $t(text) }}
        </a>
        <span
          :key="selected || 'null'"
          class="absolute -right-4 opacity-0 h-1 w-1 rounded-full bg-ghost-300"
          :class="[
            text === selected
              ? 'right-ball'
              : text === prevSelected
              ? 'right-ball-out'
              : 'opacity-0 animate-none',
          ]"
        />
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.left-ball {
  animation: rtl 100ms ease-out forwards;
}

.left-ball-out {
  animation: rtl 100ms ease-out reverse forwards;
}

.right-ball {
  animation: ltr 100ms ease-out forwards;
}

.right-ball-out {
  animation: ltr 100ms ease-out reverse forwards;
}

.shadowed-text {
  text-shadow: 0 0 25px var(--color-neon-cyan-500);
}

@keyframes rtl {
  from {
    left: -38px;
    opacity: 0;
  }

  to {
    left: -16px;
    opacity: 1;
  }
}

@keyframes ltr {
  from {
    opacity: 0;
    right: -38px;
  }

  to {
    opacity: 1;
    right: -16px;
  }
}
</style>
