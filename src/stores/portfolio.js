import { defineStore } from 'pinia';
import apiService from '@/services/apiService';
import swalMixin from '@/utils/swal';

export const usePortfolioStore = defineStore('portfolio', {
  state: () => ({
    loading: false,
    error: null,
    hero: {},
    about: {},
    technologies: [],
    projects: [],
    testimonials: [],
    experiences: [],
    educations: [],
    socials: [],
    certifications: [],
  }),

  actions: {
    async fetchAllData() {
      if (this.technologies.length > 0) {
        // Data is already loaded
        return;
      }

      this.loading = true;
      this.error = null;
      try {
        const response = await apiService.get('/portfolio');
        const data = response.data;

        this.hero = data.hero || {};
        this.about = data.about || {};
        this.technologies = data.technologies || [];
        this.projects = data.projects || [];
        this.testimonials = data.testimonials || [];
        this.experiences = data.experiences || [];
        this.educations = data.educations || [];
        this.socials = data.socials || [];
        this.certifications = data.certifications || [];

      } catch (error) {
        console.error('Failed to fetch portfolio data:', error);
        this.error = 'Could not load portfolio data. Please try again later.';
        swalMixin.fire({
          icon: 'error',
          title: 'Error',
          text: 'Could not load portfolio data. Please try again later.',
        })
      } finally {
        this.loading = false;
      }
    },
  },
});
