<template>
  <main class="container px-4 py-8 mx-auto text-white md:px-8 lg:px-16">
    <div v-if="experience" class="max-w-4xl mx-auto">
      <!-- Header -->
      <section class="mb-8 text-center animate-on-load load-delay-1">
        <HighlightedTitle :unlighter="experience.title" :lighter="experience.company" />
        <p class="mt-2 text-lg text-brand-yellow">{{ experience.date }}</p>
      </section>

      <!-- Image -->
      <section class="mb-8 animate-on-load load-delay-2">
        <img :src="experience.image" :alt="experience.title" class="object-cover w-full rounded-lg shadow-lg max-h-96" />
      </section>

      <!-- Full Description -->
      <section class="p-6 rounded-lg bg-brand-gray animate-on-load load-delay-3">
        <h3 class="mb-4 text-2xl font-bold text-white">About the Experience</h3>
        <div class="prose prose-invert max-w-none text-gray-300 max-h-[50vh] overflow-y-auto pr-4">
          <p>{{ experience.full_description }}</p>
        </div>
      </section>

       <!-- Back Button -->
      <div class="mt-12 text-center animate-on-load load-delay-4">
        <router-link to="/experience" class="btn btn-primary">
          &larr; Back to All Experiences
        </router-link>
      </div>

    </div>
    <div v-else class="text-center">
      <h2 class="text-2xl text-brand-yellow">Experience not found</h2>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { experiences } from '@/data/experiences.js'
import HighlightedTitle from '@/components/common/HighlightedTitle.vue'

const route = useRoute()
const experience = ref(null)

onMounted(() => {
  const experienceId = parseInt(route.params.id, 10)
  experience.value = experiences.find((exp) => exp.id === experienceId)
})
</script>

<style scoped>
.prose {
  line-height: 1.75;
}

/* Custom scrollbar for the description */
.prose::-webkit-scrollbar {
  width: 6px;
}

.prose::-webkit-scrollbar-track {
  background: var(--color-brand-gray);
}

.prose::-webkit-scrollbar-thumb {
  background: var(--color-brand-light-gray);
  border-radius: 6px;
}

.prose::-webkit-scrollbar-thumb:hover {
  background: var(--color-brand-yellow);
}
</style>
