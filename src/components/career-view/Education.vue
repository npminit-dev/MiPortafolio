<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, useTemplateRef } from "vue";
import gsap from "gsap";
import { useWindowSize } from "@vueuse/core";
import EducationData from "./EducationData.vue";
import EducationLogo from "./EducationLogo.vue";
import SubTitle from "./SubTitle.vue";
import { SplitText } from "gsap/all";
import EducationDivider from "./EducationDivider.vue";
import { useTranslation } from "i18next-vue";
import { useSoundStore } from '../../stores/useSoundStore';

const { width } = useWindowSize();
const subtitleWrapper = useTemplateRef<HTMLElement | null>("subtitleWrapper");
const subtitleRef = useTemplateRef<InstanceType<typeof SubTitle> | null>("subtitleRef");
const { i18next } = useTranslation(); 
const st = useSoundStore()
let splits: SplitText[] = [];

let animations: Array<gsap.core.Tween|gsap.core.Timeline> = [];

function calcXPercent() {
  return 100 - (width.value / getWidthAndMargin()) * 100;
}

function getWidthAndMargin() {
  return gsap.getProperty("#education-inner-container", "width") as number;
}

function createAnimations() {
  // Establecer todos los logos como invisibles inicialmente
  gsap.set(".education-logo-container", { autoAlpha: 0 });

  // ScrollTrigger para el SubTitle
  const subtitleAnim = gsap.to(subtitleWrapper.value, {
    scrollTrigger: {
      trigger: "#education-outer-container",
      start: "bottom bottom",
      end: `+=${getWidthAndMargin()}px`,
      pin: subtitleWrapper.value,
      pinSpacing: false,
      anticipatePin: 1,
    },
  });
  animations.push(subtitleAnim);

  // ScrollTrigger para la animación horizontal
  const horScroll = gsap.fromTo(
    "#education-inner-container",
    {
      xPercent: 0,
    },
    {
      xPercent: `${-calcXPercent()}`,
      duration: 1,
      scrollTrigger: {
        trigger: "#education-outer-container",
        start: "bottom bottom",
        end: `+=${getWidthAndMargin()}px`,
        pin: true,
        toggleActions: "play none none none",
        scrub: 0,
        anticipatePin: 1,
        onEnter: () => {
          gsap.set(".education-logo-container", { autoAlpha: 1 });
        },
      },
    }
  );
  animations.push(horScroll);

  // Animaciones para EducationDivider
  gsap.utils.toArray(".education-divider").forEach((div) => {
    if (!div) return;
    const svg = (div as HTMLDivElement).querySelector("svg");
    const anim = gsap.fromTo(
      svg!.getElementsByTagName("path"),
      {
        drawSVG: "50% 50%",
      },
      {
        drawSVG: "100% 0%",
        duration: 0.8,
        delay: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: svg as SVGElement,
          containerAnimation: horScroll,
          start: "left right",
          end: "right left",
          toggleActions: "play reset play reset",
        },
      }
    );
    animations.push(anim);
  });

  // Animaciones para EducationData
  gsap.utils.toArray(".education-data").forEach((div, i) => {
    if (!div) return;

    const element = div as HTMLElement;
    const h4 = element.querySelector("h4");
    const h5 = element.querySelector("h5");
    const p = element.querySelector("p");

    // SplitText para títulos (chars) y párrafo (lines)
    const splitH4 = new SplitText(h4, { type: "chars" });
    const splitH5 = new SplitText(h5, { type: "chars" });
    const splitP = new SplitText(p, { type: "lines" });

    splits.push(splitH4, splitH5, splitP);

    // Animar títulos con desplazamiento
    const animTitles = gsap.fromTo(
      [splitH4.chars, splitH5.chars],
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.8,
        stagger: 0.02,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          containerAnimation: horScroll,
          start: "left right",
          end: "right left",
          toggleActions: "play reset play reset",
        },
      }
    );
    animations.push(animTitles);

    // Animar párrafo línea por línea solo con opacidad
    const animP = gsap.fromTo(
      splitP.lines,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          containerAnimation: horScroll,
          start: "left right",
          end: "right left",
          toggleActions: "play none none none",
        },
      }
    );
    animations.push(animP);
  });

  // Animaciones para EducationLogo
  gsap.utils.toArray(".education-logo-container").forEach((div, i) => {
    if (!div) return;

    const element = div as HTMLElement;
    const img = element.querySelector(".education-logo");

    const anim = gsap.fromTo(
      img,
      {
        rotationY: -90,
        opacity: 0,
      },
      {
        rotationY: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          containerAnimation: horScroll,
          pinnedContainer: "#education-outer-container",
          start: "left right",
          end: "right left",
          toggleActions: "play none none none",
        },
        onStart: () => {
          if (!i) {
            st.play(st.sounds["hit-1"]);
            const stars = document.getElementsByClassName("hit-star");
            let tl = gsap.timeline();
            tl.fromTo(
              stars,
              {
                autoAlpha: 1,
              },
              {
                x: () => Math.random() * 600 - 200,
                y: () => Math.random() * 600 - 300,
                autoAlpha: 0,
                ease: "expo.out",
                duration: () => 2 + Math.random() * 6,
              }
            );
            animations.push(tl);
          }
        },
      }
    );
    animations.push(anim);
  });
}

