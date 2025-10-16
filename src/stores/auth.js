// src/stores/auth.js

import { defineStore } from 'pinia'
import apiService from '@/services/apiService'
import router from '@/router'
import apiSessionClient from '@/services/apiSession'
import Cookies from 'js-cookie'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    currentUser: (state) => state.user,
  },

  actions: {
    async fetchUser() {
      try {
        const response = await apiService.getUser()
        this.user = response.data.data
        localStorage.setItem('user', JSON.stringify(this.user))
      } catch (error) {
        this.user = null
        localStorage.removeItem('user')
      }
    },

    // Aksi login yang baru
    async login(credentials) {
      try {
        const token = Cookies.get('XSRF-TOKEN')
        if (token) {
          apiSessionClient.defaults.headers.common['X-XSRF-TOKEN'] = token
        }
        await apiService.login(credentials)
        await this.fetchUser()
        return { success: true }
      } catch (error) {
        console.error('Login Gagal! Respons dari server:', error.response)
        const errorMessage = error.response?.data?.errors
          ? Object.values(error.response.data.errors).flat().join(' ')
          : error.response?.data?.message || 'Login failed. Periksa kredensial Anda.'
        this.user = null
        localStorage.removeItem('user')
        return { success: false, error: errorMessage }
      }
    },

    async logout() {
      this.user = null
      localStorage.removeItem('user')

      try {
        await apiService.logout()
        await router.push({ name: 'login' })
      } catch (error) {
        console.error('Error during API logout:', error)
        await router.push({ name: 'login' })
      }
    },
  },
})
