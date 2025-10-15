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
import { ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePortfolioStore } from '@/stores/portfolio';
import BaseModal from '@/components/ui/BaseModal.vue';
import HighlightedTitle from '@/components/ui/HighlightedTitle.vue';

const route = useRoute();
const router = useRouter();
const portfolioStore = usePortfolioStore();

const technologies = computed(() => portfolioStore.technologies);
const isModalVisible = ref(false);
const selectedTech = ref(null);

watch(() => route.query.open, (newId) => {
  if (newId && technologies.value.length) {
    const techToOpen = technologies.value.find(t => t.id === newId);
    if (techToOpen) {
      openModal(techToOpen);
    }
  } else {
    closeModal();
  }
}, { immediate: true });

watch(technologies, (newTechs) => {
    if (route.query.open && newTechs.length) {
        const techToOpen = newTechs.find(t => t.id === route.query.open);
        if (techToOpen) {
            openModal(techToOpen);
        }
    }
});

const openModal = (tech) => {
  // The full tech object, including projects, is now available from the store.
  selectedTech.value = tech;
  isModalVisible.value = true;
  router.replace({ query: { open: tech.id } });
};

const closeModal = () => {
  isModalVisible.value = false;
  selectedTech.value = null;
  if (route.query.open) {
    router.replace({ query: {} });
  }
};
</script>
