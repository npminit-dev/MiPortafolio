<script setup lang="ts">
  import MainTitle from '../components/career-view/MainTitle.vue';
  import BackToMenu from '../components/BackToMenu.vue';
  import Body from '../components/career-view/Body.vue';
  import GradientPurple from '../components/backgrounds/GradientPurple.vue';

</script>

<template>
  <main class="relative w-screen overflow-clip min-h-screen flex flex-col items-center">
    <GradientPurple class="fixed h-screen w-screen left-0 top-0 -z-30"/>

    <MainTitle
      title-key="SKILLS"
      subtitle-key="[LOG: SKILLS ANALYSIS — SUBJECT D-095]"
      description-key="his segment compiles a procedural breakdown of subject D-095’s verified technical domains and interpersonal attributes. All registered competencies have been processed through automated filtering layers to determine present operational range. The record contributes to continuous monitoring of skill acquisition and cognitive refinement."
    >
      <template #animated-body>
        <Body />
      </template>
    </MainTitle>


    <div class="w-full my-16 flex items-center justify-center">
      <BackToMenu/>
    </div>
    
  </main>
</template>

<style scoped></style>