<template>
  <section ref="sectionRoot" id="experiences"
    class="container px-4 py-8 mx-auto text-white md:px-8 lg:px-16 bg-brand-dark">
    <div class="flex flex-col mb-10 md:flex-row md:justify-between md:items-start">
      <div ref="titleBlock" class="max-w-3xl animate-on-scroll fade-in-left-on-scroll">
        <HighlightedTitle lighter="innovation" unlighter="Years of experience driving" />
        <p class="text-brand-text/80">
          With years of experience, I specialize in driving innovation and creating impactful
          solutions.
        </p>
      </div>
      <router-link ref="discoverButton" to="/experience"
        class="flex items-center justify-between mt-6 space-x-2 btn btn-primary group md:mt-0 animate-on-scroll fade-in-right-on-scroll">
        <span>Discover More</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-5 h-5 transition-transform duration-300 transform group-hover:rotate-45">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </router-link>
    </div>

    <div v-if="uiStore.isLoading && experiences.length === 0" class="text-center">
      <IconLoader2 class="animate-spin inline-block w-8 h-8" />
    </div>
    <div v-else class="flex flex-col gap-8">
      <ExperienceCard v-for="(exp, index) in experiences" :key="exp.id" :experience="exp" :observe="observe"
        :delay="index * 100" />
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, inject } from 'vue';
import HighlightedTitle from '@/shared/components/HighlightedTitle.vue';
import { IconLoader2 } from '@tabler/icons-vue';
import { useUiStore } from '@/stores/ui';
import { usePortfolioStore } from '@/stores/portfolio';
import ExperienceCard from '@/features/portfolio/components/cards/ExperienceCard.vue';

const portfolioStore = usePortfolioStore();
const experiences = computed(() => portfolioStore.experiences.slice(0, 3));
const uiStore = useUiStore();

const { observe } = inject('observer');

const sectionRoot = ref(null);
const titleBlock = ref(null);
const discoverButton = ref(null);

onMounted(() => {
  if (titleBlock.value) observe(titleBlock.value);
  if (discoverButton.value) observe(discoverButton.value.$el); // Jangan lupa .$el untuk komponen
});
</script>

<style scoped>
.card-home {
  background-color: var(--brand-gray);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
