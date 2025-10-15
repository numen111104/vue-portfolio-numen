<template>
  <main class="container px-4 py-8 mx-auto text-white md:px-8 lg:px-16">
    <HighlightedTitle unlighter="The" lighter="Testimonials" />
     <p class="section-subtitle">
          What my clients, colleagues, and friends say about my work.
        </p>
    <section class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="testimonial in testimonials" :key="testimonial.id"
        class="p-6 card transition-all duration-300 ease-in-out hover:scale-105">
        <div class="flex items-center gap-4 mb-4">
          <img :alt="testimonial.author_name"
            :src="testimonial.author_avatar_url ? testimonial.author_avatar_url : 'https://placehold.co/100x100/000000/FFF?text=AV'"
            class="object-cover w-16 h-16 rounded-full" />
          <div>
            <h4 class="font-semibold text-white text-lg">{{ testimonial.author_name }}</h4>
            <p class="text-sm text-gray-400">{{ testimonial.author_title }}</p>
          </div>
        </div>
        <p class="text-base leading-relaxed text-white">
          "{{ testimonial.testimonial_text }}"
        </p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue';
import HighlightedTitle from '@/components/ui/HighlightedTitle.vue';
import { usePortfolioStore } from '@/stores/portfolio';

const portfolioStore = usePortfolioStore();
const testimonials = computed(() => portfolioStore.testimonials);

</script>
