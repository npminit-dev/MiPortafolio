<script setup lang="ts">
import gsap from 'gsap';
import { onMounted } from 'vue';
import MainTitle from '../components/career-view/MainTitle.vue';
import SubTitle from '../components/career-view/SubTitle.vue';
import Experience from '../components/career-view/Experience.vue';
import GradientGreen from '../components/backgrounds/GradientGreen.vue';
import Education from '../components/career-view/Education.vue';

onMounted(() => {

})
</script>

<template>
  <main class="relative w-screen overflow-clip min-h-screen flex flex-col items-center">
    <GradientGreen class="fixed h-screen w-screen left-0 top-0 -z-30" />
    <MainTitle />

    <SubTitle text="MODULE: EXPERIENCE RECORDS" class="mb-16" />

    <Experience company="- GrowForce -" role="Fullstack developer"
      description="During the GrowForce Project, subject D-095 developed an advanced interface using Astro, GSAP, and TailwindCSS. The system incorporated intricate time and scroll-driven animations and was deployed through Vercel for optimal performance. D-095 implemented a communication layer via Astro Actions and Nodemailer, allowing direct visitor messages to GrowForce’s network. Simultaneously, the subject maintained and refined existing frontends under strict deadlines, exhibiting adaptive efficiency and precision in high-demand visual and communication environments.">
      <img src="/image/GrowForce.png" class="w-3/4 select-none" alt="Growforce logo">
    </Experience>
    <Experience company="- iEscrow -" role="Fullstack Web3 developer"
      description="During the iEscrow Simulation, subject D-095 oversaw the operational development of both the Presale and Staking platforms. The subject engineered the frontend architecture using React, Next.js, and Node.js, establishing secure communication between the visual layer and smart contracts via Hardhat, ethers.js, and Wagmi. For the Staking system, data acquisition from BitQuery was implemented to display daily OHLC metrics of the token in USD, while the Presale platform integrated KYC verification, API endpoints, and Next.js Server Actions with SSR for secure transactional flow. Both systems were constructed from initial deployment protocols, evidencing D-095’s capacity for autonomous system design, cross-layer integration, and high technical precision within blockchain-based infrastructures.">
      <img src="/image/iEscrow.png" class="w-3/4 -mt-3 select-none" alt="iEsscrow logo" />
    </Experience>
    <Experience company="- CodeCraft -" role="Fullstack / Mobile Developer" has-flip
      description="During the CodeCraft assignment, subject D-095 operated within full stack web and mobile development environments, utilizing React, Next.js, Vue, Angular, and React Native with Expo for cross-platform deployment. The subject collaborated under agile methodologies, contributing to iterative release cycles and coordinated task sprints. Backend systems were structured through Node.js and Express, integrating multiple relational and non-relational databases, including SQL, PostgreSQL, and MongoDB. Throughout the operation, subject D-095 exhibited consistency in delivery precision, adaptability to evolving frameworks, and procedural efficiency across diverse technological ecosystems." />

    <SubTitle text="MODULE: COGNITIVE DEVELOPMENT" class="my-36 mb-16 mx-auto" />
    <Education/>

    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    
  </main>
</template>

<style scoped></style>