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
          <img class="object-cover w-full h-48" :src="project.images[0]" :alt="project.title" />
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

      <div v-if="selectedProject" class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <!-- Image Slider -->
        <div class="relative w-full">
          <img :src="selectedProject.images[currentImageIndex]" :alt="selectedProject.title"
            class="object-cover w-full rounded-lg h-80" />
          <div v-if="selectedProject.images.length > 1" class="absolute inset-0 flex items-center justify-between px-4">
            <button @click.stop="prevImage" class="p-2 text-white bg-black/30 rounded-full hover:bg-black/50">
              &lt;
            </button>
            <button @click.stop="nextImage" class="p-2 text-white bg-black/30 rounded-full hover:bg-black/50">
              &gt;
            </button>
          </div>
        </div>

        <!-- Project Info -->
        <div>
          <span class="px-3 py-1 text-xs font-semibold rounded-full" :class="{
            'bg-green-500/20 text-green-400': selectedProject.status === 'Completed',
            'bg-blue-500/20 text-blue-400': selectedProject.status === 'In Progress',
          }">{{ selectedProject.status }}</span>
          <p class="mt-4 text-gray-300">{{ selectedProject.full_description }}</p>

          <h5 class="mt-6 mb-2 font-semibold text-white">Tech Stack</h5>
          <div class="flex flex-wrap gap-2">
            <span v-for="stack in selectedProject.stack" :key="stack"
              class="px-2 py-1 text-xs rounded bg-brand-light-gray text-gray-300">{{ stack }}</span>
          </div>

          <h5 class="mt-6 mb-2 font-semibold text-white">Resources</h5>
          <div class="flex flex-wrap gap-4">
            <a v-for="link in selectedProject.links" :key="link.name" :href="link.url" target="_blank"
              class="inline-flex items-center gap-2 text-brand-yellow hover:text-yellow-400">
              <span>{{ link.name }}</span>
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z">
                </path>
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
              </svg>
            </a>
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
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router';
import { useUiStore } from '@/stores/ui';
import apiService from '@/services/apiService';
import BaseModal from '@/components/ui/BaseModal.vue'
import HighlightedTitle from '@/components/ui/HighlightedTitle.vue'

const projects = ref([])
const loading = ref(true); // This can be a local loading for the component content itself
const route = useRoute();
const uiStore = useUiStore();

onMounted(async () => {
  uiStore.startLoading();
  try {
    const response = await apiService.get('/projects');
    projects.value = response.data.data;

    // Check for query param to auto-open a modal
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

// Watch for query changes to open modal without full page reload
watch(() => route.query.open, (newId) => {
    if (newId) {
        const projectToOpen = projects.value.find(p => p.id === newId);
        if (projectToOpen) {
            openProjectModal(projectToOpen);
        }
    }
});

const isModalVisible = ref(false)
const selectedProject = ref(null)
const currentImageIndex = ref(0)

const openProjectModal = (project) => {
  selectedProject.value = project
  currentImageIndex.value = 0
  isModalVisible.value = true
}

const closeModal = () => {
  isModalVisible.value = false
}

const nextImage = () => {
  if (selectedProject.value) {
    currentImageIndex.value = (currentImageIndex.value + 1) % selectedProject.value.images.length
  }
}

const prevImage = () => {
  if (selectedProject.value) {
    currentImageIndex.value = (currentImageIndex.value - 1 + selectedProject.value.images.length) % selectedProject.value.images.length
  }
}
</script>
