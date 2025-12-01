<script setup lang="ts">
import { ref, useTemplateRef, watchEffect } from 'vue'
import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

// Asegúrate de registrar los plugins si no lo haces en el main.ts
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

type Props = {
  containerAnimation: gsap.core.Animation | null,
  pinnedContainer: HTMLDivElement | null,
}
const { containerAnimation, pinnedContainer } = defineProps<Props>()
let scrollTriggerInstance = ref<ScrollTrigger | null>(null)
const mainCircle = useTemplateRef<HTMLElement>('js-main-circle')

// --- REFERENCIAS (REFS) para los 4 grupos ---

// 1. Grupo 'Modules/Imports' (Derecha-Centro)
const modulesLine = useTemplateRef<SVGLineElement>('modules-line')
const modulesWrapper = useTemplateRef<SVGPathElement>('modules-wrapper')
const modulesContent = useTemplateRef<SVGGElement>('modules-content')

// 2. Grupo 'Classes/OOP' (Arriba-Derecha)
const classesLine = useTemplateRef<SVGLineElement>('classes-line')
const classesWrapper = useTemplateRef<SVGPathElement>('classes-wrapper')
const classesContent = useTemplateRef<SVGGElement>('classes-content')

// 3. Grupo 'Functional' (Abajo-Derecha)
const functionalLine = useTemplateRef<SVGLineElement>('functional-line')
const functionalWrapper = useTemplateRef<SVGPathElement>('functional-wrapper')
const functionalContent = useTemplateRef<SVGGElement>('functional-content')

// 4. Grupo 'Prototypes/Objects' (Abajo-Izquierda)
const protoLine = useTemplateRef<SVGLineElement>('proto-line')
const protoWrapper = useTemplateRef<SVGPathElement>('proto-wrapper')
const protoContent = useTemplateRef<SVGGElement>('proto-content')


