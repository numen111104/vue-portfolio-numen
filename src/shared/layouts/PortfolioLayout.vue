<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useUiStore } from '@/stores/ui';

import TheHeader from '@/features/portfolio/components/sections/TheHeader.vue'
import TheFooter from '@/features/portfolio/components/sections/TheFooter.vue'

// Global Stores
const uiStore = useUiStore();

// --- Spotlight Effect ---
const mouseX = ref(0);
const mouseY = ref(0);
const spotlightSize = 250;
const brandYellowRgba = 'rgba(223, 255, 0, 0.08)';

const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const rawUpdateMousePosition = (event) => {
  mouseX.value = event.clientX;
  mouseY.value = event.clientY;
};

const throttledUpdateMousePosition = throttle(rawUpdateMousePosition, 10);

const particles = ref([]);
let animationFrameId = null;
const fireworksCanvasRef = ref(null);
const spotlightCanvasRef = ref(null);
let fireworksCtx = null;
let spotlightCtx = null;

const fireworkColors = ['#dfff00', '#ffffff', '#facc15',];

const setupCanvases = () => {
  // Fireworks Canvas
  if (fireworksCanvasRef.value) {
    fireworksCtx = fireworksCanvasRef.value.getContext('2d');
    fireworksCanvasRef.value.width = window.innerWidth;
    fireworksCanvasRef.value.height = window.innerHeight;
  }
  // Spotlight Canvas
  if (spotlightCanvasRef.value) {
    spotlightCtx = spotlightCanvasRef.value.getContext('2d');
    spotlightCanvasRef.value.width = window.innerWidth;
    spotlightCanvasRef.value.height = window.innerHeight;
  }
};

const handleClick = (event) => {
  const startX = Math.random() * window.innerWidth;
  const startY = window.innerHeight + 50;
  const endX = event.clientX;
  const endY = event.clientY;

  particles.value.push({
    id: Math.random(),
    type: 'rocket',
    x: startX,
    y: startY,
    startX,
    startY,
    endX,
    endY,
    progress: 0,
    color: fireworkColors[Math.floor(Math.random() * fireworkColors.length)],
    size: 3,
  });
};

const animationLoop = () => {
  // --- Spotlight ---
  if (spotlightCtx && spotlightCanvasRef.value) {
    const canvas = spotlightCanvasRef.value;
    spotlightCtx.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = spotlightCtx.createRadialGradient(
      mouseX.value,
      mouseY.value,
      0,
      mouseX.value,
      mouseY.value,
      spotlightSize
    );
    gradient.addColorStop(0, brandYellowRgba);
    gradient.addColorStop(1, 'transparent');

    spotlightCtx.fillStyle = gradient;
    spotlightCtx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // --- Fireworks ---
  if (fireworksCtx && fireworksCanvasRef.value) {
    fireworksCtx.globalCompositeOperation = 'destination-in';
    fireworksCtx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    fireworksCtx.fillRect(0, 0, fireworksCanvasRef.value.width, fireworksCanvasRef.value.height);
    fireworksCtx.globalCompositeOperation = 'lighter';

    const newParticles = [];
    for (const p of particles.value) {
      let stillAlive = true;

      if (p.type === 'rocket') {
        p.progress += 0.05;
        const ease = p.progress * p.progress;
        p.x = p.startX + (p.endX - p.startX) * ease;
        p.y = p.startY + (p.endY - p.startY) * ease;

        if (p.progress >= 1) {
          stillAlive = false;
          const count = 60;
          for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 8 + 2;
            newParticles.push({
              id: Math.random(),
              type: 'fragment',
              x: p.x,
              y: p.y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              life: Math.random() * 40 + 80,
              color: fireworkColors[Math.floor(Math.random() * fireworkColors.length)],
              size: Math.random() * 2 + 1,
              drag: 0.96,
              gravity: 0.1,
              alpha: 1,
            });
          }
        }
      } else { // Fragment logic
        p.life -= 1;
        if (p.life <= 0) {
            stillAlive = false;
        } else {
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= p.drag;
            p.vy *= p.drag;
            p.vy += p.gravity;
            p.alpha = p.life / 80;
        }
      }

      if (stillAlive) {
        newParticles.push(p);
      }
    }
    particles.value = newParticles;

    for (const p of particles.value) {
        fireworksCtx.beginPath();
        fireworksCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
        fireworksCtx.fillStyle = p.color;
        fireworksCtx.globalAlpha = p.alpha || 1;
        fireworksCtx.fill();
    }
  }

  animationFrameId = requestAnimationFrame(animationLoop);
};

// --- Page Loader & Route Change Logic ---
const pageLoaded = ref(false)

// --- Lifecycle Hooks ---
onMounted(() => {
  setupCanvases();
  window.addEventListener('resize', setupCanvases);
  window.addEventListener('mousemove', throttledUpdateMousePosition)
  animationFrameId = requestAnimationFrame(animationLoop);
  setTimeout(() => (pageLoaded.value = true), 200)
})

onUnmounted(() => {
  window.removeEventListener('resize', setupCanvases);
  window.removeEventListener('mousemove', throttledUpdateMousePosition)
  cancelAnimationFrame(animationFrameId);
})

</script>

<template>
  <div class="app-container" @click="handleClick">
    <!-- Spotlight Canvas -->
    <canvas ref="spotlightCanvasRef" class="spotlight-canvas"></canvas>

    <!-- Fireworks Canvas -->
    <canvas ref="fireworksCanvasRef" class="fireworks-canvas"></canvas>

    <!-- Page Loader -->
    <div v-if="!pageLoaded"
      class="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 bg-brand-dark"
      :class="{ 'opacity-0 pointer-events-none': pageLoaded }">
      <img src="@/assets/images/icons/loading.svg" alt="Loading GIF" class="w-30 h-30" />
    </div>

    <TheHeader />

    <main v-show="pageLoaded" class="min-h-[calc(100vh-6rem)] pt-8 md:pt-20 pb-20 md:pb-0">
      <!-- Route Change Loader -->
      <div v-if="uiStore.isLoading"
        class="fixed inset-0 z-[999] flex items-center justify-center transition-opacity duration-300 bg-brand-dark/80 backdrop-blur-sm">
        <img src="@/assets/images/icons/loading.svg" alt="Loading GIF" class="w-30 h-30" />
      </div>

      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <TheFooter />
  </div>
</template>

<style scoped>
.app-container {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

/* Spotlight Canvas */
.spotlight-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  mix-blend-mode: lighten;
  z-index: 1000;
}

/* Fireworks Canvas */
.fireworks-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1001;
}

/* Vue Router Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
