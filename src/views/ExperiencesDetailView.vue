<template>
  <main class="container px-4 py-8 mx-auto text-white md:px-8 lg:px-16">
    <!-- Page Header -->
    <section class="flex sm:flex-row flex-col animate-on-load load-delay-1">
      <div class="mb-10">
        <HighlightedTitle unlighter="Crafted by" lighter="Experience" />
        <p class="section-subtitle">
          Not just what I’ve done, but what I’ve learned, built, and conquered along the way.
        </p>
      </div>
    </section>

    <!-- Experiences List -->
    <div class="flex flex-col gap-8">
      <div v-for="(experience, index) in experiences" :key="experience.id"
        class="flex flex-col items-start gap-6 p-6 transition-all duration-300 ease-in-out sm:flex-row card "
        :class="`animate-on-load load-delay-${index + 2}`">
        <img :src="experience.image" :alt="experience.title" class="object-cover w-full rounded-lg sm:w-48 sm:h-auto" />
        <div>
          <span class="block mb-1 text-sm font-medium text-brand-yellow">{{ experience.date }}</span>
          <h3 class="mb-2 text-xl font-semibold text-white">
            {{ experience.title }}
          </h3>
          <p class="mb-6 text-sm leading-relaxed text-gray-400">
            {{ experience.short_description }}
          </p>
          <router-link :to="`/experience/${experience.id}`" class="inline-flex items-center btn btn-primary group">
            <span>Read More</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 ml-2 transition-transform duration-300 transform group-hover:translate-x-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import HighlightedTitle from '@/components/ui/HighlightedTitle.vue'
import { experiences } from '@/data/experiences.js'
</script>
