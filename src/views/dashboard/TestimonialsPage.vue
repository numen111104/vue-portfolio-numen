<template>
  <div class="fade-in-down-on-scroll is-visible">
    <div class="flex items-center justify-between mb-6">
      <div>
        <HighlightedTitle unlighter="Testimonials" lighter="Management" />
        <p class="text-brand-text/80 !mx-0 !max-w-full !text-left !text-base">
          Manage what your clients say about you.
        </p>
      </div>
      <button @click="openFormModal()" class="btn btn-primary">
        <span class="flex items-center">
          <IconPlus class="mr-2" />
          Add New
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
              <th scope="col" class="px-6 py-3">Author</th>
              <th scope="col" class="px-6 py-3">Content</th>
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
            <tr v-else-if="testimonials.length === 0">
              <td colspan="4" class="text-center py-8 text-gray-400">No testimonials found.</td>
            </tr>
            <tr v-for="testimonial in testimonials" :key="testimonial.id"
              class="border-b border-brand-light-gray hover:bg-brand-dark/50">
              <td class="px-6 py-4">
                <div class="flex items-center space-x-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img
                        :src="testimonial.author_avatar_url ? testimonial.author_avatar_url : 'https://placehold.co/100x100/000000/FFF?text=AV'"
                        :alt="testimonial.author_name" class="object-cover w-12 h-12 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold text-white">{{ testimonial.author_name }}</div>
                    <div class="text-sm opacity-70">{{ testimonial.author_title }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 max-w-sm">
                <p class="truncate">{{ testimonial.testimonial_text }}</p>
              </td>
              <td class="px-6 py-4">
                <span v-if="testimonial.deleted_at"
                  class="px-2 py-1 text-xs font-medium text-red-400 bg-red-900/50 rounded-full">Deleted</span>
                <span v-else-if="testimonial.is_published"
                  class="px-2 py-1 text-xs font-medium text-green-400 bg-green-900/50 rounded-full">Published</span>
                <span v-else
                  class="px-2 py-1 text-xs font-medium text-yellow-400 bg-yellow-900/50 rounded-full">Draft</span>
              </td>
              <td class="px-6 py-4 text-right space-x-4">
                <template v-if="testimonial.deleted_at">
                  <button @click="openConfirmModal('restore', testimonial)"
                    class="font-medium text-green-400 hover:underline">Restore</button>
                  <button @click="openConfirmModal('forceDelete', testimonial)"
                    class="font-medium text-red-500 hover:underline">Delete Permanently</button>
                </template>
                <template v-else>
                  <button @click="openFormModal(testimonial)"
                    class="font-medium text-blue-400 hover:underline">Edit</button>
                  <button @click="openConfirmModal('delete', testimonial)"
                    class="font-medium text-red-500 hover:underline">Trash</button>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-6">
        <Pagination v-if="meta.links" :meta="meta" @page-change="fetchTestimonials" />
      </div>
    </div>

    <!-- Form Modal -->
    <BaseModal :show="showFormModal" @close="showFormModal = false" modal-class="max-w-2xl">
      <template #header>{{ editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial' }}</template>
      <TestimonialForm ref="testimonialForm" :testimonial="editingTestimonial" :errors="errors"
        @submit="handleFormSubmit" />
      <template #footer>
        <button @click="showFormModal = false" class="btn btn-secondary">Cancel</button>
        <ButtonSpinner @click="testimonialForm?.handleSubmit()" :loading="formLoading" class="btn-primary">Save
        </ButtonSpinner>
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
import swal from '@/utils/swal';
import { useErrorHandler } from '@/composables/useErrorHandler';
import HighlightedTitle from '@/components/ui/HighlightedTitle.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import TestimonialForm from '@/components/dashboard/TestimonialForm.vue';
import ButtonSpinner from '@/components/ui/ButtonSpinner.vue';
import Switch from '@/components/ui/SwitchComp.vue';
import Pagination from '@/components/ui/PaginationComp.vue';
import { IconPlus, IconLoader2 } from '@tabler/icons-vue';

// State
const { errors, processErrors, clearErrors } = useErrorHandler();
const testimonials = ref([]);
const meta = ref({});
const loading = ref(true);
const formLoading = ref(false);
const showTrashed = ref(false);
const showFormModal = ref(false);
const showConfirmModal = ref(false);
const editingTestimonial = ref(null);
const selectedTestimonial = ref(null);
const confirmAction = ref(null);
const confirmText = ref('');
const confirmActionType = ref('');
const testimonialForm = ref(null);

// Computed
const confirmButtonClass = computed(() => {
  if (confirmActionType.value === 'delete' || confirmActionType.value === 'forceDelete') {
    return 'btn-danger';
  }
  return 'btn-primary';
});

// Methods
const fetchTestimonials = async (url = '/admin/testimonials') => {
  loading.value = true;
  try {
    const params = { trashed: showTrashed.value };
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const page = urlParams.get('page');
    if (page) params.page = page;

    const response = await apiService.get('/admin/testimonials',  params );
    testimonials.value = response.data.data;
    meta.value = response.data.meta;
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    swal.fire('Error', 'Could not fetch testimonials.', 'error');
  } finally {
    loading.value = false;
  }
};

const openFormModal = (testimonial = null) => {
  clearErrors();
  editingTestimonial.value = testimonial;
  showFormModal.value = true;
};

const handleFormSubmit = async (formData) => {
  formLoading.value = true;
  clearErrors();

  const url = editingTestimonial.value
    ? `/admin/testimonials/${editingTestimonial.value.id}`
    : '/admin/testimonials';

  // Create a new FormData object for submission
  const submissionData = new FormData();
  for (const key in formData) {
    if (formData[key] !== null && formData[key] !== undefined) {
      submissionData.append(key, formData[key]);
    }
  }

  try {
    const response = await apiService.post(url, submissionData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    if (editingTestimonial.value) {
      const index = testimonials.value.findIndex(t => t.id === editingTestimonial.value.id);
      if (index !== -1) {
        testimonials.value[index] = response.data.data;
      }
    } else {
      testimonials.value.unshift(response.data.data);
      if (testimonials.value.length > meta.value.per_page) {
          testimonials.value.pop();
      }
    }

    showFormModal.value = false;
    swal.fire('Success', `Testimonial ${editingTestimonial.value ? 'updated' : 'created'} successfully!`, 'success');
  } catch (error) {
    processErrors(error);
    if (error.response?.status !== 422) {
      swal.fire('Error', 'An unexpected error occurred.', 'error');
    }
  } finally {
    formLoading.value = false;
  }
};

const openConfirmModal = (actionType, testimonial) => {
  selectedTestimonial.value = testimonial;
  confirmActionType.value = actionType;
  switch (actionType) {
    case 'delete':
      confirmText.value = `Are you sure you want to move '${testimonial.author_name}'s testimonial to trash?`;
      confirmAction.value = () => apiService.destroy(`/admin/testimonials/${testimonial.id}`);
      break;
    case 'restore':
      confirmText.value = `Are you sure you want to restore '${testimonial.author_name}'s testimonial?`;
      confirmAction.value = () => apiService.post(`/admin/testimonials/${testimonial.id}/restore`);
      break;
    case 'forceDelete':
      confirmText.value = `Are you sure you want to permanently delete '${testimonial.author_name}'s testimonial? This action cannot be undone.`;
      confirmAction.value = () => apiService.destroy(`/admin/testimonials/${testimonial.id}/force`);
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
    fetchTestimonials(); // Refresh the list
    swal.fire('Success', `Testimonial from '${selectedTestimonial.value.author_name}' has been processed.`, 'success');
  } catch (error) {
    console.error(`Failed to ${confirmActionType.value} testimonial:`, error);
    swal.fire('Error', 'An error occurred while processing the request.' + error, 'error');
  } finally {
    formLoading.value = false;
  }
};

onMounted(fetchTestimonials);
watch(showTrashed, () => fetchTestimonials());

</script>
