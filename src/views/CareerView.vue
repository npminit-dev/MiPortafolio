<script setup lang="ts">
import MainTitle from "../components/MainTitle.vue";
import SubTitle from "../components/SubTitle.vue";
import Experience from "../components/career-view/Experience.vue";
import Education from "../components/career-view/Education.vue";
import Philosophy from "../components/career-view/Philosophy.vue";
import BackToMenu from "../components/BackToMenu.vue";
import MainTitleMorphSVG from "../components/MainTitleMorphSVG.vue";
import GradientDark from "../components/backgrounds/GradientDark.vue";
import Description from "../components/Description.vue";
import CircuitSVG from "../components/backgrounds/CircuitSVG.vue";
</script>

<template>
  <main class="relative w-screen overflow-clip min-h-screen flex flex-col items-center">
    <GradientDark class="fixed h-[100dvh] w-screen left-0 top-0 -z-30" />

    <MainTitle
      title-key="CAREER"
      subtitle-key="[LOG: CAREER ANALYSIS — SUBJECT D-095]"
      description-key="This simulation provides an analytical reconstruction of subject D-231's professional records, academic conditioning, and behavioral directives. Extracted data is processed through the system's evaluation core to determine operational stability and response accuracy. Findings contribute to the ongoing assessment of the subject's technical cognition and adaptive progression."
    >
      <template #animated-body>
        <MainTitleMorphSVG
          class="absolute md:static"
          :paths="{
            start: 'M 169 0 L 169 0 L 169 800 L 169 800 Z',
            middle: 'M 38 0 L 300 0 L 300 800 L 38 800 Z',
            end:
              'M173.032 457.369C171.854 471.25 181.276 544.722 186.138 573.531C188.453 587.18 194.8 609.416 192.516 621.223C189.255 637.678 188.313 658.973 190.108 671.372C191.24 678.902 194.804 713.632 189.705 726.334C187.037 732.995 182.148 767.132 182.148 767.132C169.411 799.29 176.599 797.708 176.599 797.708C180.543 802.547 187.297 798.088 187.297 798.088C192.442 801.369 196.006 797.309 196.006 797.309C200.422 800.965 205.571 796.859 205.571 796.859C211.12 799.74 216.265 794.428 216.265 794.428C219.452 796.033 220.231 794.006 220.231 794.006C229.793 793.393 214.896 762.793 214.896 762.793C211.329 735.31 218.436 720.014 218.436 720.014C241.716 650.978 242.898 632.657 233.593 606.64C230.972 599.13 230.309 596.156 231.514 592.895C234.302 585.369 232.271 555.098 235.671 543.078C242.232 519.896 248.703 461.103 252.076 433.671C256.609 396.72 236.02 347.175 236.02 347.175C231.511 327.013 238.122 255.177 238.122 255.177C247.354 269.542 247.001 294.9 247.001 294.9C245.535 321.495 268.485 362.141 268.485 362.141C279.512 378.938 283.688 394.874 283.688 396.057C283.688 400.896 282.63 412.609 282.63 412.609L283.052 422.81C283.242 425.408 284.704 434.353 284.468 438.677C282.746 465.283 286.972 460.277 286.972 460.277C290.54 460.277 294.46 438.867 294.46 438.867C294.46 444.388 293.11 460.917 296.088 467.152C299.651 474.589 302.272 465.876 302.319 464.128C303.261 430.251 305.297 439.126 305.297 439.126C307.278 466.609 309.713 472.817 314.079 470.669C317.386 469.091 314.362 437.688 314.362 437.688C320.027 456.342 324.323 459.312 324.323 459.312C333.671 465.876 327.89 447.746 326.591 444.155C319.674 425.079 319.461 418.468 319.461 418.468C328.103 435.61 334.617 434.974 334.617 434.974C343.047 432.283 327.25 408.011 317.995 396.382C313.272 390.458 307.181 382.525 305.413 377.814C302.532 369.834 300.357 344.182 300.357 344.182C299.485 313.911 292.001 300.763 292.001 300.763C279.206 280.283 276.798 242.079 276.798 242.079L276.232 177.579C271.746 133.583 239.327 133.265 239.327 133.265C206.56 128.387 202 117.802 202 117.802C195.06 107.814 199.026 88.6674 199.026 88.6674C204.784 83.9836 207.006 71.5489 207.006 71.5489C216.567 64.2168 216.098 53.4882 211.682 53.6045C208.138 53.6975 208.941 50.7624 208.941 50.7624C214.919 2.466 172.044 0 172.044 0H165.499C165.499 0 122.603 2.466 128.574 50.7508C128.574 50.7508 129.377 53.6898 125.802 53.5929C121.397 53.4765 120.987 64.2052 130.513 71.5373C130.513 71.5373 132.731 83.9681 138.493 88.6558C138.493 88.6558 142.459 107.802 135.519 117.79C135.519 117.79 130.975 128.375 98.1915 133.253C98.1915 133.253 65.7186 133.571 61.3023 177.568L60.6897 242.067C60.6897 242.067 58.3284 280.271 45.4827 300.751C45.4827 300.751 38.0343 313.903 37.1735 344.17C37.1735 344.17 34.9905 369.823 32.1213 377.802C30.3726 382.49 24.2852 390.423 19.5238 396.371C10.1871 407.976 -5.50458 432.198 2.8899 434.962C2.8899 434.962 9.43876 435.598 18.0465 418.456C18.0465 418.456 17.8681 425.021 10.9626 444.144C9.60549 447.688 3.83211 465.818 13.1843 459.3C13.1843 459.3 17.5153 456.326 23.1452 437.676C23.1452 437.676 20.1248 469.079 23.4864 470.657C27.8795 472.809 30.2757 466.598 32.257 439.115C32.257 439.115 34.2888 430.24 35.2309 464.116C35.2775 465.865 37.8404 474.577 41.4192 467.14C44.4397 460.906 43.0826 444.404 43.0826 438.855C43.0826 438.855 46.9561 460.266 50.5775 460.266C50.5775 460.266 54.8388 465.271 53.0901 438.665C52.807 434.319 54.3308 425.397 54.5208 422.799L54.9318 412.598C54.9318 412.598 53.8694 400.911 53.8694 396.045C53.8694 394.839 58.0492 378.927 69.0726 362.13C69.0726 362.13 91.9994 321.464 90.5221 294.889C90.5221 294.889 90.2041 269.531 99.4361 255.165C99.4361 255.165 105.989 326.997 101.549 347.163C101.549 347.163 80.9256 396.708 85.4738 433.659C88.8238 461.165 95.2835 519.88 101.859 543.067C105.295 555.063 103.263 585.326 106.016 592.883C107.257 596.167 106.605 599.192 103.938 606.628C94.6825 632.645 95.8612 650.97 119.141 720.002C119.141 720.002 126.306 735.299 122.685 762.781C122.685 762.781 107.811 793.381 117.338 793.994C117.338 793.994 118.082 796.022 121.304 794.417C121.304 794.417 126.45 799.729 132.01 796.848C132.01 796.848 137.159 800.958 141.56 797.297C141.56 797.297 145.088 801.357 150.233 798.077C150.233 798.077 156.988 802.633 161.001 797.697C161.001 797.697 168.131 799.279 155.437 767.12C155.437 767.12 150.575 733.026 147.895 726.322C142.785 713.624 146.395 678.821 147.484 671.361C149.241 658.891 148.299 637.647 145.088 621.211C142.738 609.432 149.101 587.191 151.451 573.52C156.278 544.738 165.739 471.262 164.556 457.358L168.465 458.73C171.264 458.738 173.032 457.369 173.032 457.369Z',
          }"
        />
      </template>
    </MainTitle>

    <div class="flex flex-col items-center justify-center mb-16">
      <SubTitle text="MODULE: EXPERIENCE RECORDS" class="mb-4" />
      <Description
        class="mb-16"
        content="This module catalogs the formative experience logs detailing D-095’s activity, building the structural ground that influences its present profile."
        :duration="0.75"
      />
    </div>

    <div class="relative w-full">
      <Experience
        company="- GrowForce -"
        role="Fullstack developer"
        description="During the GrowForce Project, subject D-095 developed an advanced interface using Astro, GSAP, and TailwindCSS. The system incorporated intricate time and scroll-driven animations and was deployed through Vercel for optimal performance. D-095 implemented a communication layer via Astro Actions and Nodemailer, allowing direct visitor messages to GrowForce’s network. Simultaneously, the subject maintained and refined existing frontends under strict deadlines, exhibiting adaptive efficiency and precision in high-demand visual and communication environments."
      >
        <img src="/image/GrowForce.png" class="w-3/4 select-none" alt="Growforce logo" />
      </Experience>
      <Experience
        company="- iEscrow -"
        role="Fullstack Web3 developer"
        description="During the iEscrow Simulation, subject D-095 oversaw the operational development of both the Presale and Staking platforms. The subject engineered the frontend architecture using React, Next.js, and Node.js, establishing secure communication between the visual layer and smart contracts via Hardhat, ethers.js, and Wagmi. For the Staking system, data acquisition from BitQuery was implemented to display daily OHLC metrics of the token in USD, while the Presale platform integrated KYC verification, API endpoints, and Next.js Server Actions with SSR for secure transactional flow. Both systems were constructed from initial deployment protocols, evidencing D-095’s capacity for autonomous system design, cross-layer integration, and high technical precision within blockchain-based infrastructures."
      >
        <img
          src="/image/iEscrow.png"
          class="w-3/4 -mt-3 select-none"
          alt="iEsscrow logo"
        />
      </Experience>
      <Experience
        company="- CodeCraft -"
        role="Fullstack / Mobile Developer"
        description="During the CodeCraft assignment, subject D-095 operated within full stack web and mobile development environments, utilizing React, Next.js, Vue, Angular, and React Native with Expo for cross-platform deployment. The subject collaborated under agile methodologies, contributing to iterative release cycles and coordinated task sprints. Backend systems were structured through Node.js and Express, integrating multiple relational and non-relational databases, including SQL, PostgreSQL, and MongoDB. Throughout the operation, subject D-095 exhibited consistency in delivery precision, adaptability to evolving frameworks, and procedural efficiency across diverse technological ecosystems."
      />
      <Experience
        company="- Personal Projects -"
        role="Independent Web & Mobile Developer"
        has-flip
        description="Throughout autonomous experimentation cycles, subject D-095 engineered multiple web and mobile systems designed to refine his operational dexterity across diverse stacks. These constructs include full interface pipelines using React, Next.js, Vue, and Angular, as well as mobile deployments through React Native and Expo. Parallel to this, the subject developed algorithmic utilities, UI micro-frameworks, and specialized tooling for workflow optimization. Each project was executed without external oversight, demonstrating D-095’s capacity for self-directed system design, rapid prototyping, and sustained technical evolution driven by curiosity and long-term methodological refinement."
      >
        <img
          src="/image/PersonalProjects.png"
          class="w-3/4 -mt-3 select-none"
          alt="Study image"
        />
      </Experience>
      <CircuitSVG class="absolute top-0 right-0 rotate-y-180" />
      <CircuitSVG class="absolute bottom-0 left-0" />
    </div>

    <Education />

    <Philosophy />

    <div class="w-full my-16 flex items-center justify-center">
      <BackToMenu />
    </div>
  </main>
</template>

<style scoped></style>
