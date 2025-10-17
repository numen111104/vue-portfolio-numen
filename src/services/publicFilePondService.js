import { computed } from 'vue';
import { appHelper } from '@/utils/appHelper';
import swalMixin from '@/utils/swal';

// Helper to get cookie value by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
}

export function usePublicFilePondServer() {
  const publicFilePondServerOptions = computed(() => {
    const xsrfToken = getCookie('XSRF-TOKEN');

    return {
      url: appHelper.url.base, // This should resolve to /api
      process: {
        url: '/files/public/process',
        method: 'POST',
        withCredentials: true, // Required to send cookies
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-XSRF-TOKEN': xsrfToken, // Public forms still need CSRF protection
        },
        onerror: (response) => {
          try {
            const data = JSON.parse(response);
            console.error('Public FilePond process error:', data);
            swalMixin.fire({
              icon: 'error',
              title: 'Upload Error',
              text: data.message || 'Could not process file.',
            });
          } catch (e) {
            console.error('Public FilePond process error:', response);
          }
        },
      },
      revert: {
        url: '/files/public/revert',
        method: 'DELETE',
        withCredentials: true, // Required to send cookies
        headers: {
          'Accept': 'application/json',
          'X-Requested-with': 'XMLHttpRequest',
          'X-XSRF-TOKEN': xsrfToken,
        },
        onerror: (response) => {
          console.error('Public FilePond revert error:', response);
        },
      },
    };
  });

  return { publicFilePondServerOptions };
}
