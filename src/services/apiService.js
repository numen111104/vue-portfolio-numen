import apiClient from './apiClient';
import apiSessionClient from './apiSession';

export default {
  login: (credentials) => apiSessionClient.post('/login', credentials),
  logout: () => apiSessionClient.post('/logout'),

  getUser: () => apiClient.get('/user'),
  get: (url, params) => apiClient.get(url, { params }),
  post: (url, data) => apiClient.post(url, data),
  put: (url, data) => apiClient.put(url, data),
  destroy: (url) => apiClient.delete(url),
};
