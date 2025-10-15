<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Bio Section -->
    <div>
      <label for="bio-textarea" class="block text-sm font-medium mb-1">Bio</label>
      <textarea id="bio-textarea" v-model="form.bio" rows="6" class="input-field w-full"></textarea>
      <div class="flex justify-end items-center gap-2 mt-2">
        <ButtonSpinner
          v-if="form.bio && form.bio.length >= 5"
          @click.prevent="enhanceBio"
          :loading="isEnhancing"
          class="btn btn-secondary"
        >
          Enhance with AI
        </ButtonSpinner>
        <ButtonSpinner
          @click.prevent="generateBio"
          :loading="isGenerating"
          class="btn btn-primary"
        >
          Generate with AI
        </ButtonSpinner>
      </div>
      <ErrorDisplay :errors="errors.bio" />
    </div>

    <!-- Header Images Section -->
    <div>
        <h3 class="text-lg font-medium mb-2">Header Images</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 filepond-themed">
            <div>
                <label class="block text-sm font-medium mb-1">Image 1 (Desktop)</label>
                <FilePond
                    ref="image1Pond"
                    name="filepond"
                    label-idle="Drag & Drop or <span class='filepond--label-action'>Browse</span>"
                    :allow-multiple="false"
                    accepted-file-types="image/png, image/jpeg, image/webp"
                    :server="filePondServerOptions"
                    :files="initialFiles.image1"
                />
                <ErrorDisplay :errors="errors.image_1" />
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Image 2 (Mobile/Secondary)</label>
                <FilePond
                    ref="image2Pond"
                    name="filepond"
                    label-idle="Drag & Drop or <span class='filepond--label-action'>Browse</span>"
                    :allow-multiple="false"
                    :accepted-file-types="acceptedFileTypes"
                    :server="filePondServerOptions"
                    :files="initialFiles.image2"
                />
                <ErrorDisplay :errors="errors.image_2" />
            </div>
        </div>
    </div>

    <!-- Passions Section -->
    <div>
        <h3 class="text-lg font-medium mb-2">Passions</h3>
        <div v-for="(passion, index) in form.passions" :key="index" class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4 p-4 border border-brand-light-gray rounded-lg">
            <div class="md:col-span-1">
                <label class="block text-sm font-medium mb-1">Title</label>
                <input v-model="passion.title" type="text" class="input-field w-full" />
            </div>
            <div class="md:col-span-2">
                <label class="block text-sm font-medium mb-1">Description</label>
                <div class="flex items-center">
                    <input v-model="passion.description" type="text" class="input-field w-full rounded-r-none" />
                    <button @click.prevent="removePassion(index)" class="btn btn-danger h-full rounded-l-none">Remove</button>
                </div>
            </div>
        </div>
        <button @click.prevent="addPassion" class="btn btn-outline">Add Passion</button>
        <ErrorDisplay :errors="errors.passions" />
    </div>

    <!-- Languages Section -->
    <div>
        <h3 class="text-lg font-medium mb-2">Languages</h3>
        <div v-for="(language, index) in form.languages" :key="language._id" class="space-y-4 mb-4 p-4 border border-brand-light-gray rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium mb-1">Language</label>
                    <input v-model="language.name" type="text" class="input-field w-full" />
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Description</label>
                    <input v-model="language.description" type="text" class="input-field w-full" />
                </div>
            </div>
            <div class="filepond-themed filepond-circle">
                <label class="block text-sm font-medium mb-1">Icon</label>
                 <FilePond
                    :ref="el => languagePonds[index] = el"
                    name="filepond"
                    label-idle="Icon"
                    :allow-multiple="false"
                    :accepted-file-types="acceptedFileTypes"
                    :server="filePondServerOptions"
                    :files="initialFiles.languages[index]"
                />
            </div>
            <button @click.prevent="removeLanguage(index)" class="btn btn-danger btn-sm mt-2">Remove Language</button>
        </div>
        <button @click.prevent="addLanguage" class="btn btn-outline">Add Language</button>
        <ErrorDisplay :errors="errors.languages" />
    </div>

  </form>
</template>

<script setup>
import { ref, watch, onBeforeUpdate } from 'vue';
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
  content: { type: Object, default: null },
  errors: { type: Object, default: () => ({}) },
});

const emit = defineEmits(['submit']);

const { filePondServerOptions } = useFilePondServer();

const form = ref({
  bio: '',
  passions: [],
  languages: [],
});

const isGenerating = ref(false);
const isEnhancing = ref(false);

// Filepond refs
const image1Pond = ref(null);
const image2Pond = ref(null);
const languagePonds = ref([]);
const initialFiles = ref({ image1: [], image2: [], languages: [] });
const acceptedFileTypes = getAcceptedFileTypes(['IMAGE']);

