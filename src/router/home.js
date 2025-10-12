import PortfolioLayout from '@/layouts/PortfolioLayout.vue'

import HomeView from '@/views/HomeView.vue'
import AboutDetailView from '@/views/AboutDetailView.vue'
import ProjectDetailView from '@/views/ProjectDetailView.vue'
import ExperiencesDetailView from '@/views/ExperiencesDetailView.vue'
import TestimonialDetailView from '@/views/TestimonialDetailView.vue'
import CertificationsView from '@/views/CertificationsView.vue'
import TechStackView from '@/views/TechStackView.vue'
import SingleExperienceView from '@/views/SingleExperienceView.vue'

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
