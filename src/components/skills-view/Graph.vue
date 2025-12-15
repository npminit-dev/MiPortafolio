<script setup lang="ts">
import { onMounted, onBeforeUnmount, useTemplateRef } from "vue";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useWindowSize } from "@vueuse/core";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

interface Props {
  height?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  height: 553,
});

const svgRef = useTemplateRef("svgRef");
const { width } = useWindowSize();
let scrollTriggerInstance: ScrollTrigger | null = null;

// Estructura del grafo con node-1 (izquierda) como inicio
// node-1 (cx="38.6647" cy="276.093") es el nodo inicial
const graphStructure = {
  // Nodo inicial: extremo izquierdo (38.6647, 276.093)
  "node-1": {
    edges: ["edge-0", "edge-2", "edge-5"],
    nodes: ["node-0", "node-5", "node-2"],
  },

  // Primera capa de vecinos
  "node-0": {
    edges: ["edge-1", "edge-4", "edge-16"],
    nodes: ["node-2", "node-6"],
  },
  "node-5": {
    edges: ["edge-3", "edge-9", "edge-14"],
    nodes: ["node-2", "node-4"],
  },
  "node-2": {
    edges: ["edge-6", "edge-13", "edge-15"],
    nodes: ["node-3", "node-6"],
  },

  // Segunda capa de vecinos
  "node-6": {
    edges: ["edge-8", "edge-12"],
    nodes: ["node-7"],
  },
  "node-4": {
    edges: ["edge-10"],
    nodes: ["node-3"],
  },
  "node-3": {
    edges: ["edge-7", "edge-11"],
    nodes: ["node-7"],
  },

  // Tercera capa
  "node-7": {
    edges: [],
    nodes: [],
  },
};

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

    const visitedNodes = new Set<string>();
    const visitedEdges = new Set<string>();

    const queue: string[] = ["node-1"];
    visitedNodes.add("node-1");

    const nodeDuration = 0.47;
    const edgeDuration = 0.47;
    const overlap = 0.35;

    // Animar el nodo inicial
    const initialNode = svgRef.value.querySelector("#node-1");
    tl.fromTo(
      initialNode,
      {
        drawSVG: "50% 50%",
      },
      {
        drawSVG: "0% 100%",
        duration: nodeDuration,
        ease: "linear",
      }
    );

    // BFS: recorrer el grafo nivel por nivel
    while (queue.length > 0) {
      const currentNode = queue.shift()!;
      const nodeData = graphStructure[currentNode as keyof typeof graphStructure];

      if (!nodeData) continue;

      const newEdges = nodeData.edges.filter((edge) => !visitedEdges.has(edge));

      if (newEdges.length > 0) {
        const edgeElements = newEdges
          .map((edgeId) => svgRef.value!.querySelector(`#${edgeId}`))
          .filter((el) => el !== null);

        tl.fromTo(
          edgeElements,
          {
            drawSVG: "0% 0%",
          },
          {
            drawSVG: "0% 100%",
            duration: edgeDuration,
            ease: "linear",
          },
          `-=${overlap}`
        );

        newEdges.forEach((edge) => visitedEdges.add(edge));

        const newNodes = nodeData.nodes.filter((node) => !visitedNodes.has(node));

        if (newNodes.length > 0) {
          const nodeElements = newNodes
            .map((nodeId) => svgRef.value!.querySelector(`#${nodeId}`))
            .filter((el) => el !== null);

          tl.fromTo(
            nodeElements,
            {
              drawSVG: "50% 50%",
            },
            {
              drawSVG: "0% 100%",
              duration: nodeDuration,
              ease: "linear",
            },
            `-=${overlap}`
          );

          newNodes.forEach((node) => {
            visitedNodes.add(node);
            queue.push(node);
          });
        }
      }
    }
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
  <svg ref="svgRef" :height="props.height" viewBox="0 0 664 553" fill="none">
    <!-- Aristas (17 líneas) -->
    <line
      id="edge-0"
      x1="58.4227"
      y1="246.339"
      x2="149.978"
      y2="105.056"
      stroke="var(--color-shadow-500)"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
      stroke-linecap="round"
    />
    <line
      id="edge-1"
      x1="184.276"
      y1="108.135"
      x2="228.199"
      y2="243.143"
      stroke="var(--color-shadow-500)"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
      stroke-linecap="round"
    />
    <line
      id="edge-2"
      x1="56.145"
      y1="307.753"
      x2="148.941"
      y2="448.639"
      stroke="var(--color-shadow-500)"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
      stroke-linecap="round"
    />
    <line
      id="edge-3"
      x1="184.446"
      y1="445.546"
      x2="233.354"
      y2="311.049"
      stroke="var(--color-shadow-500)"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
      stroke-linecap="round"
    />
    <line
      id="edge-4"
      x1="205.762"
      y1="74.5945"
      x2="440.098"
      y2="74.5945"
      stroke="var(--color-shadow-500)"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
      stroke-linecap="round"
    />
    <line
      id="edge-5"
      x1="74.9308"
      y1="276"
      x2="205.953"
      y2="276"
      stroke="var(--color-shadow-500)"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
      stroke-linecap="round"
    />
    <line
      id="edge-6"
      x1="278.583"
      y1="276"
      x2="367.449"
      y2="276"
      stroke="var(--color-shadow-500)"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
      stroke-linecap="round"
    />
    <line
      id="edge-7"
      x1="439.603"
      y1="275.785"
      x2="589.012"
      y2="275.785"
      stroke="var(--color-shadow-500)"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
      stroke-linecap="round"
    />
    <line
      id="edge-8"
      x1="414.17"
      y1="241.901"
      x2="464.569"
      y2="109.121"
      stroke="var(--color-shadow-500)"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
      stroke-linecap="round"
    />
    <line
      id="edge-9"
      x1="205.805"
      y1="477.319"
      x2="440.098"
      y2="477.319"
      stroke="var(--color-shadow-500)"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
      stroke-linecap="round"
    />
    <line
      id="edge-10"
      x1="463.812"
      y1="444.273"
      x2="416.033"
      y2="309.726"
      stroke="var(--color-shadow-500)"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
      stroke-linecap="round"
    />
    <line
      id="edge-11"
      x1="498.078"
      y1="449.223"
      x2="605.664"
      y2="306.464"
      stroke="var(--color-shadow-500)"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
      stroke-linecap="round"
    />
    <line
      id="edge-12"
      x1="604.269"
      y1="246.932"
      x2="497.646"
      y2="104.179"
      stroke="var(--color-shadow-500)"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
      stroke-linecap="round"
    />
    <line
      id="edge-13"
      x1="266.209"
      y1="305.377"
      x2="448.092"
      y2="455.744"
      stroke="var(--color-shadow-500)"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
      stroke-linecap="round"
    />
    <line
      id="edge-14"
      x1="196.913"
      y1="454.1"
      x2="376.48"
      y2="299.508"
      stroke="var(--color-shadow-500)"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
      stroke-linecap="round"
    />
    <line
      id="edge-15"
      x1="266.708"
      y1="249.714"
      x2="448.96"
      y2="97.3699"
      stroke="var(--color-shadow-500)"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
      stroke-linecap="round"
    />
    <line
      id="edge-16"
      x1="378.393"
      y1="251.29"
      x2="196.737"
      y2="98.5339"
      stroke="var(--color-shadow-500)"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
      stroke-linecap="round"
    />

    <!-- Nodos (8 círculos exactos) -->
    <circle
      id="node-0"
      cx="169.629"
      cy="74.9719"
      r="35.824"
      stroke="white"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
    />
    <circle
      id="node-1"
      cx="38.6647"
      cy="276.093"
      r="35.824"
      stroke="white"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
    />
    <circle
      id="node-2"
      cx="242.277"
      cy="276.093"
      r="35.824"
      stroke="white"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
    />
    <circle
      id="node-3"
      cx="403.773"
      cy="276.093"
      r="35.824"
      stroke="white"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
    />
    <circle
      id="node-4"
      cx="476.422"
      cy="478.028"
      r="35.824"
      stroke="white"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
    />
    <circle
      id="node-5"
      cx="169.629"
      cy="478.028"
      r="35.824"
      stroke="white"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
    />
    <circle
      id="node-6"
      cx="476.422"
      cy="74.9719"
      r="35.824"
      stroke="white"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
    />
    <circle
      id="node-7"
      cx="625.335"
      cy="276.093"
      r="35.824"
      stroke="white"
      stroke-width="1"
      vector-effect="non-scaling-stroke"
    />
  </svg>
</template>

<style scoped></style>
