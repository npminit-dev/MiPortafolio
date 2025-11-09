<script setup lang="ts">
import GradientDark from "../components/backgrounds/GradientDark.vue";
import ProgressBar from '../components/main-view/ProgressBar.vue';
import Menu from '../components/main-view/Menu.vue'
import { provide, ref, type InjectionKey } from 'vue';

const loading = ref<boolean>(true)

provide('endLoading', () => {
  loading.value = false
})

</script>

<template>
  <div class="fixed h-screen w-screen -z-10">
    <GradientDark />
  </div>
  <main class="w-screen min-h-screen flex items-center justify-center">
    <ProgressBar v-if="loading"/>
    <Menu v-if="!loading" />
  </main>
</template>

<style scoped></style>
