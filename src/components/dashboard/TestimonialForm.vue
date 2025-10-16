<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label class="block text-sm font-medium mb-1">Author Name</label>
            <input v-model="form.author_name" type="text" required class="input-field w-full" />
            <ErrorDisplay :errors="errors.author_name" />
        </div>
        <div>
            <label class="block text-sm font-medium mb-1">Author Title / Job</label>
            <input v-model="form.author_title" type="text" required class="input-field w-full" />
            <ErrorDisplay :errors="errors.author_title" />
        </div>
    </div>

    <div>
        <label class="block text-sm font-medium mb-1">Testimonial Text</label>
        <textarea v-model="form.testimonial_text" rows="6" class="input-field w-full"></textarea>
        <ErrorDisplay :errors="errors.testimonial_text" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
            <label class="block text-sm font-medium mb-1">Display Order</label>
            <input v-model.number="form.display_order" type="number" class="input-field w-full" />
            <ErrorDisplay :errors="errors.display_order" />
        </div>
        <div class="mt-4">
            <Switch v-model="form.is_published">Published</Switch>
        </div>
    </div>

    <div class="filepond-themed">
      <label class="block text-sm font-medium mb-1">Author Avatar</label>
      <FilePond
          ref="avatarPond"
          name="author_avatar"
          label-idle="Drag & Drop or <span class='filepond--label-action'>Browse</span>"
          :allow-multiple="false"
          :accepted-file-types="acceptedFiles"
          :server="filePondServerOptions"
          :files="initialFiles"
      />
      <ErrorDisplay :errors="errors.author_avatar_url" />
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';
import Switch from '@/components/ui/SwitchComp.vue';
import ErrorDisplay from '@/components/ui/ErrorDisplay.vue';
import { getAcceptedFileTypes } from '@/constants/fileTypes';
import { useFilePondServer } from '@/services/filePondService.js';
import { storage } from '@/utils/appHelper.js';

// Filepond
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

const props = defineProps({
  testimonial: { type: Object, default: null },
  errors: { type: Object, default: () => ({}) },
});

const emit = defineEmits(['submit']);

const { filePondServerOptions } = useFilePondServer();

const form = ref({ is_published: true, display_order: 0 });
const avatarPond = ref(null);
const initialFiles = ref([]);
const acceptedFiles = getAcceptedFileTypes(['IMAGE']);

watch(() => props.testimonial, (newVal) => {
  if (newVal) {
    const formData = { is_published: true, display_order: 0, ...newVal };

    if (newVal.author_avatar_url) {
      // Ensure we only use the raw path, then let the helper build the full URL
      const rawPath = newVal.author_avatar_url.replace('/storage/', '');
      initialFiles.value = [{ source: storage(rawPath), options: { type: 'local' } }];
      formData.author_avatar_url = rawPath; // Store only the raw path in the form model
    } else {
      initialFiles.value = [];
    }
    form.value = formData;
  } else {
    form.value = { is_published: true, display_order: 0 };
    initialFiles.value = [];
  }
}, { immediate: true, deep: true });

const handleSubmit = () => {
    const getPondServerId = (pondRef) => {
        const file = pondRef.value?.getFile();
        if (!file || !file.serverId) return null;
        try {
            return JSON.parse(file.serverId);
        } catch {
            return file.serverId;
        }
    };

    const serverId = getPondServerId(avatarPond);

    const payload = {
        ...form.value,
        is_published: form.value.is_published ? 1 : 0,
        author_avatar_url: serverId ? serverId : form.value.author_avatar_url,
    };

    // The form submission from the parent component will handle FormData
    emit('submit', payload);
};

defineExpose({ handleSubmit });
</script>
