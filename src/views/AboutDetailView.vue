<template>
  <main ref="viewRoot" class="container px-4 py-8 mx-auto text-white md:px-8 lg:px-16">
    <div v-if="uiStore.isLoading && !aboutContent" class="text-center min-h-screen pt-20">
      <IconLoader2 class="animate-spin inline-block w-12 h-12" />
    </div>
    <template v-else-if="aboutContent">
      <section class="min-h-[20rem] h-[30rem] grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div v-if="aboutContent.image_1_url"
          class="w-full hidden md:block bg-center bg-cover rounded-2xl brand-border card-home animate-on-scroll fade-in-left-on-scroll"
          :style="{ backgroundImage: `url(/storage/${aboutContent.image_1_url})` }"></div>
        <div v-if="aboutContent.image_2_url"
          class="w-full bg-top bg-cover rounded-2xl brand-border card-home animate-on-scroll fade-in-right-on-scroll"
          :style="{ backgroundImage: `url(/storage/${aboutContent.image_2_url})`, transitionDelay: '100ms' }"></div>
      </section>

      <section class="mb-8 p-4 md:p-0 animate-on-scroll fade-in-up-on-scroll">
        <p class="text-brand-text text-2xl md:text-4xl font-semibold">Hi👋, I'm Nu'man Nasyar MZ</p>
        <p class="text-brand-text text-xl md:text-2xl font-medium">
          Fullstack Developer Enthusiast | Lifetime Learner
        </p>
      </section>

      <section class="card mb-8 animate-on-scroll fade-in-up-on-scroll">
        <h2 class="text-brand-text font-semibold text-xl mb-4">About Me</h2>
        <p class="text-gray-400 font-normal text-base leading-relaxed whitespace-pre-line">
          {{ aboutContent.bio }}
        </p>
      </section>

      <section class="flex flex-col md:flex-row gap-8 mb-8 items-stretch animate-on-scroll zoom-in-on-scroll">
        <div class="card w-full md:w-2/3 flex flex-col">
          <h2 class="text-brand-text font-semibold text-xl mb-4">My Passion</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
            <div v-for="(passion, index) in aboutContent.passions" :key="index" class="text-brand-text">
              <p class="text-lg font-medium">{{ passion.title }}</p>
              <p class="text-sm font-light text-gray-400">
                {{ passion.description }}
              </p>
            </div>
          </div>
        </div>

        <div class="card w-full md:w-1/3 flex flex-col">
          <h2 class="text-brand-text font-semibold text-xl mb-4">Language</h2>
          <div class="flex flex-col space-y-4 h-full justify-center">
            <div v-for="(lang, index) in aboutContent.languages" :key="index" class="flex items-center text-brand-text">
              <img v-if="lang.icon_url" :src="`/storage/${lang.icon_url}`" :alt="lang.name"
                class="w-14 h-14 object-cover rounded-full mr-3 flex-shrink-0 bg-gray-700 p-1" />
              <div v-else class="w-12 h-12 bg-gray-600 rounded-full mr-3 flex-shrink-0"></div>
              <div>
                <p class="font-semibold">{{ lang.name }}</p>
                <p class="text-xs text-gray-400">
                  {{ lang.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EducationTimeline :educations="educations" class="animate-on-scroll fade-in-up-on-scroll" />
    </template>
  </main>
</template>

<script setup>
import { ref, onMounted, computed, inject, watchEffect } from 'vue';
import EducationTimeline from '@/components/timelines/EducationTimeline.vue';
import { IconLoader2 } from '@tabler/icons-vue';
import { useUiStore } from '@/stores/ui';
import { usePortfolioStore } from '@/stores/portfolio';

const uiStore = useUiStore();
const portfolioStore = usePortfolioStore();

const aboutContent = computed(() => portfolioStore.about);
const educations = computed(() => portfolioStore.educations);

// --- Logika Animasi ---
const { observe } = inject('observer');
const viewRoot = ref(null);
const isMounted = ref(false);

onMounted(() => { isMounted.value = true; });

// KONDISI 'isDataReady' SEKARANG LEBIH LENGKAP
const isDataReady = computed(() => {
  return aboutContent.value &&
    aboutContent.value.image_1_url && // Tunggu gambar 1
    aboutContent.value.image_2_url && // Tunggu gambar 2
    educations.value && educations.value.length > 0; // Tunggu data edukasi
});

const setupAnimations = () => {
  if (viewRoot.value) {
    const elements = viewRoot.value.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
      el.classList.remove('is-visible');
      observe(el);
    });
  }
};

watchEffect(() => {
  if (isMounted.value && isDataReady.value) {
    setupAnimations();
  }
});
</script>
