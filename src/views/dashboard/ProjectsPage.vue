<template>
  <div class="fade-in-down-on-scroll is-visible">
    <div class="flex items-center justify-between mb-6">
      <div>
        <HighlightedTitle unlighter="My" lighter="Projects" />
        <p class="text-brand-text/80 !mx-0 !max-w-full !text-left !text-base">
          Manage your projects from here.
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
              <th scope="col" class="px-6 py-3">Thumbnail</th>
              <th scope="col" class="px-6 py-3">Title</th>
              <th scope="col" class="px-6 py-3">Status</th>
              <th scope="col" class="px-6 py-3"><span class="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="4" class="text-center py-8">
                <IconLoader2 class="animate-spin inline-block w-8 h-8" />
              </td>
            </tr>
            <tr v-else-if="projects.length === 0">
              <td colspan="4" class="text-center py-8 text-gray-400">No projects found.</td>
            </tr>
            <tr v-for="project in projects" :key="project.id" class="border-b border-brand-light-gray hover:bg-brand-dark/50">
              <td class="px-6 py-4">
                <img v-if="project.thumbnail_url" :src="`/storage/${project.thumbnail_url}`" :alt="project.title" class="h-10 w-16 object-cover bg-white/10 p-1 rounded-md">
                <div v-else class="h-10 w-16 bg-brand-light-gray rounded-md"></div>
              </td>
              <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap">
                {{ project.title }}
              </th>
              <td class="px-6 py-4">
                 <span v-if="project.deleted_at" class="px-2 py-1 text-xs font-medium text-red-400 bg-red-900/50 rounded-full">Deleted</span>
                <span v-else-if="project.is_published" class="px-2 py-1 text-xs font-medium text-green-400 bg-green-900/50 rounded-full">Published</span>
                <span v-else class="px-2 py-1 text-xs font-medium text-gray-400 bg-gray-700 rounded-full">Draft</span>
              </td>
              <td class="px-6 py-4 text-right space-x-4">
                <template v-if="project.deleted_at">
                  <button @click="openConfirmModal('restore', project)" class="font-medium text-green-400 hover:underline">Restore</button>
                  <button @click="openConfirmModal('forceDelete', project)" class="font-medium text-red-500 hover:underline">Delete Permanently</button>
                </template>
                <template v-else>
                  <button @click="openFormModal(project)" class="font-medium text-blue-400 hover:underline">Edit</button>
                  <button @click="openConfirmModal('delete', project)" class="font-medium text-red-500 hover:underline">Trash</button>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-6">
        <Pagination v-if="meta.links" :meta="meta" @page-change="fetchProjects" />
      </div>
    </div>

    <BaseModal :show="showFormModal" @close="showFormModal = false" modal-class="max-w-4xl">
      <template #header>{{ editingProject ? 'Edit Project' : 'Add New Project' }}</template>
      <ProjectForm ref="projectForm" :project="editingProject" :errors="errors" @submit="handleFormSubmit" />
      <template #footer>
        <button @click="showFormModal = false" class="btn btn-secondary">Cancel</button>
        <ButtonSpinner @click="projectForm?.handleSubmit()" :loading="formLoading" class="btn-primary">Save Project</ButtonSpinner>
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
import Switch from '@/components/ui/Switch.vue';
import Pagination from '@/components/ui/Pagination.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import ProjectForm from '@/components/dashboard/ProjectForm.vue';
import ButtonSpinner from '@/components/ui/ButtonSpinner.vue';
import swal from '@/utils/swal';
import { useErrorHandler } from '@/composables/useErrorHandler';
import { IconPlus, IconLoader2 } from '@tabler/icons-vue';
import HighlightedTitle from '@/components/ui/HighlightedTitle.vue';

// State
const { errors, processErrors, clearErrors } = useErrorHandler();
const projects = ref([]);
const meta = ref({});
const loading = ref(true);
const formLoading = ref(false);
const showTrashed = ref(false);
const showFormModal = ref(false);
const showConfirmModal = ref(false);
const editingProject = ref(null);
const selectedProject = ref(null);
const confirmAction = ref(null);
const confirmText = ref('');
const confirmActionType = ref('');
const projectForm = ref(null);

// Computed
const confirmButtonClass = computed(() => {
  if (confirmActionType.value === 'delete' || confirmActionType.value === 'forceDelete') {
    return 'btn-danger';
  }
  return 'btn-primary';
});

// Methods
const fetchProjects = async (url = '/admin/projects') => {
  loading.value = true;
  try {
    const params = { trashed: showTrashed.value };
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const page = urlParams.get('page');
    if (page) params.page = page;

    const response = await apiService.get('/admin/projects', params);
    projects.value = response.data.data;
    meta.value = response.data.meta;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
  } finally {
    loading.value = false;
  }
};

const openFormModal = (project = null) => {
  clearErrors();
  editingProject.value = project;
  showFormModal.value = true;
};

const handleFormSubmit = async (formData) => {
  formLoading.value = true;
  clearErrors();
  try {
    if (editingProject.value) {
      const response = await apiService.post(`/projects/${editingProject.value.id}`, formData);
      const index = projects.value.findIndex(p => p.id === editingProject.value.id);
      if (index !== -1) projects.value[index] = response.data.data;
    } else {
      const response = await apiService.post('/projects', formData);
      projects.value.unshift(response.data.data);
      if (projects.value.length > meta.value.per_page) projects.value.pop();
    }
    showFormModal.value = false;
    swal.fire('Success', `Project ${editingProject.value ? 'updated' : 'created'} successfully!`, 'success');
  } catch (error) {
    processErrors(error);
    if (error.response?.status !== 422) {
        swal.fire('Error', 'An unexpected error occurred.', 'error');
    }
  } finally {
    formLoading.value = false;
  }
};

const openConfirmModal = (actionType, project) => {
  selectedProject.value = project;
  confirmActionType.value = actionType;
  switch (actionType) {
    case 'delete':
      confirmText.value = `Are you sure you want to move '${project.title}' to trash?`;
      confirmAction.value = () => apiService.destroy(`/projects/${project.id}`);
      break;
    case 'restore':
      confirmText.value = `Are you sure you want to restore '${project.title}'?`;
      confirmAction.value = () => apiService.post(`/projects/${project.id}/restore`);
      break;
    case 'forceDelete':
      confirmText.value = `Are you sure you want to permanently delete '${project.title}'? This action cannot be undone.`;
      confirmAction.value = () => apiService.destroy(`/projects/${project.id}/force`);
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
    fetchProjects();
    swal.fire('Success', `'${selectedProject.value.title}' has been processed successfully.`, 'success');
  } catch (error) {
    console.error(`Failed to ${confirmActionType.value} project:`, error);
    swal.fire('Error', 'An error occurred while processing the request.', 'error');
  } finally {
    formLoading.value = false;
  }
};

onMounted(fetchProjects);
watch(showTrashed, () => fetchProjects());

</script>
