<template>
  <section
    id="projects"
    class="container px-4 py-12 mx-auto text-white md:px-8 lg:px-16"
  >
    <div class="flex flex-col mb-10 md:flex-row md:justify-between md:items-start">
      <div class="max-w-xl">
        <h2 class="mb-4 text-3xl font-bold text-white md:text-4xl">
          Innovating for a
          <span class="text-brand-yellow">Brighter Future</span>
        </h2>
        <p class="text-brand-text/80">
          I innovate to create solutions that pave the way for a brighter and more sustainable
          future.
        </p>
      </div>
      <router-link
        to="/project"
        class="flex items-center justify-between mt-6 space-x-2 btn btn-primary group md:mt-0"
      >
        <span>Discover More</span>
        <IconArrowRight class="w-5 h-5 transition-transform duration-300 transform group-hover:rotate-45" />
      </router-link>
    </div>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="(project, index) in projects" :key="project.id"
        class="project-card card-home fade-in-up-on-scroll is-visible"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <img
          v-if="project.thumbnail_url"
          :src="`/storage/${project.thumbnail_url}`"
          :alt="project.title"
          class="object-cover w-full h-48 mb-4 rounded-lg"
        />
        <div v-else class="w-full h-48 mb-4 rounded-lg bg-brand-gray"></div>

        <h3 class="mb-2 text-xl font-semibold text-white">
          {{ project.title }}
        </h3>

        <div class="flex items-center gap-3 mb-4 text-brand-yellow flex-wrap">
          <div v-for="tech in project.technologies" :key="tech.id" class="inline-flex items-center space-x-2">
            <img
              :src="`/storage/${tech.icon_url}`"
              :alt="tech.name"
              class="w-5 h-5 object-contain"
            />
            <span class="text-sm font-medium">{{ tech.name }}</span>
          </div>
        </div>

        <p class="mb-4 text-sm text-gray-400">
          {{ project.short_description }}
        </p>
        <router-link :to="{ name: 'project', query: { open: project.id } }" class="inline-flex items-center text-brand-yellow hover:text-yellow-300 group">
          <span>Read more</span>
          <IconArrowRight class="w-4 h-4 ml-2 transition-transform duration-300 transform group-hover:translate-x-1" />
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { usePortfolioStore } from '@/stores/portfolio';
import { IconArrowRight } from '@tabler/icons-vue';

const portfolioStore = usePortfolioStore();
const projects = computed(() => portfolioStore.projects.slice(0, 3));
</script>
