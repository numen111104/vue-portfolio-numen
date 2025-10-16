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
        fetch(source, { credentials: 'include' })
          .then((res) => res.blob())
          .then(load)
          .catch(error)
      },
    }
  })

  return { filePondServerOptions }
}
