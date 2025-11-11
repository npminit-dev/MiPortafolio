<script setup lang="ts">
import MenuList from './MenuList.vue';
import Title from './Title.vue';
import ParticleOrb from '../backgrounds/ParticleOrb.vue';
import { useWindowSize } from '@vueuse/core';
import MassRelay from './MassRelay.vue';

const { height } = useWindowSize()

</script>

<template>
  <div class="relative flex flex-col items-center justify-center gap-10">
    <div class="absolute h-screen w-screen overflow-hidden -z-10">
      <ParticleOrb
        :base-hue="180"
        :orb-size="height/1.2"
        :particle-size="2"
        :total="200"
        :time="15"
      />
    </div>
    <MassRelay class="absolute"/>
    <Title/>
    <MenuList/>
  </div>
</template>

<style scoped>

</style>