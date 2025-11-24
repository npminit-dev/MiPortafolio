import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import MainView from './views/MainView.vue'
import StartView from './views/StartView.vue'
import App from './App.vue'
import CareerView from './views/CareerView.vue'
import SkillsView from './views/SkillsView.vue'

const routes = [
  {
    path: '/',
    component: StartView
  },
  {
    path: '/menu', 
    component: MainView
  },
  {
    path: '/career',
    component: CareerView
  },
  {
    path: '/skills',
    component: SkillsView
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})