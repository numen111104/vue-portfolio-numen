<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label class="block text-sm font-medium mb-1">Platform Name</label>
      <input v-model="form.platform_name" type="text" required placeholder="e.g., github, linkedin" class="input-field w-full" />
      <ErrorDisplay :errors="errors.platform_name" />
    </div>
    <div>
      <label class="block text-sm font-medium mb-1">URL</label>
      <input v-model="form.url" type="url" required placeholder="https://..." class="input-field w-full" />
      <ErrorDisplay :errors="errors.url" />
    </div>
    <div>
      <label class="block text-sm font-medium mb-1">Display Order</label>
      <input v-model="form.display_order" type="number" class="input-field w-full" />
      <ErrorDisplay :errors="errors.display_order" />
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';
import ErrorDisplay from '@/components/ui/ErrorDisplay.vue';

const props = defineProps({
  link: { 
    type: Object,
    default: null,
  },
  errors: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['submit']);

const form = ref({ display_order: 0 });

watch(() => props.link, (newVal) => {
  form.value = { display_order: 0, ...newVal };
}, { immediate: true });

const handleSubmit = () => {
  // Use a plain object for FormData, as there are no files
  const formData = new FormData();
  Object.keys(form.value).forEach(key => {
    if (form.value[key] !== null) {
        formData.append(key, form.value[key]);
    }
  });
  emit('submit', formData);
};

defineExpose({ handleSubmit });
</script>
