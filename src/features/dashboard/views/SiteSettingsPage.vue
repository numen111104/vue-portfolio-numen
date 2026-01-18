<template>
  <div class="fade-in-down-on-scroll is-visible">
    <HighlightedTitle unlighter="Site" lighter="Settings" />
    <p class="text-brand-text/80 !mx-0 !max-w-full !text-left !text-base mb-6">
      Manage your website's global settings, metadata, and SEO.
    </p>

    <div v-if="loading" class="text-center py-16">
        <IconLoader2 class="animate-spin inline-block w-10 h-10" />
    </div>

    <form v-else @submit.prevent="saveSettings" class="space-y-8">
      <div class="card-home bg-brand-gray p-6">
        <h3 class="text-xl font-bold text-white mb-4">Basic Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="form-control">
            <label for="site_title">Site Title</label>
            <input id="site_title" type="text" v-model="settings.site_title" class="input-text" />
          </div>
          <div class="form-control">
            <label for="site_author">Site Author</label>
            <input id="site_author" type="text" v-model="settings.site_author" class="input-text" />
          </div>
          <div class="form-control col-span-2">
            <label for="site_description">Site Description</label>
            <textarea id="site_description" v-model="settings.site_description" class="input-textarea" rows="3"></textarea>
          </div>
          <div class="form-control col-span-2">
            <label for="meta_keywords">Meta Keywords</label>
            <input id="meta_keywords" type="text" v-model="settings.meta_keywords" class="input-text" />
            <p class="text-xs text-gray-400 mt-1">Comma-separated keywords for SEO.</p>
          </div>
           <div class="form-control">
            <label for="contact_email">Contact Email</label>
            <input id="contact_email" type="email" v-model="settings.contact_email" class="input-text" />
          </div>
        </div>
      </div>

      <div class="card-home bg-brand-gray p-6">
        <h3 class="text-xl font-bold text-white mb-4">Site Assets</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="filepond-themed filepond-circle">
                <label class="block text-sm font-medium mb-1">Site Logo</label>
                <FilePond
                    ref="logoPond"
                    name="site_logo"
                    label-idle="Drop logo here or <span class='filepond--label-action'>Browse</span>"
                    :allow-multiple="false"
                    :accepted-file-types="acceptedImageFiles"
                    :server="filePondServerOptions"
                    :files="initialLogoFiles"
                />
            </div>
            <div class="filepond-themed filepond-circle">
                <label class="block text-sm font-medium mb-1">Site Favicon</label>
                <FilePond
                    ref="faviconPond"
                    name="site_favicon"
                    label-idle="Drop favicon here or <span class='filepond--label-action'>Browse</span>"
                    :allow-multiple="false"
                    :accepted-file-types="acceptedImageFiles"
                    :server="filePondServerOptions"
                    :files="initialFaviconFiles"
                />
            </div>
            <div class="filepond-themed">
                <label class="block text-sm font-medium mb-1">Social Media Image (OG)</label>
                <FilePond
                    ref="ogImagePond"
                    name="og_image"
                    label-idle="Drop OG image here or <span class='filepond--label-action'>Browse</span>"
                    :allow-multiple="false"
                    :accepted-file-types="acceptedImageFiles"
                    :server="filePondServerOptions"
                    :files="initialOgImageFiles"
                />
            </div>
        </div>
      </div>

      <div class="flex justify-end">
        <ButtonSpinner :loading="formLoading" type="submit" class="btn-primary">
          Save Settings
        </ButtonSpinner>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiService from '@/services/apiService';
import swal from '@/lib/sweetalert/swal';
import HighlightedTitle from '@/shared/components/HighlightedTitle.vue';
import ButtonSpinner from '@/shared/components/ButtonSpinner.vue';
import { IconLoader2 } from '@tabler/icons-vue';

// Filepond
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { getAcceptedFileTypes } from '@/shared/constants/fileTypes';
import { useFilePondServer } from '@/lib/filepond/filePondService.js';
import { storage } from '@/utils/appHelper.js';

const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

const settings = ref({});
const formLoading = ref(false);
const loading = ref(true);

// Filepond state
const { filePondServerOptions } = useFilePondServer();
const acceptedImageFiles = getAcceptedFileTypes(['IMAGE']);
const logoPond = ref(null);
const faviconPond = ref(null);
const ogImagePond = ref(null);
const initialLogoFiles = ref([]);
const initialFaviconFiles = ref([]);
const initialOgImageFiles = ref([]);

const setInitialFiles = () => {
    initialLogoFiles.value = settings.value.site_logo_url ? [{ source: storage(settings.value.site_logo_url), options: { type: 'local' } }] : [];
    initialFaviconFiles.value = settings.value.site_favicon_url ? [{ source: storage(settings.value.site_favicon_url), options: { type: 'local' } }] : [];
    initialOgImageFiles.value = settings.value.og_image_url ? [{ source: storage(settings.value.og_image_url), options: { type: 'local' } }] : [];
};

onMounted(async () => {
  try {
    const response = await apiService.get('/admin/site-settings');
    settings.value = response.data;
    setInitialFiles();
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    swal.fire('Error', 'Could not load site settings.', 'error');
  } finally {
    loading.value = false;
  }
});

const saveSettings = async () => {
  formLoading.value = true;

  const getPondValue = (pondRef, originalUrl) => {
      const file = pondRef.value?.getFile();
      if (!file) return null; // File was removed
      
      if (file.status === 5 && file.serverId) { // STATUS_PROCESSING_COMPLETE
          try {
              // serverId might be a JSON string with quotes, so parse it.
              return JSON.parse(file.serverId);
          } catch (e) {
              // Or it might be a raw string.
              return file.serverId;
          }
      }
      
      // Unchanged, return original URL
      return originalUrl;
  };

  const payload = {
      ...settings.value,
      site_logo_url: getPondValue(logoPond, settings.value.site_logo_url),
      site_favicon_url: getPondValue(faviconPond, settings.value.site_favicon_url),
      og_image_url: getPondValue(ogImagePond, settings.value.og_image_url),
  };

  try {
    const response = await apiService.post('/admin/site-settings', payload);
    settings.value = response.data.settings;
    // Manually trigger FilePond to update with new URLs
    // logoPond.value?.load(settings.value.site_logo_url ? [{ source: settings.value.site_logo_url, options: { type: 'local' } }] : []);
    // faviconPond.value?.load(settings.value.site_favicon_url ? [{ source: settings.value.site_favicon_url, options: { type: 'local' } }] : []);
    // ogImagePond.value?.load(settings.value.og_image_url ? [{ source: settings.value.og_image_url, options: { type: 'local' } }] : []);
    swal.fire('Success', response.data.message, 'success');
  } catch (error) {
    console.error("Failed to save settings:", error);
    swal.fire('Error', 'An error occurred while saving settings.', 'error');
  } finally {
    formLoading.value = false;
  }
};
</script>
