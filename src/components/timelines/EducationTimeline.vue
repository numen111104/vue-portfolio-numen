<template>
  <section ref="timelineRoot" :class="props.class">
    <div class="animate-on-scroll fade-in-down-on-scroll">
      <HighlightedTitle lighter="Timeline" unlighter="Education" />
      <p class="text-brand-text/80">
        Sharpening my skills through continuous learning and real-world application.
      </p>
    </div>
    <div class="container px-4 py-8 mx-auto md:px-8 lg:px-16 text-white">
      <div class="relative wrap overflow-hidden p-6 md:p-10 h-full">
        <div class="absolute border-opacity-20 border-brand-gray h-full border timeline-line" style="left: 50%"></div>

        <div v-if="!educations.length" class="text-center text-gray-400">
          No education history found.
        </div>

        <div v-for="(edu, index) in educations" :key="edu.id"
          class="mb-8 flex justify-between items-center w-full timeline-item animate-on-scroll"
          :class="index % 2 === 0 ? 'right-aligned fade-in-right-on-scroll' : 'left-aligned fade-in-left-on-scroll'">
          <div class="order-1 w-5/12 hidden md:block"></div>
          <div
            class="z-20 flex items-center order-1 bg-brand-yellow shadow-xl w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 rounded-full">
          </div>
          <div
            class="order-1 rounded-lg shadow-xl w-full md:w-5/12 px-6 py-4 card transition-all duration-300 ease-in-out hover:scale-105">
            <div class="flex items-center gap-x-2 mb-3 text-brand-yellow">
              <IconCalendar class="w-5 h-5" />
              <p class="text-sm font-semibold">
                {{ formatPeriod(edu.start_date, edu.end_date) }}
              </p>
            </div>
            <div class="flex flex-col md:flex-row md:items-start gap-4 mb-3">
              <img :src="`/storage/${edu.logo_url}`" :alt="edu.institution_name"
                class="md:w-20 md:h-20 w-16 h-16 object-contain rounded-md text-center mx-auto md:mx-0p-1" />
              <div>
                <h3 class="mb-2 text-xl font-semibold text-white text-center md:text-left">
                  {{ edu.institution_name }}
                </h3>
                <p class="text-sm leading-relaxed text-gray-400 text-center md:text-left">
                  {{ edu.description }}
                </p>
              </div>
            </div>
            <div v-if="edu.documentations && edu.documentations.length" class="mt-4">
              <ImageViewer :images="fullImageUrls(edu.documentations)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, inject, watchEffect } from 'vue'; // Import hooks
import HighlightedTitle from '../ui/HighlightedTitle.vue';
import ImageViewer from '../ui/ImageViewer.vue';
import { IconCalendar } from '@tabler/icons-vue';

const props = defineProps({
  class: { type: String, default: '' },
  educations: { type: Array, required: true, default: () => [] }
});

// --- Logika Animasi ---
const { observe } = inject('observer');
const timelineRoot = ref(null);
const isMounted = ref(false);

onMounted(() => { isMounted.value = true; });

// Kondisi data siap adalah ketika prop 'educations' memiliki isi
const isDataReady = computed(() => props.educations && props.educations.length > 0);

const setupAnimations = () => {
  if (timelineRoot.value) {
    const elements = timelineRoot.value.querySelectorAll('.animate-on-scroll');
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
// --- Akhir Logika Animasi ---

const formatPeriod = (start, end) => {
  const startDate = new Date(start).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  const endDate = end ? new Date(end).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present';
  return `${startDate} - ${endDate}`;
};

const fullImageUrls = (documentations) => {
  if (!documentations) return [];
  return documentations.map(path => `/storage/${path}`);
}
</script>

<style scoped>
.wrap {
  position: relative;
}

.timeline-line {
  position: absolute;
  top: 0;
  width: 5px;
  height: 100%;
  background: linear-gradient(to bottom, var(--tw-border-brand-gray), var(--tw-border-brand-gray));
  transform: translateX(-50%);
  overflow: hidden;
  left: 50%;
}

.timeline-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: linear-gradient(to bottom,
      rgba(255, 255, 255, 0),
      rgba(242, 255, 0, 0.8),
      rgba(255, 255, 255, 0));
  animation: movingLight 6s infinite linear;
}

@keyframes movingLight {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(200vh);
  }
}

.z-20 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
}

.card {
  position: relative;
}

.timeline-item {
  position: relative;
  display: flex;
  align-items: center;
}

@media (min-width: 768px) {
  .timeline-line {
    left: 50%;
    transform: translateX(-50%);
  }

  .z-20 {
    position: static;
    transform: none;
  }

  .timeline-item.right-aligned {
    flex-direction: row;
  }

  .timeline-item.left-aligned {
    flex-direction: row-reverse;
  }
}

@media (max-width: 767px) {
  .timeline-line {
    left: 50%;
    transform: translateX(-50%);
  }

  .z-20 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-left: 0;
  }

  .timeline-item {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .timeline-item .order-1.hidden.md\:block {
    display: none;
  }

  .timeline-item>.card {
    margin-left: 0;
    margin-top: 20px;
    width: 90%;
    max-width: 300px;
    text-align: center;
  }

  .timeline-item .card h3,
  .timeline-item .card p {
    text-align: center !important;
  }

  .timeline-item .card .flex {
    justify-content: center !important;
  }

  .timeline-item .card .flex img {
    margin-left: auto !important;
    margin-right: auto !important;
  }

  .timeline-item .card .flex>div {
    text-align: center !important;
  }

  .timeline-item .card .flex>div p {
    text-align: center !important;
  }
}
</style>
