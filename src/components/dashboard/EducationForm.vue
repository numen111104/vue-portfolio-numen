<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium mb-1">Institution Name</label>
        <input v-model="form.institution_name" type="text" required class="input-field w-full" />
        <ErrorDisplay :errors="errors.institution_name" />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Major</label>
        <input v-model="form.major" type="text" required class="input-field w-full" />
        <ErrorDisplay :errors="errors.major" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium mb-1">Start Date</label>
        <DatePicker v-model="form.start_date" required placeholder="Select start date" />
        <ErrorDisplay :errors="errors.start_date" />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">End Date (leave blank if current)</label>
        <DatePicker v-model="form.end_date" placeholder="Select end date" :clearable="true" />
        <ErrorDisplay :errors="errors.end_date" />
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
      </div>
      <ErrorDisplay :errors="errors.description" />
    </div>

    <div>
        <label class="block text-sm font-medium mb-1">Display Order</label>
        <input v-model.number="form.display_order" type="number" class="input-field w-full" />
        <ErrorDisplay :errors="errors.display_order" />
    </div>

    <div class="filepond-themed filepond-circle">
      <label class="block text-sm font-medium mb-1">Logo</label>
      <FilePond
          ref="logoPond"
          name="filepond"
          label-idle="Logo"
          :allow-multiple="false"
          :accepted-file-types="acceptedFiles.image"
          :server="filePondServerOptions"
          :files="initialFiles.logo"
      />
      <ErrorDisplay :errors="errors.logo" />
    </div>

    <div class="filepond-themed">
      <label class="block text-sm font-medium mb-1">Documentation Images</label>
      <FilePond
          ref="docsPond"
          name="filepond"
          label-idle="Drag & Drop or <span class='filepond--label-action'>Browse</span>"
          :allow-multiple="true"
          :accepted-file-types="acceptedFiles.image"
          :server="filePondServerOptions"
          :files="initialFiles.docs"
      />
      <ErrorDisplay :errors="errors.documentations" />
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';
import ErrorDisplay from '@/components/ui/ErrorDisplay.vue';
import ButtonSpinner from '@/components/ui/ButtonSpinner.vue';
import DatePicker from '@/components/ui/DatePicker.vue';
import { useFilePondServer } from '@/services/filePondService.js';
import { getAcceptedFileTypes } from '@/constants/fileTypes';
import apiService from '@/services/apiService';
import swalMixin from '@/utils/swal.js';
import { storage } from '@/utils/appHelper.js';

// Filepond
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

const props = defineProps({
  education: { type: Object, default: null },
  errors: { type: Object, default: () => ({}) },
});

const emit = defineEmits(['submit']);

const { filePondServerOptions } = useFilePondServer();
const acceptedFiles = { image: getAcceptedFileTypes(['IMAGE']) };

const form = ref({});
const logoPond = ref(null);
const docsPond = ref(null);
const initialFiles = ref({ logo: [], docs: [] });
const isEnhancing = ref(false);
const isGenerating = ref(false); // Added for consistency, though no generate button exists yet

const fileMapper = (url) => (url ? [{ source: storage(url), options: { type: 'local' } }] : []);
const multipleFileMapper = (urls) => (urls && urls.length ? urls.map(url => ({ source: storage(url), options: { type: 'local' } })) : []);

watch(() => props.education, (newVal) => {
  if (newVal) {
    const { logo_url, documentations, ...rest } = newVal;
    form.value = rest;
    initialFiles.value = {
        logo: fileMapper(logo_url),
        docs: multipleFileMapper(documentations),
    };
  } else {
    form.value = {
      institution_name: '', major: '', start_date: '', end_date: '',
      description: '', display_order: 0,
    };
    initialFiles.value = { logo: [], docs: [] };
  }
}, { immediate: true, deep: true });

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
    const getPondServerId = (pondRef) => pondRef.value?.getFile()?.serverId || null;
    const getPondServerIds = (pondRef) => pondRef.value?.getFiles().map(f => f.serverId).filter(id => id) || [];

    const payload = {
        ...form.value,
        logo: getPondServerId(logoPond),
        documentations: getPondServerIds(docsPond),
    };

    emit('submit', payload);
};

defineExpose({ handleSubmit });
</script>
