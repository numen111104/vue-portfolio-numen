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
        name: 'Home',
        component: HomeView,
      },
      {
        path: 'about',
        name: 'About',
        component: AboutDetailView,
      },
      {
        path: 'project',
        name: 'Project',
        component: ProjectDetailView,
      },
      {
        path: 'experience',
        name: 'Experience',
        component: ExperiencesDetailView,
      },
      {
        path: 'experience/:id',
        name: 'SingleExperience',
        component: SingleExperienceView,
      },
      {
        path: 'testimonial',
        name: 'Testimonial',
        component: TestimonialDetailView,
      },
      {
        path: 'certifications',
        name: 'Certifications',
        component: CertificationsView,
      },
      {
        path: 'tech-stacks',
        name: 'TechStacks',
        component: TechStackView,
      },
    ],
  },
]

export default Home
