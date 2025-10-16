<template>
  <div ref="cardElement" class="card group cursor-pointer animate-on-scroll fade-in-up-on-scroll"
    :style="{ transitionDelay: `${delay}ms` }" @click="emit('open', certification)">
    <div class="overflow-hidden rounded-t-lg">
      <img :src="`/storage/${certification.credential_image_url}`" :alt="certification.title"
        class="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110" />
    </div>
    <div class="p-6">
      <h4 class="text-lg font-semibold text-brand-yellow">{{ certification.title }}</h4>
      <p class="mt-2 text-sm text-gray-400">Issued by: {{ certification.issuing_organization }}</p>
      <p class="text-sm text-gray-400">Date: {{ formatDate(certification.issue_date) }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  certification: Object,
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

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};
</script>
