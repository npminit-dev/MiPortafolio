<script setup lang="ts">
import { useTranslation } from "i18next-vue";
import { nextTick, onBeforeUnmount, onMounted, ref, computed } from "vue";
import gsap from "gsap";

const { i18next } = useTranslation();
const interactions = ref<boolean>(false);
let tl: gsap.core.Timeline | null = null;

const name = ref<string>("");
const message = ref<string>("");

// Computed para validar si el formulario está completo
const isFormValid = computed(() => {
  return name.value.trim().length >= 2 && message.value.trim().length >= 10;
});

// Función para generar el mailto
function handleSubmit(e: Event) {
  e.preventDefault();

  if (!isFormValid.value) return;

  const subject = encodeURIComponent(`Contacto desde portfolio - ${name.value}`);
  const body = encodeURIComponent(
    `Nombre: ${name.value}\n\n` + `Mensaje:\n${message.value}`
  );

  const mailtoLink = `mailto:jorgeb.dev.acc@gmail.com?subject=${subject}&body=${body}`;

  window.open(mailtoLink, "_blank");
}

function startAnimations() {
  tl = gsap.timeline({
    delay: 0.5,
  });

  tl.fromTo(
    "#contact-form",
    {
      autoAlpha: 0,
    },
    {
      autoAlpha: 1,
      duration: 0.5,
      onStart: () => {
        interactions.value = false;
      },
    },
    0
  )

    .fromTo(
      "#contact-form-title",
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        duration: 0.5,
      },
      "<.1"
    )

    .fromTo(
      "#contact-form-p",
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        duration: 0.5,
      },
      "<.1"
    )

    .fromTo(
      "#contact-form-separator",
      {
        scaleX: "0%",
        duration: 1,
        ease: "linear",
      },
      {
        scaleX: "100%",
      },
      "<.1"
    )

    .fromTo(
      ".input-label",
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        stagger: 0.1,
        duration: 0.5,
      },
      "<.1"
    )

    .fromTo(
      ".input-input",
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        stagger: 0.1,
        duration: 0.5,
      },
      "<-.1"
    )

    .fromTo(
      "#contact-form-btn",
      {
        rotateX: 90,
      },
      {
        duration: 0.5,
        rotateX: 0,
        onComplete: () => {
          interactions.value = true;
        },
      },
      ">"
    );
}

function killAnimations() {
  tl?.scrollTrigger?.kill();
  tl?.kill();
}

onMounted(async () => {
  gsap.set("#contact-form", { autoAlpha: 0 });
  await document.fonts.ready;

  gsap.set("#contact-form", { autoAlpha: 1 });
  startAnimations();

  i18next.on("languageChanged", handleLanguageChanged);
});

onBeforeUnmount(() => {
  killAnimations();
  i18next.off("languageChanged", handleLanguageChanged);
});

async function handleLanguageChanged() {
  killAnimations();
  await nextTick();
  startAnimations();
}
</script>

<template>
  <form
    id="contact-form"
    @submit="handleSubmit"
    :style="{ pointerEvents: interactions ? 'all' : 'none' }"
    class="p-4 rounded-md border-[1px] border-void-900/60 text-center max-w-[400px] font-display bg-ghost-200/15"
  >
    <h2 id="contact-form-title" class="text-3xl text-void-900 font-semibold">
      {{ $t("Let's talk!") }}
    </h2>
    <p
      id="contact-form-p"
      class="leading-tight font-xl font-medium text-void-600 mb-4 mt-2"
    >
      {{
        $t(
          "Send me an email with your proposal, project, or anything you´d like to discuss using this form or by contacting me through"
        )
      }}
      <a
        class="underline hover:text-void-900 font-semibold"
        href="https://www.linkedin.com/in/jorge-balsamo-dev/"
        target="_blank"
        >{{ $t("my LinkedIn profile.") }}
      </a>
    </p>

    <div id="contact-form-separator" class="w-full h-[1px] bg-void-600/30" />

    <div class="flex flex-col items-center justify-center py-4">
      <label class="w-full flex flex-col items-start mb-3">
        <span class="input-label font-medium text-void-800">{{ $t("Name") }}</span>
        <input
          class="input-input font-medium text-void-900 w-full border-[1px] border-void-600/30 rounded-sm px-2 py-1 focus:bg-ghost-100/20 focus:border-void-600 duration-300"
          v-model="name"
          type="text"
          required
          minlength="2"
          maxlength="100"
          :placeholder="$t('Your name')"
        />
      </label>

      <label class="w-full flex flex-col items-start">
        <span class="input-label font-medium text-void-800">{{ $t("Message") }}</span>
        <textarea
          class="input-input font-medium text-void-900 w-full resize-none border-[1px] border-void-600/30 rounded-sm px-2 py-1 h-32 focus:bg-ghost-100/20 focus:border-void-600 duration-300"
          v-model="message"
          required
          minlength="10"
          maxlength="1000"
          :placeholder="$t('Tell me about your project...')"
        />
      </label>
    </div>

    <button
      id="contact-form-btn"
      :disabled="!isFormValid"
      :class="`w-full flex items-center justify-center py-2 rounded-sm border-[1px] text-lg font-semibold
        transition-all duration-300
        ${
          isFormValid
            ? 'border-void-600/30 text-void-600 cursor-pointer hover:bg-void-900 hover:text-ghost-100'
            : 'border-void-600/20 text-void-600/40 cursor-not-allowed opacity-60'
        }
      `"
      type="submit"
    >
      {{ $t("SEND") }}
    </button>
  </form>
</template>

<style scoped>
.input-input {
  will-change: transform;
}
</style>
