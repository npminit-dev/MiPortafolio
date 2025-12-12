<template>
  <div id="dna">
    <div v-for="i in 30" :key="i"></div>
  </div>
</template>

<script setup lang="ts">
// Nada especial aquí, todo se maneja con CSS puro.
</script>

<style lang="scss" scoped>
$dna-lines: 30;
$rotate-time: 10s;
$rotate-delay: 0.35s;
$lines-color: var(--color-neon-cyan-900);
$dots-color: var(--color-neon-cyan-700);

#dna {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 800px;
  height: 240px;
  margin-top: -120px;
  margin-left: -400px;
  perspective: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.1;
  transform: scale(1.2);

  @media screen and (max-width: 768px) {
    transform: scale(1) rotateZ(90deg);
  }
}

#dna div {
  position: relative;
  width: 2px;
  height: 160px;
  background-color: $lines-color;
  margin: 0 10px;
  transform-style: preserve-3d;
  animation: rotation $rotate-time linear infinite;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: -4px;
    right: -4px;
    height: 10px;
    background-color: $dots-color;
    border-radius: 5px;
    animation: rotation $rotate-time linear infinite reverse;
    z-index: 1;
  }

  &::before {
    top: -10px;
  }

  &::after {
    bottom: -10px;
  }
}

// Genera delays progresivos con SCSS
@for $i from 1 through $dna-lines {
  #dna div:nth-child(#{$i}),
  #dna div:nth-child(#{$i})::before,
  #dna div:nth-child(#{$i})::after {
    animation-delay: ($i * $rotate-delay * -1);
  }
}

@keyframes rotation {
  from {
    transform: rotateX(0deg);
  }
  to {
    transform: rotateX(359deg);
  }
}
</style>
