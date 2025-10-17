import { computed } from 'vue'
import { appHelper } from '@/utils/appHelper'
import swalMixin from '@/utils/swal'

// helper buat ambil isi cookie
function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift())
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
            text: 'Could not revert file. Please try again later.',
          })
        },
      },
      load: (source, load, error) => {
        if (!source) return error(new Error('No source provided'))

        let path = source

        try {
          const url = new URL(source)
          path = url.pathname
        } catch (e) {
          return swalMixin.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load file',
          })
        }

        path = path.replace(/^\/?storage\//, '')

        // URL ke route Laravel yang serve storage + CORS header
        const url = appHelper.url.base + '/storage/' + path

        fetch(url, {
          credentials: 'include',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          },
        })
          .then((res) => {
            if (!res.ok) throw new Error('Failed to load file')

            // ambil filename dari Content-Disposition
            const disposition = res.headers.get('Content-Disposition')
            const filenameMatch = disposition && disposition.match(/filename="?([^"]+)"?/)
            const filename = filenameMatch ? filenameMatch[1] : path.split('/').pop()

            return res.blob().then((blob) => {
              // FilePond expect: File/Blob + filename
              load(new File([blob], filename, { type: blob.type }))
            })
          })
          .catch((err) => {
            console.error('FilePond load error:', err)
            error(err)
          })
      },
    }
  })

  return { filePondServerOptions }
}
