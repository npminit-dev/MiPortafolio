<script setup lang="ts">
import { ref, useTemplateRef, watchEffect } from 'vue'
import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

type Props = {
  containerAnimation: gsap.core.Animation | null,
  pinnedContainer: HTMLDivElement | null,
}
const { containerAnimation, pinnedContainer } = defineProps<Props>()
let scrollTriggerInstance = ref<ScrollTrigger | null>(null)
const mainCircle = useTemplateRef<HTMLElement>('c-main-circle')

// Referencias para los elementos a animar
const binaryLine = useTemplateRef<SVGLineElement>('binary-line')
const binaryCircle = useTemplateRef<SVGCircleElement>('binary-circle')
const binaryContent = useTemplateRef<SVGGElement>('binary-content')

const memoryLine = useTemplateRef<SVGLineElement>('memory-line')
const memoryCircle = useTemplateRef<SVGCircleElement>('memory-circle')
const memoryContent = useTemplateRef<SVGGElement>('memory-content')

const bracesLine = useTemplateRef<SVGLineElement>('braces-line')
const bracesCircle = useTemplateRef<SVGCircleElement>('braces-circle')
const bracesContent = useTemplateRef<SVGGElement>('braces-content')

watchEffect(() => {
  if (containerAnimation && pinnedContainer && !scrollTriggerInstance.value && mainCircle.value) {
    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' }
    });

    gsap.set([binaryLine.value, memoryLine.value, bracesLine.value], { drawSVG: '100% 100%' });
    gsap.set([binaryCircle.value, memoryCircle.value, bracesCircle.value], { drawSVG: '0% 0%' });
    gsap.set([binaryContent.value, memoryContent.value, bracesContent.value], { autoAlpha: 0 });

    tl.to(memoryLine.value, { drawSVG: '100% 0%', duration: 0.4 }, 0)
      .to(memoryCircle.value, { drawSVG: '0% 100%', duration: 0.4 }, 0.2)
      .to(memoryContent.value, { autoAlpha: 1, duration: 0.3 }, 0.4)

      .to(binaryLine.value, { drawSVG: '100% 0%', duration: 0.4 }, 0.2)
      .to(binaryCircle.value, { drawSVG: '0% 100%', duration: 0.4 }, 0.2)
      .to(binaryContent.value, { autoAlpha: 1, duration: 0.3 }, 0.4)

      .to(bracesLine.value, { drawSVG: '100% 0%', duration: 0.4 }, 0.4)
      .to(bracesCircle.value, { drawSVG: '0% 100%', duration: 0.4 }, 0.2)
      .to(bracesContent.value, { autoAlpha: 1, duration: 0.3 }, 0.4)

    scrollTriggerInstance.value = ScrollTrigger.create({
      trigger: mainCircle.value,
      start: `center center+=${pinnedContainer?.offsetHeight! / 2}px`,
      end: `center center-=200px${pinnedContainer?.offsetHeight! / 2}px`,
      anticipatePin: 1,
      containerAnimation: containerAnimation,
      animation: tl,
      toggleActions: 'play reverse play reverse'
    })
  }
})
</script>

