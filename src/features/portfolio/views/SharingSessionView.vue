<template>
  <div class="sharing-session-presentation" role="region" aria-label="Sharing Session Presentation">
    <!-- Navigation Hints (visible briefly at start) -->
    <transition name="fade">
      <div v-if="showHints" class="navigation-hints">
        <div class="hint">
          <span class="hint-icon">⌨️</span>
          <span class="hint-text">Tekan tombol apapun untuk lanjut</span>
        </div>
        <div class="hint">
          <span class="hint-icon">👈</span>
          <span class="hint-text">Panah kiri / Backspace untuk kembali</span>
        </div>
        <div class="hint mobile-only">
          <span class="hint-icon">👆</span>
          <span class="hint-text">Swipe untuk navigasi</span>
        </div>
      </div>
    </transition>

    <!-- Slide Container with Transition -->
    <transition :name="slideTransition" mode="out-in">
      <PresentationSlide :key="currentSlide" :variant="currentSlideData.variant" :title="currentSlideData.title"
        :subtitle="currentSlideData.subtitle" :content="currentSlideData.content" :meta="currentSlideData.meta" />
    </transition>

    <!-- Progress Bar -->
    <ProgressBar :progress="progress" />

    <!-- Slide Counter -->
    <SlideCounter :current="currentSlide + 1" :total="totalSlides" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePresentation } from '@/shared/composables/usePresentation'
import { sharingSessionSlides } from '@/features/portfolio/data/slidesData'

import PresentationSlide from '@/features/portfolio/components/presentation/PresentationSlide.vue'
import ProgressBar from '@/features/portfolio/components/presentation/ProgressBar.vue'
import SlideCounter from '@/features/portfolio/components/presentation/SlideCounter.vue'

// Presentation logic
const { currentSlide, totalSlides, progress } = usePresentation(sharingSessionSlides.length)

// Current slide data
const currentSlideData = computed(() => {
  return sharingSessionSlides[currentSlide.value] || sharingSessionSlides[0]
})

// Slide transition direction
const slideTransition = ref('slide-next')

// Watch for slide changes to update transition direction
let previousSlide = currentSlide.value
const updateTransition = () => {
  if (currentSlide.value > previousSlide) {
    slideTransition.value = 'slide-next'
  } else if (currentSlide.value < previousSlide) {
    slideTransition.value = 'slide-prev'
  }
  previousSlide = currentSlide.value
}

// Update transition on slide change
const unwatchSlide = computed(() => currentSlide.value)
const watchEffect = () => {
  unwatchSlide.value // Trigger reactivity
  updateTransition()
}
watchEffect()

// Navigation hints visibility
const showHints = ref(true)

onMounted(() => {
  // Hide hints after 5 seconds
  setTimeout(() => {
    showHints.value = false
  }, 5000)
})
</script>

<style scoped>
.sharing-session-presentation {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

/* Navigation Hints */
.navigation-hints {
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
  background-color: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(8px);
  border: 1px solid var(--color-brand-yellow);
  border-radius: var(--radius-lg);
  z-index: 100;
  max-width: 90%;
}

.hint {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-brand-text);
  font-size: var(--text-sm);
}

.hint-icon {
  font-size: 1.25rem;
}

.mobile-only {
  display: none;
}

@media (max-width: 768px) {
  .mobile-only {
    display: flex;
  }

  .navigation-hints {
    top: 1rem;
    padding: 1rem;
  }

  .hint {
    font-size: var(--text-xs);
  }
}

/* Slide Transitions - Next */
.slide-next-enter-active,
.slide-next-leave-active {
  transition: all 0.5s ease-in-out;
}

.slide-next-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.slide-next-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

/* Slide Transitions - Previous */
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: all 0.5s ease-in-out;
}

.slide-prev-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}

.slide-prev-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

/* Fade transition for hints */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
