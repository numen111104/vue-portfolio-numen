<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      <div class="flex items-end pb-2">
        <div class="flex-col">
        <Switch v-model="form.is_published">Published</Switch>
          <ErrorDisplay :errors="errors.is_published" />
        </div>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium mb-1">Short Description</label>
      <textarea v-model="form.short_description" rows="3" class="input-field w-full"></textarea>
      <ErrorDisplay :errors="errors.short_description" />
    </div>

    <div>
      <label class="block text-sm font-medium mb-1">Full Description</label>
      <textarea v-model="form.description" rows="6" class="input-field w-full"></textarea>
      <ErrorDisplay :errors="errors.description" />
    </div>

    <div>
      <label class="block text-sm font-medium mb-1">Technologies</label>
      <MultiSelectInput
        v-model="form.technologies"
        :options="techOptions"
        value-prop="id"
        label="name"
        track-by="name"
      />
      <ErrorDisplay :errors="errors.technologies" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label class="block text-sm font-medium mb-1">Project URL</label>
            <input v-model="form.project_url" type="url" class="input-field w-full" />
            <ErrorDisplay :errors="errors.project_url" />
        </div>
        <div>
            <label class="block text-sm font-medium mb-1">Repository URL</label>
            <input v-model="form.repository_url" type="url" class="input-field w-full" />
            <ErrorDisplay :errors="errors.repository_url" />
        </div>
    </div>

    <!-- File inputs and other fields will be added -->

  </form>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import ErrorDisplay from '@/components/ui/ErrorDisplay.vue';
import MultiSelectInput from '@/components/ui/MultiSelectInput.vue';
import Switch from '@/components/ui/Switch.vue';
import apiService from '@/services/apiService';

const props = defineProps({
  project: {
    type: Object,
    default: null,
  },
  errors: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['submit']);

const form = ref({ is_published: true, technologies: [] });
const techOptions = ref([]);

// Fetch technologies for the select options
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
    // When editing, we get the full tech objects, but the v-model needs just the IDs.
    const techIds = newVal.technologies ? newVal.technologies.map(t => t.id) : [];
    form.value = { is_published: true, ...newVal, technologies: techIds };
  } else {
    form.value = { is_published: true, technologies: [] };
  }
}, { immediate: true, deep: true });

const handleSubmit = () => {
  const formData = new FormData();

  // Append all simple key-value pairs
  for (const key in form.value) {
    if (key !== 'technologies') { // Exclude technologies for now
        if (form.value[key] !== null) {
            formData.append(key, form.value[key]);
        }
    }
  }

  // Append array of technology IDs
  if (form.value.technologies) {
    form.value.technologies.forEach(techId => {
        formData.append('technologies[]', techId);
    });
  }

  // File inputs will be added here later

  emit('submit', formData);
};

defineExpose({ handleSubmit });
</script>
