<script setup lang="ts">
import MainTitle from "../components/MainTitle.vue";
import BackToMenu from "../components/BackToMenu.vue";
import MainTitleMorphSVG from "../components/MainTitleMorphSVG.vue";
import SubTitle from "../components/SubTitle.vue";
import Description from "../components/Description.vue";
import Tree from "../components/skills-view/Tree.vue";
import Graph from "../components/skills-view/Graph.vue";
import SortingArray from "../components/skills-view/SortingArray.vue";
import Intersection from "../components/skills-view/Intersection.vue";
import POO from "../components/skills-view/POO.vue";
import Langs from "../components/skills-view/Langs.vue";
import Frameworks from "../components/skills-view/Frameworks.vue";
import SoftSkills from "../components/skills-view/SoftSkills.vue";
import GradientDark from "../components/backgrounds/GradientDark.vue";
import { useSoundStore } from "../stores/useSoundStore";

const st = useSoundStore();
</script>

<template>
  <main class="relative w-screen overflow-clip min-h-screen flex flex-col items-center">
    <GradientDark class="fixed h-screen w-screen left-0 top-0 -z-30" />

    <MainTitle
      title-key="SKILLS"
      subtitle-key="[LOG: SKILLS ANALYSIS — SUBJECT D-095]"
      description-key="This segment compiles a procedural breakdown of subject D-095’s verified technical domains and interpersonal attributes. All registered competencies have been processed through automated filtering layers to determine present operational range. The record contributes to continuous monitoring of skill acquisition and cognitive refinement."
    >
      <template #animated-body>
        <MainTitleMorphSVG
          :paths="{
            start: 'M 169 0 L 169 0 L 169 800 L 169 800 Z',
            middle:
              'M164 780.688L11.9393 390.688L164 0.688232L316.061 390.688L164 780.688Z',
            end:
              'M173.032 457.369C171.854 471.25 181.276 544.722 186.138 573.531C188.453 587.18 194.8 609.416 192.516 621.223C189.255 637.678 188.313 658.973 190.108 671.372C191.24 678.902 194.804 713.632 189.705 726.334C187.037 732.995 182.148 767.132 182.148 767.132C169.411 799.29 176.599 797.708 176.599 797.708C180.543 802.547 187.297 798.088 187.297 798.088C192.442 801.369 196.006 797.309 196.006 797.309C200.422 800.965 205.571 796.859 205.571 796.859C211.12 799.74 216.265 794.428 216.265 794.428C219.452 796.033 220.231 794.006 220.231 794.006C229.793 793.393 214.896 762.793 214.896 762.793C211.329 735.31 218.436 720.014 218.436 720.014C241.716 650.978 242.898 632.657 233.593 606.64C230.972 599.13 230.309 596.156 231.514 592.895C234.302 585.369 232.271 555.098 235.671 543.078C242.232 519.896 248.703 461.103 252.076 433.671C256.609 396.72 236.02 347.175 236.02 347.175C231.511 327.013 238.122 255.177 238.122 255.177C247.354 269.542 247.001 294.9 247.001 294.9C245.535 321.495 268.485 362.141 268.485 362.141C279.512 378.938 283.688 394.874 283.688 396.057C283.688 400.896 282.63 412.609 282.63 412.609L283.052 422.81C283.242 425.408 284.704 434.353 284.468 438.677C282.746 465.283 286.972 460.277 286.972 460.277C290.54 460.277 294.46 438.867 294.46 438.867C294.46 444.388 293.11 460.917 296.088 467.152C299.651 474.589 302.272 465.876 302.319 464.128C303.261 430.251 305.297 439.126 305.297 439.126C307.278 466.609 309.713 472.817 314.079 470.669C317.386 469.091 314.362 437.688 314.362 437.688C320.027 456.342 324.323 459.312 324.323 459.312C333.671 465.876 327.89 447.746 326.591 444.155C319.674 425.079 319.461 418.468 319.461 418.468C328.103 435.61 334.617 434.974 334.617 434.974C343.047 432.283 327.25 408.011 317.995 396.382C313.272 390.458 307.181 382.525 305.413 377.814C302.532 369.834 300.357 344.182 300.357 344.182C299.485 313.911 292.001 300.763 292.001 300.763C279.206 280.283 276.798 242.079 276.798 242.079L276.232 177.579C271.746 133.583 239.327 133.265 239.327 133.265C206.56 128.387 202 117.802 202 117.802C195.06 107.814 199.026 88.6674 199.026 88.6674C204.784 83.9836 207.006 71.5489 207.006 71.5489C216.567 64.2168 216.098 53.4882 211.682 53.6045C208.138 53.6975 208.941 50.7624 208.941 50.7624C214.919 2.466 172.044 0 172.044 0H165.499C165.499 0 122.603 2.466 128.574 50.7508C128.574 50.7508 129.377 53.6898 125.802 53.5929C121.397 53.4765 120.987 64.2052 130.513 71.5373C130.513 71.5373 132.731 83.9681 138.493 88.6558C138.493 88.6558 142.459 107.802 135.519 117.79C135.519 117.79 130.975 128.375 98.1915 133.253C98.1915 133.253 65.7186 133.571 61.3023 177.568L60.6897 242.067C60.6897 242.067 58.3284 280.271 45.4827 300.751C45.4827 300.751 38.0343 313.903 37.1735 344.17C37.1735 344.17 34.9905 369.823 32.1213 377.802C30.3726 382.49 24.2852 390.423 19.5238 396.371C10.1871 407.976 -5.50458 432.198 2.8899 434.962C2.8899 434.962 9.43876 435.598 18.0465 418.456C18.0465 418.456 17.8681 425.021 10.9626 444.144C9.60549 447.688 3.83211 465.818 13.1843 459.3C13.1843 459.3 17.5153 456.326 23.1452 437.676C23.1452 437.676 20.1248 469.079 23.4864 470.657C27.8795 472.809 30.2757 466.598 32.257 439.115C32.257 439.115 34.2888 430.24 35.2309 464.116C35.2775 465.865 37.8404 474.577 41.4192 467.14C44.4397 460.906 43.0826 444.404 43.0826 438.855C43.0826 438.855 46.9561 460.266 50.5775 460.266C50.5775 460.266 54.8388 465.271 53.0901 438.665C52.807 434.319 54.3308 425.397 54.5208 422.799L54.9318 412.598C54.9318 412.598 53.8694 400.911 53.8694 396.045C53.8694 394.839 58.0492 378.927 69.0726 362.13C69.0726 362.13 91.9994 321.464 90.5221 294.889C90.5221 294.889 90.2041 269.531 99.4361 255.165C99.4361 255.165 105.989 326.997 101.549 347.163C101.549 347.163 80.9256 396.708 85.4738 433.659C88.8238 461.165 95.2835 519.88 101.859 543.067C105.295 555.063 103.263 585.326 106.016 592.883C107.257 596.167 106.605 599.192 103.938 606.628C94.6825 632.645 95.8612 650.97 119.141 720.002C119.141 720.002 126.306 735.299 122.685 762.781C122.685 762.781 107.811 793.381 117.338 793.994C117.338 793.994 118.082 796.022 121.304 794.417C121.304 794.417 126.45 799.729 132.01 796.848C132.01 796.848 137.159 800.958 141.56 797.297C141.56 797.297 145.088 801.357 150.233 798.077C150.233 798.077 156.988 802.633 161.001 797.697C161.001 797.697 168.131 799.279 155.437 767.12C155.437 767.12 150.575 733.026 147.895 726.322C142.785 713.624 146.395 678.821 147.484 671.361C149.241 658.891 148.299 637.647 145.088 621.211C142.738 609.432 149.101 587.191 151.451 573.52C156.278 544.738 165.739 471.262 164.556 457.358L168.465 458.73C171.264 458.738 173.032 457.369 173.032 457.369Z',
          }"
        />
      </template>
    </MainTitle>

    <div class="flex flex-col items-center justify-center mb-32">
      <SubTitle text="LAYER: PRIMARY PROTOCOLS" class="mb-4" />
      <Description
        content="This layer outlines the essential protocols that form the base of D-095’s architecture, supporting all higher-level operations."
        :duration="0.75"
      />
    </div>

    <div class="w-full flex flex-col gap-16 my-8 items-center justify-center">
      <SortingArray />
      <Description
        class="col-span-2 self-center justify-self-center w-[450px] opacity-90"
        content="Core data structures used for storage, retrieval, indexing, and hierarchical organization of information."
        :duration="1.5"
        :with-sounds="false"
        simple
      />
    </div>

    <div class="w-full flex items-center justify-center flex-nowrap gap-y-16 gap-x-32">
      <Tree height="325" />
      <Graph height="325" />
    </div>

    <div class="w-full flex mt-10 mb-6 items-center justify-center">
      <Description
        class="col-span-2 self-center justify-self-center w-[450px] opacity-90"
        content="Essential OOP constructs, relational database fundamentals, SQL interaction methods, and core models for structured information."
        :duration="1.25"
        :with-sounds="false"
        simple
      />
    </div>

    <div class="w-full flex items-center justify-center flex-nowrap gap-y-16 gap-x-32">
      <Intersection height="325" />
      <POO :height="450" />
    </div>

    <Langs />

    <div class="flex flex-col items-center justify-center my-16">
      <SubTitle class="mb-4" text="LAYER: IMPLEMENTATION ARRAY" />
      <Description
        content="This layer compiles the operational frameworks and auxiliary tools governing D-095’s applied execution across multiple environments."
      />
    </div>

    <Frameworks />

    <div class="flex flex-col items-center justify-center my-16 z-50">
      <SubTitle class="mb-4" text="LAYER: BEHAVIORAL SYSTEMS" />
      <Description
        content="This layer defines the behavioral parameters and adaptive patterns regulating D-095’s interpersonal and operational conduct."
      />
    </div>

    <SoftSkills />

    <div class="w-full my-16 mt-40 flex items-center justify-center">
      <BackToMenu :before-back="() => st.resetBackgrounds()" />
    </div>
  </main>
</template>

<style scoped></style>
