<template>
  <div ref="viewRoot" class="flex flex-col items-center justify-center min-h-screen text-center text-white px-4">
    <div class="max-w-md">
      <h1 class="text-9xl font-bold text-brand-yellow animate-on-scroll fade-in-down-on-scroll">404</h1>
      <h2 class="mt-4 text-4xl font-semibold text-white animate-on-scroll fade-in-down-on-scroll"
        style="transition-delay: 100ms;">Page Not Found</h2>
      <p class="mt-4 text-lg text-brand-text/80 animate-on-scroll fade-in-up-on-scroll"
        style="transition-delay: 200ms;">
        Oops! The page you are looking for does not exist. It might have been moved or deleted.
      </p>
    </div>
    <router-link :to="{ name: 'home' }"
      class="mt-8 btn btn-primary group py-3 px-6 text-base uppercase tracking-wider animate-on-scroll fade-in-up-on-scroll"
      style="transition-delay: 300ms;">
      <span class="flex items-center">
        <IconHome class="mr-2" />
        Go Back Home
      </span>
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, nextTick } from 'vue'; // 1. Import nextTick
import { IconHome } from '@tabler/icons-vue';

const { observe } = inject('observer');
const viewRoot = ref(null);

onMounted(() => {
  // 2. Wrap the logic in nextTick
  nextTick(() => {
    if (viewRoot.value) {
      const elements = viewRoot.value.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => {
        observe(el);
      });
    }
  });
});
</script>