<template>

  <!-- content-circles (SIEMPRE VISIBLES) -->
  <circle ref="c-main-circle" fill="var(--color-void-950)" cx="338.45" cy="336.442" r="76.5" transform="rotate(45 338.45 336.442)"
    stroke="var(--color-ghost-200)" />
  <circle cx="338.45" cy="336.442" r="69.5" stroke="var(--color-ghost-200)" vector-effect="non-scaling-stroke" />

  <!-- content (SIEMPRE VISIBLE) -->
  <path
    d="M338.45 377.764C315.665 377.764 297.129 359.228 297.129 336.442C297.129 313.657 315.665 295.121 338.45 295.121C353.151 295.121 366.865 303.035 374.232 315.768L356.351 326.119C354.531 322.982 351.92 320.377 348.779 318.563C345.639 316.75 342.077 315.791 338.45 315.783C332.973 315.791 327.723 317.969 323.85 321.842C319.978 325.715 317.799 330.965 317.791 336.442C317.797 341.92 319.975 347.173 323.848 351.047C327.72 354.922 332.972 357.102 338.45 357.109C342.078 357.101 345.639 356.142 348.78 354.327C351.921 352.513 354.531 349.907 356.351 346.77L374.232 357.117C370.592 363.384 365.373 368.589 359.095 372.211C352.817 375.833 345.699 377.75 338.45 377.764Z"
    fill="var(--color-ghost-200)" vector-effect="non-scaling-stroke" />
  <path
    d="M379.772 334.149L375.174 334.149L375.174 329.555L370.583 329.555L370.583 334.149L365.993 334.149L365.993 338.739L370.583 338.739L370.583 343.33L375.174 343.33L375.174 338.739L379.768 338.739L379.772 334.149ZM396.987 334.149L392.397 334.149L392.397 329.555L387.802 329.555L387.802 334.149L383.212 334.149L383.212 338.739L387.802 338.739L387.802 343.33L392.393 343.33L392.393 338.739L396.983 338.739L396.987 334.149Z"
    fill="var(--color-ghost-200)" vector-effect="non-scaling-stroke" />

  <!-- binary -->
  <line ref="binary-line" x1="161.408" y1="335.942" x2="261.408" y2="335.942" stroke="var(--color-shadow-500)"
    vector-effect="non-scaling-stroke" />
  <circle ref="binary-circle" cx="136.408" cy="336.442" r="24.5" transform="rotate(90 136.408 336.442)" stroke="var(--color-ghost-200)"
    vector-effect="non-scaling-stroke" />
  <g ref="binary-content">
    <path d="M132.799 323.552L126.611 323.552L126.611 332.833L132.799 332.833L132.799 323.552Z" stroke="var(--color-ghost-200)"
      vector-effect="non-scaling-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M140.018 332.833L146.205 332.833M140.018 323.552H143.111L143.111 331.802" stroke="var(--color-ghost-200)" stroke-width="1.5"
      vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M146.205 340.052L140.018 340.052L140.018 349.333L146.205 349.333L146.205 340.052Z" stroke="var(--color-ghost-200)"
      vector-effect="non-scaling-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M126.611 349.333L132.799 349.333M126.611 340.052H129.705L129.705 348.302" stroke="var(--color-ghost-200)" stroke-width="1.5"
      vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" />
  </g>

  <!-- memory -->
  <line ref="memory-line" x1="215.241" y1="210.588" x2="285.952" y2="281.299" stroke="var(--color-shadow-500)"
    vector-effect="non-scaling-stroke" />
  <circle ref="memory-circle" cx="197.312" cy="193.178" r="24.5" transform="rotate(180 197.312 193.178)" stroke="var(--color-ghost-200)"
    vector-effect="non-scaling-stroke" />
  <g ref="memory-content">
    <path
      d="M193.062 197.428L201.562 197.428L201.562 188.928L193.062 188.928L193.062 197.428ZM195.187 191.053L199.437 191.053L199.437 195.303L195.187 195.303L195.187 191.053Z"
      fill="var(--color-ghost-200)" vector-effect="non-scaling-stroke" />
    <path
      d="M182.437 195.303L182.437 197.428L187.218 197.428L187.218 203.271L193.062 203.271L193.062 208.053L195.187 208.053L195.187 203.271L199.437 203.271L199.437 208.053L201.562 208.053L201.562 203.271L207.405 203.271L207.405 197.428L212.187 197.428L212.187 195.303L207.405 195.303L207.405 191.053L212.187 191.053L212.187 188.928L207.405 188.928L207.405 183.084L201.562 183.084L201.562 178.303L199.437 178.303L199.437 183.084L195.187 183.084L195.187 178.303L193.062 178.303L193.062 183.084L187.218 183.084L187.218 188.928L182.437 188.928L182.437 191.053L187.218 191.053L187.218 195.303L182.437 195.303ZM189.343 185.209L205.28 185.209L205.28 201.146L189.343 201.146L189.343 185.209Z"
      fill="var(--color-ghost-200)" vector-effect="non-scaling-stroke" />
  </g>

  <!-- braces -->
  <line ref="braces-line" x1="216.818" y1="463.535" x2="287.529" y2="392.824" stroke="var(--color-shadow-500)"
    vector-effect="non-scaling-stroke" />
  <circle ref="braces-circle" cx="199.408" cy="481.464" r="24.5" transform="rotate(90 199.408 481.464)" stroke="var(--color-ghost-200)"
    vector-effect="non-scaling-stroke" />
  <g ref="braces-content">
    <path
      d="M188.372 481.582V481.277C190.256 481.085 191.179 480.123 191.179 478.277V474.907C191.179 472.856 191.91 472.023 193.718 472.023H194.229V470.214H193.524C190.502 470.214 189.077 471.637 189.077 474.624V477.482C189.077 479.533 188.372 480.212 186.283 480.212V482.647C188.372 482.647 189.077 483.326 189.077 485.377V488.235C189.077 491.222 190.5 492.645 193.524 492.645H194.229V490.837H193.718C191.91 490.837 191.179 490.005 191.179 487.953V484.582C191.179 482.737 190.256 481.775 188.372 481.582ZM210.444 481.277V481.582C208.56 481.775 207.638 482.737 207.638 484.582V487.953C207.638 490.005 206.906 490.837 205.099 490.837H204.587V492.645H205.292C208.316 492.645 209.739 491.222 209.739 488.235V485.377C209.739 483.326 210.444 482.647 212.533 482.647V480.212C210.444 480.212 209.739 479.533 209.739 477.482V474.624C209.739 471.637 208.314 470.214 205.292 470.214H204.587V472.022H205.099C206.906 472.022 207.638 472.854 207.638 474.905L207.638 478.277C207.638 480.122 208.56 481.083 210.444 481.277Z"
      fill="var(--color-ghost-200)" stroke="var(--color-ghost-200)" vector-effect="non-scaling-stroke" />
  </g>
</template>

<style scoped></style>