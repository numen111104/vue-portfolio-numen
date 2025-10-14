<template>
  <main class="container px-4 py-8 mx-auto text-white md:px-8 lg:px-16">
    <!-- Page Header -->
    <section class="flex sm:flex-row flex-col justify-between animate-on-load load-delay-1">
      <div class="mb-10">
        <HighlightedTitle unlighter="Innovating for a" lighter="Brighter Future" />
        <p class="section-subtitle">
          I innovate to create solutions that pave the way for a brighter and more sustainable future.
        </p>
      </div>
    </section>

    <!-- Projects Grid -->
    <section>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="(project, index) in projects" :key="project.id"
          class="overflow-hidden transition-all duration-500 transform rounded-lg cursor-pointer card hover:-translate-y-2"
          :class="`animate-on-load load-delay-${index + 2}`" @click="openProjectModal(project)">
          <img class="object-cover w-full h-48 rounded-lg" :src="project.thumbnail_url" :alt="project.title" />
          <div class="p-6">
            <h5 class="mb-2 text-lg font-bold tracking-tight text-white">
              {{ project.title }}
            </h5>
            <p class="mb-4 font-normal text-gray-400">
              {{ project.short_description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Project Detail Modal -->
    <BaseModal :show="isModalVisible" @close="closeModal" modal-class="max-w-4xl">
      <template #header>
        <h3 v-if="selectedProject" class="md:text-2xl text-xl font-bold text-white">
          {{ selectedProject.title }}
        </h3>
      </template>

      <div v-if="selectedProject" class="space-y-6">
                <!-- Image Viewer -->
                <div class="w-full">
                  <ImageViewer :images="selectedProject.images" />
                </div>

        <!-- Project Info -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-x-1">
            <span class="px-3 py-1 text-xs font-semibold rounded-full" :class="{
              'bg-green-500/20 text-green-400': selectedProject.status === 'Completed',
              'bg-blue-500/20 text-blue-400': selectedProject.status === 'In Progress' || selectedProject.status === 'Ongoing',
              'bg-red-500/20 text-red-400': selectedProject.status === 'Cancelled',
              'bg-yellow-500/20 text-yellow-400': selectedProject.status === 'On Hold',
              'bg-gray-500/20 text-gray-400': selectedProject.status === 'Planned',
              'bg-gray-500/20 text-gray-400': !selectedProject.status
            }">{{ selectedProject.status }}</span>
            <span v-if="selectedProject.repository_url" class="px-3 py-1 text-xs font-semibold rounded-full bg-gray-500/20 text-gray-400">Open Source</span>
            <span v-else class="px-3 py-1 text-xs font-semibold rounded-full bg-gray-500/20 text-gray-400">Private</span>
            <p class="mt-4 text-gray-300">{{ selectedProject.description }}</p>
          </div>

          <div>
            <h5 class="font-semibold text-white mb-3">Tech Stack</h5>
            <div class="flex flex-wrap gap-2">
              <span v-for="tech in selectedProject.technologies" :key="tech.id"
                class="px-2 py-1 text-xs rounded flex items-center space-x-1 bg-brand-light-gray text-gray-300">
                <img v-if="tech.icon_url" :src="`/storage/${tech.icon_url}`" class="w-4 h-4 object-contain" />
                <span>{{ tech.name }}</span>
              </span>
            </div>

            <h5 class="mt-6 mb-3 font-semibold text-white">Resources</h5>
            <div class="space-y-2 space-x-3">
              <a v-if="selectedProject.project_url" :href="selectedProject.project_url" target="_blank"
                class="inline-flex items-center gap-2 text-brand-yellow hover:text-yellow-400">
                <span>Live Project</span>
                <IconExternalLink class="w-4 h-4" />
              </a>
              <a v-if="selectedProject.repository_url" :href="selectedProject.repository_url" target="_blank"
                class="inline-flex items-center gap-2 text-brand-yellow hover:text-yellow-400">
                <span>Code Repository</span>
                <IconExternalLink class="w-4 h-4" />
              </a>
              <a v-for="link in selectedProject.links" :key="link.label" :href="link.url" target="_blank"
                class="inline-flex items-center gap-2 text-brand-yellow hover:text-yellow-400">
                <span>{{ link.label }}</span>
                <IconExternalLink class="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <button class="btn btn-secondary" @click="closeModal">Close</button>
      </template>
    </BaseModal>
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useUiStore } from '@/stores/ui';
import apiService from '@/services/apiService';
import BaseModal from '@/components/ui/BaseModal.vue';
import HighlightedTitle from '@/components/ui/HighlightedTitle.vue';
import { IconExternalLink } from '@tabler/icons-vue';

import ImageViewer from '@/components/ui/ImageViewer.vue';

const projects = ref([]);
const loading = ref(true);
const route = useRoute();
const uiStore = useUiStore();



onMounted(async () => {
  uiStore.startLoading();
  try {
    const response = await apiService.get('/projects');
    projects.value = response.data.data.map(project => ({
      ...project,
      thumbnail_url: project.thumbnail_url ? `/storage/${project.thumbnail_url}` : null,
      images: project.images ? project.images.map(img => `/storage/${img}`) : [],
    }));

    if (route.query.open) {
      const projectToOpen = projects.value.find(p => p.id === route.query.open);
      if (projectToOpen) {
        openProjectModal(projectToOpen);
      }
    }

  } catch (error) {
    console.error("Failed to fetch projects:", error);
  } finally {
    loading.value = false;
    uiStore.stopLoading();
  }
});

watch(() => route.query.open, (newId) => {
  if (newId) {
    const projectToOpen = projects.value.find(p => p.id === newId);
    if (projectToOpen) {
      openProjectModal(projectToOpen);
    }
  } else {
    closeModal();
  }
});

const isModalVisible = ref(false);
const selectedProject = ref(null);

const openProjectModal = (project) => {
  selectedProject.value = project;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
  selectedProject.value = null;
  // Also update URL to remove query param
  if (route.query.open) {
    const router = useRoute().router;
    router.replace({ query: {} });
  }
};

</script>


