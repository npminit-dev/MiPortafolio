<script setup lang="ts">
import { onMounted, onBeforeUnmount, useTemplateRef } from "vue";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useWindowSize } from "@vueuse/core";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

interface Props {
  height?: number;
}

const props = withDefaults(defineProps<Props>(), {
  height: 553,
});

const svgRef = useTemplateRef("svgRef");
const { width } = useWindowSize();
let scrollTriggerInstance: ScrollTrigger | null = null;

function startAnimation() {
  if (svgRef.value) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svgRef.value,
        start: "center bottom",
        end: "center top",
        toggleActions:
          width.value >= 768 ? "play reverse play reverse" : "play none none none",
        onRefresh: (self) => {
          scrollTriggerInstance = self;
        },
      },
    });

    scrollTriggerInstance = tl.scrollTrigger as ScrollTrigger;

    // Duración total objetivo: ~1.5s
    const rectDuration = 0.4;
    const lineDuration = 0.25;
    const arrowDuration = 0.35;
    const textDelay = 0.06;
    const overlap = 0.15;

    // Set inicial: todo invisible
    gsap.set(svgRef.value.querySelectorAll("text"), { autoAlpha: 0 });

    // ETAPA 1: Clases hijas (Admin y Guest) simultáneamente
    // Admin rect (de abajo hacia arriba, simétrico vertical)
    tl.fromTo(
      "#admin-rect",
      {
        drawSVG: "50% 50%",
      },
      {
        drawSVG: "0% 100%",
        duration: rectDuration,
        ease: "power2.in",
      }
    );

    // Guest rect (simultáneo con Admin)
    tl.fromTo(
      "#guest-rect",
      {
        drawSVG: "50% 50%",
      },
      {
        drawSVG: "0% 100%",
        duration: rectDuration,
        ease: "power2.in",
      },
      "<"
    );

    // Líneas divisorias Admin (desde el centro hacia afuera)
    tl.fromTo(
      ["#admin-line-1", "#admin-line-2"],
      {
        drawSVG: "50% 50%",
      },
      {
        drawSVG: "0% 100%",
        duration: lineDuration,
        ease: "power2.in",
      },
      `-=${overlap}`
    );

    // Líneas divisorias Guest (simultáneo)
    tl.fromTo(
      ["#guest-line-1", "#guest-line-2"],
      {
        drawSVG: "50% 50%",
      },
      {
        drawSVG: "0% 100%",
        duration: lineDuration,
        ease: "power2.in",
      },
      "<"
    );

    // Textos Admin (de ABAJO hacia ARRIBA con delay)
    const adminTexts = [
      "#admin-method-2",
      "#admin-method-1",
      "#admin-prop",
      "#admin-title",
    ];
    adminTexts.forEach((selector, index) => {
      tl.to(
        selector,
        {
          autoAlpha: 1,
          duration: 0.2,
          ease: "none",
        },
        index === 0 ? "<" : `<${textDelay}`
      );
    });

    // Textos Guest (de ABAJO hacia ARRIBA, simultáneo con Admin)
    const guestTexts = ["#guest-method", "#guest-prop", "#guest-title"];
    guestTexts.forEach((selector, index) => {
      tl.to(
        selector,
        {
          autoAlpha: 1,
          duration: 0.2,
          ease: "none",
        },
        index === 0 ? "<" : `<${textDelay}`
      );
    });

    // ETAPA 2: Flechas (de abajo hacia arriba) simultáneamente
    tl.fromTo(
      ["#arrow-admin", "#arrow-guest"],
      {
        drawSVG: "100% 100%",
      },
      {
        drawSVG: "0% 100%",
        duration: arrowDuration,
        ease: "linear",
      },
      `-=${overlap}`
    );

    // ETAPA 3: Clase padre (User)
    // User rect (de abajo hacia arriba, simétrico vertical)
    tl.fromTo(
      "#user-rect",
      {
        drawSVG: "50% 50%",
      },
      {
        drawSVG: "0% 100%",
        duration: rectDuration,
        ease: "power2.out",
      },
      `-=${overlap}`
    );

    // Líneas divisorias User (desde el centro hacia afuera)
    tl.fromTo(
      ["#user-line-1", "#user-line-2"],
      {
        drawSVG: "50% 50%",
      },
      {
        drawSVG: "0% 100%",
        duration: lineDuration,
        ease: "power2.out",
      },
      `-=${overlap}`
    );

    // Textos User (de ABAJO hacia ARRIBA con delay)
    const userTexts = [
      "#user-method-2",
      "#user-method-1",
      "#user-email",
      "#user-username",
      "#user-title",
    ];
    userTexts.forEach((selector, index) => {
      tl.to(
        selector,
        {
          autoAlpha: 1,
          duration: 0.2,
          ease: "none",
        },
        index === 0 ? "<" : `<${textDelay}`
      );
    });
  }
}

