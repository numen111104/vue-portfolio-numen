<template>
  <div ref="cardElement"
    class="flex flex-col items-start gap-6 p-6 sm:flex-row rounded-xl bg-brand-gray card-home animate-on-scroll fade-in-up-on-scroll"
    :style="{ transitionDelay: `${delay}ms` }">
    <img v-if="experience.thumbnail_url" :src="`/storage/${experience.thumbnail_url}`" :alt="experience.title"
      class="shrink-0 object-cover w-full rounded-lg sm:w-28 sm:h-28 bg-gray-800" />
    <div v-else class="shrink-0 w-full sm:w-28 sm:h-28 rounded-lg bg-gray-800"></div>

    <div>
      <span class="block mb-1 text-sm font-medium text-brand-yellow">
        {{ formatDate(experience.start_date) }} - {{ experience.end_date ? formatDate(experience.end_date) : 'Present'
        }}
      </span>
      <h3 class="mb-2 text-xl font-semibold text-white">
        {{ experience.title }} - {{ experience.organization_name }}
      </h3>
      <p class="mb-4 text-sm leading-relaxed text-gray-400">
        {{ experience.description?.substring(0, 200) }}...
      </p>
      <router-link :to="`/experience/${experience.id}`"
        class="inline-flex items-center text-brand-yellow hover:text-yellow-300 group">
        <span>Read more</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-4 h-4 ml-2 transition-transform duration-300 transform group-hover:translate-x-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  experience: Object,
  observe: Function,
  delay: Number,
});

const cardElement = ref(null);

onMounted(() => {
  if (cardElement.value && props.observe) {
    props.observe(cardElement.value);
  }
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
};
</script>
