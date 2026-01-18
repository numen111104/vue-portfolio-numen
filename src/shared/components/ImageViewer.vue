<template>
  <div>
    <viewer :options="viewerOptions" :images="images" @inited="inited" class="image-viewer-container">
      <template #default="scope">
        <!-- Gallery view for multiple images -->
        <div v-if="scope.images.length > 1" class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          <img v-for="src in scope.images" :src="src" :key="src" @error="handleImageError"
            class="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity" :alt="alt">
        </div>
        <!-- Single image view -->
        <div v-else-if="scope.images.length === 1">
          <img :src="scope.images[0]" @error="handleImageError"
            :class="[sizeClass, 'object-contain rounded-md cursor-pointer hover:opacity-80 transition-opacity bg-white/10 p-1']" :alt="alt">
        </div>
      </template>
    </viewer>
  </div>
</template>

<script setup>
import 'viewerjs/dist/viewer.css';
import { component as Viewer } from "v-viewer";

defineProps({
  images: {
    type: Array,
    required: true,
    default: () => []
  },
  alt: {
    type: String,
    default: 'Gallery'
  },
  sizeClass: {
    type: String,
    default: 'h-12 w-auto'
  }
});

const placeholderImage = 'https://placehold.co/400x400/1e293b/e2e8f0?text=Invalid+Image';

const handleImageError = (event) => {
  event.target.src = placeholderImage;
};

const viewerOptions = {
  inline: false,
  button: true,
  navbar: true,
  title: true,
  toolbar: true,
  tooltip: true,
  movable: true,
  zoomable: true,
  rotatable: true,
  scalable: true,
  transition: true,
  fullscreen: true,
  keyboard: true,
};

let viewerInstance = null;
const inited = (viewer) => {
  viewerInstance = viewer;
};
</script>

<style scoped>
.image-viewer-container :deep(.viewer-container) {
  background-color: rgba(0, 0, 0, 0.8);
}

.image-viewer-container :deep(.viewer-canvas) {
  background-color: transparent;
}

.image-viewer-container :deep(.viewer-toolbar > ul > li),
.image-viewer-container :deep(.viewer-navbar > ul > li) {
  background-color: rgba(30, 30, 30, 0.8);
  border-radius: 4px;
}

.image-viewer-container :deep(.viewer-toolbar > ul > li:hover),
.image-viewer-container :deep(.viewer-navbar > ul > li:hover) {
  background-color: rgba(50, 50, 50, 0.9);
}

.image-viewer-container :deep(.viewer-title) {
  color: #FFF;
  font-size: 1rem;
}
</style>