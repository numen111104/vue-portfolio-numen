<template>
  <div>
    <HeroSection />
    <AboutSection />
    <ProjectSection />
    <ExperienceSection />
    <TestimonialSection />
  </div>
</template>

<script setup>
import { onMounted } from 'vue' // Import onMounted
// Import all your section components
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ProjectSection from '@/components/sections/ProjectSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import TestimonialSection from '@/components/sections/TestimonialSection.vue'

// --- Intersection Observer Logic (DUPLICATE BUT NECESSARY FOR HOMEVIEW) ---
// Ini adalah duplikasi kode dari App.vue, tetapi penting untuk memastikan IO berjalan
// spesifik untuk elemen-elemen di HomeView ketika HomeView itu sendiri dimuat/direaktivasi.
const initIntersectionObserverForHomeView = () => {
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
    { threshold: 0.1 },
  ) // Gunakan threshold rendah untuk sensitivitas tinggi

  // Amati semua elemen yang memiliki kelas animasi di dalam HomeView
  const elementsToObserve = document.querySelectorAll(
    '.fade-in-up-on-scroll, .fade-in-down-on-scroll, .fade-in-left-on-scroll, .fade-in-right-on-scroll',
  )

  elementsToObserve.forEach((el) => {
    // Reset state dan unobserve sebelum observe lagi untuk memastikan animasi terpicu ulang
    el.classList.remove('is-visible') // Pastikan selalu dimulai dari tidak terlihat
    observer.unobserve(el) // Hentikan observasi sebelumnya jika ada
    observer.observe(el)
  })
}

onMounted(() => {
  // Panggil Intersection Observer saat HomeView dimount
  initIntersectionObserverForHomeView()
})
</script>

<style scoped>
/* No specific scoped styles needed for HomeView itself,
   as sections will have their own styles. */
</style>
