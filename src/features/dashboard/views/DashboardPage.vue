<template>
  <div>
    <div class="animate-page-load load-delay-1">
      <HighlightedTitle unlighter="Welcome Back," lighter="Here is Your Dashboard" />
      <p class="text-brand-text/80 mx-0! max-w-full! text-left! text-base!">
        A complete overview of your portfolio's analytics, content, and system health.
      </p>
    </div>

    <div v-if="loading" class="text-center py-24">
      <IconLoader2 class="animate-spin inline-block w-12 h-12 text-brand-yellow" />
      <p class="mt-4 text-gray-400">Loading dashboard data...</p>
    </div>

    <div v-else class="mt-6 space-y-12">
      <!-- Area 1: Visitor & Engagement Analytics -->
      <section class="animate-page-load load-delay-2">
        <h2 class="text-2xl font-bold text-white mb-4">Visitor & Engagement Analytics</h2>
        <!-- KPI Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="card-home bg-brand-gray p-6">
            <h4 class="mb-2 font-semibold text-gray-400">Total Visits (30 Days)</h4>
            <p class="text-4xl font-bold text-white">{{ data.analytics.total_hits_30d ?? 'N/A' }}</p>
          </div>
          <div class="card-home bg-brand-gray p-6">
            <h4 class="mb-2 font-semibold text-gray-400">Unique Visitors (30 Days)</h4>
            <p class="text-4xl font-bold text-white">{{ data.analytics.unique_visitors_30d ?? 'N/A' }}</p>
          </div>
          <div class="card-home bg-brand-gray p-6">
            <h4 class="mb-2 font-semibold text-gray-400">Hits Today</h4>
            <p class="text-4xl font-bold text-white">{{ data.analytics.hits_today ?? 'N/A' }}</p>
          </div>
        </div>
        <!-- Charts -->
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
          <div class="lg:col-span-3 card-home bg-brand-gray p-6">
            <h4 class="font-semibold text-white mb-4">Daily Visit Trend (30 Days)</h4>
            <apexchart type="area" height="350" :options="dailyVisitsChart.options" :series="dailyVisitsChart.series">
            </apexchart>
          </div>
          <div class="lg:col-span-2 card-home bg-brand-gray p-6">
            <h4 class="font-semibold text-white mb-4">Device Sources</h4>
            <apexchart type="donut" height="350" :options="deviceSourceChart.options"
              :series="deviceSourceChart.series"></apexchart>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div class="card-home bg-brand-gray p-6">
            <h4 class="font-semibold text-white mb-4">Top 5 Popular Pages</h4>
            <apexchart type="bar" height="350" :options="popularPagesChart.options" :series="popularPagesChart.series">
            </apexchart>
          </div>
          <div class="card-home bg-brand-gray p-6">
            <h4 class="font-semibold text-white mb-4">Top Visitor Locations</h4>
            <apexchart type="bar" height="350" :options="visitorLocationChart.options"
              :series="visitorLocationChart.series"></apexchart>
          </div>
        </div>
      </section>

      <!-- Area 2: Content Summary -->
      <section class="animate-page-load load-delay-3">
        <h2 class="text-2xl font-bold text-white mb-4">Content Summary</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="card-home bg-brand-gray p-6">
            <h4 class="mb-2 font-semibold text-gray-400">Published Projects</h4>
            <p class="text-4xl font-bold text-white">{{ data.content.published_projects ?? 'N/A' }}</p>
          </div>
          <div class="card-home bg-brand-gray p-6">
            <h4 class="mb-2 font-semibold text-gray-400">Total Technologies</h4>
            <p class="text-4xl font-bold text-white">{{ data.content.total_technologies ?? 'N/A' }}</p>
          </div>
          <div class="card-home bg-brand-gray p-6">
            <h4 class="mb-2 font-semibold text-gray-400">Testimonials Awaiting Approval</h4>
            <p class="text-4xl font-bold text-white">{{ data.content.pending_testimonials_count ?? 'N/A' }}</p>
          </div>
        </div>
        <div v-if="data.content.pending_testimonials_count > 0" class="mt-6 card-home bg-brand-gray p-6">
          <h4 class="font-semibold text-white mb-4">Testimonials for Review</h4>
          <div class="overflow-x-auto">
            <table class="min-w-full text-sm text-left text-gray-300">
              <thead class="text-xs text-gray-400 uppercase bg-brand-dark/50">
                <tr>
                  <th class="px-6 py-3">Author</th>
                  <th class="px-6 py-3">Testimonial</th>
                  <th class="px-6 py-3"><span class="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="testimonial in data.content.testimonials_for_review" :key="testimonial.id"
                  class="border-b border-brand-light-gray hover:bg-brand-dark/50">
                  <td class="px-6 py-4 font-medium text-white">{{ testimonial.author_name }}</td>
                  <td class="px-6 py-4 truncate max-w-md">{{ testimonial.testimonial_text }}</td>
                  <td class="px-6 py-4 text-right">
                    <button @click="publishTestimonial(testimonial.id)" class="btn btn-sm btn-primary">Publish</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Area 3: System Health & Security -->
      <section class="animate-page-load load-delay-4">
        <h2 class="text-2xl font-bold text-white mb-4">System Health & Security</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <div class="card-home bg-brand-gray p-6">
            <h4 class="mb-2 font-semibold text-gray-400">Failed Jobs</h4>
            <p class="text-4xl font-bold" :class="data.health.failed_jobs > 0 ? 'text-red-500' : 'text-white'">{{
              data.health.failed_jobs ?? 'N/A' }}</p>
          </div>
          <div class="card-home bg-brand-gray p-6">
            <h4 class="mb-2 font-semibold text-gray-400">Blocked IPs</h4>
            <p class="text-4xl font-bold text-white">{{ data.health.blocked_ips ?? 'N/A' }}</p>
          </div>
        </div>
        <div class="mt-6 card-home bg-brand-gray p-6">
          <h4 class="font-semibold text-white mb-4">Recent Activity Log</h4>
          <div class="overflow-x-auto">
            <table class="min-w-full text-sm text-left text-gray-300">
              <thead class="text-xs text-gray-400 uppercase bg-brand-dark/50">
                <tr>
                  <th class="px-6 py-3">IP Address</th>
                  <th class="px-6 py-3">Action</th>
                  <th class="px-6 py-3">Device</th>
                  <th class="px-6 py-3">Time</th>
                  <th class="px-6 py-3"><span class="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="hit in data.health.recent_hits" :key="hit.id"
                  class="border-b border-brand-light-gray hover:bg-brand-dark/50">
                  <td class="px-6 py-4 font-medium text-white">{{ hit.ip_address }}</td>
                  <td class="px-6 py-4 truncate max-w-sm" :title="hit.action">{{ hit.action.split('@')[1] ||
                    hit.action.split('\\').pop() }}</td>
                  <td class="px-6 py-4">{{ hit.device }}</td>
                  <td class="px-6 py-4">{{ new Date(hit.created_at).toLocaleString() }}</td>
                  <td class="px-6 py-4 text-right space-x-4">
                    <button @click="showDetails(hit)" class="font-medium text-blue-400 hover:underline">View</button>
                    <button @click="blockIp(hit.ip_address)" class="font-medium text-red-500 hover:underline">Block
                      IP</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
    <ActivityLogDetailModal :show="showActivityDetailModal" :hit="selectedHit"
      @close="showActivityDetailModal = false" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import HighlightedTitle from '@/shared/components/HighlightedTitle.vue';
