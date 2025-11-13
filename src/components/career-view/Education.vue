<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";
import { useWindowSize } from "@vueuse/core";
import EducationData from './EducationData.vue';

const { width } = useWindowSize();

function calcXPercent() {
  return (
    100 -
    (width.value / (gsap.getProperty("#education-inner-container", "width") as number)) *
      100
  );
}

onMounted(() => {
  gsap.fromTo(
    "#education-inner-container",
    {
      xPercent: 0,
    },
    {
      xPercent: `${-calcXPercent()}`,
      duration: 0.5,
      scrollTrigger: {
        trigger: "#education-outer-container",
        start: "center center",
        end: `+=${Math.round(
          (gsap.getProperty("#education-inner-container", "width") as number) * 0.75
        )}px`,
        pin: true,
        toggleActions: "play none none none",
        scrub: true,
        anticipatePin: 1,
      },
    }
  );
});
</script>

<template>
  <div>
    <section
      id="education-outer-container"
      class="relative h-[80vh] w-screen flex items-center"
    >
      <div
        id="education-inner-container"
        class="absolute flex items-center justify-start mx-20 h-3/4 min-w-[400vw] left-0"
      >
        <div
          class="relative h-40 w-40 p-2 flex items-center justify-center"
          id="flip-target"
        >
          <div class="h-full w-full overflow-hidden rounded-full object-contain">
            <img src="/image/uno.png" alt="UNO logo" />
          </div>
        </div>
        <EducationData
          insitution-name="Universidad Nacional Del Oeste"
          title="Bachelor's degree in computer science"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit fugit vitae velit dolor, obcaecati eveniet maiores aliquam id rem delectus magnam ullam excepturi laboriosam dolorem nisi nihil minus deleniti fuga animi odit pariatur similique ad saepe. Mollitia quasi illo quis illum laborum, sit, voluptate commodi unde similique, officiis quae praesentium."
        />
      </div>
    </section>
  </div>
</template>

<style></style>
