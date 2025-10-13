<template>
  <div class="container px-4 py-16 mx-auto text-white md:px-8 lg:px-16">
    <div class="flex sm:flex-row flex-col justify-between animate-on-load load-delay-1">
      <div class="mb-1">
        <HighlightedTitle unlighter="My" lighter="Tech Stacks" />
        <p class="section-subtitle">
          A collection of technologies I use to build modern web applications.
        </p>
      </div>
    </div>

    <!-- Tech Stacks Grid -->
    <div class="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
      <div v-for="(tech) in technologies" :key="tech.id"
        class="flex flex-col items-center justify-center p-6 text-center transition-all duration-300 rounded-lg cursor-pointer card hover:shadow-brand-yellow/20"
        @click="openModal(tech)">
        <img :src="`/storage/${tech.icon_url}`" :alt="tech.name" class="w-20 h-20 mb-4 object-contain" />
        <h4 class="text-lg font-semibold text-white">{{ tech.name }}</h4>
      </div>
    </div>

    <!-- Tech Stack Detail Modal -->
    <BaseModal :show="isModalVisible" @close="closeModal" modal-class="max-w-2xl">
      <template #header>
        <div v-if="selectedTech" class="flex items-center gap-4">
          <img :src="`/storage/${selectedTech.icon_url}`" :alt="selectedTech.name" class="w-10 h-10 object-contain" />
          <span>{{ selectedTech.name }}</span>
        </div>
      </template>

      <div v-if="selectedTech">
        <p class="text-gray-300">{{ selectedTech.description }}</p>

        <h5 class="mt-6 mb-4 text-xl font-semibold text-white">Related Projects</h5>
        <div v-if="selectedTech.projects && selectedTech.projects.length > 0" class="space-y-4">
          <router-link
            v-for="project in selectedTech.projects"
            :key="project.id"
            :to="{ name: 'project', query: { open: project.id } }"
            class="block p-4 transition-colors duration-300 rounded-lg hover:bg-brand-light-gray bg-brand-gray">
            <h6 class="font-semibold text-brand-yellow">{{ project.title }}</h6>
            <p class="text-sm text-gray-400">{{ project.short_description }}</p>
          </router-link>
        </div>
        <div v-else>
            <p class="text-sm text-gray-400">No projects associated with this technology yet.</p>
        </div>
      </div>

      <template #footer>
        <button class="btn btn-secondary" @click="closeModal">Close</button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiService from '@/services/apiService';
import BaseModal from '@/components/ui/BaseModal.vue';
import HighlightedTitle from '@/components/ui/HighlightedTitle.vue';

const route = useRoute();
const router = useRouter();

const technologies = ref([]);
const isModalVisible = ref(false);
const selectedTech = ref(null);

const fetchTechnologies = async () => {
  try {
    const response = await apiService.get('/technologies');
    technologies.value = response.data.data;

    // Check if a modal should be opened based on the query param
    if (route.query.open) {
      const techToOpen = technologies.value.find(t => t.id === route.query.open);
      if (techToOpen) {
        openModal(techToOpen);
      }
    }
  } catch (error) {
    console.error("Failed to fetch technologies:", error);
  }
};

onMounted(fetchTechnologies);

watch(() => route.query.open, (newId) => {
  if (newId && technologies.value.length) {
    const techToOpen = technologies.value.find(t => t.id === newId);
    if (techToOpen) {
      openModal(techToOpen);
    }
  } else {
    closeModal();
  }
});

const openModal = async (tech) => {
  try {
    // Fetch detailed info, including related projects
    const response = await apiService.get(`/technologies/${tech.id}`);
    selectedTech.value = response.data.data;
    isModalVisible.value = true;
    // Update URL without reloading page
    router.replace({ query: { open: tech.id } });
  } catch (error) {
    console.error(`Failed to fetch details for ${tech.name}:`, error);
  }
};

const closeModal = () => {
  isModalVisible.value = false;
  selectedTech.value = null;
  // Clear the query parameter from the URL
  if (route.query.open) {
    router.replace({ query: {} });
  }
};
</script>
