import { defineStore } from 'pinia';
import apiService from '@/services/apiService';

export const useAppSettingsStore = defineStore('appSettings', {
  state: () => ({
    settings: {},
    loading: false,
    error: null,
  }),

  getters: {
    logoUrl: (state) => state.settings.site_logo_url || null,
    siteTitle: (state) => state.settings.site_title || 'Portfolio',
  },

  actions: {
    async fetchSettings() {
      if (Object.keys(this.settings).length > 0) {
        return; // Don't fetch if already populated
      }

      this.loading = true;
      this.error = null;
      try {
        const response = await apiService.get('/app-settings');
        this.settings = response.data;
      } catch (error) {
        this.error = error;
        console.error('Failed to fetch app settings:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});
