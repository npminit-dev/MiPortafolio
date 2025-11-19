<script setup lang="ts">

type Props = {
  insitutionName: string,
  title: string,
  description: string
}

const props = defineProps<Props>()

</script>

<template>
  <article class="education-data flex flex-col items-start justify-center w-[450px] mx-16">
    <h4 class="font-display font-medium text-ghost-100 text-2xl">{{ $t(props.insitutionName) }}</h4>
    <h5 class="font-display font-normal text-ghost-200 text-xl mb-2">{{ $t(props.title) }}</h5>
    <p class="font-display font-light text-ghost-200 text-lg leading-tight">
      {{ $t(props.description) }}
    </p>
  </article>
</template>

<style>

</style>