watchEffect(() => {
  if (containerAnimation && pinnedContainer && !scrollTriggerInstance.value && mainCircle.value) {
    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' }
    });
    
    // --- 1. ESTADOS INICIALES (Reset) ---
    
    // Todas las líneas
    gsap.set([modulesLine.value, classesLine.value, functionalLine.value, protoLine.value], { 
      drawSVG: '0% 0%' 
    });
    
    // Todos los wrappers (círculos/cajas externas)
    gsap.set([modulesWrapper.value, classesWrapper.value, functionalWrapper.value, protoWrapper.value], { 
      drawSVG: '0% 0%' 
    }); 
    
    // Todos los contenidos (iconos internos)
    gsap.set([modulesContent.value, classesContent.value, functionalContent.value, protoContent.value], { 
      autoAlpha: 0 
    });


    // --- 2. ANIMACIÓN (Secuencia temporal) ---
    
    // Definimos duraciones y retrasos para que se "dibujen" de forma escalonada.
    const durationLine = 0.3;
    const durationWrapper = 0.3;
    const durationContent = 0.2;
    const delayStep = 0.1; // Retraso entre el inicio de cada rama principal

    let currentStartTime = 0;

    // RAMA 4: Prototypes/Objects (Abajo-Izquierda)
    tl.to(protoLine.value, { drawSVG: '100% 0%', duration: durationLine }, currentStartTime)
      .to(protoWrapper.value, { drawSVG: '0% 100%', duration: durationWrapper }, currentStartTime + durationLine * 0.5)
      .to(protoContent.value, { autoAlpha: 1, duration: durationContent }, currentStartTime + durationLine);
    currentStartTime += delayStep;

    // RAMA 2: Classes/OOP (Arriba-Derecha)
    tl.to(classesLine.value, { drawSVG: '100% 0%', duration: durationLine }, currentStartTime)
      .to(classesWrapper.value, { drawSVG: '0% 100%', duration: durationWrapper }, currentStartTime + durationLine * 0.5)
      .to(classesContent.value, { autoAlpha: 1, duration: durationContent }, currentStartTime + durationLine);
      
      currentStartTime += delayStep;
  
      // RAMA 1: Modules/Imports (Derecha-Centro)
      tl.to(modulesLine.value, { drawSVG: '100% 0%', duration: durationLine }, currentStartTime)
        .to(modulesWrapper.value, { drawSVG: '0% 100%', duration: durationWrapper }, currentStartTime + durationLine * 0.5)
        .to(modulesContent.value, { autoAlpha: 1, duration: durationContent }, currentStartTime + durationLine);

    currentStartTime += delayStep;

    // RAMA 3: Functional (Abajo-Derecha)
    tl.to(functionalLine.value, { drawSVG: '100% 0%', duration: durationLine }, currentStartTime)
      .to(functionalWrapper.value, { drawSVG: '0% 100%', duration: durationWrapper }, currentStartTime + durationLine * 0.5)
      .to(functionalContent.value, { autoAlpha: 1, duration: durationContent }, currentStartTime + durationLine);

    // --- 3. TRIGGER (Mismo ScrollTrigger) ---
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
  <circle fill="var(--color-plasma-purple-950)" cx="2949.11" cy="2940.41" r="76.5" ref="js-main-circle" transform="rotate(45 2949.11 2940.41)" stroke="var(--color-ghost-200)" />
  <circle cx="2949.11" cy="2940.41" r="69.5" stroke="var(--color-ghost-200)" />
  <path
    d="M2989.79 2920.99L2989.79 2959.8C2989.79 2962.32 2988.44 2964.67 2986.26 2965.93L2952.64 2985.35C2951.56 2985.97 2950.34 2986.29 2949.1 2986.29C2947.87 2986.29 2946.64 2985.97 2945.57 2985.35L2934.34 2978.7C2932.67 2977.77 2933.49 2977.44 2934.04 2977.25C2936.28 2976.47 2936.73 2976.29 2939.11 2974.94C2939.36 2974.79 2939.69 2974.85 2939.95 2975L2948.57 2980.12C2948.89 2980.29 2949.33 2980.29 2949.62 2980.12L2983.24 2960.71C2983.56 2960.53 2983.76 2960.17 2983.76 2959.8L2983.76 2920.99C2983.76 2920.61 2983.56 2920.26 2983.23 2920.07L2949.62 2900.68C2949.31 2900.49 2948.9 2900.49 2948.59 2900.68L2914.98 2920.07C2914.65 2920.26 2914.45 2920.63 2914.45 2920.99L2914.45 2959.8C2914.65 2960.17 2914.98 2960.52 2914.98 2960.7L2924.19 2966.02C2929.19 2968.52 2932.25 2965.58 2932.25 2962.62L2932.25 2924.31C2932.25 2923.76 2932.68 2923.34 2933.23 2923.34L2937.49 2923.34C2938.02 2923.34 2938.46 2923.76 2938.46 2924.31L2938.46 2962.62C2938.46 2969.29 2934.83 2973.12 2928.51 2973.12C2926.56 2973.12 2925.03 2973.12 2920.76 2971.01L2911.94 2965.93C2909.77 2964.68 2908.42 2962.32 2908.42 2959.8L2908.42 2920.99C2908.42 2918.47 2909.77 2916.12 2911.94 2914.87L2945.57 2895.43C2947.7 2894.23 2950.53 2894.23 2952.64 2895.43L2986.26 2914.87C2988.44 2916.12 2989.79 2918.47 2989.79 2920.99ZM2960.81 2956.1C2950.77 2956.1 2948.57 2953.58 2947.83 2948.59C2947.74 2948.06 2947.28 2947.66 2946.74 2947.66L2941.83 2947.66C2941.23 2947.66 2940.74 2948.14 2940.74 2948.75C2940.74 2955.14 2944.22 2962.76 2960.81 2962.76C2972.82 2962.76 2979.71 2958.03 2979.71 2949.77C2979.71 2941.57 2974.18 2939.39 2962.52 2937.85C2950.75 2936.29 2949.55 2935.49 2949.55 2932.73C2949.55 2930.46 2950.57 2927.42 2959.29 2927.42C2967.08 2927.42 2969.95 2929.1 2971.13 2934.35C2971.23 2934.84 2971.68 2935.2 2972.19 2935.2L2977.11 2935.2C2977.42 2935.2 2977.71 2935.07 2977.92 2934.85C2978.12 2934.62 2978.23 2934.32 2978.21 2934.01C2977.44 2924.96 2971.43 2920.75 2959.29 2920.75C2948.48 2920.75 2942.03 2925.31 2942.03 2932.96C2942.03 2941.26 2948.44 2943.56 2958.82 2944.58C2971.23 2945.8 2972.2 2947.61 2972.2 2950.05C2972.2 2954.29 2968.8 2956.1 2960.81 2956.1Z"
    fill="var(--color-ghost-200)" stroke="var(--color-ghost-200)" />
  
  <path ref="modules-wrapper"
    d="M3161.51 2915.91C3175.04 2915.91 3186.01 2926.88 3186.01 2940.41C3186.01 2953.94 3175.04 2964.91 3161.51 2964.91C3147.97 2964.91 3137.01 2953.94 3137.01 2940.41C3137.01 2926.88 3147.97 2915.91 3161.51 2915.91Z"
    stroke="var(--color-ghost-200)" />
  <g ref="modules-content" clip-path="url(#clip6_2084_108)">
    <path
      d="M3176.44 2928.64V2928.59H3176.4C3174.59 2926.41 3172.31 2924.66 3169.72 2923.45C3167.14 2922.25 3164.3 2921.62 3161.44 2921.62C3158.57 2921.62 3155.74 2922.25 3153.15 2923.45C3150.56 2924.66 3148.28 2926.41 3146.47 2928.59H3146.44V2928.64C3143.65 2931.99 3142.13 2936.18 3142.13 2940.5C3142.13 2944.83 3143.65 2949.02 3146.44 2952.37V2952.42H3146.48C3148.28 2954.6 3150.56 2956.35 3153.15 2957.56C3155.74 2958.76 3158.57 2959.39 3161.44 2959.39C3164.31 2959.39 3167.14 2958.76 3169.73 2957.56C3172.32 2956.35 3174.6 2954.6 3176.4 2952.42H3176.44V2952.37C3179.23 2949.02 3180.75 2944.83 3180.75 2940.5C3180.75 2936.18 3179.23 2931.99 3176.44 2928.64H3176.44ZM3162.38 2928.59V2923.59C3163.49 2924.04 3164.49 2924.72 3165.31 2925.59C3166.13 2926.45 3166.75 2927.47 3167.14 2928.59L3162.38 2928.59ZM3167.88 2930.42C3168.88 2933.38 3169.42 2936.47 3169.48 2939.59H3162.38L3162.38 2930.42H3167.88ZM3160.5 2923.59V2928.59H3155.74C3156.12 2927.47 3156.75 2926.45 3157.57 2925.59C3158.39 2924.72 3159.39 2924.04 3160.5 2923.59ZM3160.5 2930.42L3160.5 2939.59L3153.4 2939.59C3153.45 2936.47 3153.99 2933.38 3155 2930.42L3160.5 2930.42ZM3151.52 2939.59H3144.05C3144.23 2936.28 3145.39 2933.09 3147.41 2930.42H3153C3152.07 2933.39 3151.57 2936.48 3151.52 2939.59ZM3151.52 2941.42C3151.57 2944.53 3152.07 2947.62 3153 2950.59H3147.41C3145.39 2947.92 3144.23 2944.73 3144.05 2941.42H3151.52ZM3153.4 2941.42L3160.5 2941.42V2950.59L3155 2950.59C3153.99 2947.63 3153.45 2944.54 3153.4 2941.42H3153.4ZM3160.5 2952.42V2957.42C3159.39 2956.97 3158.39 2956.28 3157.57 2955.42C3156.75 2954.56 3156.12 2953.54 3155.74 2952.42L3160.5 2952.42ZM3162.38 2957.42V2952.42H3167.14C3166.75 2953.54 3166.13 2954.56 3165.31 2955.42C3164.49 2956.28 3163.49 2956.97 3162.38 2957.42ZM3162.38 2950.59V2941.42H3169.48C3169.42 2944.54 3168.88 2947.63 3167.88 2950.59H3162.38ZM3171.35 2941.42L3178.83 2941.42C3178.65 2944.73 3177.48 2947.92 3175.47 2950.59L3169.87 2950.59C3170.81 2947.62 3171.3 2944.53 3171.35 2941.42ZM3171.35 2939.59C3171.3 2936.48 3170.8 2933.39 3169.87 2930.42L3175.47 2930.42C3177.48 2933.09 3178.65 2936.28 3178.83 2939.59L3171.35 2939.59ZM3173.89 2928.59H3169.2C3168.55 2926.99 3167.64 2925.5 3166.49 2924.19C3169.3 2925.03 3171.84 2926.54 3173.89 2928.59ZM3156.38 2924.19C3155.24 2925.5 3154.33 2926.99 3153.68 2928.59H3148.99C3151.03 2926.54 3153.58 2925.03 3156.38 2924.19H3156.38ZM3148.99 2952.42H3153.68C3154.33 2954.02 3155.24 2955.51 3156.38 2956.82C3153.58 2955.98 3151.04 2954.47 3148.99 2952.42ZM3166.49 2956.82C3167.64 2955.51 3168.55 2954.02 3169.19 2952.42H3173.89C3171.84 2954.47 3169.3 2955.98 3166.49 2956.82Z"
      fill="var(--color-ghost-200)" stroke="var(--color-ghost-200)" stroke-width="0.00091" />
    <path d="M3138 2917.59L3183 2917.59L3183 2961.59L3138 2961.59L3138 2917.59Z" stroke="var(--color-ghost-200)"
      stroke-width="0.00091" />
  </g>
  <line ref="modules-line" x1="3026.12" y1="2940.17" x2="3136.5" y2="2939.89" stroke="var(--color-shadow-500)" vector-effect="non-scaling-stroke"/>
  
  <path ref="classes-wrapper"
    d="M3081.08 2772.55C3090.65 2762.98 3106.16 2762.98 3115.73 2772.55C3125.3 2782.12 3125.3 2797.63 3115.73 2807.2C3106.16 2816.76 3090.65 2816.76 3081.08 2807.2C3071.52 2797.63 3071.52 2782.12 3081.08 2772.55Z"
    stroke="var(--color-ghost-200)" />
  <g ref="classes-content" clip-path="url(#clip7_2084_108)">
    <path
      d="M3106.6 2771.95H3090.21C3089.37 2771.95 3088.69 2772.7 3088.69 2773.62V2806.13C3088.69 2807.05 3089.37 2807.79 3090.21 2807.79H3106.6C3107.44 2807.79 3108.13 2807.05 3108.13 2806.13V2773.62C3108.13 2772.7 3107.44 2771.95 3106.6 2771.95ZM3090.21 2773.21L3106.6 2773.21C3106.81 2773.21 3106.98 2773.39 3106.98 2773.62V2777.07H3089.84L3089.84 2773.62C3089.84 2773.39 3090.01 2773.21 3090.21 2773.21ZM3106.98 2777.7V2801.09H3089.84V2777.7H3106.98ZM3106.6 2806.54H3090.21C3090.01 2806.54 3089.84 2806.36 3089.84 2806.13V2801.72L3106.98 2801.72V2806.13C3106.98 2806.36 3106.81 2806.54 3106.6 2806.54Z"
      fill="var(--color-ghost-200)" stroke="var(--color-ghost-200)" />
    <path
      d="M3099.32 2774.74H3098.52H3098.29H3097.49C3097.33 2774.74 3097.2 2774.88 3097.2 2775.06C3097.2 2775.23 3097.33 2775.37 3097.49 2775.37H3098.29H3098.52H3099.32C3099.48 2775.37 3099.61 2775.23 3099.61 2775.06C3099.61 2774.88 3099.48 2774.74 3099.32 2774.74Z"
      fill="var(--color-ghost-200)" stroke="var(--color-ghost-200)" />
    <path
      d="M3098.41 2802.65C3097.68 2802.65 3097.08 2803.29 3097.08 2804.09C3097.08 2804.89 3097.68 2805.53 3098.41 2805.53C3099.14 2805.53 3099.73 2804.89 3099.73 2804.09C3099.73 2803.29 3099.14 2802.65 3098.41 2802.65ZM3098.41 2804.91C3097.99 2804.91 3097.66 2804.54 3097.66 2804.09C3097.66 2803.64 3097.99 2803.27 3098.41 2803.27C3098.82 2803.27 3099.16 2803.64 3099.16 2804.09C3099.16 2804.54 3098.82 2804.91 3098.41 2804.91Z"
      fill="var(--color-ghost-200)" stroke="var(--color-ghost-200)" />
  </g>
  <line ref="classes-line" x1="3002.51" y1="2885.43" x2="3080.36" y2="2807.19" stroke="var(--color-shadow-500)" vector-effect="non-scaling-stroke"/>

  <path ref="functional-wrapper"
    d="M3114.48 3075.6C3124.05 3085.17 3124.05 3100.68 3114.48 3110.25C3104.91 3119.82 3089.4 3119.82 3079.83 3110.25C3070.27 3100.68 3070.27 3085.17 3079.83 3075.6C3089.4 3066.03 3104.91 3066.03 3114.48 3075.6Z"
    stroke="var(--color-ghost-200)" />
  <g ref="functional-content" clip-path="url(#clip8_2084_108)">
    <path
      d="M3086.34 3083.22H3087.88V3084.76H3086.34V3083.22ZM3089.43 3084.76H3090.97V3083.22H3089.43V3084.76ZM3092.52 3084.76L3094.06 3084.76L3094.07 3083.22L3092.52 3083.22L3092.52 3084.76ZM3112.61 3080.15V3106.27H3081.7V3080.15H3112.61ZM3111.07 3100.12H3083.25V3104.73H3111.07V3100.12ZM3111.07 3093.98H3083.25V3098.59H3111.07V3093.98ZM3111.07 3087.83H3083.25V3092.44H3111.07V3087.83ZM3111.07 3086.3V3081.69H3083.25V3086.3H3111.07ZM3087.88 3089.37H3086.34V3090.9H3087.88V3089.37ZM3090.97 3089.37H3089.43V3090.9H3090.97V3089.37ZM3094.07 3089.37L3092.52 3089.37L3092.52 3090.9L3094.06 3090.9L3094.07 3089.37ZM3087.88 3095.51H3086.34V3097.05H3087.88V3095.51ZM3090.97 3095.51H3089.43V3097.05H3090.97V3095.51ZM3094.07 3095.52L3092.52 3095.51L3092.52 3097.05L3094.06 3097.05L3094.07 3095.52ZM3087.88 3101.66H3086.34V3103.2H3087.88V3101.66ZM3090.97 3101.66H3089.43V3103.2H3090.97V3101.66ZM3094.07 3101.66L3092.52 3101.66L3092.52 3103.2L3094.06 3103.2L3094.07 3101.66Z"
      fill="var(--color-ghost-200)" stroke="var(--color-ghost-200)" stroke-width="0.00024" />
    <path d="M3078.61 3075.54H3115.71V3112.42H3078.61V3075.54Z" stroke="var(--color-ghost-200)" stroke-width="0.00024" />
  </g>
  <line ref="functional-line" x1="3001.6" y1="2997.03" x2="3079.84" y2="3074.88" stroke="var(--color-shadow-500)" vector-effect="non-scaling-stroke"/>

  <path ref="proto-wrapper"
    d="M2780.03 2809.68C2770.46 2800.12 2770.46 2784.6 2780.03 2775.03C2789.6 2765.47 2805.11 2765.47 2814.68 2775.03C2824.25 2784.6 2824.25 2800.12 2814.68 2809.68C2805.11 2819.25 2789.6 2819.25 2780.03 2809.68Z"
    stroke="var(--color-ghost-200)" />
  <g ref="proto-content">
    <path fill-rule="evenodd" clip-rule="evenodd"
      d="M2781.36 2779.59C2781.36 2779.04 2781.81 2778.59 2782.35 2778.59L2812.36 2778.59C2812.91 2778.59 2813.36 2779.03 2813.36 2779.59L2813.36 2801.59C2813.36 2802.14 2812.9 2802.59 2812.36 2802.59L2782.35 2802.59C2781.8 2802.59 2781.36 2802.14 2781.36 2801.59L2781.36 2779.59Z"
      stroke="var(--color-ghost-200)" stroke-width="0.578" />
    <path fill-rule="evenodd" clip-rule="evenodd"
      d="M2784.36 2797.59L2810.36 2797.59V2798.59L2784.36 2798.59V2797.59ZM2783.36 2780.59L2811.36 2780.59V2781.59L2783.36 2781.59V2780.59ZM2783.36 2781.59H2784.36L2784.36 2798.59H2783.36L2783.36 2781.59ZM2810.36 2781.59H2811.36L2811.36 2798.59H2810.36L2810.36 2781.59Z"
      fill="var(--color-ghost-200)" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2796.36 2799.59H2798.36V2800.59H2796.36V2799.59Z" fill="var(--color-ghost-200)" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2793.36 2802.59H2801.36V2808.59H2793.36V2802.59Z" stroke="var(--color-ghost-200)"
      stroke-width="0.578" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2790.36 2807.59L2804.36 2807.59V2809.59L2790.36 2809.59V2807.59Z"
      fill="var(--color-ghost-200)" />
  </g>
  <line ref="proto-line" x1="2892.92" y1="2888.26" x2="2814.67" y2="2810.4" stroke="var(--color-shadow-500)" vector-effect="non-scaling-stroke"/>
</template>