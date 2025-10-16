const getApiBaseUrl = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '') || ''
  return `${baseUrl}/api`
}

const getBaseUrl = () => {
  return import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '') || ''
}

export const appHelper = {
  url: {
    base: getApiBaseUrl(),
    storage(path) {
      if (!path) return ''
      const apiBase = getBaseUrl()
      return `${apiBase}/storage/${path.replace(/^\/+/, '')}`
    },
  },
}
