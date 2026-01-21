import { computed } from 'vue'
import { appHelper } from '@/utils/appHelper'
import swalMixin from '@/lib/sweetalert/swal'

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
        } catch (e) {
          swalMixin.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load file',
          })
          console.error('Failed to load file:', e)
          return
        }

        path = path.replace(/^\/?storage\//, '')

        // Use storage helper for correct URL (avoids /api/storage issue)
        const url = appHelper.url.storage(path)

        fetch(url, {
          credentials: 'include',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          },
        })
          .then(async (res) => {
            if (!res.ok) throw new Error('Failed to load file')
            const disposition = res.headers.get('Content-Disposition')
            const filenameMatch = disposition && disposition.match(/filename="?([^"]+)"?/)
            const filename = filenameMatch ? filenameMatch[1] : path.split('/').pop()
            const blob = await res.blob()

            load(new File([blob], filename, { type: blob.type }))
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
