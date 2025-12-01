<script setup lang="ts">
import MainTitle from '../components/MainTitle.vue';
import BackToMenu from '../components/BackToMenu.vue';
import Body from '../components/career-view/Body.vue';
import GradientPurple from '../components/backgrounds/GradientPurple.vue';
import SubTitle from '../components/SubTitle.vue';
import Description from '../components/Description.vue';
import Tree from '../components/skills-view/Tree.vue';
import Graph from '../components/skills-view/Graph.vue';
import SortingArray from '../components/skills-view/SortingArray.vue';
import Intersection from '../components/skills-view/Intersection.vue';
import POO from '../components/skills-view/POO.vue';
import Langs from '../components/skills-view/Langs.vue';

</script>

<template>
  <main class="relative w-screen overflow-clip min-h-screen flex flex-col items-center">
    <GradientPurple class="fixed h-screen w-screen left-0 top-0 -z-30" />

    <MainTitle title-key="SKILLS" subtitle-key="[LOG: SKILLS ANALYSIS — SUBJECT D-095]"
      description-key="his segment compiles a procedural breakdown of subject D-095’s verified technical domains and interpersonal attributes. All registered competencies have been processed through automated filtering layers to determine present operational range. The record contributes to continuous monitoring of skill acquisition and cognitive refinement.">
      <template #animated-body>

        <Body />
      </template>
    </MainTitle>

    <div class="flex flex-col items-center justify-center mb-32">
      <SubTitle text="LAYER: PRIMARY PROTOCOLS" class="mb-4" />
      <Description
        content="This layer outlines the essential protocols that form the base of D-095’s architecture, supporting all higher-level operations."
        :duration=".75" />
    </div>

    <div class="w-full flex flex-col gap-16 my-8 items-center justify-center">
      <SortingArray />
      <Description class="col-span-2 self-center justify-self-center w-[450px] opacity-90"
        content="Core data structures used for storage, retrieval, indexing, and hierarchical organization of information."
        :duration="1.5" :with-sounds="false" simple />
    </div>

    <div class="w-full flex items-center justify-center flex-nowrap gap-y-16 gap-x-32">
      <Tree height="325" />
      <Graph height="325" />
    </div>

    <div class="w-full flex mt-10 mb-6 items-center justify-center">
      <Description class="col-span-2 self-center justify-self-center w-[450px] opacity-90"
        content="Essential OOP constructs, relational database fundamentals, SQL interaction methods, and core models for structured information."
        :duration="1.25" :with-sounds="false" simple />
    </div>

    <div class="w-full flex items-center justify-center flex-nowrap gap-y-16 gap-x-32">
      <Intersection height="325" />
      <POO :height="450"/>
    </div>

    <Langs/>

    <div class="flex flex-col items-center justify-center my-16">
      <SubTitle class="mb-4" text="LAYER: IMPLEMENTATION ARRAY" />
      <Description
        content="This layer compiles the operational frameworks and auxiliary tools governing D-095’s applied execution across multiple environments." />
    </div>

    <!--

    <div class="flex flex-col items-center justify-center my-16">
      <SubTitle class="mb-4" text="LAYER: BEHAVIORAL SYSTEMS" />
      <Description
        content="This layer defines the behavioral parameters and adaptive patterns regulating D-095’s interpersonal and operational conduct." />
    </div> -->

    <div class="w-full my-16 flex items-center justify-center">
      <BackToMenu />
    </div>

  </main>
</template>

<style scoped></style>