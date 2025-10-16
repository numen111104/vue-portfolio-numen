<template>
  <div ref="cardElement"
    class="overflow-hidden transition-all duration-500 transform rounded-lg cursor-pointer card hover:-translate-y-2 animate-on-scroll fade-in-up-on-scroll"
    :style="{ transitionDelay: `${delay}ms` }" @click="emit('open', project)">
    <img class="object-cover w-full h-48 rounded-lg" :src="project.thumbnail_url" :alt="project.title" />
    <div class="p-6">
      <h5 class="mb-2 text-lg font-bold tracking-tight text-white">
        {{ project.title }}
      </h5>
      <p class="mb-4 font-normal text-gray-400">
        {{ project.short_description }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  project: Object,
  observe: Function,
  delay: Number,
});

const emit = defineEmits(['open']);

const cardElement = ref(null);

onMounted(() => {
  if (cardElement.value && props.observe) {
    props.observe(cardElement.value);
  }
});
</script>
