<template>
  <div class="fade-in-down-on-scroll is-visible">
    <div class="flex items-center justify-between mb-6">
      <div>
         <HighlightedTitle unlighter="Tech" lighter="Stacks" />
        <p class="text-brand-text/80 !mx-0 !max-w-full !text-left !text-base">
          Manage your skills and technologies.
        </p>
      </div>
      <button @click="openFormModal()" class="btn btn-primary">
        <span class="flex items-center">
          <IconPlus class="mr-2" />
          Add
        </span>
      </button>
    </div>

    <div class="card-home bg-brand-gray p-6">
      <div class="flex items-center justify-between mb-4">
        <div></div>
        <Switch v-model="showTrashed">Show Trashed</Switch>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full text-sm text-left text-gray-300">
          <thead class="text-xs text-gray-400 uppercase bg-brand-dark/50">
            <tr>
              <th scope="col" class="px-6 py-3">Icon</th>
              <th scope="col" class="px-6 py-3">Name</th>
              <th scope="col" class="px-6 py-3">Category</th>
              <th scope="col" class="px-6 py-3">Status</th>
              <th scope="col" class="px-6 py-3"><span class="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="5" class="text-center py-8">
                <IconLoader2 class="animate-spin inline-block w-8 h-8" />
              </td>
            </tr>
            <tr v-else-if="technologies.length === 0">
              <td colspan="5" class="text-center py-8 text-gray-400">No technologies found.</td>
            </tr>
            <tr v-for="tech in technologies" :key="tech.id"
              class="border-b border-brand-light-gray hover:bg-brand-dark/50">
              <td class="px-6 py-4">
                <img :src="`/storage/${tech.icon_url}`" :alt="tech.name" class="h-10 w-10 object-contain">
              </td>
              <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap">
                {{ tech.name }}
              </th>
              <td class="px-6 py-4">{{ tech.category }}</td>
              <td class="px-6 py-4">
                <span v-if="tech.deleted_at"
                  class="px-2 py-1 text-xs font-medium text-red-400 bg-red-900/50 rounded-full">Deleted</span>
                <span v-else
                  class="px-2 py-1 text-xs font-medium text-green-400 bg-green-900/50 rounded-full">Active</span>
              </td>
              <td class="px-6 py-4 text-right space-x-4">
                <template v-if="tech.deleted_at">
                  <button @click="openConfirmModal('restore', tech)"
                    class="font-medium text-green-400 hover:underline">Restore</button>
                  <button @click="openConfirmModal('forceDelete', tech)"
                    class="font-medium text-red-500 hover:underline">Delete Permanently</button>
                </template>
                <template v-else>
                  <button @click="openFormModal(tech)" class="font-medium text-blue-400 hover:underline">Edit</button>
                  <button @click="openConfirmModal('delete', tech)"
                    class="font-medium text-red-500 hover:underline">Trash</button>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-6">
        <Pagination v-if="meta.links" :meta="meta" @page-change="fetchTechnologies" />
      </div>
    </div>

    <!-- Form Modal -->
    <BaseModal :show="showFormModal" @close="showFormModal = false" modal-class="max-w-2xl">
      <template #header>{{ editingTech ? 'Edit Technology' : 'Add New Technology' }}</template>
      <TechnologyForm ref="techForm" :technology="editingTech" :errors="errors" @submit="handleFormSubmit" />
      <template #footer>
        <button @click="showFormModal = false" class="btn btn-secondary">Cancel</button>
        <ButtonSpinner @click="techForm?.handleSubmit()" :loading="formLoading" class="btn-primary">Save</ButtonSpinner>
      </template>
    </BaseModal>

    <!-- Confirmation Modal -->
    <BaseModal :show="showConfirmModal" @close="showConfirmModal = false">
      <template #header>Confirm Action</template>
      <p>{{ confirmText }}</p>
      <template #footer>
        <button @click="showConfirmModal = false" class="btn btn-secondary">Cancel</button>
        <ButtonSpinner @click="handleConfirm" :loading="formLoading" :class="confirmButtonClass">Confirm</ButtonSpinner>
      </template>
    </BaseModal>

  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import apiService from '@/services/apiService';
