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
      <label class="block text-sm font-medium mb-1">Credential Image</label>
      <div class="flex items-center space-x-6">
        <img v-if="imagePreviewUrl" :src="imagePreviewUrl" class="h-24 w-auto rounded-lg object-cover bg-white/10 p-1" />
        <img v-else-if="form.credential_image_url" :src="`/storage/${form.credential_image_url}`" class="h-24 w-auto rounded-lg object-cover bg-white/10 p-1" />
        <div v-else class="h-24 w-32 rounded-lg bg-brand-light-gray flex items-center justify-center text-gray-400 text-xs">No Image</div>
        <div>
          <label for="cert-image" class="cursor-pointer btn btn-outline btn-sm">Change Image</label>
          <input id="cert-image" type="file" @change="onFileChange" class="hidden" />
        </div>
      </div>
      <ErrorDisplay :errors="errors.image" />
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';
import Switch from '@/components/ui/Switch.vue';
import ErrorDisplay from '@/components/ui/ErrorDisplay.vue';

const props = defineProps({
  certification: { // For editing
    type: Object,
    default: null,
  },
  errors: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['submit']);

const form = ref({ is_published: true });
const imageFile = ref(null);
const imagePreviewUrl = ref(null);

watch(() => props.certification, (newVal) => {
  form.value = { is_published: true, ...newVal };
  imageFile.value = null;
  imagePreviewUrl.value = null;
}, { immediate: true });

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    imageFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreviewUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const handleSubmit = () => {
  const formData = new FormData();
  Object.keys(form.value).forEach(key => {
    if (form.value[key] !== null) {
        // Handle boolean conversion for FormData
        if (typeof form.value[key] === 'boolean') {
            formData.append(key, form.value[key] ? '1' : '0');
        } else {
            formData.append(key, form.value[key]);
        }
    }
  });

  if (imageFile.value) {
    formData.append('image', imageFile.value);
  }
  emit('submit', formData);
};

defineExpose({ handleSubmit });
</script>