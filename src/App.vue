<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router' // Impor useRoute

// Impor komponen layout global
import TheHeader from '@/components/sections/TheHeader.vue'
import TheFooter from '@/components/sections/TheFooter.vue'

// --- Mouse Tracking Spotlight Logic ---
const mouseX = ref(0)
const mouseY = ref(0)
const spotlightSize = 50 // Ukuran sorotan dalam piksel
const brandYellowRgba = 'rgba(255, 215, 0, 0.2)' // Sesuaikan warna dan opasitas

const throttle = (func, limit) => {
  let inThrottle
  return function () {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

const rawUpdateMousePosition = (event) => {
  mouseX.value = event.clientX
  mouseY.value = event.clientY
}

const throttledUpdateMousePosition = throttle(rawUpdateMousePosition, 10) // Sesuaikan delay

onMounted(() => {
  window.addEventListener('mousemove', throttledUpdateMousePosition)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', throttledUpdateMousePosition)
})

// --- Page Loader & Route Change Loader Logic ---
const pageLoaded = ref(false) // Untuk loader saat startup awal aplikasi
const isLoading = ref(false) // Untuk loader saat navigasi antar rute

const route = useRoute() // Dapatkan objek rute saat ini

watch(
  () => route.path,
  async (newPath, oldPath) => {
    if (newPath !== oldPath) {
      // Hanya picu jika rute benar-benar berubah
      isLoading.value = true // Tampilkan loader navigasi
      await nextTick() // Pastikan DOM telah diperbarui untuk komponen yang baru dimuat
      setTimeout(() => {
        isLoading.value = false // Sembunyikan loader navigasi
        initIntersectionObserver() // Panggil ulang IO setelah komponen baru dirender
      }, 500) // Durasi simulasi loading
    }
  },
  { immediate: true },
) // Trigger watch saat komponen pertama kali dimuat (untuk rute awal)

// Initial page load effect for the very first load of App.vue
onMounted(() => {
  setTimeout(() => (pageLoaded.value = true), 200)
})

// --- Intersection Observer Logic ---
const initIntersectionObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        } else {
          entry.target.classList.remove('is-visible')
        }
      })
    },
    { threshold: 0.01 },
  ) // Sesuaikan threshold jika diperlukan

  // Amati semua elemen yang memiliki kelas animasi di seluruh DOM
  const elementsToObserve = document.querySelectorAll(
    '.fade-in-up-on-scroll, .fade-in-down-on-scroll, .fade-in-left-on-scroll, .fade-in-right-on-scroll',
  )

  elementsToObserve.forEach((el) => {
    // Reset state dan unobserve sebelum observe lagi untuk memastikan animasi terpicu ulang
    el.classList.remove('is-visible')
    observer.unobserve(el)
    observer.observe(el)
  })
}
</script>

<template>
  <div class="app-container">
    <div
      class="mouse-spotlight"
      :style="{
        'background-image': `radial-gradient(circle at ${mouseX}px ${mouseY}px, ${brandYellowRgba} 0%, transparent ${spotlightSize}px)`,
      }"
    ></div>

    <div
      v-if="!pageLoaded"
      class="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 bg-brand-dark"
      :class="{ 'opacity-0 pointer-events-none': pageLoaded }"
    >
      <img src="@/assets/images/icons/loading.svg" alt="Loading GIF" class="w-30 h-30" />
    </div>

    <TheHeader />

    <main v-show="pageLoaded" class="pt-24 min-h-[calc(100vh-6rem)]">
      <div
        v-if="isLoading"
        class="fixed inset-0 z-[999] flex items-center justify-center transition-opacity duration-300 bg-brand-dark/80 backdrop-blur-sm"
        :class="{ 'opacity-0 pointer-events-none': !isLoading }"
      >
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

<style>
.app-container {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden; /* Mencegah horizontal scroll jika ada elemen melebihi viewport */
  display: flex;
  flex-direction: column;
}

/* Mouse spotlight */
.mouse-spotlight {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  mix-blend-mode: lighten; /* Atau 'screen', 'overlay' */
  z-index: 999; /* Di bawah loader/modal utama (z-index 1000) */
  transition: background-image 0.08s linear;
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
