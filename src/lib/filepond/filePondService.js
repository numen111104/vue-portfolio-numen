import { computed } from 'vue'
import { appHelper } from '@/utils/appHelper'
import swalMixin from '@/lib/sweetalert/swal'

// helper buat ambil isi cookie
function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift())
}

/**
 * Load an image via <img> element and convert it to a File object using canvas.
 * This bypasses CORS restrictions on fetch() since <img> can load cross-origin
 * images without CORS headers (the browser just can't read the pixel data,
 * but we use crossOrigin='anonymous' with a fallback).
 */
function loadImageViaElement(url, filename) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(new File([blob], filename, { type: blob.type || 'image/png' }))
          } else {
            reject(new Error('Canvas toBlob failed'))
          }
        })
      } catch {
        // If canvas is tainted (CORS), reject so caller can handle
        reject(new Error('Canvas tainted by cross-origin data'))
      }
    }

    img.onerror = () => reject(new Error('Image load failed'))
    img.src = url
  })
}

export function useFilePondServer() {
  const filePondServerOptions = computed(() => {
    const xsrfToken = getCookie('XSRF-TOKEN') // ambil token dari cookie

    return {
      url: appHelper.url.base,
      process: {
        url: '/files/process',
        method: 'POST',
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-XSRF-TOKEN': xsrfToken,
        },
        onerror: (response) => {
          try {
            const data = JSON.parse(response)
            console.error('FilePond process error:', data)
            swalMixin.fire({
              icon: 'error',
              title: 'Error',
              text: 'Could not process file. Please try again later.',
            })
          } catch (e) {
            console.error('FilePond process error:', response)
          }
        },
      },
      revert: {
        url: '/files/revert',
        method: 'DELETE',
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-XSRF-TOKEN': xsrfToken,
        },
        onerror: (response) => {
          console.error('FilePond revert error:', response)
          swalMixin.fire({
            icon: 'error',
            title: 'Error',
            text: 'Could not revert file from server. Please try again later.',
          })
        },
      },
      load: (source, load, error) => {
        if (!source) return error(new Error('No source provided'))

        let path = source

        try {
          const url = new URL(source)
          path = url.pathname
        } catch {
          // source is not a full URL, use as-is
        }

        path = path.replace(/^\/?storage\//, '')

        // Use storage helper for correct URL
        const url = appHelper.url.storage(path)
        const filename = path.split('/').pop() || 'file'

        // Strategy 1: Try fetch via /api/storage route (has CORS headers)
        const apiUrl = `${appHelper.url.base}/storage/${path}`

        fetch(apiUrl, {
          credentials: 'include',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          },
        })
          .then(async (res) => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            const disposition = res.headers.get('Content-Disposition')
            const filenameMatch = disposition && disposition.match(/filename="?([^"]+)"?/)
            const resolvedName = filenameMatch ? filenameMatch[1] : filename
            const blob = await res.blob()
            load(new File([blob], resolvedName, { type: blob.type }))
          })
          .catch(() => {
            // Strategy 2: Try loading via <img> element (bypasses CORS for display)
            loadImageViaElement(url, filename)
              .then((file) => load(file))
              .catch((err) => {
                console.error('FilePond load error (all strategies failed):', err)
                error(err)
              })
          })
      },
    }
  })

  return { filePondServerOptions }
}

