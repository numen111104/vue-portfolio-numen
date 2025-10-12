import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUiStore = defineStore('ui', () => {
  const loadingCount = ref(0);
  const isLoading = computed(() => loadingCount.value > 0);

  function startLoading() {
    loadingCount.value++;
  }

  function stopLoading() {
    if (loadingCount.value > 0) {
      loadingCount.value--;
    }
  }

  return { isLoading, startLoading, stopLoading };
});
