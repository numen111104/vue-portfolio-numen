<template>
  <div>
    <div class="animate-page-load load-delay-1">
      <HighlightedTitle unlighter="Dashboard" lighter="Analytics Overview" />
      <p class="text-brand-text/80 !mx-0 !max-w-full !text-left !text-base">
        An overview of your website's traffic and security.
      </p>
    </div>

    <div class="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main column -->
      <div class="lg:col-span-2">
        <div class="card-home animate-page-load bg-brand-gray p-6" style="animation-delay: 0.3s">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h4 class="font-semibold text-white mb-2 sm:mb-0">API Hits Over Time</h4>
            <select v-model="chartPeriod" @change="fetchChartData" class="input-field bg-brand-light-gray w-full sm:w-auto">
              <option value="day">Daily</option>
              <option value="month">Monthly</option>
              <option value="year">Yearly</option>
            </select>
          </div>
          <apexchart type="area" height="350" :options="chartOptions" :series="chartSeries"></apexchart>
        </div>
      </div>

      <!-- Side column -->
      <div class="animate-page-load space-y-6" style="animation-delay: 0.1s">
        <div class="card-home bg-brand-gray p-6">
          <h4 class="mb-2 font-semibold text-gray-400">Total Hits</h4>
          <p class="text-3xl font-bold text-white">{{ summary.total_hits ?? 'N/A' }}</p>
        </div>
        <div class="card-home bg-brand-gray p-6">
          <h4 class="mb-2 font-semibold text-gray-400">Unique Visitors</h4>
          <p class="text-3xl font-bold text-white">{{ summary.unique_visitors ?? 'N/A' }}</p>
        </div>
        <div class="card-home bg-brand-gray p-6">
          <h4 class="mb-2 font-semibold text-gray-400">Hits Today</h4>
          <p class="text-3xl font-bold text-white">{{ summary.hits_today ?? 'N/A' }}</p>
        </div>
      </div>
    </div>

    <!-- Recent Hits Table -->
    <div class="mt-6 card-home animate-page-load bg-brand-gray p-6" style="animation-delay: 0.4s">
      <h4 class="mb-4 font-semibold text-white">Recent API Hits</h4>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm text-left text-gray-300">
          <thead class="text-xs text-gray-400 uppercase bg-brand-dark/50">
            <tr>
              <th scope="col" class="px-6 py-3">IP Address</th>
              <th scope="col" class="px-6 py-3">Location</th>
              <th scope="col" class="px-6 py-3">Action</th>
              <th scope="col" class="px-6 py-3">User</th>
              <th scope="col" class="px-6 py-3">Time</th>
              <th scope="col" class="px-6 py-3"><span class="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
             <tr v-if="loadingHits">
              <td colspan="6" class="text-center py-8">
                <IconLoader2 class="animate-spin inline-block w-8 h-8" />
              </td>
            </tr>
            <tr v-else-if="apiHits.length === 0">
              <td colspan="6" class="text-center py-8 text-gray-400">No recent hits found.</td>
            </tr>
            <tr v-for="hit in apiHits" :key="hit.id" class="border-b border-brand-light-gray hover:bg-brand-dark/50">
              <td class="px-6 py-4 font-medium text-white">{{ hit.ip_address }}</td>
              <td class="px-6 py-4">{{ hit.location }}</td>
              <td class="px-6 py-4 truncate max-w-xs" :title="hit.action">{{ hit.action.split('@')[1] || hit.action.split('\\').pop() }}</td>
              <td class="px-6 py-4">{{ hit.user?.username || 'Guest' }}</td>
              <td class="px-6 py-4">{{ new Date(hit.created_at).toLocaleString() }}</td>
              <td class="px-6 py-4 text-right">
                <button @click="openConfirmModal(hit.ip_address)" class="font-medium text-red-500 hover:underline">Block IP</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <BaseModal :show="showConfirmModal" @close="showConfirmModal = false">
      <template #header>Confirm Action</template>
      <p>{{ confirmText }}</p>
      <template #footer>
        <button @click="showConfirmModal = false" class="btn btn-secondary">Cancel</button>
        <ButtonSpinner @click="handleConfirm" :loading="formLoading" class="btn-danger">Confirm</ButtonSpinner>
      </template>
    </BaseModal>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import HighlightedTitle from '@/components/ui/HighlightedTitle.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import ButtonSpinner from '@/components/ui/ButtonSpinner.vue';
