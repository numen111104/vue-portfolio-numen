import { createRouter, createWebHistory } from 'vue-router'
import Home from './home'
import Dashboard from './dashboard'

const routes = [...Home, ...Dashboard]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else return { top: 0, behavior: 'smooth' }
  },
})

export default router
