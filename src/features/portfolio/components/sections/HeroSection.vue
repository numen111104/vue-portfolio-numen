<template>
  <section ref="sectionRoot" id="home"
    class="container relative flex flex-col items-center px-4 py-12 mx-auto md:px-8 md:py-12 md:flex-row lg:px-16">
    <div class="mb-10 text-center md:w-1/2 md:text-left md:mb-0 animate-on-scroll fade-in-left-on-scroll">
      <div v-if="settings.badge_1_text"
        class="inline-flex items-center gap-2 px-3 py-1 mb-4 text-sm font-semibold rounded-full bg-brand-light-gray text-brand-yellow">
        <span class="relative flex w-2 h-2">
          <span class="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-brand-yellow"></span>
          <span class="relative inline-flex w-2 h-2 rounded-full bg-brand-yellow"></span>
        </span>
        {{ settings.badge_1_text }}
      </div>
      <span v-if="settings.badge_2_text"
        class="inline-block px-3 py-1 mb-4 ml-2 text-sm font-semibold rounded-full bg-brand-light-gray text-brand-yellow">{{
          settings.badge_2_text }}</span>
      <h1 class="text-4xl font-semibold leading-tight text-white uppercase sm:text-5xl md:text-6xl">
        <span class="inline text-brand-yellow">{{ settings.headline_part_1 }}</span>
        {{ settings.headline_part_2 }}
        <span class="inline text-brand-yellow">{{ settings.headline_part_3 }}</span>
      </h1>
      <h3 class="max-w-lg mx-auto mt-4 text-2xl font-semibold sm:text-3xl text-brand-text md:mx-0">
        {{ settings.name }}
      </h3>
      <h4 class="max-w-lg mx-auto mt-1 text-xl font-medium capitalize sm:text-2xl text-brand-text md:mx-0">
        {{ settings.title }}
      </h4>
      <a :href="settings.button_link" class="inline-flex items-center mt-8 space-x-2 btn btn-primary group">
        <span>{{ settings.button_text }}</span>
        <IconArrowRight class="w-5 h-5 transition-transform duration-300 transform group-hover:rotate-45" />
      </a>
    </div>
    <div class="relative justify-center flex md:w-1/2 animate-on-scroll zoom-in-on-scroll"
      style="transition-delay: 200ms;">
      <img v-if="settings.image_url" :src="$storage(settings.image_url)" alt="Programmer" class="w-full max-w-sm" />
      <div v-if="settings.metric_1_value"
        class="absolute left-0 p-4 shadow-lg -bottom-8 md:bottom-82 md:left-16 bg-brand-gray rounded-xl animate-float animate-on-scroll fade-in-up-on-scroll"
        style="animation-duration: 3.5s; transition-delay: 400ms;">
        <h3 class="text-2xl font-bold text-brand-yellow">{{ settings.metric_1_value }}</h3>
        <p class="text-sm text-white">{{ settings.metric_1_label }}</p>
      </div>
      <div v-if="settings.metric_2_value"
        class="absolute top-0 right-0 p-4 shadow-lg md:-top-4 md:right-20 bg-brand-gray rounded-xl animate-float animate-on-scroll fade-in-up-on-scroll"
        style="animation-delay: 0.5s; transition-delay: 500ms;">
        <h3 class="text-2xl font-bold text-brand-yellow">{{ settings.metric_2_value }}</h3>
        <p class="text-sm text-white">{{ settings.metric_2_label }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, inject, watchEffect } from 'vue'; // Import watchEffect
import { usePortfolioStore } from '@/stores/portfolio';
import { IconArrowRight } from '@tabler/icons-vue';

const portfolioStore = usePortfolioStore();
const settings = computed(() => portfolioStore.hero);

const { observe } = inject('observer');
const sectionRoot = ref(null);

// KONDISI 1: Apakah data sudah siap?
const isDataReady = computed(() => {
  return settings.value &&
    settings.value.name &&
    settings.value.metric_1_value &&
    settings.value.metric_2_value &&
    settings.value.metric_1_label &&
    settings.value.metric_2_label;
});

// KONDISI 2: Apakah komponen sudah di-mount?
const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});

// Fungsi untuk menjalankan setup animasi
const setupAnimations = () => {
  if (sectionRoot.value) {
    const elementsToAnimate = sectionRoot.value.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => {
      el.classList.remove('is-visible');
      observe(el);
    });
  }
};

// EFEK: Jalankan jika KEDUA kondisi terpenuhi
watchEffect(() => {
  if (isMounted.value && isDataReady.value) {
    setupAnimations();
  }
});
</script>
