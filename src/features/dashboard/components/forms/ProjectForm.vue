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
          <label class="block text-sm font-medium mb-1">Status</label>
          <input v-model="form.status" type="text" class="input-field w-full" />
          <ErrorDisplay :errors="errors.status" />
        </div>
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1">Short Description</label>
        <textarea v-model="form.short_description" rows="3" class="input-field w-full"></textarea>
        <div class="flex justify-end items-center gap-2 mt-2">
            <ButtonSpinner
              v-if="form.short_description && form.short_description.length >= 5"
              @click.prevent="enhanceShortDescription"
              :loading="isEnhancingShort"
              class="btn btn-secondary"
            >
              Enhance with AI
            </ButtonSpinner>
        </div>
        <ErrorDisplay :errors="errors.short_description" />
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1">Full Description</label>
        <textarea v-model="form.description" rows="6" class="input-field w-full"></textarea>
        <div class="flex justify-end items-center gap-2 mt-2">
            <ButtonSpinner
              v-if="form.description && form.description.length >= 5"
              @click.prevent="enhanceFullDescription"
              :loading="isEnhancingFull"
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

    <!-- Technologies -->
    <div class="p-4 rounded-lg card">
      <h3 class="mb-4 text-lg font-semibold">Technologies</h3>
      <MultiSelectInput v-model="form.technologies" :options="techOptions" value-prop="id" label="name"
        track-by="name" />
      <ErrorDisplay :errors="errors.technologies" />
    </div>

    <!-- Images -->
    <div class="p-4 rounded-lg card filepond-themed">
      <h3 class="mb-4 text-lg font-semibold">Images</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium mb-1">Thumbnail</label>
          <FilePond
              ref="thumbnailPond"
              name="filepond"
              label-idle="Thumbnail"
              :allow-multiple="false"
              :accepted-file-types="acceptedFiles.image"
              :server="filePondServerOptions"
              :files="initialFiles.thumbnail"
          />
          <ErrorDisplay :errors="errors.thumbnail" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Gallery Images</label>
          <FilePond
              ref="galleryPond"
              name="filepond"
              label-idle="Drag & Drop Gallery Images"
              :allow-multiple="true"
              :accepted-file-types="acceptedFiles.image"
              :server="filePondServerOptions"
              :files="initialFiles.gallery"
          />
          <ErrorDisplay :errors="errors.gallery_images" />
        </div>
      </div>
    </div>

    <!-- Links -->
    <div class="p-4 rounded-lg card">
      <h3 class="mb-4 text-lg font-semibold">URLs & Links</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-sm font-medium mb-1">Project URL</label>
          <input v-model="form.project_url" type="url" class="input-field w-full" placeholder="https://example.com" />
          <ErrorDisplay :errors="errors.project_url" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Repository URL</label>
          <input v-model="form.repository_url" type="url" class="input-field w-full"
            placeholder="https://github.com/user/repo" />
          <ErrorDisplay :errors="errors.repository_url" />
        </div>
      </div>
      <div>
        <h4 class="mb-2 text-md font-semibold">Other Related Links</h4>
        <div v-for="(link, index) in form.links" :key="index" class="flex items-center gap-2 mb-2">
          <input v-model="link.label" type="text" placeholder="Label (e.g., ERD, Flowchart)"
            class="input-field w-1/3" />
          <input v-model="link.url" type="url" placeholder="https://link-to-resource.com" class="input-field flex-grow" />
          <button @click.prevent="removeLink(index)" class="btn btn-danger-outline p-2">&times;</button>
        </div>
        <button @click.prevent="addLink" class="btn btn-secondary-outline mt-2">Add Link</button>
        <ErrorDisplay :errors="errors.links" />
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import MultiSelectInput from '@/shared/components/MultiSelectInput.vue';
import Switch from '@/shared/components/SwitchComp.vue';
import ButtonSpinner from '@/shared/components/ButtonSpinner.vue';
import ErrorDisplay from '@/shared/components/ErrorDisplay.vue';
import apiService from '@/services/apiService';
import { useFilePondServer } from '@/lib/filepond/filePondService.js';
import { getAcceptedFileTypes } from '@/shared/constants/fileTypes';
import { storage } from '@/utils/appHelper.js';

// Filepond
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

const props = defineProps({
  project: { type: Object, default: null },
  errors: { type: Object, default: () => ({}) },
});

