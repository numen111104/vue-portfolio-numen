<template>
  <div class="progress-bar-container">
    <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
  </div>
</template>

<script setup>
defineProps({
  progress: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 100,
  },
})
</script>

<style scoped>
.progress-bar-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: var(--color-brand-gray);
  z-index: 50;
}

.progress-bar {
  height: 100%;
  background-color: var(--color-brand-yellow);
  transition: width 0.3s ease-in-out;
}
</style>
