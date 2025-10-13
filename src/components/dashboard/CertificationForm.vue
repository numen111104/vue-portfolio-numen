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
      <div class="relative">
        <textarea v-model="form.description" rows="4" class="input-field w-full pr-28"></textarea>
        <button @click.prevent="generateDescription" :disabled="isGenerating" class="btn btn-secondary absolute top-2 right-2">
          <span v-if="isGenerating">Generating...</span>
          <span v-else>Generate AI</span>
        </button>
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
import Switch from '@/components/ui/Switch.vue';
import ErrorDisplay from '@/components/ui/ErrorDisplay.vue';
import { useFilePondServer } from '@/services/filePondService.js';
import { getAcceptedFileTypes } from '@/constants/fileTypes';
import apiService from '@/services/apiService';

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

watch(() => props.certification, (newVal) => {
  form.value = { is_published: true, description: '', ...newVal };
  if (newVal && newVal.credential_image_url) {
      initialFiles.value = [{ source: `/storage/${newVal.credential_image_url}`, options: { type: 'local' } }];
  } else {
      initialFiles.value = [];
  }
}, { immediate: true, deep: true });

const generateDescription = async () => {
  if (!form.value.title) {
    alert('Please enter a certification title first.');
    return;
  }
  isGenerating.value = true;
  try {
    const response = await apiService.post('/admin/certifications/generate-description', { title: form.value.title });
    form.value.description = response.data.description;
  } catch (error) {
    console.error("Failed to generate description:", error);
    alert('Could not generate description. Please check the console.');
  } finally {
    isGenerating.value = false;
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
