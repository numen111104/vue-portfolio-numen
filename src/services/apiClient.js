import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
});

apiClient.interceptors.request.use(async (config) => {
  const { useAuthStore } = await import('@/stores/auth');
  const authStore = useAuthStore();

  config.headers['Accept'] = 'application/json';
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Prevent recursive logout loops
    if (error.response && [401, 419].includes(error.response.status) && originalRequest.url !== '/logout') {
      const { useAuthStore } = await import('@/stores/auth');
      const authStore = useAuthStore();
      authStore.logout();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
