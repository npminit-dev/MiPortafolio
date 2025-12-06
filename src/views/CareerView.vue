<script setup lang="ts">
import MainTitle from '../components/MainTitle.vue';
import SubTitle from '../components/SubTitle.vue';
import Experience from '../components/career-view/Experience.vue';
import Education from '../components/career-view/Education.vue';
import Philosophy from '../components/career-view/Philosophy.vue';
import BackToMenu from '../components/BackToMenu.vue';
import MainTitleMorphSVG from '../components/MainTitleMorphSVG.vue';
import GradientDark from '../components/backgrounds/GradientDark.vue';
import Description from '../components/Description.vue';
import CircuitSVG from '../components/backgrounds/CircuitSVG.vue';

</script>

<template>
  <main class="relative w-screen overflow-clip min-h-screen flex flex-col items-center">
    <GradientDark class="fixed h-screen w-screen left-0 top-0 -z-30" />



    <MainTitle
      title-key="CAREER"
      subtitle-key="[LOG: CAREER ANALYSIS — SUBJECT D-095]"
      description-key="This simulation provides an analytical reconstruction of subject D-231's professional records, academic conditioning, and behavioral directives. Extracted data is processed through the system's evaluation core to determine operational stability and response accuracy. Findings contribute to the ongoing assessment of the subject's technical cognition and adaptive progression."
    >
      <template #animated-body>
        <MainTitleMorphSVG
          :paths="{
            start: 'M 169 0 L 169 0 L 169 800 L 169 800 Z',
            middle: 'M 38 0 L 300 0 L 300 800 L 38 800 Z',
            end: 'M186.501 67.3518L286.86 1.85044C287.468 1.45281 288.087 1.13277 288.711 0.882821L288.712 0.882288C288.834 0.832987 288.959 0.797528 289.091 0.7631C289.219 0.729639 289.361 0.696174 289.499 0.654983C289.874 0.543453 290.215 0.421442 290.566 0.365211L290.567 0.365648C290.873 0.316228 291.164 0.330084 291.496 0.316002C291.827 0.301956 292.129 0.267554 292.44 0.290917L292.44 0.291888C292.592 0.304061 292.741 0.330356 292.893 0.361463L293.36 0.460015C293.693 0.525306 294.003 0.567491 294.318 0.668577C294.603 0.760436 294.879 0.903719 295.177 1.03539L295.178 1.03486C295.521 1.18334 295.848 1.30702 296.176 1.49362C296.313 1.57217 296.447 1.66274 296.581 1.75777L296.994 2.0503C297.25 2.22568 297.499 2.38468 297.746 2.56766L297.992 2.75955C298.292 3.00881 298.577 3.31275 298.882 3.60716C299.181 3.89619 299.466 4.13583 299.75 4.45063L299.75 4.4516C300.291 5.04835 300.818 5.71104 301.334 6.42678C301.357 6.45847 301.379 6.4859 301.398 6.50769C301.417 6.53058 301.434 6.54856 301.448 6.56934C301.464 6.5906 301.478 6.61532 301.496 6.64531L301.557 6.7401C302.069 7.47294 302.571 8.25377 303.054 9.09757L303.054 9.09854C303.301 9.5296 303.525 9.99955 303.768 10.4667C304.03 10.9701 304.291 11.443 304.538 11.9699C304.796 12.5203 305.032 13.1111 305.28 13.6993C305.492 14.2006 305.705 14.6697 305.903 15.1854C306.134 15.7833 306.342 16.4146 306.561 17.0459C306.659 17.3274 306.757 17.6022 306.853 17.8789L307.137 18.7241C307.234 19.0329 307.326 19.3485 307.417 19.6681L307.688 20.6355C307.869 21.2715 308.054 21.8841 308.22 22.5372C308.388 23.1938 308.533 23.8759 308.688 24.5583C308.766 24.8984 308.845 25.2312 308.922 25.5659L309.144 26.5839C309.304 27.3782 309.439 28.1972 309.582 29.0178C309.69 29.6348 309.806 30.2104 309.901 30.8307L309.902 30.8317C310.129 32.301 310.327 33.7935 310.495 35.3093L337.386 279.762C338.72 291.892 338.02 304.803 335.449 315.65C332.874 326.514 328.66 334.321 323.792 337.499C318.923 340.676 313.671 339.047 309.211 332.775C304.758 326.512 301.501 316.184 300.167 304.054L285.447 170.246L285.038 170.397L198.345 536.146C197.072 541.516 195.381 546.205 193.376 549.953C191.373 553.698 189.099 556.421 186.687 557.995C184.276 559.569 181.748 559.979 179.244 559.176C176.738 558.373 174.312 556.371 172.107 553.27L109.442 465.144L109.203 464.809L109.066 465.39L36.1484 773.018C33.5714 783.872 29.3586 791.67 24.4917 794.842C19.6247 798.014 14.3757 796.383 9.91764 790.114C5.46654 783.855 2.21047 773.532 0.875033 761.409C-0.460393 749.286 0.237123 736.38 2.80383 725.534L85.4618 376.808C86.7346 371.438 88.4253 366.749 90.4301 363.001C92.4337 359.257 94.7076 356.533 97.1193 354.959C99.5309 353.385 102.059 352.975 104.562 353.778C107.068 354.581 109.494 356.583 111.699 359.684L174.364 447.81L174.603 448.145L174.741 447.564L251.693 122.913L251.8 122.46L196.531 158.532C191.662 161.71 186.41 160.081 181.95 153.809C177.497 147.546 174.24 137.217 172.906 125.088C171.572 112.959 172.272 100.047 174.843 89.2002C177.418 78.3365 181.632 70.5295 186.501 67.3518Z'
          }"
         />
      </template>
    </MainTitle>

    <div class="flex flex-col items-center justify-center mb-16">
      <SubTitle text="MODULE: EXPERIENCE RECORDS" class="mb-4"/>
      <Description
        class="mb-16"
        content="This module catalogs the formative experience logs detailing D-095’s activity, building the structural ground that influences its present profile."
        :duration=".75"
      />
    </div>

    <div class="relative w-full">
      <Experience company="- GrowForce -" role="Fullstack developer"
        description="During the GrowForce Project, subject D-095 developed an advanced interface using Astro, GSAP, and TailwindCSS. The system incorporated intricate time and scroll-driven animations and was deployed through Vercel for optimal performance. D-095 implemented a communication layer via Astro Actions and Nodemailer, allowing direct visitor messages to GrowForce’s network. Simultaneously, the subject maintained and refined existing frontends under strict deadlines, exhibiting adaptive efficiency and precision in high-demand visual and communication environments.">
        <img src="/image/GrowForce.png" class="w-3/4 select-none" alt="Growforce logo">
      </Experience>
      <Experience company="- iEscrow -" role="Fullstack Web3 developer"
        description="During the iEscrow Simulation, subject D-095 oversaw the operational development of both the Presale and Staking platforms. The subject engineered the frontend architecture using React, Next.js, and Node.js, establishing secure communication between the visual layer and smart contracts via Hardhat, ethers.js, and Wagmi. For the Staking system, data acquisition from BitQuery was implemented to display daily OHLC metrics of the token in USD, while the Presale platform integrated KYC verification, API endpoints, and Next.js Server Actions with SSR for secure transactional flow. Both systems were constructed from initial deployment protocols, evidencing D-095’s capacity for autonomous system design, cross-layer integration, and high technical precision within blockchain-based infrastructures.">
        <img src="/image/iEscrow.png" class="w-3/4 -mt-3 select-none" alt="iEsscrow logo" />
      </Experience>
      <Experience company="- CodeCraft -" role="Fullstack / Mobile Developer"
        description="During the CodeCraft assignment, subject D-095 operated within full stack web and mobile development environments, utilizing React, Next.js, Vue, Angular, and React Native with Expo for cross-platform deployment. The subject collaborated under agile methodologies, contributing to iterative release cycles and coordinated task sprints. Backend systems were structured through Node.js and Express, integrating multiple relational and non-relational databases, including SQL, PostgreSQL, and MongoDB. Throughout the operation, subject D-095 exhibited consistency in delivery precision, adaptability to evolving frameworks, and procedural efficiency across diverse technological ecosystems." />
      <Experience company="- Personal Projects -" role="Independent Web & Mobile Developer" has-flip
          description="Throughout autonomous experimentation cycles, subject D-095 engineered multiple web and mobile systems designed to refine his operational dexterity across diverse stacks. These constructs include full interface pipelines using React, Next.js, Vue, and Angular, as well as mobile deployments through React Native and Expo. Parallel to this, the subject developed algorithmic utilities, UI micro-frameworks, and specialized tooling for workflow optimization. Each project was executed without external oversight, demonstrating D-095’s capacity for self-directed system design, rapid prototyping, and sustained technical evolution driven by curiosity and long-term methodological refinement." >
        <img src="/image/PersonalProjects.png" class="w-3/4 -mt-3 select-none" alt="Study image" />
      </Experience>
      <CircuitSVG class="absolute top-0 right-0 rotate-y-180"/>
      <CircuitSVG class="absolute bottom-0 left-0"/>
    </div>


    <Education/>

    <Philosophy/>

    <div class="w-full my-16 flex items-center justify-center">
      <BackToMenu/>
    </div>
    
  </main>
</template>

<style scoped></style>