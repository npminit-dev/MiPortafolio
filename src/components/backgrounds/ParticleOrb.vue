<script setup lang="ts">
import { onMounted, watch } from 'vue'

interface Props {
  total: number,
  baseHue: number,
  orbSize: number,
  particleSize: number,
  time: number
}

const props = defineProps<Props>()

onMounted(() => setCSSVars())
watch(props, () => setCSSVars())

function setCSSVars() {
  const root = document.documentElement
  root.style.setProperty('--total', String(props.total))
  root.style.setProperty('--base-hue', String(props.baseHue))
  root.style.setProperty('--orb-size', props.orbSize + 'px')
  root.style.setProperty('--particle-size', props.particleSize + 'px')
  root.style.setProperty('--time', props.time + 's')
}
</script>

<template>
  <div class="wrap">
    <div v-for="i in total" :key="i" class="c" />
  </div>
</template>

<style scoped lang="scss">
@use 'sass:math';

$total: var(--total);
$orb-size: var(--orb-size);
$particle-size: var(--particle-size);
$time: var(--time);
$base-hue: var(--base-hue);

.wrap {
  position: relative;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  transform-style: preserve-3d;
  perspective: 1000px;
  animation: rotate var(--time) infinite linear;
}

@keyframes rotate {
  100% {
    transform: rotateY(360deg) rotateX(360deg);
  }
}

.c {
  position: absolute;
  width: var(--particle-size);
  height: var(--particle-size);
  border-radius: 50%;
  opacity: 0;
}

@for $i from 1 through 300 {
  $z: (math.random(360) * 1deg);
  $y: (math.random(360) * 1deg);
  $offset: math.div(40, 300) * $i;

  .c:nth-child(#{$i}) {
    animation: orbit#{$i} var(--time) infinite;
    animation-delay: ($i * 0.01s);

    // 🔹 Color dinámico usando var(--base-hue)
    background-color: hsla(calc(var(--base-hue) + #{$offset}), 100%, 50%, 1);
  }

  @keyframes orbit#{$i} {
    20% { opacity: 1; }
    30% {
      transform: rotateZ(-$z) rotateY($y) translateX(var(--orb-size)) rotateZ($z);
    }
    80% {
      transform: rotateZ(-$z) rotateY($y) translateX(var(--orb-size)) rotateZ($z);
      opacity: 1;
    }
    100% {
      transform: rotateZ(-$z) rotateY($y)
                 translateX(calc(var(--orb-size) * 3)) rotateZ($z);
    }
  }
}
</style>
