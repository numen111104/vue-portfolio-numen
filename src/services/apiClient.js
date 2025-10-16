import axios from 'axios'
import { appHelper } from '@/utils/appHelper.js'
import { useAuthStore } from '@/stores/auth'

const apiClient = axios.create({
  baseURL: appHelper.url.base,
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
})

apiClient.interceptors.request.use(async (config) => {
  config.headers['Accept'] = 'application/json'
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