function killAnimations() {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
  }
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

onMounted(() => {
  startAnimation();
});

onBeforeUnmount(() => {
  killAnimations();
});
</script>

<template>
  <svg
    ref="svgRef"
    :height="props.height"
    viewBox="0 0 664 553"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    vector-effect="non-scaling-stroke"
  >
    <!-- User Class (Parent) -->
    <rect
      id="user-rect"
      x="232.5"
      y="56.5"
      width="199"
      height="136.178"
      rx="7.5"
      stroke="var(--color-ghost-200)"
      stroke-miterlimit="2.28117"
      vector-effect="non-scaling-stroke"
    />
    <text
      id="user-title"
      fill="var(--color-ghost-200)"
      xml:space="preserve"
      style="white-space: pre"
      font-family="Rajdhani"
      font-size="16"
      vector-effect="non-scaling-stroke"
      letter-spacing="0em"
    >
      <tspan x="314" y="75.6329" vector-effect="non-scaling-stroke">User</tspan>
    </text>
    <line
      id="user-line-1"
      x1="232.297"
      y1="83.4987"
      x2="431.703"
      y2="83.4987"
      stroke="var(--color-ghost-200)"
      vector-effect="non-scaling-stroke"
    />
    <text
      id="user-username"
      fill="var(--color-ghost-200)"
      xml:space="preserve"
      style="white-space: pre"
      font-family="Rajdhani"
      font-size="16"
      vector-effect="non-scaling-stroke"
      letter-spacing="0em"
    >
      <tspan x="239.301" y="104.001" vector-effect="non-scaling-stroke">
        username: string
      </tspan>
    </text>
    <text
      id="user-email"
      fill="var(--color-ghost-200)"
      xml:space="preserve"
      style="white-space: pre"
      font-family="Rajdhani"
      font-size="16"
      vector-effect="non-scaling-stroke"
      letter-spacing="0em"
    >
      <tspan x="239.301" y="125.366" vector-effect="non-scaling-stroke">
        email: string
      </tspan>
    </text>
    <line
      id="user-line-2"
      x1="232.296"
      y1="135.656"
      x2="431.701"
      y2="135.223"
      stroke="var(--color-ghost-200)"
      vector-effect="non-scaling-stroke"
    />
    <text
      id="user-method-1"
      fill="var(--color-ghost-200)"
      xml:space="preserve"
      style="white-space: pre"
      font-family="Rajdhani"
      font-size="16"
      vector-effect="non-scaling-stroke"
      letter-spacing="0em"
    >
      <tspan x="239.301" y="159.214" vector-effect="non-scaling-stroke">login()</tspan>
    </text>
    <text
      id="user-method-2"
      fill="var(--color-ghost-200)"
      xml:space="preserve"
      style="white-space: pre"
      font-family="Rajdhani"
      font-size="16"
      vector-effect="non-scaling-stroke"
      letter-spacing="0em"
    >
      <tspan x="239.301" y="180.579" vector-effect="non-scaling-stroke">logout()</tspan>
    </text>

    <!-- Admin Class (Child) -->
    <rect
      id="admin-rect"
      x="85.8007"
      y="337.5"
      width="199"
      height="117.816"
      rx="7.5"
      stroke="var(--color-ghost-200)"
      stroke-miterlimit="2.28117"
      vector-effect="non-scaling-stroke"
    />
    <text
      id="admin-title"
      fill="var(--color-ghost-200)"
      xml:space="preserve"
      style="white-space: pre"
      font-family="Rajdhani"
      font-size="16"
      vector-effect="non-scaling-stroke"
      letter-spacing="0em"
    >
      <tspan x="161.301" y="356.633" vector-effect="non-scaling-stroke">Admin</tspan>
    </text>
    <line
      id="admin-line-1"
      x1="85.598"
      y1="364.499"
      x2="285.003"
      y2="364.499"
      stroke="var(--color-ghost-200)"
      vector-effect="non-scaling-stroke"
    />
    <text
      id="admin-prop"
      fill="var(--color-ghost-200)"
      xml:space="preserve"
      style="white-space: pre"
      font-family="Rajdhani"
      font-size="16"
      vector-effect="non-scaling-stroke"
      letter-spacing="0em"
    >
      <tspan x="92.6013" y="385.001" vector-effect="non-scaling-stroke">
        accessLevel: number
      </tspan>
    </text>
    <line
      id="admin-line-2"
      x1="85.2996"
      y1="394.664"
      x2="284.704"
      y2="394.231"
      stroke="var(--color-ghost-200)"
      vector-effect="non-scaling-stroke"
    />
    <text
      id="admin-method-1"
      fill="var(--color-ghost-200)"
      xml:space="preserve"
      style="white-space: pre"
      font-family="Rajdhani"
      font-size="16"
      vector-effect="non-scaling-stroke"
      letter-spacing="0em"
    >
      <tspan x="92.6013" y="418.037" vector-effect="non-scaling-stroke">
        banUser(user: User)
      </tspan>
    </text>
    <text
      id="admin-method-2"
      fill="var(--color-ghost-200)"
      xml:space="preserve"
      style="white-space: pre"
      font-family="Rajdhani"
      font-size="16"
      vector-effect="non-scaling-stroke"
      letter-spacing="0em"
    >
      <tspan x="92.6013" y="441.721" vector-effect="non-scaling-stroke">
        generateReport()
      </tspan>
    </text>

    <!-- Guest Class (Child) -->
    <rect
      id="guest-rect"
      x="381.5"
      y="337.5"
      width="199"
      height="90"
      rx="7.5"
      stroke="var(--color-ghost-200)"
      stroke-miterlimit="2.28117"
      vector-effect="non-scaling-stroke"
    />
    <text
      id="guest-title"
      fill="var(--color-ghost-200)"
      xml:space="preserve"
      style="white-space: pre"
      font-family="Rajdhani"
      font-size="16"
      vector-effect="non-scaling-stroke"
      letter-spacing="0em"
    >
      <tspan x="458.5" y="356.633" vector-effect="non-scaling-stroke">Guest</tspan>
    </text>
    <line
      id="guest-line-1"
      x1="381.297"
      y1="364.499"
      x2="580.703"
      y2="364.499"
      stroke="var(--color-ghost-200)"
      vector-effect="non-scaling-stroke"
    />
    <text
      id="guest-prop"
      fill="var(--color-ghost-200)"
      xml:space="preserve"
      style="white-space: pre"
      font-family="Rajdhani"
      font-size="16"
      vector-effect="non-scaling-stroke"
      letter-spacing="0em"
    >
      <tspan x="388.301" y="385.001" vector-effect="non-scaling-stroke">
        expiresAt: Date
      </tspan>
    </text>
    <line
      id="guest-line-2"
      x1="380.999"
      y1="394.664"
      x2="580.404"
      y2="394.231"
      stroke="var(--color-ghost-200)"
      vector-effect="non-scaling-stroke"
    />
    <text
      id="guest-method"
      fill="var(--color-ghost-200)"
      xml:space="preserve"
      style="white-space: pre"
      font-family="Rajdhani"
      font-size="16"
      vector-effect="non-scaling-stroke"
      letter-spacing="0em"
    >
      <tspan x="388.301" y="416.53" vector-effect="non-scaling-stroke">
        requestAccess()
      </tspan>
    </text>

    <!-- Inheritance Arrows -->
    <path
      id="arrow-admin"
      class="opacity-50"
      d="M285.003 194.178L280.56 197.864L285.974 199.869L285.003 194.178ZM232.11 337L232.579 337.174L283.909 198.572L283.44 198.398L282.971 198.224L231.641 336.826L232.11 337Z"
      stroke="var(--color-ghost-300)"
      vector-effect="non-scaling-stroke"
    />
    <path
      id="arrow-guest"
      class="opacity-50"
      d="M381 193.733L379.763 199.373L385.265 197.624L381 193.733ZM426.77 337.77L427.246 337.618L382.839 197.871L382.363 198.022L381.886 198.174L426.293 337.921L426.77 337.77Z"
      stroke="var(--color-ghost-300)"
      vector-effect="non-scaling-stroke"
    />
  </svg>
</template>

<style scoped></style>
