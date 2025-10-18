const getBaseUrl = () => {
  return import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '') || ''
}

export const storage = (path) => {
  if (!path) return ''

  // Jika sudah full URL (http/https), kembalikan langsung
  if (/^https?:\/\//i.test(path)) {
    return path
  }

  const apiBase = getBaseUrl()

  // Bersihkan prefix "storage/" jika sudah ada
  let cleanPath = path.replace(/^\/+/, '') // hapus leading slash
  cleanPath = cleanPath.replace(/^storage\/+/, '') // hapus storage di awal jika ada

  // Hasil akhir akan selalu berbentuk `${apiBase}/storage/...`
  return `${apiBase}/storage/${cleanPath}`
}

// Helper untuk konsistensi global
export const appHelper = {
  url: {
    base: `${getBaseUrl()}/api`,
    storage, // masih bisa diakses via appHelper.url.storage()
  },
}
