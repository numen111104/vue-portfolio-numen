import AdminLayout from '@/layouts/AdminLayout.vue'

import DashboardView from '@/views/dashboard/DashboardView.vue'
import ProjectsView from '@/views/dashboard/ProjectsView.vue'

const Dashboard = [
  {
    path: '/dashboard',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'DashboardMain',
        component: DashboardView,
      },
      {
        path: 'projects',
        name: 'DashboardProjects',
        component: ProjectsView,
      },
    ],
  },
]

export default Dashboard
