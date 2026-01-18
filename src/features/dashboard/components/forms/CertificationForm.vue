<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label class="block text-sm font-medium mb-1">Title</label>
            <input v-model="form.title" type="text" required class="input-field w-full" />
            <ErrorDisplay :errors="errors.title" />
        </div>
        <div>
            <label class="block text-sm font-medium mb-1">Issuing Organization</label>
            <input v-model="form.issuing_organization" type="text" required class="input-field w-full" />
            <ErrorDisplay :errors="errors.issuing_organization" />
        </div>
        <div>
            <label class="block text-sm font-medium mb-1">Issue Date</label>
            <input v-model="form.issue_date" type="date" class="input-field w-full" />
            <ErrorDisplay :errors="errors.issue_date" />
        </div>
        <div>
            <label class="block text-sm font-medium mb-1">Credential URL</label>
            <input v-model="form.credential_url" type="url" class="input-field w-full" />
            <ErrorDisplay :errors="errors.credential_url" />
        </div>
        <div>
            <label class="block text-sm font-medium mb-1">Display Order</label>
            <input v-model="form.display_order" type="number" class="input-field w-full" />
            <ErrorDisplay :errors="errors.display_order" />
        </div>
        <div class="flex items-center">
            <Switch v-model="form.is_published" class="mt-4">Published</Switch>
        </div>
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
          :disabled="!form.title"
        >
          Generate with AI
        </ButtonSpinner>
      </div>
      <ErrorDisplay :errors="errors.description" />
    </div>

    <div class="filepond-themed">
      <label class="block text-sm font-medium mb-1">Credential Image</label>
      <FilePond
          ref="imagePond"
          name="filepond"
          label-idle="Drag & Drop or <span class='filepond--label-action'>Browse</span>"
          :allow-multiple="false"
          :accepted-file-types="acceptedFiles"
          :server="filePondServerOptions"
          :files="initialFiles"
      />
      <ErrorDisplay :errors="errors.image" />
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';
import Switch from '@/shared/components/SwitchComp.vue';
import ErrorDisplay from '@/shared/components/ErrorDisplay.vue';
import ButtonSpinner from '@/shared/components/ButtonSpinner.vue';
import { useFilePondServer } from '@/lib/filepond/filePondService.js';
import { getAcceptedFileTypes } from '@/shared/constants/fileTypes';
import apiService from '@/services/apiService';
import swalMixin from '@/lib/sweetalert/swal.js';
import { appHelper } from '@/utils/appHelper.js';

// Filepond
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

const props = defineProps({
  certification: { type: Object, default: null },
  errors: { type: Object, default: () => ({}) },
});

const acceptedFiles = getAcceptedFileTypes(['IMAGE']);
const emit = defineEmits(['submit']);

const { filePondServerOptions } = useFilePondServer();

const form = ref({ is_published: true, description: '' });
const imagePond = ref(null);
const initialFiles = ref([]);
const isGenerating = ref(false);
const isEnhancing = ref(false);

watch(() => props.certification, (newVal) => {
  form.value = { is_published: true, description: '', ...newVal };
  if (newVal && newVal.credential_image_url) {
      initialFiles.value = [{ source: appHelper.url.storage(newVal.credential_image_url), options: { type: 'local' } }];
  } else {
      initialFiles.value = [];
  }
}, { immediate: true, deep: true });

const generateDescription = async () => {
  if (!form.value.title) {
    swalMixin.fire({
      title: 'Missing Title',
      text: 'Please enter a certification title first.',
      icon: 'warning',
    });
    return;
  }
  isGenerating.value = true;
  try {
    const response = await apiService.post('/admin/certifications/generate-description', { title: form.value.title });
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
        try {
            return JSON.parse(file.serverId);
        } catch (e) {
            return file.serverId;
        }
    };

    const payload = {
        ...form.value,
        is_published: form.value.is_published ? 1 : 0,
        image: getPondServerId(imagePond),
    };
    emit('submit', payload);
};

defineExpose({ handleSubmit });
</script>
