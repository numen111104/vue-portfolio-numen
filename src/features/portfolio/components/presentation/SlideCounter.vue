<template>
  <div class="slide-counter" aria-live="polite" aria-label="Slide counter">
    <span class="current-slide">{{ current }}</span>
    <span class="separator"> / </span>
    <span class="total-slides">{{ total }}</span>
  </div>
</template>

<script setup>
defineProps({
  current: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
})
</script>

<style scoped>
.slide-counter {
  position: fixed;
  bottom: 1.5rem;
  right: 2rem;
  font-size: var(--text-sm);
  color: var(--color-brand-text);
  opacity: 0.7;
  z-index: 50;
  font-family: var(--font-montserrat);
  user-select: none;
}

.current-slide {
  font-weight: var(--font-weight-semibold);
  color: var(--color-brand-yellow);
}

.separator {
  margin: 0 0.25rem;
}

@media (max-width: 640px) {
  .slide-counter {
    bottom: 1rem;
    right: 1rem;
    font-size: var(--text-xs);
  }
}
</style>
