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
import { onMounted } from 'vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ProjectSection from '@/components/sections/ProjectSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import TestimonialSection from '@/components/sections/TestimonialSection.vue'

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
  )

  const elementsToObserve = document.querySelectorAll(
    '.fade-in-up-on-scroll, .fade-in-down-on-scroll, .fade-in-left-on-scroll, .fade-in-right-on-scroll',
  )

  elementsToObserve.forEach((el) => {
    el.classList.remove('is-visible')
    observer.unobserve(el)
    observer.observe(el)
  })
}

onMounted(() => {
  initIntersectionObserverForHomeView()
})
</script>
