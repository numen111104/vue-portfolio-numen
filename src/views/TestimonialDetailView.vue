<template>
  <main ref="viewRoot" class="container px-4 py-8 mx-auto text-white md:px-8 lg:px-16">
    <div class="animate-on-scroll fade-in-down-on-scroll">
      <HighlightedTitle unlighter="The" lighter="Testimonials" />
      <p class="section-subtitle">
        What my clients, colleagues, and friends say about my work.
      </p>
    </div>
    <section class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <TestimonialListCard v-for="(testimonial, index) in testimonials" :key="testimonial.id" :testimonial="testimonial"
        :observe="observe" :delay="index * 100" />
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, inject, watchEffect } from 'vue';
import HighlightedTitle from '@/components/ui/HighlightedTitle.vue';
import { usePortfolioStore } from '@/stores/portfolio';
import TestimonialListCard from '@/components/cards/TestimonialListCard.vue';

const portfolioStore = usePortfolioStore();
const testimonials = computed(() => portfolioStore.testimonials);

// --- Animation Logic ---
const { observe } = inject('observer');
const viewRoot = ref(null);
const isMounted = ref(false);
onMounted(() => { isMounted.value = true; });

const isDataReady = computed(() => testimonials.value && testimonials.value.length > 0);

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
