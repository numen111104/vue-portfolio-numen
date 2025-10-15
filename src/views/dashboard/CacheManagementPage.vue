<template>
  <div class="fade-in-down-on-scroll is-visible">
    <div class="flex items-center justify-between mb-6">
      <div>
        <HighlightedTitle unlighter="Cache" lighter="Management" />
        <p class="text-brand-text/80 !mx-0 !max-w-full !text-left !text-base">
          Monitor and manage application cache.
        </p>
      </div>
      <ButtonSpinner @click="flushAllCache" :loading="flushing" class="btn-danger">
        <span class="flex items-center">
          <IconTrash class="mr-2" />
          Flush
        </span>
      </ButtonSpinner>
    </div>

    <div class="card-home bg-brand-gray p-6">
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm text-left text-gray-300">
          <thead class="text-xs text-gray-400 uppercase bg-brand-dark/50">
            <tr>
              <th scope="col" class="px-6 py-3">Cache Key</th>
              <th scope="col" class="px-6 py-3">Status</th>
              <th scope="col" class="px-6 py-3">Size</th>
              <th scope="col" class="px-6 py-3"><span class="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="4" class="text-center py-8">
                <IconLoader2 class="animate-spin inline-block w-8 h-8" />
              </td>
            </tr>
            <tr v-else-if="cacheStatuses.length === 0">
              <td colspan="4" class="text-center py-8 text-gray-400">No cache keys found.</td>
            </tr>
            <tr v-for="cache in cacheStatuses" :key="cache.key" class="border-b border-brand-light-gray hover:bg-brand-dark/50">
              <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap">
                {{ cache.key }}
              </th>
              <td class="px-6 py-4">
                <span v-if="cache.exists" class="px-2 py-1 text-xs font-medium text-green-400 bg-green-900/50 rounded-full">Cached</span>
                <span v-else class="px-2 py-1 text-xs font-medium text-gray-400 bg-gray-900/50 rounded-full">Not Cached</span>
              </td>
              <td class="px-6 py-4">{{ formatBytes(cache.size) }}</td>
              <td class="px-6 py-4 text-right space-x-4">
                <button @click="viewCache(cache.key)" class="font-medium text-blue-400 hover:underline" :disabled="!cache.exists">View</button>
                <button @click="deleteCache(cache.key)" class="font-medium text-red-500 hover:underline" :disabled="!cache.exists">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <BaseModal :show="showViewModal" @close="showViewModal = false" modal-class="max-w-4xl">
      <template #header>View Cache: {{ selectedKey }}</template>
      <div class="bg-brand-dark/50 p-4 rounded-md max-h-[60vh] overflow-y-auto">
        <pre class="text-sm text-white">{{ cacheContentView }}</pre>
      </div>
      <template #footer>
        <button @click="showViewModal = false" class="btn btn-secondary">Close</button>
      </template>
    </BaseModal>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import apiService from '@/services/apiService';
import swal from '@/utils/swal';
import HighlightedTitle from '@/components/ui/HighlightedTitle.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import ButtonSpinner from '@/components/ui/ButtonSpinner.vue';
import { IconLoader2, IconTrash } from '@tabler/icons-vue';
import { formatBytes } from '@/utils/formatters';

// State
const cacheStatuses = ref([]);
const loading = ref(true);
const flushing = ref(false);
const showViewModal = ref(false);
const selectedKey = ref(null);
const cacheContent = ref(null);

// Computed
const cacheContentView = computed(() => {
  if (cacheContent.value) {
    return JSON.stringify(cacheContent.value, null, 2);
  }
  return 'Loading...';
});

// Methods
const fetchCacheStatus = async () => {
  loading.value = true;
  try {
    const response = await apiService.get('/admin/cache');
    cacheStatuses.value = response.data;
  } catch (error) {
    console.error("Failed to fetch cache status:", error);
    swal.fire('Error', 'Could not fetch cache status.', 'error');
  } finally {
    loading.value = false;
  }
};

const viewCache = async (key) => {
  selectedKey.value = key;
  cacheContent.value = null;
  showViewModal.value = true;
  try {
    const response = await apiService.get(`/admin/cache/${key}`);
    cacheContent.value = response.data;
  } catch (error) {
    console.error(`Failed to fetch cache content for ${key}:`, error);
    cacheContent.value = { error: 'Could not load cache content.' };
  }
};

const deleteCache = async (key) => {
  const result = await swal.fire({
    title: 'Are you sure?',
    text: `Do you want to delete the cache for key '${key}'?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  });

  if (result.isConfirmed) {
    try {
      const response = await apiService.destroy(`/admin/cache/${key}`);
      swal.fire('Deleted!', response.data.message, 'success');
      fetchCacheStatus();
    } catch (error) {
      console.error(`Failed to delete cache for ${key}:`, error);
      swal.fire('Error', 'Could not delete cache.', 'error');
    }
  }
};

const flushAllCache = async () => {
  const result = await swal.fire({
    title: 'Are you sure?',
    text: 'This will flush the entire application cache. This action might affect performance temporarily.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, flush it!'
  });

  if (result.isConfirmed) {
    flushing.value = true;
    try {
      const response = await apiService.post('/admin/cache/flush');
      swal.fire('Flushed!', response.data.message, 'success');
      fetchCacheStatus();
    } catch (error) {
      console.error("Failed to flush cache:", error);
      swal.fire('Error', 'Could not flush application cache.', 'error');
    } finally {
      flushing.value = false;
    }
  }
};

onMounted(fetchCacheStatus);

</script>