import apiService from '@/services/apiService';
import swal from '@/lib/sweetalert/swal';
import VueApexCharts from 'vue3-apexcharts';
import { IconLoader2 } from '@tabler/icons-vue';
import ActivityLogDetailModal from '@/features/dashboard/components/forms/ActivityLogDetailModal.vue';

const apexchart = VueApexCharts;

// State
const loading = ref(true);
const data = ref(null);
const showActivityDetailModal = ref(false);
const selectedHit = ref(null);

const baseChartOptions = {
  chart: { zoom: { enabled: false }, toolbar: { show: false }, foreColor: '#dfff00', background: 'transparent' },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth' },
  grid: { borderColor: '#374151' },
  theme: { mode: 'dark' },
  tooltip: { theme: 'dark' }
};

/**
 * Utility kecil untuk menjamin array numerik valid
 */
const toNumberArray = (arr, key) => {
  if (!Array.isArray(arr)) return [];
  return arr.map(item => {
    const val = Number(item?.[key]);
    return Number.isFinite(val) ? val : 0;
  });
};

/**
 * Daily Visits Chart (Area Chart)
 * ----------------------------------------
 * Menampilkan tren kunjungan harian dalam 30 hari terakhir
 */
const dailyVisitsChart = computed(() => {
  if (!data.value || !data.value.analytics?.daily_visits) {
    return { series: [], options: {} };
  }

  const dailyVisits = data.value.analytics.daily_visits;
  const seriesData = toNumberArray(dailyVisits, 'hits');
  const categories = dailyVisits.map(item => new Date(item.date).getTime());

  return {
    series: [
      { name: 'Visits', data: seriesData }
    ],
    options: {
      ...baseChartOptions,
      chart: { ...baseChartOptions.chart, type: 'area' },
      xaxis: {
        type: 'datetime',
        categories
      },
      tooltip: {
        x: { format: 'dd MMM yyyy' },
        y: {
          formatter: val => `${val} hits`
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [0, 90, 100]
        }
      }
    }
  };
});

