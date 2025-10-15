<template>
  <section
    id="experiences"
    class="container px-4 py-8 mx-auto text-white md:px-8 lg:px-16 bg-brand-dark"
  >
    <div class="flex flex-col mb-10 md:flex-row md:justify-between md:items-start">
      <div class="max-w-3xl">
        <HighlightedTitle lighter="innovation" unlighter="Years of experience driving" />
        <p class="text-brand-text/80">
          With years of experience, I specialize in driving innovation and creating impactful
          solutions.
        </p>
      </div>
      <router-link
        to="/experience"
        class="flex items-center justify-between mt-6 space-x-2 btn btn-primary group md:mt-0"
      >
        <span>Discover More</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 transition-transform duration-300 transform group-hover:rotate-45"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
          />
        </svg>
      </router-link>
    </div>

    <div v-if="uiStore.isLoading && experiences.length === 0" class="text-center">
        <IconLoader2 class="animate-spin inline-block w-8 h-8" />
    </div>
    <div v-else class="flex flex-col gap-8">
      <div
        v-for="(exp, index) in experiences"
        :key="exp.id"
        class="flex flex-col items-start gap-6 p-6 sm:flex-row rounded-xl bg-brand-gray card-home"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <img
          v-if="exp.thumbnail_url"
          :src="`/storage/${exp.thumbnail_url}`"
          :alt="exp.title"
          class="shrink-0 object-cover w-full rounded-lg sm:w-28 sm:h-28 bg-gray-800"
        />
        <div v-else class="shrink-0 w-full sm:w-28 sm:h-28 rounded-lg bg-gray-800"></div>

        <div>
          <span class="block mb-1 text-sm font-medium text-brand-yellow">
            {{ formatDate(exp.start_date) }} - {{ exp.end_date ? formatDate(exp.end_date) : 'Present' }}
          </span>
          <h3 class="mb-2 text-xl font-semibold text-white">
            {{ exp.title }} - {{ exp.organization_name }}
          </h3>
          <p class="mb-4 text-sm leading-relaxed text-gray-400">
            {{ exp.description?.substring(0, 200) }}...
          </p>
          <router-link
            :to="`/experience/${exp.id}`"
            class="inline-flex items-center text-brand-yellow hover:text-yellow-300 group"
          >
            <span>Read more</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 ml-2 transition-transform duration-300 transform group-hover:translate-x-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import HighlightedTitle from '../ui/HighlightedTitle.vue';
import { IconLoader2 } from '@tabler/icons-vue';
import { useUiStore } from '@/stores/ui';
import { usePortfolioStore } from '@/stores/portfolio';

const portfolioStore = usePortfolioStore();
const experiences = computed(() => portfolioStore.experiences.slice(0, 3));
const uiStore = useUiStore();

const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
};
</script>

<style scoped>
.card-home {
  background-color: var(--brand-gray);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
