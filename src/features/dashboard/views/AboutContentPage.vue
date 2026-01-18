<template>
  <div class="fade-in-down-on-scroll is-visible">
    <div class="flex items-center justify-between mb-6">
      <div>
        <HighlightedTitle unlighter="About Me" lighter="Content" />
        <p class="text-brand-text/80 !mx-0 !max-w-full !text-left !text-base">
          Manage the content for your "About Me" page.
        </p>
      </div>
    </div>

    <div class="card-home bg-brand-gray p-6">
        <div v-if="loading" class="text-center py-8">
            <IconLoader2 class="animate-spin inline-block w-8 h-8" />
        </div>
        <AboutContentForm v-else ref="aboutForm" :content="aboutContent" :errors="errors" @submit="handleFormSubmit" />
    </div>

    <div class="flex justify-end mt-6">
        <ButtonSpinner @click="aboutForm?.handleSubmit()" :loading="formLoading" class="btn-primary">Save Changes</ButtonSpinner>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiService from '@/services/apiService';
import AboutContentForm from '@/features/dashboard/components/forms/AboutContentForm.vue';
import ButtonSpinner from '@/shared/components/ButtonSpinner.vue';
import swal from '@/lib/sweetalert/swal';
import { useErrorHandler } from '@/shared/composables/useErrorHandler';
import { IconLoader2 } from '@tabler/icons-vue';
import HighlightedTitle from '@/shared/components/HighlightedTitle.vue';

// State
const { errors, processErrors, clearErrors } = useErrorHandler();
const aboutContent = ref(null);
const loading = ref(true);
const formLoading = ref(false);
const aboutForm = ref(null);

// Methods
const fetchAboutContent = async () => {
  loading.value = true;
  try {
    const response = await apiService.get('/about-content');
    aboutContent.value = response.data.data;
  } catch (error) {
    console.error('Failed to fetch about content:', error);
    swal.fire('Error', 'Could not load about content.', 'error');
  } finally {
    loading.value = false;
  }
};

const handleFormSubmit = async (formData) => {
  formLoading.value = true;
  clearErrors();
  try {
    await apiService.post('/admin/about-content', formData);
    swal.fire('Success', 'About content updated successfully!', 'success');
  } catch (error) {
    processErrors(error);
    if (error.response?.status !== 422) {
        swal.fire('Error', 'An unexpected error occurred.', 'error');
    }
  } finally {
    formLoading.value = false;
  }
};

onMounted(fetchAboutContent);

</script>