/**
 * Device Source Chart (Donut Chart)
 * ----------------------------------------
 * Menampilkan perbandingan pengguna Desktop vs Mobile, dsb.
 */
const deviceSourceChart = computed(() => {
  if (!data.value || !data.value.analytics?.device_sources) {
    return { series: [], options: {} };
  }

  const deviceSources = data.value.analytics.device_sources;
  const seriesData = toNumberArray(deviceSources, 'count');
  const labels = deviceSources.map(item => item.device || 'Unknown');

  return {
    series: seriesData,
    options: {
      ...baseChartOptions,
      chart: {
        ...baseChartOptions.chart,
        type: 'donut'
      },
      labels,
      legend: {
        position: 'bottom',
        labels: { colors: '#d1d5db' },
        fontSize: '14px'
      },
      tooltip: {
        y: {
          formatter: val => `${val} users`
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            labels: {
              show: true,
              name: { color: '#f9fafb' },
              value: {
                color: '#fbbf24',
                formatter: val => `${val}`
              },
              total: {
                show: true,
                label: 'Total',
                color: '#d1d5db',
                formatter: w => {
                  const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                  return total.toLocaleString();
                }
              }
            }
          }
        }
      }
    }
  };
});

const popularPagesChart = computed(() => {
  if (!data.value) return { options: {}, series: [] };
  const seriesData = data.value.analytics.popular_pages.map(item => item.count);
  const categories = data.value.analytics.popular_pages.map(item => item.action.split('\\').pop().replace('Controller', ''));
  return {
    series: [{ name: 'Hits', data: seriesData }],
    options: {
      ...baseChartOptions,
      chart: { ...baseChartOptions.chart, type: 'bar' },
      xaxis: { categories: categories },
      plotOptions: { bar: { horizontal: true, borderRadius: 4 } },
    }
  };
});

const visitorLocationChart = computed(() => {
  if (!data.value || !data.value.analytics || !data.value.analytics.visitor_locations) {
    return { options: {}, series: [] };
  }
  const seriesData = data.value.analytics.visitor_locations.map(item => item.count);
  const categories = data.value.analytics.visitor_locations.map(item => item.location);
  return {
    series: [{ name: 'Visitors', data: seriesData }],
    options: {
      ...baseChartOptions,
      chart: { ...baseChartOptions.chart, type: 'bar' },
      xaxis: { categories: categories },
      plotOptions: { bar: { horizontal: true, borderRadius: 4 } },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " visitors"
          }
        }
      }
    }
  };
});

const fetchData = async () => {
  loading.value = true;
  try {
    const response = await apiService.get('/admin/dashboard');
    data.value = response.data;
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    swal.fire('Error', 'Could not load dashboard data.', 'error');
  } finally {
    loading.value = false;
  }
};

const publishTestimonial = async (id) => {
  try {
    // Using the new dedicated endpoint for a safe partial update
    await apiService.post(`/admin/testimonials/${id}/publish`, { is_published: true });
    swal.fire('Published!', 'The testimonial has been published.', 'success');
    fetchData(); // Refresh all dashboard data
  } catch (error) {
    console.error('Failed to publish testimonial:', error);
    swal.fire('Error', 'Could not publish the testimonial.', 'error');
  }
};

const blockIp = async (ip) => {
  const result = await swal.fire({
    title: 'Block IP?',
    text: `Are you sure you want to block ${ip}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, block it!',
    confirmButtonColor: '#ef4444',
    cancelButtonText: 'Cancel'
  });

  if (result.isConfirmed) {
    try {
      await apiService.post('/admin/blocked-ips', { ip_address: ip, reason: 'Blocked from dashboard' });
      swal.fire('Blocked!', `IP address ${ip} has been blocked.`, 'success');
      fetchData(); // Refresh data
    } catch (error) {
      swal.fire('Error', `Could not block IP. It might already be blocked. Error: ${error.message}`, 'error');
    }
  }
};

const showDetails = (hit) => {
  selectedHit.value = hit;
  showActivityDetailModal.value = true;
};

onMounted(fetchData);

</script>
