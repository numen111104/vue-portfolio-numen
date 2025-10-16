const getBaseUrl = () => {
  return import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '') || ''
}

// Export the storage function directly for easy import in <script setup>
export const storage = (path) => {
  if (!path) return ''
  // If path is already a full URL, return it as is
  if (path.startsWith('http')) return path;

  const apiBase = getBaseUrl()
  return `${apiBase}/storage/${path.replace(/^\/+/, '')}`
}

export const appHelper = {
  url: {
    base: `${getBaseUrl()}/api`,
    storage: storage, // Keep for existing template usage via main.js
  },
}
