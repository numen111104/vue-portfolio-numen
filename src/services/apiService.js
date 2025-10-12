import apiClient from './apiClient';

export default {
  login: (credentials) => apiClient.post('/login', credentials),
  logout: () => apiClient.post('/logout'),

  getUser: () => apiClient.get('/user'),
  get: (url, params) => apiClient.get(url, { params }),
  post: (url, data) => apiClient.post(url, data),
  destroy: (url) => apiClient.delete(url),
};
