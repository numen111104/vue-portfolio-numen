import AboutSection from '@/components/sections/AboutSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import TestimonialSection from '@/components/sections/TestimonialSection.vue'
import WorkSection from '@/components/sections/WorkSection.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: HeroSection },
  { path: '/about', name: 'About', component: AboutSection },
  { path: '/work', name: 'Work', component: WorkSection },
  { path: '/experience', name: 'Experience', component: ExperienceSection },
  { path: '/testimonial', name: 'Testimonial', component: TestimonialSection },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
