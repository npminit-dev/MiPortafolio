<script setup lang="ts">
import ParticleOrb from '../backgrounds/ParticleOrb.vue';
import GradientDark from '../backgrounds/GradientDark.vue';
</script>

<template>
  <div style="background-color: #111;">
    <div class="relative w-screen h-screen overflow-hidden">
      <ParticleOrb :total="300" :base-hue="140" :orb-size="180" :particle-size="2" :time="10" />
    </div>

    <div class="w-screen h-screen">
      <GradientDark />
    </div>
  </div>
</template>