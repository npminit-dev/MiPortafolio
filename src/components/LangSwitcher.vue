<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Lang } from "../types/globals";
import { useTranslation } from "i18next-vue";
import ES from "./icons/ES.vue";
import EN from "./icons/EN.vue";

const selectedLang = ref<Lang>("en");
const { i18next } = useTranslation();

onMounted(() => {
  const savedLang = localStorage.getItem("lang");
  if (!savedLang) localStorage.setItem("lang", "en");
  else selectedLang.value = savedLang as Lang;
  i18next.changeLanguage(selectedLang.value);
});

function handleLangChange(lang: Lang) {
  localStorage.setItem("lang", lang);
  selectedLang.value = lang;
  i18next.changeLanguage(selectedLang.value);
}
</script>

<template>
  <div
    id="lang-switcher-container"
    class="relative w-14 flex items-center justify-between z-10"
  >
    <div
      class="lang-icon-container size-[22px] flex items-center justify-center rounded-full overflow-hidden cursor-pointer border-[1px] border-ghost-300 bg-void-800"
      @click="handleLangChange('en')"
    >
      <EN />
    </div>
    <div
      class="lang-icon-container size-[22px] flex items-center justify-center rounded-full overflow-hidden cursor-pointer border-[1px] border-ghost-300 bg-void-800"
      @click="handleLangChange('es')"
    >
      <ES />
    </div>
    <div
      id="lang-switcher-ring"
      class="absolute size-[30px] border-[1px] border-ghost-300 rounded-full -left-1 -z-10"
      :class="[selectedLang === 'en' ? 'esSelect' : 'gbSelect']"
    />
  </div>
</template>

<style scoped>
.esSelect {
  animation: toES 300ms ease-out forwards;
}

.gbSelect {
  animation: toGB 300ms ease-out forwards;
}

@keyframes toES {
  from {
    transform: translateX(34px) rotateY(0);
  }
  to {
    transform: translateX(0) rotateY(360deg);
  }
}

@keyframes toGB {
  from {
    transform: translateX(0px) rotateY(-360deg);
  }
  to {
    transform: translateX(34px) rotateY(0);
  }
}
</style>
