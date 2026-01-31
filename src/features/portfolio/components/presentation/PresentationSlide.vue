<template>
  <div class="presentation-slide flex h-screen w-full flex-col items-center justify-center px-6 py-12 md:px-16"
    :class="slideClasses">
    <!-- Opening Slide -->
    <div v-if="variant === 'opening'" class="text-center animate-on-load load-delay-1">
      <h1 class="mb-6 text-4xl font-bold leading-tight tracking-tight text-brand-yellow sm:text-5xl md:text-6xl">
        {{ title }}
      </h1>
      <p class="mb-12 text-xl text-brand-text/80 md:text-2xl">
        {{ subtitle }}
      </p>
      <div v-if="meta" class="space-y-4 text-base text-brand-text/70 md:text-lg">
        <p>{{ meta.event }}</p>
        <p class="text-brand-yellow">{{ meta.speaker }}</p>
      </div>
    </div>

    <!-- Content Slide -->
    <div v-else-if="variant === 'content'" class="w-full max-w-4xl animate-on-load load-delay-1">
      <h2 class="mb-8 text-3xl font-bold text-brand-yellow md:mb-12 md:text-5xl">
        {{ title }}
      </h2>
      <ul class="space-y-6" v-if="content">
        <li v-for="(item, index) in content" :key="index" class="flex items-start gap-4 animate-on-load"
          :class="`load-delay-${index + 2}`">
          <span class="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-brand-yellow"></span>
          <span class="text-lg leading-relaxed text-brand-text md:text-xl">{{ item }}</span>
        </li>
      </ul>
    </div>

    <!-- Closing Slide -->
    <div v-else-if="variant === 'closing'" class="text-center animate-on-load load-delay-1">
      <h1 class="mb-6 text-4xl font-bold text-brand-yellow sm:text-5xl md:text-6xl">
        {{ title }}
      </h1>
      <p class="mb-12 text-2xl text-brand-text/80 md:text-3xl">
        {{ subtitle }}
      </p>
      <div v-if="content && content.length" class="text-xl text-brand-text md:text-2xl">
        <p v-for="(item, index) in content" :key="index">{{ item }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    required: true,
    validator: (value) => ['opening', 'content', 'closing'].includes(value),
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  content: {
    type: Array,
    default: () => [],
  },
  meta: {
    type: Object,
    default: null,
  },
})

const slideClasses = computed(() => {
  return {
    'justify-center': props.variant === 'opening' || props.variant === 'closing',
    'justify-start pt-20': props.variant === 'content',
  }
})
</script>

<!-- <style scoped>
.presentation-slide {
  background: linear-gradient(135deg, var(--color-brand-dark) 0%, #1a2332 100%);
}
</style> -->
