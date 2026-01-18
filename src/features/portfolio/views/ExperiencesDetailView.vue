<template>
  <main ref="viewRoot" class="container px-4 py-8 mx-auto text-white md:px-8 lg:px-16">
    <section class="flex sm:flex-row flex-col animate-on-scroll fade-in-down-on-scroll">
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

    <div v-else class="flex flex-col gap-8">
      <ExperienceListCard v-for="(experience, index) in experiences" :key="experience.id" :experience="experience"
        :observe="observe" :delay="index * 100" />
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, inject, watchEffect } from 'vue';
import HighlightedTitle from '@/shared/components/HighlightedTitle.vue';
import { IconLoader2 } from '@tabler/icons-vue';
import { useUiStore } from '@/stores/ui';
import { usePortfolioStore } from '@/stores/portfolio';
import ExperienceListCard from '@/features/portfolio/components/cards/ExperienceListCard.vue';

const portfolioStore = usePortfolioStore();
const experiences = computed(() => portfolioStore.experiences);
const uiStore = useUiStore();

// --- Animation Logic ---
const { observe } = inject('observer');
const viewRoot = ref(null);
const isMounted = ref(false);
onMounted(() => { isMounted.value = true; });

const isDataReady = computed(() => experiences.value && experiences.value.length > 0);

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
</script>
