import axios from 'axios'
const sessionBaseUrl = import.meta.env.VITE_API_BASE_URL || ''

const apiSessionClient = axios.create({
  baseURL: sessionBaseUrl,
  withCredentials: true,
})

apiSessionClient.interceptors.request.use(async (config) => {
  config.headers['Accept'] = 'application/json'
  return config
})

export default apiSessionClient
