import axios from 'axios'
import Cookies from 'js-cookie'

const sessionBaseUrl = import.meta.env.VITE_API_BASE_URL || ''

const apiSessionClient = axios.create({
  baseURL: sessionBaseUrl,
  withCredentials: true,
})

apiSessionClient.interceptors.request.use(async (config) => {
  config.headers['Accept'] = 'application/json'

  // Ambil XSRF token dari cookie dan inject ke header
  const xsrf = Cookies.get('XSRF-TOKEN')
  if (xsrf) config.headers['X-XSRF-TOKEN'] = xsrf

  return config
})

export default apiSessionClient
