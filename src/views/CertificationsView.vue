<template>
  <div class="container px-4 py-16 mx-auto text-white md:px-8 lg:px-16">
    <div class="flex sm:flex-row flex-col justify-between animate-on-load load-delay-1">
      <div class="mb-1">
        <HighlightedTitle unlighter="My" lighter="Certifications" />
        <p class="section-subtitle">
          A collection of certifications I've earned throughout my learning journey.
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="(cert, index) in certifications" :key="index" class="card animate-on-load"
        :style="{ animationDelay: `${(index + 2) * 0.1}s` }">
        <img :src="cert.image" :alt="cert.title" class="object-cover w-full h-48 rounded-t-lg" />
        <div class="p-6">
          <h4 class="text-lg font-semibold text-brand-yellow">{{ cert.title }}</h4>
          <p class="mt-2 text-sm text-gray-400">Issued by: {{ cert.issuer }}</p>
          <p class="text-sm text-gray-400">Date: {{ cert.date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HighlightedTitle from '@/components/common/HighlightedTitle.vue'

const certifications = ref([
  {
    title: 'Vue.js Certified Developer',
    issuer: 'Vue School',
    date: '2023-10-15',
    image: 'https://placehold.co/600x400/dfff00/0f172a?text=Vue.js+Cert',
  },
  {
    title: 'Tailwind CSS Fundamentals',
    issuer: 'Tailwind Labs',
    date: '2023-08-20',
    image: 'https://placehold.co/600x400/dfff00/0f172a?text=Tailwind+Cert',
  },
  {
    title: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
    date: '2023-05-30',
    image: 'https://placehold.co/600x400/dfff00/0f172a?text=JS+Cert',
  },
  {
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: '2023-03-10',
    image: 'https://placehold.co/600x400/dfff00/0f172a?text=RWD+Cert',
  },
  {
    title: 'UI/UX Design Principles',
    issuer: 'Coursera',
    date: '2022-12-05',
    image: 'https://placehold.co/600x400/dfff00/0f172a?text=UI/UX+Cert',
  },
  {
    title: 'Git Essential Training',
    issuer: 'LinkedIn Learning',
    date: '2022-11-20',
    image: 'https://placehold.co/600x400/dfff00/0f172a?text=Git+Cert',
  },
])
</script>

<style scoped>
/* The global styles from input.css will be applied */
</style>
