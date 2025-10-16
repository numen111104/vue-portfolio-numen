import axios from 'axios'
import { appHelper } from '@/utils/appHelper.js'
import { useAuthStore } from '@/stores/auth'
import Cookies from 'js-cookie'

const apiClient = axios.create({
  baseURL: appHelper.url.base,
  withCredentials: true,
})

apiClient.interceptors.request.use(async (config) => {
  config.headers['Accept'] = 'application/json'
  const token = Cookies.get('XSRF-TOKEN')
  if (token) {
    config.headers['X-XSRF-TOKEN'] = token
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (
      error.response &&
      [401, 419].includes(error.response.status) &&
      originalRequest.url !== '/logout'
    ) {
      const authStore = useAuthStore()
      if (authStore.isAuthenticated) {
        authStore.logout()
      }
    }
    return Promise.reject(error)
  },
)

export default apiClient
