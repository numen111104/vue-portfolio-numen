<template>
  <section id="projects" class="container px-4 py-12 mx-auto text-white md:px-8 lg:px-16">
    <div class="flex flex-col mb-10 md:flex-row md:justify-between md:items-start">
      <div ref="titleBlock" class="max-w-xl animate-on-scroll fade-in-left-on-scroll">
        <h2 class="mb-4 text-3xl font-bold text-white md:text-4xl">
          Innovating for a
          <span class="text-brand-yellow">Brighter Future</span>
        </h2>
        <p class="text-brand-text/80">
          I innovate to create solutions that pave the way for a brighter and more sustainable
          future.
        </p>
      </div>
      <router-link ref="discoverButton" to="/project"
        class="flex items-center justify-between mt-6 space-x-2 btn btn-primary group md:mt-0 animate-on-scroll fade-in-right-on-scroll">
        <span>Discover More</span>
        <IconArrowRight class="w-5 h-5 transition-transform duration-300 transform group-hover:rotate-45" />
      </router-link>
    </div>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <ProjectCard v-for="(project, index) in displayedProjects" :key="project.id" :project="project" :observe="observe"
        :delay="index * 100" />
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, inject } from 'vue'; // <-- Tambahkan ref dan onMounted kembali
import { usePortfolioStore } from '@/stores/portfolio';
import { IconArrowRight } from '@tabler/icons-vue';
import ProjectCard from '../cards/ProjectCard.vue';

const portfolioStore = usePortfolioStore();
const projects = computed(() => portfolioStore.projects);
const displayedProjects = computed(() => projects.value.slice(0, 3));

const { observe } = inject('observer');
const titleBlock = ref(null);
const discoverButton = ref(null);

onMounted(() => {
  if (titleBlock.value) {
    observe(titleBlock.value);
  }
  if (discoverButton.value) {
     observe(discoverButton.value.$el);
  }
});
</script>
