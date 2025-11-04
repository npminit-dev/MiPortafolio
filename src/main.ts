import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18next from 'i18next';
import I18NextVue from 'i18next-vue';
import { en } from './locales/en';
import { es } from './locales/es';
import { createPinia } from 'pinia';

const app = createApp(App);

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
  fallbackLng: false
});

const pinia = createPinia()

app.use(I18NextVue, {i18next});
app.use(pinia)
app.mount('#app')