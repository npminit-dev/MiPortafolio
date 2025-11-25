<script setup lang="ts">
import { onMounted, onBeforeUnmount, useTemplateRef } from 'vue'
import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger)

interface Props {
  height?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  height: 553
})

const svgRef = useTemplateRef('svgRef')
let scrollTriggerInstance: ScrollTrigger | null = null

const graphStructure = {
  'node-4': { edges: ['edge-2', 'edge-7'], nodes: ['node-1', 'node-2'] },
  
  'node-1': { edges: ['edge-0', 'edge-8'], nodes: ['node-0', 'node-2'] },
  'node-2': { edges: ['edge-3', 'edge-9', 'edge-11'], nodes: ['node-0', 'node-5', 'node-6'] },
  
  'node-0': { edges: ['edge-1', 'edge-5'], nodes: ['node-5'] },
  'node-5': { edges: ['edge-4', 'edge-10'], nodes: ['node-6'] },
  'node-6': { edges: ['edge-6'], nodes: ['node-3'] },
  
  'node-3': { edges: ['edge-12'], nodes: [] }
}

function startAnimation() {
  if (svgRef.value) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svgRef.value,
        start: 'top bottom',
        end: 'bottom top',
        toggleActions: 'play reset play reset',
        onRefresh: (self) => {
          scrollTriggerInstance = self
        }
      }
    })

    scrollTriggerInstance = tl.scrollTrigger as ScrollTrigger

    const visitedNodes = new Set<string>()
    const visitedEdges = new Set<string>()
    
    const queue: string[] = ['node-4']
    visitedNodes.add('node-4')

    const nodeDuration = 0.5
    const edgeDuration = 0.5
    const overlap = .35

    const initialNode = svgRef.value.querySelector('#node-4')
    tl.fromTo(initialNode, {
      drawSVG: '-25% -25%'
    }, {
      drawSVG: '-75% 25%',
      duration: nodeDuration,
      ease: 'power2.out'
    })

    while (queue.length > 0) {
      const currentNode = queue.shift()!
      const nodeData = graphStructure[currentNode as keyof typeof graphStructure]
      
      if (!nodeData) continue

      const newEdges = nodeData.edges.filter(edge => !visitedEdges.has(edge))
      
      if (newEdges.length > 0) {
        const edgeElements = newEdges.map(edgeId => 
          svgRef.value!.querySelector(`#${edgeId}`)
        ).filter(el => el !== null)

        tl.fromTo(edgeElements, {
          drawSVG: '0% 0%'
        }, {
          drawSVG: '0% 100%',
          duration: edgeDuration,
          ease: 'power2.out'
        }, `-=${overlap}`)

        newEdges.forEach(edge => visitedEdges.add(edge))

        const newNodes = nodeData.nodes.filter(node => !visitedNodes.has(node))
        
        if (newNodes.length > 0) {
          const nodeElements = newNodes.map(nodeId => 
            svgRef.value!.querySelector(`#${nodeId}`)
          ).filter(el => el !== null)

          tl.fromTo(nodeElements, {
            drawSVG: '-25% -25%'
          }, {
            drawSVG: '-75% 25%',
            duration: nodeDuration,
            ease: 'power2.out'
          }, `-=${overlap}`)

          newNodes.forEach(node => {
            visitedNodes.add(node)
            queue.push(node)
          })
        }
      }
    }
  }
}

function killAnimations() {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill()
  }
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
}

onMounted(() => {
  startAnimation()
})

onBeforeUnmount(() => {
  killAnimations()
})
</script>

<template>
  <svg 
    ref="svgRef"
    :height="props.height"
    viewBox="0 0 664 553"
    fill="none"
  >
    <!-- Nodos -->
    <circle id="node-0" cx="169.668" cy="44.6755" r="35.824" stroke="white" stroke-width="2" vector-effect="non-scaling-stroke" />
    <circle id="node-1" cx="38.7651" cy="253.952" r="35.824" stroke="white" stroke-width="2" vector-effect="non-scaling-stroke" />
    <circle id="node-2" cx="324.386" cy="262.809" r="35.824" stroke="white" stroke-width="2" vector-effect="non-scaling-stroke" />
    <circle id="node-3" cx="469.501" cy="510.625" r="35.824" stroke="white" stroke-width="2" vector-effect="non-scaling-stroke" />
    <circle id="node-4" cx="169.668" cy="474.301" r="35.824" stroke="white" stroke-width="2" vector-effect="non-scaling-stroke" />
    <circle id="node-5" cx="469.501" cy="60.389" r="35.824" stroke="white" stroke-width="2" vector-effect="non-scaling-stroke" />
    <circle id="node-6" cx="625.235" cy="253.952" r="35.824" stroke="white" stroke-width="2" vector-effect="non-scaling-stroke" />
    
    <!-- Aristas -->
    <line id="edge-0" x1="56.8847" y1="223.236" x2="147.595" y2="73.3469" stroke="white" stroke-width="1" vector-effect="non-scaling-stroke" stroke-linecap="round" />
    <line id="edge-1" x1="192.224" y1="73.4571" x2="303.131" y2="233.697" stroke="white" stroke-width="1" vector-effect="non-scaling-stroke" stroke-linecap="round" />
    <line id="edge-2" x1="56.1534" y1="285.473" x2="150.5" y2="443.743" stroke="white" stroke-width="1" vector-effect="non-scaling-stroke" stroke-linecap="round" />
    <line id="edge-3" x1="345.352" y1="233.78" x2="448.689" y2="90.1677" stroke="white" stroke-width="1" vector-effect="non-scaling-stroke" stroke-linecap="round" />
    <line id="edge-4" x1="491.621" y1="89.0429" x2="600.844" y2="227.701" stroke="white" stroke-width="1" vector-effect="non-scaling-stroke" stroke-linecap="round" />
    <line id="edge-5" x1="205.833" y1="48.0564" x2="433.203" y2="59.8896" stroke="white" stroke-width="1" vector-effect="non-scaling-stroke" stroke-linecap="round" />
    <line id="edge-6" x1="205.242" y1="479.404" x2="433.969" y2="505.915" stroke="white" stroke-width="1" vector-effect="non-scaling-stroke" stroke-linecap="round" />
    <line id="edge-7" x1="191.722" y1="445.923" x2="302.742" y2="291.443" stroke="white" stroke-width="1" vector-effect="non-scaling-stroke" stroke-linecap="round" />
    <line id="edge-8" x1="75.0429" y1="255.877" x2="288.077" y2="262.309" stroke="white" stroke-width="1" vector-effect="non-scaling-stroke" stroke-linecap="round" />
    <line id="edge-9" x1="360.912" y1="260.754" x2="589.029" y2="255.185" stroke="white" stroke-width="1" vector-effect="non-scaling-stroke" stroke-linecap="round" />
    <line id="edge-10" x1="491.17" y1="481.376" x2="607.541" y2="285.294" stroke="white" stroke-width="1" vector-effect="non-scaling-stroke" stroke-linecap="round" />
    <line id="edge-11" x1="342.818" y1="294.093" x2="452.365" y2="478.12" stroke="white" stroke-width="1" vector-effect="non-scaling-stroke" stroke-linecap="round" />
    <line id="edge-12" x1="342.818" y1="294.093" x2="452.365" y2="478.12" stroke="white" stroke-width="1" vector-effect="non-scaling-stroke" stroke-linecap="round" />
  </svg>
</template>

<style scoped>
</style>