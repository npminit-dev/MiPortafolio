import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import MainView from './views/MainView.vue'
import StartView from './views/StartView.vue'
import App from './App.vue'

const routes = [
  {
    path: '/',
    component: StartView
  },
  {
    path: '/menu', 
    component: MainView
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})