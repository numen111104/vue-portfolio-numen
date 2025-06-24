import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue' // Import HomeView
import AboutDetailView from '@/views/AboutDetailView.vue'
import ProjectDetailView from '@/views/ProjectDetailView.vue'
import ExperiencesDetailView from '@/views/ExperiencesDetailView.vue'
import TestimonialDetailView from '@/views/TestimonialDetailView.vue'
import DashboardView from '@/views/DashboardView.vue'

import AdminLayout from '@/layouts/AdminLayout.vue'
import PortfolioLayout from '@/layouts/PortfolioLayout.vue'

const routes = [
  {
    path: '/',
    component: PortfolioLayout,
    children: [
      { path: '', name: 'Home', component: HomeView },
      { path: 'about', name: 'About', component: AboutDetailView },
      { path: 'project', name: 'Project', component: ProjectDetailView },
      { path: 'experience', name: 'Experience', component: ExperiencesDetailView },
      { path: 'testimonial', name: 'Testimonial', component: TestimonialDetailView },
    ],
  },

  {
    path: '/dashboard',
    component: AdminLayout,
    children: [
      { path: '', name: 'DashboardMain', component: DashboardView }, // Default dashboard view
      // Contoh rute dashboard lainnya:
      // { path: 'analytics', name: 'DashboardAnalytics', component: () => import('@/views/dashboard/AnalyticsView.vue') },
      // { path: 'ecommerce/customers', name: 'DashboardCustomers', component: () => import('@/views/dashboard/CustomersView.vue') },
      // dst dari html dashboard Anda
    ],
  },
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
