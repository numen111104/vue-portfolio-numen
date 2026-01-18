<template>
  <div ref="cardElement" class="p-6 card-home animate-on-scroll fade-in-up-on-scroll"
    :style="{ transitionDelay: `${delay}ms` }">
    <div class="flex items-center gap-4 mb-4">
      <img :alt="testimonial.author_name"
        :src="testimonial.author_avatar_url ? testimonial.author_avatar_url : `https://ui-avatars.com/api/?name=${testimonial.author_name}&background=334155&color=dfff00`"
        class="object-cover w-12 h-12 rounded-full" />
      <div>
        <h4 class="font-semibold text-white">{{ testimonial.author_name }}</h4>
        <p class="text-sm text-gray-400">{{ testimonial.author_title }}</p>
      </div>
    </div>
    <p class="text-sm leading-relaxed text-white">
      "{{ testimonial.testimonial_text }}"
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  testimonial: Object,
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
