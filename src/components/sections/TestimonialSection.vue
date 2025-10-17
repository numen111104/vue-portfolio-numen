<template>
  <section id="testimonials" class="container px-4 py-12 mx-auto text-white md:px-8 lg:px-16">
    <div class="flex flex-col mb-10 md:flex-row md:justify-between md:items-start">
      <div ref="titleBlock" class="max-w-3xl animate-on-scroll fade-in-left-on-scroll">
        <h2 class="mb-4 text-3xl font-bold text-white md:text-4xl">
          What <span class="text-brand-yellow">They Say</span> About Me
        </h2>
        <p class="text-brand-text/80">
          Listen to what clients and colleagues have to say about my work and dedication.
        </p>
      </div>
      <div class="flex flex-col gap-4 mt-6 md:flex-row md:mt-0">
        <router-link ref="discoverButton" to="/testimonial"
          class="flex items-center justify-between space-x-2 btn btn-primary group animate-on-scroll fade-in-right-on-scroll">
          <span>Discover More</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-5 h-5 transition-transform duration-300 transform group-hover:rotate-45">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </router-link>
        <button ref="addButton" v-if="!hasSubmitted" @click="showTestimonialModal = true"
          class="flex items-center justify-between space-x-2 text-white bg-gray-600 btn hover:bg-gray-700 group animate-on-scroll fade-in-right-on-scroll"
          style="transition-delay: 100ms;">
          <span>Add Testimonial</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <TestimonialCard v-for="(testimonial, index) in testimonials" :key="testimonial.id" :testimonial="testimonial"
        :observe="observe" :delay="index * 100" />
    </div>

    <BaseModal :show="showTestimonialModal" @close="showTestimonialModal = false" modal-id="testimonial-form-modal"
      modal-class="max-w-lg">
      <template #header>Add Your Recommendation</template>
      <form @submit.prevent="handleSubmitTestimonial">
        <div class="mb-4">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-300">Your Name</label>
          <input type="text" id="name" v-model="form.author_name" class="input-field w-full" placeholder="John Doe"
            required />
        </div>
        <div class="mb-4">
          <label for="job" class="block mb-2 text-sm font-medium text-gray-300">Your Job/Title</label>
          <input type="text" id="job" v-model="form.author_title" class="input-field w-full"
            placeholder="Software Engineer at Google" required />
        </div>
        <div class="mb-4 filepond-themed">
          <label for="profile_image" class="block mb-2 text-sm font-medium text-gray-300">Profile Image
            (Optional)</label>
          <FilePond ref="avatarPond" name="author_avatar"
            label-idle="Drag & Drop or <span class='filepond--label-action'>Browse</span>" :allow-multiple="false"
            :accepted-file-types="acceptedFiles" :server="publicFilePondServerOptions" />
        </div>
        <div class="mb-6">
          <label for="testimonial_text" class="block mb-2 text-sm font-medium text-gray-300">Your Recommendation</label>
          <textarea id="testimonial_text" v-model="form.testimonial_text" rows="5" class="input-field w-full"
            placeholder="Share your thoughts about my work..." required></textarea>
        </div>
        <div class="flex justify-end gap-4">
          <button type="button" @click="showTestimonialModal = false" class="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" :disabled="isSubmitting" class="btn btn-primary">
            <span v-if="isSubmitting">Submitting...</span>
            <span v-else>Submit</span>
          </button>
        </div>
      </form>
    </BaseModal>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, inject } from 'vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import swalMixin from '@/utils/swal.js';
import { usePortfolioStore } from '@/stores/portfolio';
import TestimonialCard from '../cards/TestimonialCard.vue';
import { usePublicFilePondServer } from '@/services/publicFilePondService.js'; // Correct import

import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import { getAcceptedFileTypes } from '@/constants/fileTypes';
import apiService from '@/services/apiService';

const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

const portfolioStore = usePortfolioStore();
const testimonials = computed(() => portfolioStore.testimonials);

const { observe } = inject('observer');
const titleBlock = ref(null);
const discoverButton = ref(null);
const addButton = ref(null);

// Use the correct, public-facing filepond server options
const { publicFilePondServerOptions } = usePublicFilePondServer();

onMounted(() => {
  if (titleBlock.value) observe(titleBlock.value);
  if (discoverButton.value) observe(discoverButton.value.$el);
  if (addButton.value) observe(addButton.value);

  if (localStorage.getItem('hasSubmittedTestimonial')) {
    hasSubmitted.value = true;
  }
});

const showTestimonialModal = ref(false);
const hasSubmitted = ref(false);
const form = ref({
  author_name: '',
  author_title: '',
  testimonial_text: '',
});
const avatarPond = ref(null);
const isSubmitting = ref(false);

const acceptedFiles = getAcceptedFileTypes(['IMAGE']);

const handleSubmitTestimonial = async () => {
  isSubmitting.value = true;
  const pondFile = avatarPond.value?.getFile();
  // The serverId from FilePond is a JSON string, so we parse it.
  const serverId = pondFile?.serverId ? JSON.parse(pondFile.serverId) : null;

  const payload = {
    ...form.value,
    author_avatar: serverId,
  };

  try {
    await apiService.post('/testimonials', payload);

    swalMixin.fire({
      title: 'Success!',
      text: 'Your testimonial has been submitted for review. Thank you!',
      icon: 'success',
    });

    localStorage.setItem('hasSubmittedTestimonial', 'true');
    hasSubmitted.value = true;

    form.value = { author_name: '', author_title: '', testimonial_text: '' };
    avatarPond.value?.removeFiles();
    showTestimonialModal.value = false;

  } catch (error) {
    console.error('Failed to submit testimonial:', error);
    const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
    swalMixin.fire({
      title: 'Submission Failed',
      text: `Could not submit your testimonial. ${errorMessage}`,
      icon: 'error',
    });
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.card-home {
  background-color: var(--brand-gray);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.line-clamp-3 {
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
