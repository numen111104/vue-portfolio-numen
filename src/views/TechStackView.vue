<template>
  <div class="container px-4 py-16 mx-auto text-white md:px-8 lg:px-16">
    <div class="flex sm:flex-row flex-col justify-between animate-on-load load-delay-1">
      <div class="mb-1">
        <HighlightedTitle unlighter="My" lighter="Tech Stacks" />
        <p class="section-subtitle">
          A collection of technologies I use to build modern web applications.
        </p>
      </div>
    </div>

    <!-- Tech Stacks Grid -->
    <div class="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
      <div v-for="(stack, index) in techStacks" :key="stack.name"
        class="flex flex-col items-center justify-center p-6 text-center transition-all duration-300 rounded-lg cursor-pointer card hover:shadow-brand-yellow/20"
        @click="openModal(stack)">
        <img :src="stack.logo" :alt="stack.name" class="w-20 h-20 mb-4" />
        <h4 class="text-lg font-semibold text-white">{{ stack.name }}</h4>
      </div>
    </div>

    <!-- Tech Stack Detail Modal -->
    <BaseModal :show="isModalVisible" @close="closeModal" modal-class="max-w-2xl">
      <template #header>
        <div v-if="selectedStack" class="flex items-center gap-4">
          <img :src="selectedStack.logo" :alt="selectedStack.name" class="w-10 h-10" />
          <span>{{ selectedStack.name }}</span>
        </div>
      </template>

      <div v-if="selectedStack">
        <p class="text-gray-300">{{ selectedStack.description }}</p>

        <h5 class="mt-6 mb-4 text-xl font-semibold text-white">Related Projects</h5>
        <ul class="space-y-4">
          <li v-for="project in selectedStack.projects" :key="project.name"
            class="p-4 transition-colors duration-300 rounded-lg bg-brand-light-gray hover:bg-brand-gray">
            <h6 class="font-semibold text-brand-yellow">{{ project.name }}</h6>
            <p class="text-sm text-gray-400">{{ project.description }}</p>
          </li>
        </ul>
      </div>

      <template #footer>
        <button class="btn btn-secondary" @click="closeModal">Close</button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import HighlightedTitle from '@/components/ui/HighlightedTitle.vue'

const isModalVisible = ref(false)
const selectedStack = ref(null)

const techStacks = ref([
  {
    name: 'Vue.js',
    logo: 'https://placehold.co/100x100/000000/FFF?text=Vue',
    description:
      'An approachable, performant and versatile framework for building web user interfaces.',
    projects: [
      {
        name: 'Portfolio Website',
        description: 'This very website is built with Vue.js and Tailwind CSS.',
      },
      {
        name: 'Project Management Tool',
        description: 'A dashboard for managing projects and tasks, featuring a reactive UI.',
      },
    ],
  },
  {
    name: 'React',
    logo: 'https://placehold.co/100x100/000000/FFF?text=React',
    description: 'A JavaScript library for building user interfaces, maintained by Facebook.',
    projects: [
      {
        name: 'E-commerce Platform',
        description: 'A full-featured online store with a shopping cart and payment integration.',
      },
    ],
  },
  {
    name: 'Node.js',
    logo: 'https://placehold.co/100x100/000000/FFF?text=Node',
    description: "A JavaScript runtime built on Chrome's V8 JavaScript engine.",
    projects: [
      {
        name: 'Real-time Chat Application',
        description: 'A backend service using WebSockets for instant messaging.',
      },
    ],
  },
  {
    name: 'Tailwind CSS',
    logo: 'https://placehold.co/100x100/000000/FFF?text=TW',
    description: 'A utility-first CSS framework for rapidly building custom user interfaces.',
    projects: [
      {
        name: 'Portfolio Website',
        description: 'The entire UI of this site is styled using Tailwind CSS.',
      },
    ],
  },
  {
    name: 'Figma',
    logo: 'https://placehold.co/100x100/000000/FFF?text=Figma',
    description: 'A collaborative interface design tool for creating websites, apps, and more.',
    projects: [
      {
        name: 'Mobile App Prototype',
        description: 'Designed and prototyped a new mobile application for a client.',
      },
    ],
  },
  {
    name: 'Git',
    logo: 'https://placehold.co/100x100/000000/FFF?text=Git',
    description: 'A free and open source distributed version control system.',
    projects: [
      {
        name: 'All Projects',
        description: 'Used for version control in every single project I have worked on.',
      },
    ],
  },
])

const openModal = (stack) => {
  selectedStack.value = stack
  isModalVisible.value = true
}

const closeModal = () => {
  isModalVisible.value = false
}
</script>
