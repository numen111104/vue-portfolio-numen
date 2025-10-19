<template>
  <div class="fade-in-down-on-scroll is-visible">
     <HighlightedTitle unlighter="Hero" lighter="Section" />
        <p class="text-brand-text/80 !mx-0 !max-w-full !text-left !text-base">
           Customize the content of the main hero section on your homepage.
        </p>

    <div class="card-home mt-6 bg-brand-gray p-6">
      <form @submit.prevent="saveSettings" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Text Inputs -->
          <div class="space-y-4">
            <h2 class="text-xl font-semibold text-brand-yellow col-span-full">Content</h2>
            <div>
              <label class="block text-sm font-medium mb-1">Name</label>
              <input v-model="settings.name" type="text" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Title</label>
              <input v-model="settings.title" type="text" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Badge 1 Text</label>
              <input v-model="settings.badge_1_text" type="text" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Badge 2 Text</label>
              <input v-model="settings.badge_2_text" type="text" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Headline Part 1</label>
              <input v-model="settings.headline_part_1" type="text" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Headline Part 2</label>
              <input v-model="settings.headline_part_2" type="text" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Headline Part 3</label>
              <input v-model="settings.headline_part_3" type="text" class="input-field" />
            </div>
          </div>

          <!-- Metrics and Button -->
          <div class="space-y-4">
            <h2 class="text-xl font-semibold text-brand-yellow col-span-full">Metrics & CTA</h2>
            <div>
              <label class="block text-sm font-medium mb-1">Metric 1 Value</label>
              <input v-model="settings.metric_1_value" type="text" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Metric 1 Label</label>
              <input v-model="settings.metric_1_label" type="text" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Metric 2 Value</label>
              <input v-model="settings.metric_2_value" type="text" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Metric 2 Label</label>
              <input v-model="settings.metric_2_label" type="text" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Button Text</label>
              <input v-model="settings.button_text" type="text" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Button Link</label>
              <input v-model="settings.button_link" type="text" class="input-field" />
            </div>
          </div>
        </div>

        <!-- Image Upload -->
        <div class="pt-6 border-t border-brand-light-gray">
          <h2 class="text-xl font-semibold text-brand-yellow mb-4">Hero Image</h2>
          <div class="flex items-center space-x-6">
            <ImageViewer v-if="imagePreviewUrl" :images="[imagePreviewUrl]" alt="Hero Image Preview" sizeClass="h-24 w-24" />
            <ImageViewer v-else-if="settings.image_url" :images="[$storage(settings.image_url)]" alt="Hero Image" sizeClass="h-24 w-24" />
            <div v-else class="h-24 w-24 rounded-lg bg-brand-light-gray flex items-center justify-center text-gray-400">No Image</div>
            <div>
              <label for="hero-image" class="cursor-pointer btn btn-outline">Change Image</label>
              <input id="hero-image" type="file" @change="onFileChange" class="hidden" />
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end pt-6 border-t border-brand-light-gray">
          <ButtonSpinner :loading="loading" type="submit" class="btn-primary">
            Save Settings
          </ButtonSpinner>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiService from '@/services/apiService';
import ButtonSpinner from '@/components/ui/ButtonSpinner.vue';
import swal from '@/utils/swal';
import HighlightedTitle from '@/components/ui/HighlightedTitle.vue';
import ImageViewer from '@/components/ui/ImageViewer.vue';

const settings = ref({});
const loading = ref(false);
const imageFile = ref(null);
const imagePreviewUrl = ref(null);

const fetchSettings = async () => {
  try {
    const response = await apiService.get('/hero-settings');
    settings.value = response.data.data;
  } catch (error) {
    console.error('Failed to fetch hero settings:', error);
  }
};

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

const saveSettings = async () => {
  loading.value = true;
  const formData = new FormData();

  for (const key in settings.value) {
    if (settings.value[key] !== null) {
      formData.append(key, settings.value[key]);
    }
  }

  if (imageFile.value) {
    formData.append('image', imageFile.value);
  }

  try {
    const response = await apiService.post('/hero-settings', formData);
    settings.value = response.data.settings; // Update with fresh data from server
    imageFile.value = null;
    imagePreviewUrl.value = null;
    swal.fire('Success', 'Settings saved successfully!', 'success');
  } catch (error) {
    console.error('Failed to save hero settings:', error);
    swal.fire('Error', 'Failed to save settings.', 'error');
  } finally {
    loading.value = false;
  }
};

onMounted(fetchSettings);
</script>
