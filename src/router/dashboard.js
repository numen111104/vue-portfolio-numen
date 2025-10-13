import AdminLayout from '@/layouts/AdminLayout.vue'

import DashboardView from '@/views/dashboard/DashboardPage.vue'
import ProjectsView from '@/views/dashboard/ProjectsPage.vue'
import HeroSettingView from '@/views/dashboard/HeroSettingPage.vue'
import TechStacksView from '@/views/dashboard/TechStacksPage.vue'
import CertificationsView from '@/views/dashboard/CertificationsPage.vue'
import SocialMediaLinksView from '@/views/dashboard/SocialMediaLinksPage.vue'
import EducationPage from '@/views/dashboard/EducationPage.vue'
import AboutContentPage from '@/views/dashboard/AboutContentPage.vue'
import ExperiencesPage from '@/views/dashboard/ExperiencesPage.vue'

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
        path: 'social-media-links',
        name: 'dashboard-social-media-links',
        component: SocialMediaLinksView,
      },
    ],
  },
]

export default Dashboard
