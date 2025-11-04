<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import i18next from 'i18next';
import { Lang } from '../../types/globals.ts'

const lang = ref<Lang>('en');

function changeLang(lang: Lang) {
  i18next.changeLanguage(lang)
}
</script>

<template>
  <button @click="changeLang('en')">EN</button>
  <button @click="changeLang('es')">ES</button>
  <div>{{ $t('helloworld') }}</div>
</template>