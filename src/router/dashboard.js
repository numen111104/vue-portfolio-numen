import AdminLayout from '@/layouts/AdminLayout.vue'

import DashboardView from '@/views/dashboard/DashboardView.vue'
import ProjectsView from '@/views/dashboard/ProjectsView.vue'
import HeroSettingView from '@/views/dashboard/HeroSetting.vue'
import TechStacksView from '@/views/dashboard/TechStacks.vue'
import CertificationsView from '@/views/dashboard/CertificationsView.vue'
import SocialMediaLinksView from '@/views/dashboard/SocialMediaLinks.vue'

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
        path: 'projects',
        name: 'dashboard-projects',
        component: ProjectsView,
      },
      {
        path: 'hero-settings',
        name: 'dashboard-hero-settings',
        component: HeroSettingView,
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
