<script setup lang="ts">
import MenuList from './MenuList.vue';
import Title from './Title.vue';
import ParticleOrb from '../backgrounds/ParticleOrb.vue';

</script>

<template>
  <div class="relative flex flex-col items-center justify-center gap-10">
    <div class="absolute h-screen w-screen overflow-hidden">
      <ParticleOrb
        :base-hue="160"
        :orb-size="250"
        :particle-size="2"
        :total="200"
        :time="15"
      />
    </div>
    <Title/>
    <MenuList/>
  </div>
</template>

<style scoped>

</style>