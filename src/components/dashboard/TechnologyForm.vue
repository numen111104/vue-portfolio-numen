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
      <label class="block text-sm font-medium mb-1">Icon</label>
      <div class="flex items-center space-x-6">
        <img v-if="imagePreviewUrl" :src="imagePreviewUrl" class="h-16 w-16 rounded-lg object-cover bg-white/10 p-1" />
        <img v-else-if="form.icon_url" :src="`/storage/${form.icon_url}`" class="h-16 w-16 rounded-lg object-cover bg-white/10 p-1" />
        <div v-else class="h-16 w-16 rounded-lg bg-brand-light-gray flex items-center justify-center text-gray-400 text-xs">No Icon</div>
        <div>
          <label for="tech-icon" class="cursor-pointer btn btn-outline btn-sm">Change Icon</label>
          <input id="tech-icon" type="file" @change="onFileChange" class="hidden" />
        </div>
      </div>
      <ErrorDisplay :errors="errors.icon" />
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';
import ErrorDisplay from '@/components/ui/ErrorDisplay.vue';

const props = defineProps({
  technology: { // For editing
    type: Object,
    default: null,
  },
  errors: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['submit']);

const form = ref({});
const imageFile = ref(null);
const imagePreviewUrl = ref(null);

// Watch for prop changes to reset the form for editing
watch(() => props.technology, (newVal) => {
  form.value = { ...newVal };
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
  formData.append('name', form.value.name || '');
  formData.append('category', form.value.category || '');
  if (imageFile.value) {
    formData.append('icon', imageFile.value);
  }
  emit('submit', formData);
};

// Expose the submit function to the parent component
defineExpose({ handleSubmit });
</script>
