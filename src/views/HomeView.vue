<template>
  <TheHeader @navigate="handleNavigation" />

  <div class="relative min-h-screen antialiased text-white bg-brand-dark">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 bg-brand-dark"
      :class="{ 'opacity-0 pointer-events-none': !isLoading }"
    >
      <img src="@/assets/images/icons/loading.svg" alt="Loading GIF" class="w-30 h-30" />
    </div>
    <main class="pt-24">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '@/components/sections/TheHeader.vue'
import TheFooter from '@/components/sections/TheFooter.vue'

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
  },
  data() {
    return {
      isLoading: false, // State untuk loader saat navigasi rute
    }
  },
  watch: {
    // Menampilkan loader saat navigasi rute dimulai
    '$route.path': {
      handler() {
        this.isLoading = true
        // Simulasi waktu loading, sesuaikan dengan kebutuhan Anda
        setTimeout(() => {
          this.isLoading = false
          // Re-observe elements after new content is rendered
          this.$nextTick(() => {
            this.initIntersectionObserver()
          })
        }, 500) // Durasi simulasi loading
      },
      immediate: true, // Trigger saat komponen pertama kali dimuat
    },
  },
  mounted() {
    // Inisialisasi Intersection Observer saat pertama kali dimuat
    this.initIntersectionObserver()
  },
  methods: {
    initIntersectionObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          } else {
            entry.target.classList.remove('is-visible')
          }
        })
      })

      document.querySelectorAll('.fade-in-up-on-scroll').forEach((el) => {
        // Pastikan elemen hanya diobservasi sekali atau reset state-nya
        el.classList.remove('is-visible') // Reset state untuk re-trigger animasi
        observer.unobserve(el) // entikan observasi sebelumnya jika ada
        observer.observe(el)
      })
    },
  },
}
</script>

<style>
/* Global styles */
/* ... (existing styles like .animate-on-load, .load-delay-x) ... */

/* Vue Router Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Styles for fade-in-up-on-scroll */
.fade-in-up-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;
}

.fade-in-up-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* card-home styles (pindahkan jika ada di global) */
.card-home {
  /* Add your card styles here */
  background-color: var(--brand-gray); /* Example */
  border-radius: 0.75rem; /* Example: rounded-xl */
  padding: 1.5rem; /* Example: p-6 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Example */
}

/* Animate Marquee */
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  } /* Half of the content length to loop smoothly */
}

.animate-marquee {
  animation: marquee 20s linear infinite; /* Adjust duration as needed */
  white-space: nowrap; /* Prevent wrapping */
  display: flex; /* Ensure flex behavior */
  min-width: max-content; /* Allow content to overflow */
}
</style>
