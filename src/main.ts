import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18next from 'i18next';
import I18NextVue from 'i18next-vue';
import { en } from './locales/en';
import { es } from './locales/es';
import { createPinia } from 'pinia';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { MotionPathHelper } from 'gsap/MotionPathHelper';
import { MotionPathPlugin } from 'gsap/all';
import { Draggable } from 'gsap/Draggable';
import { Flip, ScrambleTextPlugin } from 'gsap/all';
import { DrawSVGPlugin } from 'gsap/all';
import { SplitText } from 'gsap/SplitText';
import { InertiaPlugin } from 'gsap/all';
import { addIcons, OhVueIcon } from 'oh-vue-icons';
import { BiChevronCompactLeft, BiChevronCompactRight, FiSquareEs, FiSquareGb } from "oh-vue-icons/icons";
import { CoReact, CoAngular, SiVuedotjs, CoNextJs, CoRedux, SiTailwindcss, FaBootstrap, GiJesterHat, SiReactrouter, SiAntdesign, SiSemanticuireact, SiReactquery } from "oh-vue-icons/icons";
import { LaNodeJs, SiExpress, FaHardHat, CoGraphql, CoSocketIo, SiPrisma, CoPostman, SiJsonwebtokens, CoDocker, AiZotero, IoLogoVercel, CoLetsEncrypt } from "oh-vue-icons/icons";
import { SiPostgresql, CoMysql, SiSqlite, SiMicrosoftsqlserver, SiSupabase, SiMongodb } from "oh-vue-icons/icons";
import { SiReact, CoExpo, CoGradle, IoLogoGooglePlaystore, SiAndroidstudio, CoAndroidAlt } from "oh-vue-icons/icons";
import { BiGit, BiGithub, CoVisualStudioCode, GiArtificialIntelligence, LaJira, CoNpm, CoEslint, FaFigma, CoConfluence, SiVite, SiNetlify, CoCanva } from "oh-vue-icons/icons";
import { router } from './router';
    
const app = createApp(App);

/* i18 config */
await i18next.init({
  resources: {
    en: {
      translation: en
    },
    es: {
      translation: es
    }
  },
  interpolation: { escapeValue: false },
  fallbackLng: 'en'
});

/* pinia */
const pinia = createPinia()

/* vue-icons */
addIcons(FiSquareEs, FiSquareGb, BiChevronCompactLeft, BiChevronCompactRight);
addIcons(CoReact, CoAngular, SiVuedotjs, CoNextJs, CoRedux, SiTailwindcss, FaBootstrap, GiJesterHat, SiReactrouter, SiAntdesign, SiSemanticuireact, SiReactquery)
addIcons(LaNodeJs, SiExpress, FaHardHat, CoGraphql, CoSocketIo, SiPrisma, CoPostman, SiJsonwebtokens, CoDocker, AiZotero, IoLogoVercel, CoLetsEncrypt)
addIcons(SiPostgresql, CoMysql, SiSqlite, SiMicrosoftsqlserver, SiSupabase, SiMongodb);
addIcons(SiReact, CoExpo, CoGradle, IoLogoGooglePlaystore, SiAndroidstudio, CoAndroidAlt);
addIcons(BiGit, BiGithub, CoVisualStudioCode, GiArtificialIntelligence, LaJira, CoNpm, CoEslint, FaFigma, CoConfluence, SiVite, SiNetlify, CoCanva)
app.component("v-icon", OhVueIcon);

/* gsap plugin register */
gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother, 
  MorphSVGPlugin, 
  MotionPathHelper, 
  SplitText, 
  ScrambleTextPlugin,
  DrawSVGPlugin,
  Flip,
  Draggable,
  InertiaPlugin,
  MotionPathPlugin
);

/* plugin use */
app.use(I18NextVue, {i18next});
app.use(pinia)
app.use(router)

app.mount('#app')
