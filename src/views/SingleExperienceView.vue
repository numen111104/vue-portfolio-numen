<template>
  <main class="container px-4 py-8 mx-auto text-white md:px-8 lg:px-16">
    <div v-if="uiStore.isLoading" class="text-center py-20">
        <IconLoader2 class="animate-spin inline-block w-12 h-12" />
    </div>
    <div v-else-if="experience" class="max-w-4xl mx-auto">
      <!-- Breadcrumb -->
      <section class="mb-8 animate-on-load load-delay-0">
        <Breadcrumb :crumbs="breadcrumbs" />
      </section>

      <!-- Header -->
      <section class="mb-8 text-center animate-on-load load-delay-1">
        <p class="text-md text-gray-400">{{ experience.type }} Experience</p>
        <HighlightedTitle :unlighter="experience.title" :lighter="experience.organization_name" />
        <p class="mt-2 text-lg text-brand-yellow">{{ formatDate(experience.start_date) }} - {{ experience.end_date ? formatDate(experience.end_date) : 'Present' }}</p>
      </section>

      <!-- Image -->
      <section class="mb-8 animate-on-load load-delay-2">
        <img v-if="experience.thumbnail_url" :src="`/storage/${experience.thumbnail_url}`" :alt="experience.title" class="object-cover w-full rounded-lg shadow-lg max-h-96 bg-gray-800" />
      </section>

      <!-- Full Description -->
      <section class="p-6 rounded-lg bg-brand-gray animate-on-load load-delay-3">
        <h3 class="mb-4 text-2xl font-bold text-white">About the Experience</h3>
        <div class="prose prose-invert max-w-none text-gray-300 max-h-[50vh] overflow-y-auto pr-4 whitespace-pre-line">
          <p>{{ experience.description }}</p>
        </div>
      </section>

      <!-- Documentation Section -->
      <section v-if="experience.docs_url && experience.docs_url.length" class="p-6 mt-8 rounded-lg bg-brand-gray animate-on-load load-delay-4">
        <h3 class="mb-4 text-2xl font-bold text-white">Documentation & Links</h3>
        <div class="overflow-x-auto">
            <table class="min-w-full text-sm text-left text-gray-300">
                <thead class="text-xs text-gray-400 uppercase bg-brand-dark/50">
                    <tr>
                        <th class="px-6 py-3"></th>
                        <th class="px-6 py-3">Label</th>
                        <th class="px-6 py-3">Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="doc in experience.docs_url" :key="doc.label" @click="handleDocClick(doc)" class="border-b border-brand-light-gray hover:bg-brand-dark/50 cursor-pointer">
                        <td class="px-6 py-4 w-12">
                            <component v-if="doc.table_icon && icons[doc.table_icon]" :is="icons[doc.table_icon]" class="w-6 h-6 text-brand-yellow" />
                        </td>
                        <td class="px-6 py-4 font-medium">{{ doc.label }}</td>
                        <td class="px-6 py-4">{{ doc.type }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </section>

       <!-- Back Button -->
      <div class="mt-12 text-center animate-on-load load-delay-5">
        <router-link to="/experience" class="btn btn-primary">
          &larr; Back to All Experiences
        </router-link>
      </div>

    </div>
    <div v-else class="text-center">
      <h2 class="text-2xl text-brand-yellow">Experience not found</h2>
    </div>

    <!-- Modals -->
    <DocListModal :show="isDocModalOpen" :docs="docsForModal" @close="isDocModalOpen = false" />

  </main>
</template>

<script setup>
import { ref, onMounted, shallowRef, computed } from 'vue';
import { useRoute } from 'vue-router';
import apiService from '@/services/apiService';
import HighlightedTitle from '@/components/ui/HighlightedTitle.vue';
import Breadcrumb from '@/components/ui/Breadcrumb.vue';
import DocListModal from '@/components/ui/DocListModal.vue';
import { IconLoader2, IconLink, IconPhoto, IconFileText } from '@tabler/icons-vue';

// Import viewer styles and programmatic API
import 'viewerjs/dist/viewer.css';
import { api as ViewerApi } from "v-viewer";

import { useUiStore } from '@/stores/ui';

const route = useRoute();
const experience = ref(null);
const uiStore = useUiStore();

// Modals State
const isDocModalOpen = ref(false);
const docsForModal = ref([]);

const icons = shallowRef({ IconLink, IconPhoto, IconFileText });

const breadcrumbs = computed(() => {
    if (!experience.value) return [];
    return [
        { label: 'Home', to: '/' },
        { label: 'Experiences', to: '/experience' },
        { label: experience.value.title },
    ];
});

const handleDocClick = (doc) => {
    switch (doc.type) {
        case 'Image':
            const images = doc.url.map(path => `/storage/${path}`);
            ViewerApi({
                options: {
                    inline: false, button: true, navbar: true, title: true, toolbar: true,
                    tooltip: true, movable: true, zoomable: true, rotatable: true,
                    scalable: true, transition: true, fullscreen: true, keyboard: true,
                },
                images: images,
            });
            break;
        case 'Docs':
            docsForModal.value = doc.url;
            isDocModalOpen.value = true;
            break;
        case 'Link':
            window.open(doc.url[0], '_blank');
            break;
    }
};

const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
};

onMounted(async () => {
  const experienceId = route.params.id;
  uiStore.startLoading();
  try {
      const response = await apiService.get(`/experiences/${experienceId}`);
      experience.value = response.data.data;
  } catch (error) {
      console.error("Failed to fetch experience:", error);
      experience.value = null;
  } finally {
      uiStore.stopLoading();
  }
});
</script>

<style scoped>
.prose { line-height: 1.75; }
.prose::-webkit-scrollbar { width: 6px; }
.prose::-webkit-scrollbar-track { background: var(--color-brand-gray); }
.prose::-webkit-scrollbar-thumb { background: var(--color-brand-light-gray); border-radius: 6px; }
.prose::-webkit-scrollbar-thumb:hover { background: var(--color-brand-yellow); }
</style>
