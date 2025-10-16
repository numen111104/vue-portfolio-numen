<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Basic Info -->
    <div class="p-4 rounded-lg card">
      <h3 class="mb-4 text-lg font-semibold">Basic Information</h3>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label class="block text-sm font-medium mb-1">Title</label>
          <input v-model="form.title" type="text" required class="input-field w-full" />
          <ErrorDisplay :errors="errors.title" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Company / Organization</label>
          <input v-model="form.organization_name" type="text" required class="input-field w-full" />
          <ErrorDisplay :errors="errors.organization_name" />
        </div>
      </div>
      <div class="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
        <div>
            <label class="block text-sm font-medium mb-1">Type</label>
            <select v-model="form.type" class="input-field w-full">
                <option>Work</option>
                <option>Education</option>
            </select>
            <ErrorDisplay :errors="errors.type" />
        </div>
        <div>
            <label class="block text-sm font-medium mb-1">Display Order</label>
            <input v-model.number="form.display_order" type="number" class="input-field w-full" />
            <ErrorDisplay :errors="errors.display_order" />
        </div>
      </div>
      <div class="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
          <div>
              <label class="block text-sm font-medium mb-1">Start Date</label>
              <DatePicker v-model="form.start_date" />
              <ErrorDisplay :errors="errors.start_date" />
          </div>
          <div>
              <label class="block text-sm font-medium mb-1">End Date</label>
              <DatePicker v-model="form.end_date" />
              <ErrorDisplay :errors="errors.end_date" />
          </div>
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1">Description</label>
        <textarea v-model="form.description" rows="6" class="input-field w-full"></textarea>
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
      <div class="mt-4">
        <Switch v-model="form.is_published">Published</Switch>
        <ErrorDisplay :errors="errors.is_published" />
      </div>
    </div>

    <!-- Thumbnail -->
    <div class="p-4 rounded-lg card filepond-themed">
        <h3 class="mb-4 text-lg font-semibold">Thumbnail</h3>
        <FilePond
            ref="thumbnailPond"
            name="filepond-thumb"
            label-idle="Thumbnail"
            :allow-multiple="false"
            :accepted-file-types="acceptedFiles.image"
            :server="filePondServerOptions"
            :files="initialFiles.thumbnail"
        />
        <ErrorDisplay :errors="errors.thumbnail" />
    </div>

    <!-- Documentation & Links -->
    <div class="p-4 rounded-lg card">
        <h3 class="mb-4 text-lg font-semibold">Documentation & Links</h3>
        <div class="space-y-4">
            <div v-for="(doc, index) in form.docs_url" :key="doc._id" class="p-3 border rounded-md border-brand-light-gray">
                <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                        <label class="block text-xs font-medium mb-1">Label</label>
                        <input v-model="doc.label" type="text" placeholder="e.g., Live Demo, Source Code" class="input-field w-full" />
                    </div>
                    <div>
                        <label class="block text-xs font-medium mb-1">Type</label>
                        <select v-model="doc.type" class="input-field w-full">
                            <option>Link</option>
                            <option>Image</option>
                            <option>Docs</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-medium mb-1">Icon</label>
                        <input v-model="doc.table_icon" type="text" placeholder="e.g., IconLink, IconPhoto" class="input-field w-full" />
                    </div>
                </div>
                <div class="mt-3">
                    <label class="block text-xs font-medium mb-1">URL / Files</label>
                    <input v-if="doc.type === 'Link'" v-model="doc.url[0]" type="url" placeholder="https://..." class="input-field w-full" />
                    <div v-else class="filepond-themed">
                        <FilePond
                            :ref="el => docPonds[index] = el"
                            :name="`doc-pond-${index}`"
                            label-idle="Drag & Drop File(s)"
                            :allow-multiple="true"
                            :accepted-file-types="doc.type === 'Image' ? acceptedFiles.image : acceptedFiles.docs"
                            :server="filePondServerOptions"
                            :files="initialFiles.docs[index]"
                        />
                    </div>
                </div>
                <div class="text-right mt-2">
                    <button @click.prevent="removeDoc(index)" class="btn btn-danger-outline btn-sm">Remove</button>
                </div>
            </div>
        </div>
        <button @click.prevent="addDoc" class="btn btn-outline mt-4">Add Document/Link</button>
    </div>

  </form>
</template>

<script setup>
import { ref, watch, onBeforeUpdate } from 'vue';
import ErrorDisplay from '@/components/ui/ErrorDisplay.vue';
import Switch from '@/components/ui/SwitchComp.vue';
import DatePicker from '@/components/ui/DatePicker.vue';
import ButtonSpinner from '@/components/ui/ButtonSpinner.vue';
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
  experience: { type: Object, default: null },
  errors: { type: Object, default: () => ({}) },
});

const emit = defineEmits(['submit']);

const { filePondServerOptions } = useFilePondServer();
const acceptedFiles = {
    image: getAcceptedFileTypes(['IMAGE']),
    docs: getAcceptedFileTypes(['DOCUMENT']),
};

const form = ref({});
const thumbnailPond = ref(null);
const docPonds = ref([]);
const initialFiles = ref({ thumbnail: [], docs: [] });
const isEnhancing = ref(false);

onBeforeUpdate(() => { docPonds.value = []; });

const fileMapper = (url) => (url ? [{ source: storage(url), options: { type: 'local' } }] : []);
const multipleFileMapper = (urls) => (urls && urls.length ? urls.map(url => ({ source: storage(url), options: { type: 'local' } })) : []);

watch(() => props.experience, (newVal) => {
  if (newVal) {
    const docs = (newVal.docs_url || []).map(doc => ({ ...doc, _id: crypto.randomUUID() }));
    form.value = { ...newVal, docs_url: docs };

    initialFiles.value = {
        thumbnail: fileMapper(newVal.thumbnail_url),
        docs: docs.map(doc => (doc.type !== 'Link' ? multipleFileMapper(doc.url) : [])),
    };
  } else {
    form.value = {
      title: '', organization_name: '', type: 'Work', start_date: null, end_date: null,
      description: '', display_order: 0, is_published: true, docs_url: [],
    };
    initialFiles.value = { thumbnail: [], docs: [] };
  }
}, { immediate: true, deep: true });

const addDoc = () => {
  form.value.docs_url.push({ _id: crypto.randomUUID(), label: '', type: 'Link', url: [], table_icon: 'IconLink' });
};
const removeDoc = (index) => {
  form.value.docs_url.splice(index, 1);
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
    const getPondServerId = (pondRef) => pondRef.value?.getFile()?.serverId || null;
    const getPondServerIds = (pondRef) => pondRef.value?.getFiles().map(f => f.serverId).filter(id => id) || [];

    const docsPayload = form.value.docs_url.map((doc, index) => {
        let urlValue = doc.url;
        if (doc.type === 'Image' || doc.type === 'Docs') {
            const pond = docPonds.value[index];
            const serverIds = pond ? getPondServerIds({ value: pond }) : [];
            // For simplicity, we replace all images/docs on update.
            // A more complex logic would merge old and new files.
            urlValue = serverIds;
        } else {
            // Ensure URL for Link type is an array with one item
            urlValue = Array.isArray(doc.url) ? doc.url : [doc.url];
        }
        return { ...doc, url: urlValue };
    });

    const payload = {
        ...form.value,
        is_published: form.value.is_published ? 1 : 0,
        thumbnail: getPondServerId(thumbnailPond),
        docs_url: docsPayload,
    };

    emit('submit', payload);
};

defineExpose({ handleSubmit });
</script>
