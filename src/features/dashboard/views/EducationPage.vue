<template>
  <div class="fade-in-down-on-scroll is-visible">
    <div class="flex items-center justify-between mb-6">
      <div>
        <HighlightedTitle unlighter="My" lighter="Education" />
        <p class="text-brand-text/80 !mx-0 !max-w-full !text-left !text-base">
          Manage your education history from here.
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
              <th scope="col" class="px-6 py-3">Logo</th>
              <th scope="col" class="px-6 py-3">Institution</th>
              <th scope="col" class="px-6 py-3">Major</th>
              <th scope="col" class="px-6 py-3">Period</th>
              <th scope="col" class="px-6 py-3"><span class="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="5" class="text-center py-8">
                <IconLoader2 class="animate-spin inline-block w-8 h-8" />
              </td>
            </tr>
            <tr v-else-if="educations.length === 0">
              <td colspan="5" class="text-center py-8 text-gray-400">No education records found.</td>
            </tr>
            <tr v-for="edu in educations" :key="edu.id" class="border-b border-brand-light-gray hover:bg-brand-dark/50">
              <td class="px-6 py-4">
                <ImageViewer v-if="edu.logo_url" :images="[$storage(edu.logo_url)]" :alt="edu.institution_name" sizeClass="h-12 w-12" />
                <div v-else class="h-10 w-10 bg-brand-light-gray rounded-full"></div>
              </td>
              <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap">
                {{ edu.institution_name }}
              </th>
              <td class="px-6 py-4">{{ edu.major }}</td>
              <td class="px-6 py-4">{{ formatDate(edu.start_date) }} - {{ edu.end_date ? formatDate(edu.end_date) :
                'Present' }}</td>
              <td class="px-6 py-4 text-right space-x-4">
                <template v-if="edu.deleted_at">
                  <button @click="openConfirmModal('restore', edu)"
                    class="font-medium text-green-400 hover:underline">Restore</button>
                  <button @click="openConfirmModal('forceDelete', edu)"
                    class="font-medium text-red-500 hover:underline">Delete Permanently</button>
                </template>
                <template v-else>
                  <button @click="openFormModal(edu)" class="font-medium text-blue-400 hover:underline">Edit</button>
                  <button @click="openConfirmModal('delete', edu)"
                    class="font-medium text-red-500 hover:underline">Trash</button>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-6">
        <Pagination v-if="meta.links" :meta="meta" @page-change="fetchEducations" />
      </div>
    </div>

    <BaseModal :show="showFormModal" @close="showFormModal = false" modal-class="max-w-2xl">
      <template #header>{{ editingEducation ? 'Edit Education' : 'Add New Education' }}</template>
      <EducationForm ref="educationForm" :education="editingEducation" :errors="errors" @submit="handleFormSubmit" />
      <template #footer>
        <button @click="showFormModal = false" class="btn btn-secondary">Cancel</button>
        <ButtonSpinner @click="educationForm?.handleSubmit()" :loading="formLoading" class="btn-primary">Save
        </ButtonSpinner>
      </template>
    </BaseModal>

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
import Switch from '@/shared/components/SwitchComp.vue';
import Pagination from '@/shared/components/PaginationComp.vue';
import BaseModal from '@/shared/components/BaseModal.vue';
import EducationForm from '@/features/dashboard/components/forms/EducationForm.vue';
import ButtonSpinner from '@/shared/components/ButtonSpinner.vue';
import swal from '@/lib/sweetalert/swal';
import { useErrorHandler } from '@/shared/composables/useErrorHandler';
import { IconPlus, IconLoader2 } from '@tabler/icons-vue';
import HighlightedTitle from '@/shared/components/HighlightedTitle.vue';
import ImageViewer from '@/shared/components/ImageViewer.vue';

// State
const { errors, processErrors, clearErrors } = useErrorHandler();
const educations = ref([]);
const meta = ref({});
const loading = ref(true);
const formLoading = ref(false);
const showTrashed = ref(false);
const showFormModal = ref(false);
const showConfirmModal = ref(false);
const editingEducation = ref(null);
const selectedEducation = ref(null);
const confirmAction = ref(null);
const confirmText = ref('');
const confirmActionType = ref('');
const educationForm = ref(null);

// Computed
const confirmButtonClass = computed(() => {
  if (confirmActionType.value === 'delete' || confirmActionType.value === 'forceDelete') {
    return 'btn-danger';
  }
  return 'btn-primary';
});

// Methods
const fetchEducations = async (url = '/admin/educations') => {
  loading.value = true;
  try {
    const params = { trashed: showTrashed.value };
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const page = urlParams.get('page');
    if (page) params.page = page;

    const response = await apiService.get('/admin/educations', { params });
    educations.value = response.data.data;
    meta.value = response.data.meta;
  } catch (error) {
    console.error('Failed to fetch educations:', error);
  } finally {
    loading.value = false;
  }
};

const openFormModal = (education = null) => {
  clearErrors();
  editingEducation.value = education;
  showFormModal.value = true;
};

const handleFormSubmit = async (formData) => {
  formLoading.value = true;
  clearErrors();
  try {
    if (editingEducation.value) {
      const response = await apiService.post(`/educations/${editingEducation.value.id}`, formData);
      const index = educations.value.findIndex(p => p.id === editingEducation.value.id);
      if (index !== -1) educations.value[index] = response.data.data;
    } else {
      const response = await apiService.post('/educations', formData);
      educations.value.unshift(response.data.data);
      if (educations.value.length > meta.value.per_page) educations.value.pop();
    }
    showFormModal.value = false;
    swal.fire('Success', `Education record ${editingEducation.value ? 'updated' : 'created'} successfully!`, 'success');
  } catch (error) {
    processErrors(error);
    if (error.response?.status !== 422) {
      swal.fire('Error', 'An unexpected error occurred.', 'error');
    }
  } finally {
    formLoading.value = false;
  }
};

const openConfirmModal = (actionType, education) => {
  selectedEducation.value = education;
  confirmActionType.value = actionType;
  const institutionName = education.institution_name;
  switch (actionType) {
    case 'delete':
      confirmText.value = `Are you sure you want to move '${institutionName}' to trash?`;
      confirmAction.value = () => apiService.destroy(`/educations/${education.id}`);
      break;
    case 'restore':
      confirmText.value = `Are you sure you want to restore '${institutionName}'?`;
      confirmAction.value = () => apiService.post(`/educations/${education.id}/restore`);
      break;
    case 'forceDelete':
      confirmText.value = `Are you sure you want to permanently delete '${institutionName}'? This action cannot be undone.`;
      confirmAction.value = () => apiService.destroy(`/educations/${education.id}/force`);
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
    fetchEducations();
    swal.fire('Success', `'${selectedEducation.value.institution_name}' has been processed successfully.`, 'success');
  } catch (error) {
    console.error(`Failed to ${confirmActionType.value} education:`, error);
    swal.fire('Error', 'An error occurred while processing the request.', 'error');
  } finally {
    formLoading.value = false;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

onMounted(fetchEducations);
watch(showTrashed, () => fetchEducations());

</script>
