<template>
  <div ref="viewRoot" class="container px-4 py-16 mx-auto text-white md:px-8 lg:px-16">
    <div class="animate-on-scroll fade-in-down-on-scroll">
      <div class="mb-1">
        <HighlightedTitle unlighter="My" lighter="Tech Stacks" />
        <p class="section-subtitle">
          A collection of technologies I use to build modern web applications.
        </p>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
      <TechStackCard v-for="(tech, index) in technologies" :key="tech.id" :tech="tech" :observe="observe"
        :delay="index * 100" @open="openModal" />
    </div>

    <BaseModal :show="isModalVisible" @close="closeModal" modal-class="max-w-2xl">
      <template #header>
        <div v-if="selectedTech" class="flex items-center gap-4">
          <img :src="$storage(selectedTech.icon_url)" :alt="selectedTech.name" class="w-10 h-10 object-contain" />
          <span>{{ selectedTech.name }}</span>
        </div>
      </template>
      <div v-if="selectedTech">
        <p class="text-gray-300">{{ selectedTech.description }}</p>
        <h5 class="mt-6 mb-4 text-xl font-semibold text-white">Related Projects</h5>
        <div v-if="selectedTech.projects && selectedTech.projects.length > 0" class="space-y-4">
          <router-link v-for="project in selectedTech.projects" :key="project.id"
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
import { ref, watch, computed, onMounted, inject, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePortfolioStore } from '@/stores/portfolio';
import BaseModal from '@/shared/components/BaseModal.vue';
import HighlightedTitle from '@/shared/components/HighlightedTitle.vue';
import TechStackCard from '@/features/portfolio/components/cards/TechStackCard.vue';
const route = useRoute();
const router = useRouter();
const portfolioStore = usePortfolioStore();

const technologies = computed(() => portfolioStore.technologies);

// --- Animation Logic ---
const { observe } = inject('observer');
const viewRoot = ref(null);
const isMounted = ref(false);
onMounted(() => { isMounted.value = true; });

const isDataReady = computed(() => technologies.value && technologies.value.length > 0);

const setupAnimations = () => {
  if (viewRoot.value) {
    const header = viewRoot.value.querySelector('.animate-on-scroll');
    if (header) {
      observe(header);
    }
  }
};

watchEffect(() => {
  if (isMounted.value && isDataReady.value) {
    setupAnimations();
  }
});
// --- End Animation Logic ---

// --- Modal Logic (No changes needed) ---
const isModalVisible = ref(false);
const selectedTech = ref(null);

const openModal = (tech) => {
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

watch(() => route.query.open, (newId) => {
  if (newId && technologies.value.length) {
    const techToOpen = technologies.value.find(t => t.id == newId);
    if (techToOpen) {
      openModal(techToOpen);
    }
  } else {
    if (isModalVisible.value) closeModal();
  }
}, { immediate: true });

watch(technologies, (newTechs) => {
  if (route.query.open && newTechs.length) {
    const techToOpen = newTechs.find(t => t.id == route.query.open);
    if (techToOpen) {
      openModal(techToOpen);
    }
  }
});
</script>
