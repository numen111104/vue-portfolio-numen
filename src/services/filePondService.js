import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

export function useFilePondServer() {
    const authStore = useAuthStore();

    const filePondServerOptions = computed(() => {
        return {
            url: '/api',
            process: {
                url: '/files/process',
                headers: {
                    'Authorization': `Bearer ${authStore.token}`,
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
                    'Authorization': `Bearer ${authStore.token}`,
                },
                onerror: (response) => {
                     console.error('FilePond revert error:', response);
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