import Switch from '@/components/ui/Switch.vue';
import Pagination from '@/components/ui/Pagination.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import TechnologyForm from '@/components/dashboard/TechnologyForm.vue';
import ButtonSpinner from '@/components/ui/ButtonSpinner.vue';
import swal from '@/utils/swal';
import { useErrorHandler } from '@/composables/useErrorHandler';
import { IconPlus, IconLoader2 } from '@tabler/icons-vue';
import HighlightedTitle from '@/components/ui/HighlightedTitle.vue';

// State
const { errors, processErrors, clearErrors } = useErrorHandler();
const technologies = ref([]);
const meta = ref({});
const loading = ref(true);
const formLoading = ref(false);
const showTrashed = ref(false);
const showFormModal = ref(false);
const showConfirmModal = ref(false);
const editingTech = ref(null);
const selectedTech = ref(null);
const confirmAction = ref(null);
const confirmText = ref('');
const confirmActionType = ref('');
const techForm = ref(null);

// Computed
const confirmButtonClass = computed(() => {
  if (confirmActionType.value === 'delete' || confirmActionType.value === 'forceDelete') {
    return 'btn-danger';
  }
  return 'btn-primary';
});

// Methods
const fetchTechnologies = async (url = '/admin/technologies') => {
  loading.value = true;
  try {
    const params = { trashed: showTrashed.value };
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const page = urlParams.get('page');
    if (page) params.page = page;

    const response = await apiService.get('/admin/technologies', params);
    technologies.value = response.data.data;
    meta.value = response.data.meta;
  } catch (error) {
    console.error('Failed to fetch technologies:', error);
  } finally {
    loading.value = false;
  }
};

const openFormModal = (tech = null) => {
  clearErrors();
  editingTech.value = tech;
  showFormModal.value = true;
};

const handleFormSubmit = async (formData) => {
  formLoading.value = true;
  clearErrors();
  try {
    if (editingTech.value) {
      const response = await apiService.post(`/technologies/${editingTech.value.id}`, formData);
      // Replace the item in the array
      const index = technologies.value.findIndex(t => t.id === editingTech.value.id);
      if (index !== -1) {
        technologies.value[index] = response.data.data;
      }
    } else {
      const response = await apiService.post('/technologies', formData);
      // Add the new item to the top of the list
      technologies.value.unshift(response.data.data);
      // If the page is full, remove the last item to keep pagination count correct
      if (technologies.value.length > meta.value.per_page) {
        technologies.value.pop();
      }
    }
    showFormModal.value = false;
    swal.fire('Success', `Technology ${editingTech.value ? 'updated' : 'created'} successfully!`, 'success');
  } catch (error) {
    processErrors(error);
    if (error.response?.status !== 422) {
      swal.fire('Error', 'An unexpected error occurred.', 'error');
    }
  } finally {
    formLoading.value = false;
  }
};

const openConfirmModal = (actionType, tech) => {
  selectedTech.value = tech;
  confirmActionType.value = actionType;
  switch (actionType) {
    case 'delete':
      confirmText.value = `Are you sure you want to move '${tech.name}' to trash?`;
      confirmAction.value = () => apiService.destroy(`/technologies/${tech.id}`);
      break;
    case 'restore':
      confirmText.value = `Are you sure you want to restore '${tech.name}'?`;
      confirmAction.value = () => apiService.post(`/technologies/${tech.id}/restore`);
      break;
    case 'forceDelete':
      confirmText.value = `Are you sure you want to permanently delete '${tech.name}'? This action cannot be undone.`;
      confirmAction.value = () => apiService.destroy(`/technologies/${tech.id}/force`);
      break;
  }
  showConfirmModal.value = true;
};

const handleConfirm = async () => {
  if (!confirmAction.value) return;
  formLoading.value = true;
  try {
    await confirmAction.value();
    showConfirmModal.value = false;
    fetchTechnologies();
    swal.fire('Success', `'${selectedTech.value.name}' has been processed successfully.`, 'success');
  } catch (error) {
    console.error(`Failed to ${confirmActionType.value} technology:`, error);
    swal.fire('Error', 'An error occurred while processing the request.', 'error');
  } finally {
    formLoading.value = false;
  }
};

onMounted(fetchTechnologies);
watch(showTrashed, () => fetchTechnologies());

</script>
