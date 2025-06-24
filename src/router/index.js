import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue' // Import HomeView
import AboutDetailView from '@/views/AboutDetailView.vue'
import ProjectDetailView from '@/views/ProjectDetailView.vue'
import ExperiencesDetailView from '@/views/ExperiencesDetailView.vue'
import TestimonialDetailView from '@/views/TestimonialDetailView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutDetailView },
  { path: '/project', name: 'Project', component: ProjectDetailView },
  { path: '/experience', name: 'Experience', component: ExperiencesDetailView },
  { path: '/testimonial', name: 'Testimonial', component: TestimonialDetailView },
]

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
