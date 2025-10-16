import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { appHelper } from '@/utils/appHelper';
import swalMixin from '@/utils/swal';

export function useFilePondServer() {
    const authStore = useAuthStore();

    const filePondServerOptions = computed(() => {
        return {
            url: appHelper.url.base,
            process: {
                url: '/files/process',
                headers: {
                    // 'Authorization': `Bearer ${authStore.token}`,
                    'Accept': 'application/json',
                },
                onerror: (response) => {
                    try {
                        const data = JSON.parse(response);
                        console.error('FilePond process error:', data);
                    } catch (e) {
                        console.error('FilePond process error:', response);
                    }
                },
            },
            revert: {
                url: '/files/revert',
                headers: {
                  // 'Authorization': `Bearer ${authStore.token}`,
                  'Accept': 'application/json',
                },
                onerror: (response) => {
                  console.error('FilePond revert error:', response);
                  swalMixin.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Could not revert file. Please try again later.',
                  })
                },
            },
            load: (source, load, error, progress, abort, headers) => {
                fetch(source)
                    .then(res => res.blob())
                    .then(load)
                    .catch(error);
            },
        };
    });

    return { filePondServerOptions };
}