function killAnimations() {
  animations.forEach((anim) => {
    if (anim.scrollTrigger) {
      anim.scrollTrigger.kill();
    }
    anim.kill();
  });
  splits.forEach(split => split.revert())
  animations = [];
}

onMounted(() => {
  createAnimations();
  i18next.on("languageChanged", async () => {
    killAnimations();
    await nextTick();
    await nextTick();
    await nextTick();
    createAnimations();
  });
});

onUnmounted(() => {
  killAnimations();
});
</script>

<template>
  <div ref="subtitleWrapper">
    <SubTitle
      ref="subtitleRef"
      :simple="true"
      text="MODULE: COGNITIVE DEVELOPMENT"
      class="my-36 mb-16 mx-auto"
    />
  </div>
  <div>
    <section
      id="education-outer-container"
      class="relative h-[80vh] w-screen flex items-center"
    >
      <div
        id="education-inner-container"
        class="flex items-center justify-evenly flex-nowrap h-3/4 left-0 px-32"
      >
        <div
          class="relative h-40 w-40 p-2 flex items-center justify-betwen"
          id="flip-target"
        >
          <div
            class="education-logo-container h-full w-full overflow-hidden rounded-full object-contain"
          >
            <img src="/image/uno.png" alt="UNO logo" class="education-logo rounded-full" />
          </div>
          <div id="hit-stars-container" class="absolute inset-0 flex items-center justify-center -z-10">
            <div class="absolute hit-star h-[1px] w-[1px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[3px] w-[3px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[3px] w-[3px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[3px] w-[3px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[3px] w-[3px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[3px] w-[3px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[1px] w-[1px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[1px] w-[1px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[1px] w-[1px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[1px] w-[1px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[1px] w-[1px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[1px] w-[1px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[2px] w-[2px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[2px] w-[2px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[2px] w-[2px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[2px] w-[2px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[1px] w-[1px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[3px] w-[3px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[3px] w-[3px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[3px] w-[3px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[3px] w-[3px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[3px] w-[3px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[1px] w-[1px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[1px] w-[1px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[1px] w-[1px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[1px] w-[1px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[1px] w-[1px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[1px] w-[1px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[2px] w-[2px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[2px] w-[2px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[2px] w-[2px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[2px] w-[2px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[2px] w-[2px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[2px] w-[2px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[2px] w-[2px] bg-ghost-100 rounded-full opacity-0"/>
            <div class="absolute hit-star h-[2px] w-[2px] bg-ghost-100 rounded-full opacity-0"/>
          </div>
        </div>
        <EducationData
          insitution-name="Universidad Nacional Del Oeste"
          title="- Bachelor's degree in computer science -"
          description="During this training cycle, the candidate engaged in core protocols covering computational theory, object-oriented principles, and structured software design. The program included extensive work with C, Java, and SQL, reinforcing encapsulation, abstraction, algorithmic complexity, and key design patterns for scalable systems. Exposure to discrete mathematics, database architecture, and systematic problem-solving established a strong foundational layer for real-world development. Subject D-095 demonstrated consistent analytical precision and high adaptability across all monitored sessions."
        />

        <EducationDivider />

        <EducationLogo
          :image-data="{
            src: '/image/fullstackopen.png',
          }"
        />
        <EducationData
          insitution-name="Helsinki University"
          title="- Full Stack Open Course -"
          description="During this advanced module, the candidate completed a full operational cycle in modern web architecture and end-to-end application design. Training involved intensive work with React, Node.js, Express, MongoDB, and GraphQL, emphasizing asynchronous data flows, API orchestration, and resilient full stack environments. By completing all protocols and exercises, the candidate strengthened mastery of distributed logic, component-driven interfaces, and server-side execution patterns. Subject D-095 maintained high technical precision and rapid assimilation of complex workflows throughout the evaluation period."
        />

        <EducationDivider />

        <EducationLogo
          :image-data="{
            src: '/image/programming.png',
          }"
        />
        <EducationData
          insitution-name="Independent Full Stack Training"
          title="- Autonomous Development Protocols -"
          description="Throughout this autonomous training sequence, the candidate advanced through practical protocols covering both foundational and advanced layers of modern software engineering. The cycle reinforced core principles of HTML, CSS, and JavaScript, extending into TypeScript, React, Vue, Angular, and backend work with Node.js and Express. Additional modules included databases such as MySQL and Transact-SQL, plus essential design patterns. Subject D-095 demonstrated strong discipline, rapid assimilation, and consistent performance."
        />

        <EducationDivider />

        <EducationLogo
          :image-data="{
            src: '/image/ipi.png',
          }"
        />
        <EducationData
          insitution-name="IPI"
          title="- Office Automation Course -"
          description="The subject completed a structured Office Automation Training Program focused on PC operation and the Microsoft Office suite. Throughout the course, the subject manipulated digital environments with precision, mastering data processing, document engineering, and structured information workflows. Under controlled conditions, they demonstrated proficiency in Word, Excel, PowerPoint, and system navigation. The program emphasized operational efficiency, procedural accuracy, and the ability to synthesize information into functional outputs, preparing the subject for high-reliability computational tasks."
        />
      </div>
    </section>
  </div>
</template>

<style>
#education-inner-container {
  flex: 0 0 auto;
}
</style>
