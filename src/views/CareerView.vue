<script setup lang="ts">
import gsap from 'gsap';
import GradientViolet from '../components/backgrounds/GradientViolet.vue';
import { onMounted } from 'vue';
import MainTitle from '../components/career-view/MainTitle.vue';
import SubTitle from '../components/career-view/SubTitle.vue';
import Experience from '../components/career-view/Experience.vue';

onMounted(() => {

})
</script>

<template>
  <main class="relative w-screen overflow-clip min-h-screen flex flex-col items-center">
    <GradientViolet class="fixed h-screen w-screen left-0 top-0 -z-30"/>
    <MainTitle/>

    <SubTitle text="D-231: JOB EXPERIENCE" class="mb-12"/>

    <Experience
      company="GrowForce"
      role="somerole"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore saepe molestiae est consequuntur dolor iure repudiandae porro. Ea voluptates esse tempora sequi rem, quibusdam atque molestiae voluptatem porro architecto impedit. Voluptatum, distinctio, magni tempore ea vitae dolorum, molestias cupiditate ducimus labore at suscipit quia doloribus non ullam minima? Provident, nemo. Sint similique dicta molestias vitae, quos officiis explicabo minima quisquam porro vero, mollitia sit inventore perspiciatis tenetur magnam corrupti reiciendis assumenda earum, quod delectus ut libero totam. Deserunt, temporibus ex reprehenderit dolor labore excepturi assumenda dignissimos. In ipsam praesentium hic at, vero obcaecati non soluta quos, id eligendi voluptatem veritatis?"
    />
    <Experience
      company="iEscrow"
      role="somerole"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore saepe molestiae est consequuntur dolor iure repudiandae porro. Ea voluptates esse tempora sequi rem, quibusdam atque molestiae voluptatem porro architecto impedit. Voluptatum, distinctio, magni tempore ea vitae dolorum, molestias cupiditate ducimus labore at suscipit quia doloribus non ullam minima? Provident, nemo. Sint similique dicta molestias vitae, quos officiis explicabo minima quisquam porro vero, mollitia sit inventore perspiciatis tenetur magnam corrupti reiciendis assumenda earum, quod delectus ut libero totam. Deserunt, temporibus ex reprehenderit dolor labore excepturi assumenda dignissimos. In ipsam praesentium hic at, vero obcaecati non soluta quos, id eligendi voluptatem veritatis?"
    />
    <Experience
      company="CodeCraft"
      role="somerole"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore saepe molestiae est consequuntur dolor iure repudiandae porro. Ea voluptates esse tempora sequi rem, quibusdam atque molestiae voluptatem porro architecto impedit. Voluptatum, distinctio, magni tempore ea vitae dolorum, molestias cupiditate ducimus labore at suscipit quia doloribus non ullam minima? Provident, nemo. Sint similique dicta molestias vitae, quos officiis explicabo minima quisquam porro vero, mollitia sit inventore perspiciatis tenetur magnam corrupti reiciendis assumenda earum, quod delectus ut libero totam. Deserunt, temporibus ex reprehenderit dolor labore excepturi assumenda dignissimos. In ipsam praesentium hic at, vero obcaecati non soluta quos, id eligendi voluptatem veritatis?"
    />

  </main>
</template>

<style scoped>
</style>