onBeforeUpdate(() => {
  languagePonds.value = []; // clear refs before each update
});

// Function to safely parse JSON strings
const safeParse = (jsonString, fallback = []) => {
    try {
        const parsed = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
        return Array.isArray(parsed) ? parsed : fallback;
    } catch (e) {
        console.error("Failed to parse JSON string:", jsonString, e);
        return fallback;
    }
};

const fileMapper = (url) => (url ? [{ source: `/storage/${url}`, options: { type: 'local' } }] : []);

watch(() => props.content, (newVal) => {
  if (newVal) {
    const parsedLanguages = safeParse(newVal.languages).map(lang => ({
        ...lang,
        _id: crypto.randomUUID(), // Add unique ID for stable v-for key
    }));

    form.value = {
        ...form.value,
        bio: newVal.bio || '',
        passions: safeParse(newVal.passions),
        languages: parsedLanguages,
    };

    initialFiles.value = {
        image1: fileMapper(newVal.image_1_url),
        image2: fileMapper(newVal.image_2_url),
        languages: parsedLanguages.map(lang => fileMapper(lang.icon_url))
    }

  } else {
    form.value = { bio: '', passions: [], languages: [] };
    initialFiles.value = { image1: [], image2: [], languages: [] };
  }
}, { immediate: true, deep: true });

const addPassion = () => form.value.passions.push({ title: '', description: '' });
const removePassion = (index) => form.value.passions.splice(index, 1);

const addLanguage = () => form.value.languages.push({
    _id: crypto.randomUUID(),
    name: '',
    description: '',
    icon_url: null
});
const removeLanguage = (index) => form.value.languages.splice(index, 1);

const generateBio = async () => {
  isGenerating.value = true;
  try {
    const response = await apiService.post('/admin/about-content/generate-bio');
    form.value.bio = response.data.bio;
  } catch (error) {
    console.error("Failed to generate bio:", error);
    swalMixin.fire({
      title: 'Generation Failed',
      text: 'Could not generate bio. Please check the console for details.',
      icon: 'error',
    });
  } finally {
    isGenerating.value = false;
  }
};

const enhanceBio = async () => {
  if (!form.value.bio || form.value.bio.length < 5) {
    swalMixin.fire({
      title: 'Input Too Short',
      text: 'Bio must be at least 5 characters long to enhance.',
      icon: 'warning',
    });
    return;
  }
  isEnhancing.value = true;
  try {
    const response = await apiService.post('/ai/enhance-text', { text: form.value.bio });
    form.value.bio = response.data.text;
  } catch (error) {
    console.error("Failed to enhance bio:", error);
    swalMixin.fire({
      title: 'Enhancement Failed',
      text: 'Could not enhance bio. Please check the console for details.',
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
          swalMixin.fire({
            title: 'JSON Parse Error',
            text: 'Could not parse serverId' + e,
            icon: 'error',
          })
            return file.serverId;
        }
    };

    const languagesPayload = form.value.languages.map((lang, index) => {
        const pond = languagePonds.value[index];
        const serverId = pond ? getPondServerId({ value: pond }) : null;
        return {
            name: lang.name,
            description: lang.description,
            icon_url: lang.icon_url, // Always send the original URL for reference
            icon: serverId,       // Send the NEW serverId, or null
        };
    });

    const dataToSubmit = {
        bio: form.value.bio || '',
        passions: JSON.stringify(form.value.passions || []),
        languages: languagesPayload,
        image_1: getPondServerId(image1Pond),
        image_2: getPondServerId(image2Pond),
    };

    emit('submit', dataToSubmit);
};

defineExpose({ handleSubmit });
</script>

<style>
.filepond-placeholder {
    min-height: 76px;
    border: 2px dashed #4b5563;
    background-color: #1f2937;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9ca3af;
}
.filepond-placeholder-circle {
    min-height: 64px;
    width: 64px;
    border: 2px dashed #4b5563;
    background-color: #1f2937;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9ca3af;
}

.filepond-themed .filepond--panel-root {
    background-color: #1f2937; /* bg-gray-800 */
    border-color: #4b5563; /* border-gray-600 */
}
.filepond-themed .filepond--drop-label {
    color: #d1d5db; /* text-gray-300 */
}
.filepond-themed .filepond--label-action {
    color: #facc15; /* text-yellow-400 */
}
.filepond--image-preview-overlay-success {
  color: var(--color-success-500)
}
.filepond--image-preview-overlay-failure {
  color: var(--color-danger-500)
}
.filepond--image-preview-overlay-idle {
  color: var(--color-gray-400)
}

</style>
