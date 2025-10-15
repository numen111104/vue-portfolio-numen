<template>
  <div ref="homeViewRoot">
    <HeroSection />
    <AboutSection />
    <ProjectSection />
    <ExperienceSection />
    <TestimonialSection />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useIntersectionObserver } from '@/composables/useIntersectionObserver';

import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ProjectSection from '@/components/sections/ProjectSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import TestimonialSection from '@/components/sections/TestimonialSection.vue'

const homeViewRoot = ref(null);
const { observe } = useIntersectionObserver();

onMounted(() => {
  // Wait for the next DOM update cycle to ensure all child components are rendered.
  nextTick(() => {
    if (homeViewRoot.value) {
      // Find all containers that should have their children staggered
      const staggerContainers = homeViewRoot.value.querySelectorAll('.stagger-container');
      staggerContainers.forEach((container) => {
        const elements = container.querySelectorAll('.animate-on-scroll');
        elements.forEach((el, index) => {
          el.style.transitionDelay = `${index * 100}ms`;
        });
      });

      // Find all individual elements that need to be animated
      const elementsToAnimate = homeViewRoot.value.querySelectorAll('.animate-on-scroll');
      elementsToAnimate.forEach(el => {
        observe(el);
      });
    }
  });
});
</script>
