import { defineStore } from 'pinia'
import apiService from '@/services/apiService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    token: localStorage.getItem('token'),
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    currentUser: (state) => state.user,
  },

  actions: {
    async login(credentials) {
      try {
        const response = await apiService.login(credentials)
        const { user, token } = response.data

        // Update state
        this.user = user
        this.token = token

        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)

        return { success: true }
      } catch (error) {
        // Clear state on failure
        this.user = null
        this.token = null
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        return { success: false, error: error.response?.data?.message || 'Login failed' }
      }
    },

    async logout() {
      try {
        await apiService.logout()
      } catch (error) {
        console.error('Error during API logout', error)
      }

      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
  },
})
