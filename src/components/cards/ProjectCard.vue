<template>
  <div ref="cardElement" class="project-card card-home animate-on-scroll fade-in-up-on-scroll"
    :style="{ transitionDelay: `${delay}ms` }">
    <img v-if="project.thumbnail_url" :src="$storage(project.thumbnail_url)" :alt="project.title"
      class="object-cover w-full h-48 mb-4 rounded-lg" />
    <div v-else class="w-full h-48 mb-4 rounded-lg bg-brand-gray"></div>

    <h3 class="mb-2 text-xl font-semibold text-white">
      {{ project.title }}
    </h3>

    <div class="flex items-center gap-3 mb-4 flex-wrap">
      <div v-for="tech in project.technologies" :key="tech.id" class="inline-flex items-center space-x-2 bg-brand-light-gray text-brand-text rounded px-2 py-1">
        <img :src="`/storage/${tech.icon_url}`" :alt="tech.name" class="w-5 h-5 object-contain" />
        <span class="text-sm">{{ tech.name }}</span>
      </div>
    </div>

    <p class="mb-4 text-sm text-gray-400">
      {{ project.short_description }}
    </p>
    <router-link :to="{ name: 'project', query: { open: project.id } }"
      class="inline-flex items-center text-brand-yellow hover:text-yellow-300 group">
      <span>Read more</span>
      <IconArrowRight class="w-4 h-4 ml-2 transition-transform duration-300 transform group-hover:translate-x-1" />
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { IconArrowRight } from '@tabler/icons-vue';

const props = defineProps({
  project: Object,
  observe: Function,
  delay: Number,
});

const cardElement = ref(null);

onMounted(() => {
  if (cardElement.value && props.observe) {
    props.observe(cardElement.value);
  }
});
</script>
