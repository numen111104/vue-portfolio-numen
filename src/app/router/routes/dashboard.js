import AdminLayout from '@/shared/layouts/AdminLayout.vue'

import DashboardView from '@/features/dashboard/views/DashboardPage.vue'
import ProjectsView from '@/features/dashboard/views/ProjectsPage.vue'
import HeroSettingView from '@/features/dashboard/views/HeroSettingPage.vue'
import TechStacksView from '@/features/dashboard/views/TechStacksPage.vue'
import CertificationsView from '@/features/dashboard/views/CertificationsPage.vue'
import SocialMediaLinksView from '@/features/dashboard/views/SocialMediaLinksPage.vue'
import EducationPage from '@/features/dashboard/views/EducationPage.vue'
import AboutContentPage from '@/features/dashboard/views/AboutContentPage.vue'
import ExperiencesPage from '@/features/dashboard/views/ExperiencesPage.vue'
import TestimonialsPage from '@/features/dashboard/views/TestimonialsPage.vue'
import CacheManagementPage from '@/features/dashboard/views/CacheManagementPage.vue'
import SiteSettingsPage from '@/features/dashboard/views/SiteSettingsPage.vue'

const Dashboard = [
  {
    path: '/admin',
    component: AdminLayout,
    redirect: { name: 'dashboard-main' },
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard-main',
        component: DashboardView,
      },
      {
        path: 'hero-settings',
        name: 'dashboard-hero-settings',
        component: HeroSettingView,
      },
      {
        path: 'about-content',
        name: 'dashboard-about-content',
        component: AboutContentPage,
      },
      {
        path: 'experiences',
        name: 'dashboard-experiences',
        component: ExperiencesPage,
      },
      {
        path: 'projects',
        name: 'dashboard-projects',
        component: ProjectsView,
      },
      {
        path: 'education',
        name: 'dashboard-education',
        component: EducationPage,
      },
      {
        path: 'tech-stacks',
        name: 'dashboard-tech-stacks',
        component: TechStacksView,
      },
      {
        path: 'certifications',
        name: 'dashboard-certifications',
        component: CertificationsView,
      },
      {
        path: 'testimonials',
        name: 'DashboardTestimonials',
        component: TestimonialsPage,
      },
      {
        path: 'social-media-links',
        name: 'dashboard-social-media-links',
        component: SocialMediaLinksView,
      },
      {
        path: 'cache-management',
        name: 'dashboard-cache-management',
        component: CacheManagementPage,
      },
      {
        path: 'site-settings',
        name: 'dashboard-site-settings',
        component: SiteSettingsPage,
      },
    ],
  },
]

export default Dashboard
