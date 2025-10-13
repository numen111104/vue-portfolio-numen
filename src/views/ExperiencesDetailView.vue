<template>
  <main class="container px-4 py-8 mx-auto text-white md:px-8 lg:px-16">
    <!-- Page Header -->
    <section class="flex sm:flex-row flex-col animate-on-load load-delay-1">
      <div class="mb-10">
        <HighlightedTitle unlighter="Crafted by" lighter="Experience" />
        <p class="section-subtitle">
          Not just what I’ve done, but what I’ve learned, built, and conquered along the way.
        </p>
      </div>
    </section>

    <div v-if="uiStore.isLoading && experiences.length === 0" class="text-center py-20">
        <IconLoader2 class="animate-spin inline-block w-12 h-12" />
    </div>

    <!-- Experiences List -->
    <div v-else class="flex flex-col gap-8">
      <div v-for="(experience, index) in experiences" :key="experience.id"
        class="flex flex-col items-start gap-6 p-6 transition-all duration-300 ease-in-out sm:flex-row card "
        :class="`animate-on-load load-delay-${index + 2}`">
        <img v-if="experience.thumbnail_url" :src="`/storage/${experience.thumbnail_url}`" :alt="experience.title" class="object-cover w-full rounded-lg sm:w-48 sm:h-auto bg-gray-800" />
        <div v-else class="shrink-0 w-full sm:w-48 h-32 rounded-lg bg-gray-800"></div>
        <div>
          <span class="block mb-1 text-sm font-medium text-brand-yellow">{{ formatDate(experience.start_date) }} - {{ experience.end_date ? formatDate(experience.end_date) : 'Present' }}</span>
          <h3 class="mb-2 text-xl font-semibold text-white">
            {{ experience.title }} - {{ experience.organization_name }}
          </h3>
          <p class="mb-6 text-sm leading-relaxed text-gray-400">
            {{ experience.description.substring(0, 250) }}...
          </p>
          <router-link :to="`/experience/${experience.id}`" class="inline-flex items-center btn btn-primary group">
            <span>Read More</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 ml-2 transition-transform duration-300 transform group-hover:translate-x-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import HighlightedTitle from '@/components/ui/HighlightedTitle.vue';
import apiService from '@/services/apiService';
import { IconLoader2 } from '@tabler/icons-vue';
import { useUiStore } from '@/stores/ui';

const experiences = ref([]);
const uiStore = useUiStore();

const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
};

onMounted(async () => {
    uiStore.startLoading();
    try {
        const response = await apiService.get('/experiences');
        experiences.value = response.data.data;
    } catch (error) {
        console.error("Failed to fetch experiences:", error);
    } finally {
        uiStore.stopLoading();
    }
});
</script>