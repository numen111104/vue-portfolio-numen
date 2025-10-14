<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label class="block text-sm font-medium mb-1">Name</label>
      <input v-model="form.name" type="text" required class="input-field w-full" />
      <ErrorDisplay :errors="errors.name" />
    </div>

    <div>
      <label class="block text-sm font-medium mb-1">Category</label>
      <input v-model="form.category" type="text" class="input-field w-full" />
      <ErrorDisplay :errors="errors.category" />
    </div>

    <div>
      <label class="block text-sm font-medium mb-1">Description</label>
      <textarea v-model="form.description" rows="4" class="input-field w-full"></textarea>
      <div class="flex justify-end items-center gap-2 mt-2">
        <ButtonSpinner
          v-if="form.description && form.description.length >= 5"
          @click.prevent="enhanceDescription"
          :loading="isEnhancing"
          class="btn btn-secondary"
        >
          Enhance with AI
        </ButtonSpinner>
        <ButtonSpinner
          @click.prevent="generateDescription"
          :loading="isGenerating"
          class="btn btn-primary"
          :disabled="!form.name"
        >
          Generate with AI
        </ButtonSpinner>
      </div>
      <ErrorDisplay :errors="errors.description" />
    </div>

    <div class="filepond-themed filepond-circle">
      <label class="block text-sm font-medium mb-1">Icon</label>
      <FilePond
          ref="iconPond"
          name="filepond"
          label-idle="Drag & Drop or <span class='filepond--label-action'>Browse</span>"
          :allow-multiple="false"
          :accepted-file-types="acceptedFiles"
          :server="filePondServerOptions"
          :files="initialFiles"
      />
      <ErrorDisplay :errors="errors.icon" />
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';
import apiService from '@/services/apiService';
import ErrorDisplay from '@/components/ui/ErrorDisplay.vue';
import ButtonSpinner from '@/components/ui/ButtonSpinner.vue';
import { useFilePondServer } from '@/services/filePondService.js';
import swalMixin from '@/utils/swal.js';

// Filepond
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { getAcceptedFileTypes } from '@/constants/fileTypes';
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

const props = defineProps({
  technology: { type: Object, default: null },
  errors: { type: Object, default: () => ({}) },
});
const acceptedFiles = getAcceptedFileTypes(['IMAGE']);

const emit = defineEmits(['submit']);

const { filePondServerOptions } = useFilePondServer();

const form = ref({});
const isGenerating = ref(false);
const isEnhancing = ref(false);

// Filepond refs
const iconPond = ref(null);
const initialFiles = ref([]);

watch(() => props.technology, (newVal) => {
  // The form state should contain ALL data, including the icon_url.
  if (newVal) {
    form.value = { ...newVal };
  } else {
    form.value = { name: '', category: '', description: '' };
  }

  // Set initial files for FilePond separately
  if (newVal && newVal.icon_url) {
      initialFiles.value = [{ source: `/storage/${newVal.icon_url}`, options: { type: 'local' } }];
  } else {
      initialFiles.value = [];
  }
}, { immediate: true, deep: true });

const generateDescription = async () => {
  if (!form.value.name) {
    swalMixin.fire({
      title: 'Missing Name',
      text: 'Please enter a technology name first.',
      icon: 'warning',
    });
    return;
  }
  isGenerating.value = true;
  try {
    const response = await apiService.post('/technologies/generate-description', { name: form.value.name });
    form.value.description = response.data.description;
  } catch (error) {
    console.error("Failed to generate description:", error);
    swalMixin.fire({
      title: 'Generation Failed',
      text: 'Could not generate description. Please check the console for details.',
      icon: 'error',
    });
  } finally {
    isGenerating.value = false;
  }
};

const enhanceDescription = async () => {
  if (!form.value.description || form.value.description.length < 5) {
    swalMixin.fire({
      title: 'Input Too Short',
      text: 'Description must be at least 5 characters long to enhance.',
      icon: 'warning',
    });
    return;
  }
  isEnhancing.value = true;
  try {
    const response = await apiService.post('/ai/enhance-text', { text: form.value.description });
    form.value.description = response.data.text;
  } catch (error) {
    console.error("Failed to enhance description:", error);
    swalMixin.fire({
      title: 'Enhancement Failed',
      text: 'Could not enhance description. Please check the console for details.',
      icon: 'error',
    });
  } finally {
    isEnhancing.value = false;
  }
};

const handleSubmit = () => {
    const getPondServerId = (pondRef) => {
        const file = pondRef.value?.getFile();
        if (!file || !file.serverId) return null;
        // Clean up the serverId from extra quotes if it's a JSON string
        try {
            return JSON.parse(file.serverId);
        } catch (e) {
            return file.serverId;
        }
    };

    const serverId = getPondServerId(iconPond);

    const payload = {
        id: form.value.id,
        name: form.value.name,
        category: form.value.category,
        description: form.value.description,
        // The backend only expects ONE icon field.
        // Its value is either the new serverId or the old path.
        icon_url: serverId ? serverId : form.value.icon_url,
    };

    emit('submit', payload);
};

defineExpose({ handleSubmit });
</script>
