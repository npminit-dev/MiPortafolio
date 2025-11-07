<script setup lang="ts">
  import { ref, watch } from 'vue';
  import type { Lang } from '../types/globals';
  import { useTranslation } from 'i18next-vue';

  const selectedLang = ref<Lang>('en')
  const { i18next } = useTranslation()

  watch(selectedLang, () => {
    i18next.changeLanguage(selectedLang.value)
  })

</script>

<template>
  <div class="relative w-14 flex items-center justify-between z-10">
    <div class="size-5 flex items-center justify-center rounded-full overflow-hidden cursor-pointer"
      @click="selectedLang = 'es'">
      <v-icon name="fi-square-es" class="size-7" />
    </div>
    <div class="size-5 flex items-center justify-center rounded-full overflow-hidden cursor-pointer"
      @click="selectedLang = 'en'">
      <v-icon name="fi-square-gb" class="size-7" />
    </div>
    <div 
      class="absolute size-7 border-[1px] border-ghost-300 rounded-full -left-1 -z-10"
      :class="[selectedLang === 'es' ? 'esSelect' : 'gbSelect']"
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
      transform: translateX(36px) rotateY(0);
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
      transform: translateX(36px) rotateY(0); 
    }
  }
</style>