const emit = defineEmits(['submit']);

const { filePondServerOptions } = useFilePondServer();
const acceptedFiles = { image: getAcceptedFileTypes(['IMAGE']) };

const form = ref({});
const techOptions = ref([]);
const thumbnailPond = ref(null);
const galleryPond = ref(null);
const initialFiles = ref({ thumbnail: [], gallery: [] });
const isEnhancingShort = ref(false);
const isEnhancingFull = ref(false);

const addLink = () => form.value.links.push({ label: '', url: '' });
const removeLink = (index) => form.value.links.splice(index, 1);

const fileMapper = (url) => (url ? [{ source: storage(url), options: { type: 'local' } }] : []);
const multipleFileMapper = (urls) => (urls && urls.length ? urls.map(url => ({ source: storage(url), options: { type: 'local' } })) : []);

onMounted(async () => {
  try {
    const response = await apiService.get('/technologies');
    techOptions.value = response.data.data;
  } catch (error) {
    console.error("Failed to fetch technologies for form:", error);
  }
});

watch(() => props.project, (newVal) => {
  if (newVal) {
    const { thumbnail, thumbnail_url, gallery_images, images, ...rest } = newVal;
    form.value = {
        ...rest,
        technologies: newVal.technologies ? newVal.technologies.map(t => t.id) : [],
        links: newVal.links ? JSON.parse(JSON.stringify(newVal.links)) : [],
    };
    initialFiles.value = {
        thumbnail: fileMapper(thumbnail_url),
        gallery: multipleFileMapper(images),
    };
  } else {
    form.value = {
      title: '', status: '', short_description: '', description: '',
      technologies: [], project_url: '', repository_url: '',
      is_published: true, links: [],
    };
    initialFiles.value = { thumbnail: [], gallery: [] };
  }
}, { immediate: true, deep: true });

const enhanceShortDescription = async () => {
  if (!form.value.short_description || form.value.short_description.length < 5) {
    alert('Short description must be at least 5 characters long to enhance.');
    return;
  }
  isEnhancingShort.value = true;
  try {
    const response = await apiService.post('/ai/enhance-text', { text: form.value.short_description });
    form.value.short_description = response.data.text;
  } catch (error) {
    console.error("Failed to enhance description:", error);
    alert('Could not enhance description. Please check the console.');
  } finally {
    isEnhancingShort.value = false;
  }
};

const enhanceFullDescription = async () => {
  if (!form.value.description || form.value.description.length < 5) {
    alert('Full description must be at least 5 characters long to enhance.');
    return;
  }
  isEnhancingFull.value = true;
  try {
    const response = await apiService.post('/ai/enhance-text', { text: form.value.description });
    form.value.description = response.data.text;
  } catch (error) {
    console.error("Failed to enhance description:", error);
    alert('Could not enhance description. Please check the console.');
  } finally {
    isEnhancingFull.value = false;
  }
};

const handleSubmit = () => {
    const getPondServerId = (pondRef) => pondRef.value?.getFile()?.serverId || null;

  // Get all gallery items - either serverId for new uploads or extract path for existing
  const getPondGalleryItems = (pondRef) => {
    if (!pondRef.value) return [];
    return pondRef.value.getFiles().map(f => {
      if (f.serverId) {
        // New upload - return serverId
        return f.serverId;
      } else if (f.source && typeof f.source === 'string') {
        // Existing file - extract path from URL
        // Source is like "https://api.numenide.id/storage/projects/gallery/xxx.jpg"
        // We need to return just the path part: "projects/gallery/xxx.jpg"
        const url = f.source;
        const storageMatch = url.match(/\/storage\/(.+)$/);
        if (storageMatch) {
          return storageMatch[1];
        }
        // Fallback for other URL patterns
        const pathMatch = url.match(/projects\/gallery\/.+$/);
        return pathMatch ? pathMatch[0] : null;
      }
      return null;
    }).filter(Boolean);
  };

    const payload = {
        ...form.value,
        is_published: form.value.is_published ? 1 : 0,
        links: JSON.stringify(form.value.links),
        thumbnail: getPondServerId(thumbnailPond),
      gallery_images: getPondGalleryItems(galleryPond),
    };

    emit('submit', payload);
};

defineExpose({ handleSubmit });
</script>