import apiService from '@/services/apiService';
import swal from '@/utils/swal';
import VueApexCharts from 'vue3-apexcharts';
import { IconLoader2 } from '@tabler/icons-vue';

const apexchart = VueApexCharts;

// State
const summary = ref({});
const apiHits = ref([]);
const chartPeriod = ref('day');
const chartSeries = ref([{ name: 'API Hits', data: [] }]);
const loadingHits = ref(true);
const formLoading = ref(false);
const showConfirmModal = ref(false);
const confirmText = ref('');
const ipToBlock = ref(null);

const chartOptions = computed(() => ({
  chart: {
    type: 'area',
    height: 350,
    zoom: {
      enabled: false
    },
    toolbar: {
      show: false
    },
    foreColor: '#9CA3AF'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    type: 'datetime',
    categories: [],
  },
  yaxis: {
    labels: {
      formatter: (val) => { return val.toFixed(0) }
    }
  },
  tooltip: {
    x: {
      format: 'dd MMM yyyy'
    },
  },
  grid: {
    borderColor: '#374151',
  },
  theme: {
    mode: 'dark'
  }
}));

const fetchSummary = async () => {
  try {
    const response = await apiService.get('/admin/analytics/summary');
    summary.value = response.data;
  } catch (error) {
    console.error('Failed to fetch summary:', error);
  }
};

const fetchApiHits = async () => {
  loadingHits.value = true;
  try {
    const response = await apiService.get('/admin/analytics/hits');
    apiHits.value = response.data.data;
  } catch (error) {
    console.error('Failed to fetch API hits:', error);
  } finally {
    loadingHits.value = false;
  }
};

const fetchChartData = async () => {
  try {
    const response = await apiService.get(`/admin/analytics/hits-by-period?period=${chartPeriod.value}`);
    const data = response.data;
    const categories = data.map(item => new Date(item.date).getTime());
    const seriesData = data.map(item => item.hits);

    chartSeries.value = [{ name: 'API Hits', data: seriesData }];
    // A bit of a hack to force ApexCharts to re-render with new categories
    chartOptions.value.xaxis.categories = []; 
    setTimeout(() => {
        chartOptions.value.xaxis.categories = categories;
    }, 0);

  } catch (error) {
    console.error('Failed to fetch chart data:', error);
  }
};

const openConfirmModal = (ip) => {
  ipToBlock.value = ip;
  confirmText.value = `Are you sure you want to block the IP address: ${ip}? This may prevent legitimate users from accessing the site.`;
  showConfirmModal.value = true;
};

const handleConfirm = async () => {
  formLoading.value = true;
  try {
    await apiService.post('/admin/blocked-ips', { ip_address: ipToBlock.value, reason: 'Blocked from dashboard' });
    swal.fire('Blocked!', `IP address ${ipToBlock.value} has been blocked.`, 'success');
    // Optional: remove the hit from the list
    apiHits.value = apiHits.value.filter(hit => hit.ip_address !== ipToBlock.value);
  } catch (error) {
    swal.fire('Error', `Could not block IP address ${ipToBlock.value}. It might already be blocked.`, 'error');
  } finally {
    formLoading.value = false;
    showConfirmModal.value = false;
  }
};

onMounted(() => {
  fetchSummary();
  fetchApiHits();
  fetchChartData();
});

</script>

<style scoped>
.card-home {
  background-color: var(--brand-gray);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>