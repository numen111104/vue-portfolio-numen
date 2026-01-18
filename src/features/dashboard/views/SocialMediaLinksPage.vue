<template>
  <div class="fade-in-down-on-scroll is-visible">
    <div class="flex items-center justify-between mb-6">
      <div>
        <HighlightedTitle unlighter="Social Media" lighter="Links" />
        <p class="text-brand-text/80 !mx-0 !max-w-full !text-left !text-base">
          Manage your social media profile links.
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
              <th scope="col" class="px-6 py-3">Platform</th>
              <th scope="col" class="px-6 py-3">URL</th>
              <th scope="col" class="px-6 py-3">Order</th>
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
            <tr v-else-if="links.length === 0">
              <td colspan="5" class="text-center py-8 text-gray-400">No links found.</td>
            </tr>
            <tr v-for="link in links" :key="link.id" class="border-b border-brand-light-gray hover:bg-brand-dark/50">
              <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap">
                {{ link.platform_name }}
              </th>
              <td class="px-6 py-4 truncate max-w-xs">{{ link.url }}</td>
              <td class="px-6 py-4">{{ link.display_order }}</td>
              <td class="px-6 py-4">
                <span v-if="link.deleted_at"
                  class="px-2 py-1 text-xs font-medium text-red-400 bg-red-900/50 rounded-full">Deleted</span>
                <span v-else
                  class="px-2 py-1 text-xs font-medium text-green-400 bg-green-900/50 rounded-full">Active</span>
              </td>
              <td class="px-6 py-4 text-right space-x-4">
                <template v-if="link.deleted_at">
                  <button @click="openConfirmModal('restore', link)"
                    class="font-medium text-green-400 hover:underline">Restore</button>
                  <button @click="openConfirmModal('forceDelete', link)"
                    class="font-medium text-red-500 hover:underline">Delete Permanently</button>
                </template>
                <template v-else>
                  <button @click="openFormModal(link)" class="font-medium text-blue-400 hover:underline">Edit</button>
                  <button @click="openConfirmModal('delete', link)"
                    class="font-medium text-red-500 hover:underline">Trash</button>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-6">
        <Pagination v-if="meta.links" :meta="meta" @page-change="fetchLinks" />
      </div>
    </div>

    <BaseModal :show="showFormModal" @close="showFormModal = false">
      <template #header>{{ editingLink ? 'Edit Link' : 'Add New Link' }}</template>
      <SocialMediaLinkForm ref="linkForm" :link="editingLink" :errors="errors" @submit="handleFormSubmit" />
      <template #footer>
        <button @click="showFormModal = false" class="btn btn-secondary">Cancel</button>
        <ButtonSpinner @click="linkForm?.handleSubmit()" :loading="formLoading" class="btn-primary">Save</ButtonSpinner>
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
import SocialMediaLinkForm from '@/features/dashboard/components/forms/SocialMediaLinkForm.vue';
import ButtonSpinner from '@/shared/components/ButtonSpinner.vue';
import swal from '@/lib/sweetalert/swal';
import { useErrorHandler } from '@/shared/composables/useErrorHandler';
import { IconPlus, IconLoader2 } from '@tabler/icons-vue';
import HighlightedTitle from '@/shared/components/HighlightedTitle.vue';


// State
const { errors, processErrors, clearErrors } = useErrorHandler();
const links = ref([]);
const meta = ref({});
const loading = ref(true);
const formLoading = ref(false);
const showTrashed = ref(false);
const showFormModal = ref(false);
const showConfirmModal = ref(false);
const editingLink = ref(null);
const selectedLink = ref(null);
const confirmAction = ref(null);
const confirmText = ref('');
const confirmActionType = ref('');
const linkForm = ref(null);

// Computed
const confirmButtonClass = computed(() => {
  if (confirmActionType.value === 'delete' || confirmActionType.value === 'forceDelete') {
    return 'btn-danger';
  }
  return 'btn-primary';
});

// Methods
const fetchLinks = async (url = '/admin/social-media-links') => {
  loading.value = true;
  try {
    const params = { trashed: showTrashed.value };
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const page = urlParams.get('page');
    if (page) params.page = page;

    const response = await apiService.get('/admin/social-media-links', params);
    links.value = response.data.data;
    meta.value = response.data.meta;
  } catch (error) {
    console.error('Failed to fetch links:', error);
  } finally {
    loading.value = false;
  }
};

const openFormModal = (link = null) => {
  clearErrors();
  editingLink.value = link;
  showFormModal.value = true;
};

const handleFormSubmit = async (formData) => {
  formLoading.value = true;
  clearErrors();
  try {
    if (editingLink.value) {
      formData.append('_method', 'POST');
      const response = await apiService.post(`/social-media-links/${editingLink.value.id}`, formData);
      const index = links.value.findIndex(l => l.id === editingLink.value.id);
      if (index !== -1) links.value[index] = response.data.data;
    } else {
      const response = await apiService.post('/social-media-links', formData);
      links.value.unshift(response.data.data);
      if (links.value.length > meta.value.per_page) links.value.pop();
    }
    showFormModal.value = false;
    swal.fire('Success', `Link ${editingLink.value ? 'updated' : 'created'} successfully!`, 'success');
  } catch (error) {
    processErrors(error);
    if (error.response?.status !== 422) {
      swal.fire('Error', 'An unexpected error occurred.', 'error');
    }
  } finally {
    formLoading.value = false;
  }
};

const openConfirmModal = (actionType, link) => {
  selectedLink.value = link;
  confirmActionType.value = actionType;
  switch (actionType) {
    case 'delete':
      confirmText.value = `Are you sure you want to move '${link.platform_name}' to trash?`;
      confirmAction.value = () => apiService.destroy(`/social-media-links/${link.id}`);
      break;
    case 'restore':
      confirmText.value = `Are you sure you want to restore '${link.platform_name}'?`;
      confirmAction.value = () => apiService.post(`/social-media-links/${link.id}/restore`);
      break;
    case 'forceDelete':
      confirmText.value = `Are you sure you want to permanently delete '${link.platform_name}'? This action cannot be undone.`;
      confirmAction.value = () => apiService.destroy(`/social-media-links/${link.id}/force`);
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
    fetchLinks();
    swal.fire('Success', `'${selectedLink.value.platform_name}' has been processed successfully.`, 'success');
  } catch (error) {
    console.error(`Failed to ${confirmActionType.value} link:`, error);
    swal.fire('Error', 'An error occurred while processing the request.', 'error');
  } finally {
    formLoading.value = false;
  }
};

onMounted(fetchLinks);
watch(showTrashed, () => fetchLinks());

</script>
