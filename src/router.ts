import { createRouter, createWebHistory } from 'vue-router'

import MainView from './views/MainView.vue'
import StartView from './views/StartView.vue'
import CareerView from './views/CareerView.vue'
import SkillsView from './views/SkillsView.vue'
import AboutView from './views/AboutView.vue'

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
  },
  {
    path: '/about',
    component: AboutView
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})