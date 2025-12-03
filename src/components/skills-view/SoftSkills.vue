<script setup lang="ts">
  import { onMounted, onBeforeUnmount, nextTick } from 'vue';
  import SolarSystem from './SolarSystem.vue';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { SplitText } from 'gsap/SplitText';
  import { useSoundStore } from '../../stores/useSoundStore';
import { useTranslation } from 'i18next-vue';

  const st = useSoundStore();
  const { i18next } = useTranslation()

  // Altura adicional para scrollear durante el pin (ajustable)
  const SCROLL_HEIGHT = '500%';

  let mainTimeline: gsap.core.Timeline | null = null;
  let backgroundTween: gsap.core.Tween | null = null;
  let splits: SplitText[] = [];

  const startAnimations = () => {
    // Animación del fondo negro (ya existente)
    backgroundTween = gsap.fromTo('#black-background', {
      translateY: '-50%',
      autoAlpha: 0,
    }, {
      translateY: '0%',
      autoAlpha: 1,
      ease: 'linear',
      scrollTrigger: {
        trigger: '#skills-container',
        start: 'top bottom',
        end: 'center center',
        scrub: true,
        onUpdate: ({ progress }) => {
          st.crossfadeBackgrounds(Math.round(progress * 100))
        }
      }
    });

    // Obtener los párrafos
    const paragraphs = document.querySelectorAll('#skills-container p');

    // Crear SplitText para cada párrafo
    splits = Array.from(paragraphs).map(p => 
      new SplitText(p, { type: 'lines,words' })
    );

    // Hacer las palabras invisibles inicialmente (no los párrafos padres)
    splits.forEach(split => {
      gsap.set(split.words, { autoAlpha: 0 });
    });

    // Crear la timeline principal
    mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#skills-container',
        start: 'center center',
        end: `+=${SCROLL_HEIGHT}`,
        scrub: true,
        pin: true,
        pinSpacing: 'margin',
        anticipatePin: 1,
      }
    });

    // Duración de cada fase (en porcentaje)
    const revealDuration = 15;
    const visibleDuration = 25;
    const hideDuration = 15;

    // Animar cada párrafo
    splits.forEach((split, index) => {
      const isLastParagraph = index === splits.length - 1;

      // Revelar palabras
      mainTimeline!.to(split.words, {
        autoAlpha: 1,
        duration: revealDuration,
        stagger: {
          amount: revealDuration * 0.8,
          from: 'start',
        },
        ease: 'power2.out'
      });

      // Mantener visible
      mainTimeline!.to({}, { duration: visibleDuration });

      // Ocultar palabras (excepto el último párrafo)
      if (!isLastParagraph) {
        mainTimeline!.to(split.words, {
          autoAlpha: 0,
          duration: hideDuration,
          stagger: {
            amount: hideDuration * 0.8,
            from: 'start',
          },
          ease: 'power2.in'
        });
      }
    });
  };

  const killAnimations = () => {
    // Limpiar splits
    splits.forEach(split => split.revert());
    splits = [];

    // Matar timeline principal
    if (mainTimeline) {
      mainTimeline.scrollTrigger?.kill();
      mainTimeline.kill();
      mainTimeline = null;
    }

    // Matar tween del fondo
    if (backgroundTween) {
      backgroundTween.scrollTrigger?.kill();
      backgroundTween.kill();
      backgroundTween = null;
    }

    // Limpiar todos los ScrollTriggers del contenedor
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === '#skills-container') {
        trigger.kill();
      }
    });
  };

  onMounted(() => {
    startAnimations();
    i18next.on('languageChanged', async () => {
      killAnimations()
      await nextTick()
      await nextTick()
      startAnimations()
    })
  });

  onBeforeUnmount(() => {
    killAnimations();
  });
</script>

<template>
  <div id="skills-container" class="relative w-full min-h-screen flex items-center justify-center">
    <div id="black-background" class="absolute h-[200vh] bg-void-975 w-screen -z-[200] -top-1/2 left-0 pointer-events-none"/>
    <SolarSystem
      id="solar-system"
      :height="1000"
      class="absolute -z-10 opacity-40"
    />
    <div class="h-full w-full flex items-center justify-center">
      <p class="absolute font-display text-ghost-200 text-[21px] text-center leading-tight max-w-[600px] shadowed-p">
        {{ $t('Subject D-095 exhibits heightened interpersonal sensitivity, consistently registering external signals with precision. Within collaborative environments, D-092 maintains sustained active-listening patterns, enabling rapid assimilation of contextual data. Observed interactions indicate a stable tendency toward cooperative alignment rather than competitive escalation, optimizing group coherence.') }}
      </p>
      <p class="absolute font-display text-ghost-200 text-[21px] text-center leading-tight max-w-[600px] shadowed-p">
        {{ $t('Operational records show that D-095 integrates seamlessly into multi-agent units, providing constructive ideation cycles without disrupting system equilibrium. When required, D-092 assumes a horizontal leadership mode, guiding trajectories through mediation rather than dominance. This approach minimizes internal friction and preserves collective processing efficiency.') }}
      </p>
      <p class="absolute font-display text-ghost-200 text-[21px] text-center leading-tight max-w-[600px] shadowed-p">
        {{ $t("In informal technical exchanges, D-095 demonstrates stable communication flows, encouraging cross-participant engagement and sustaining high informational throughput. D-092 consistently promotes inclusive participation, amplifying the cognitive bandwidth of the entire cell. The subject’s behavior suggests a calibrated social interface optimized for team-level adaptability.") }}
      </p>
    </div>
  </div>
</template>

<style scoped>
  .shadowed-p {
    text-shadow: 2px 2px 5px black, -2px -2px 5px black, -2px 2px 5px black, 2px -2px 5px black;
  }
</style>