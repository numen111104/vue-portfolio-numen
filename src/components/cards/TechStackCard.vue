<template>
  <div
    ref="cardElement"
    class="flex flex-col items-center justify-center p-6 text-center transition-all duration-300 rounded-lg cursor-pointer card hover:shadow-brand-yellow/20 animate-on-scroll fade-in-up-on-scroll"
    :style="{ transitionDelay: `${delay}ms` }"
    @click="emit('open', tech)"
  >
    <img :src="`/storage/${tech.icon_url}`" :alt="tech.name" class="w-20 h-20 mb-4 object-contain" />
    <h4 class="text-lg font-semibold text-white">{{ tech.name }}</h4>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  tech: Object,
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
