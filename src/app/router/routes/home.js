import PortfolioLayout from '@/shared/layouts/PortfolioLayout.vue'

import HomeView from '@/features/portfolio/views/HomeView.vue'
import AboutDetailView from '@/features/portfolio/views/AboutDetailView.vue'
import ProjectDetailView from '@/features/portfolio/views/ProjectDetailView.vue'
import ExperiencesDetailView from '@/features/portfolio/views/ExperiencesDetailView.vue'
import TestimonialDetailView from '@/features/portfolio/views/TestimonialDetailView.vue'
import CertificationsView from '@/features/portfolio/views/CertificationsView.vue'
import TechStackView from '@/features/portfolio/views/TechStackView.vue'
import SingleExperienceView from '@/features/portfolio/views/SingleExperienceView.vue'

const Home = [
  {
    path: '/',
    component: PortfolioLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
      },
      {
        path: 'about',
        name: 'about',
        component: AboutDetailView,
      },
      {
        path: 'project',
        name: 'project',
        component: ProjectDetailView,
      },
      {
        path: 'experience',
        name: 'experience',
        component: ExperiencesDetailView,
      },
      {
        path: 'experience/:id',
        name: 'single-experience',
        component: SingleExperienceView,
      },
      {
        path: 'testimonial',
        name: 'testimonial',
        component: TestimonialDetailView,
      },
      {
        path: 'certifications',
        name: 'certifications',
        component: CertificationsView,
      },
      {
        path: 'tech-stacks',
        name: 'tech-stacks',
        component: TechStackView,
      },
    ],
  },
]

export default Home
