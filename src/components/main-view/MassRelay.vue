<script setup lang="ts"></script>

<template>
  <div id="mass-relay" class="absolute flex items-center justify-center">
    <div
      id="mass-relay-outer"
      class="h-[550px] w-[625px] p-8 border-[3px] sm:border-[2px] md:border-[1px] border-ghost-300/10 flex items-center justify-between rounded-[50%]"
    >
      <div
        id="mass-relay-inner"
        class="h-full w-full border-[3px] sm:border-[2px] md:border-[1px] border-ghost-300/10 rounded-[50%]"
      />
    </div>
  </div>
</template>

<style>
#mass-relay {
  animation: appear 1s ease-out forwards;
}

#mass-relay-outer {
  animation: outer 9s linear infinite;
  transform-style: preserve-3d;
}

#mass-relay-inner {
  animation: inner 3s linear infinite;
}

@keyframes outer {
  from {
    transform: rotate3d(0, 0, 0, 360deg);
  }
  to {
    transform: rotate3d(0, 1, 0, 360deg);
  }
}

@keyframes inner {
  from {
    transform: rotate3d(0, 0, 0, 360deg);
  }
  to {
    transform: rotate3d(1, 0, 0, 360deg);
  }
}

@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
