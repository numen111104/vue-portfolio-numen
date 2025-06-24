<template>
  <header
    class="fixed top-0 left-0 right-0 z-40 px-4 py-6 md:px-8 bg-brand-dark/80 backdrop-blur-md animate-on-load animate-page-load"
  >
    <div class="container flex items-center justify-center mx-auto">
      <nav class="items-center hidden space-x-6 md:flex">
        <router-link
          to="/"
          class="transition-colors hover:text-brand-yellow"
          active-class="text-brand-yellow"
          >HOME</router-link
        >

        <router-link
          to="/about"
          class="text-white transition-colors hover:text-brand-yellow"
          active-class="text-brand-yellow"
          >ABOUT</router-link
        >

        <router-link
          to="/project"
          class="text-white transition-colors hover:text-brand-yellow"
          active-class="text-brand-yellow"
          >PROJECTS</router-link
        >
        <router-link
          to="/experience"
          class="text-white transition-colors hover:text-brand-yellow"
          active-class="text-brand-yellow"
          >EXPERIENCES</router-link
        >
        <router-link
          to="/testimonial"
          class="text-white transition-colors hover:text-brand-yellow"
          active-class="text-brand-yellow"
          >TESTIMONIALS</router-link
        >
      </nav>
      <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-white md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 transform -translate-y-4"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform -translate-y-4"
    >
      <div
        v-if="mobileMenuOpen"
        @click="mobileMenuOpen = false"
        class="absolute left-0 right-0 p-4 shadow-lg md:hidden top-full bg-brand-gray"
      >
        <router-link
          to="/"
          class="block py-2 hover:text-brand-yellow"
          active-class="text-brand-yellow"
          @click="mobileMenuOpen = false"
          >HOME</router-link
        >
        <router-link
          to="/about"
          class="block py-2 text-white hover:text-brand-yellow"
          active-class="text-brand-yellow"
          @click="mobileMenuOpen = false"
          >ABOUT</router-link
        >
        <router-link
          to="/project"
          class="block py-2 text-white hover:text-brand-yellow"
          active-class="text-brand-yellow"
          @click="mobileMenuOpen = false"
          >PROJECTS</router-link
        >
        <router-link
          to="/experience"
          class="block py-2 text-white hover:text-brand-yellow"
          active-class="text-brand-yellow"
          @click="mobileMenuOpen = false"
          >EXPERIENCES</router-link
        >
        <router-link
          to="/testimonial"
          class="block py-2 text-white hover:text-brand-yellow"
          active-class="text-brand-yellow"
          @click="mobileMenuOpen = false"
          >TESTIMONIALS</router-link
        >
        <a href="#" class="block w-full mt-2 text-center btn btn-primary">HIRE ME</a>
      </div>
    </transition>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      mobileMenuOpen: false,
    }
  },
}
</script>

<style scoped>
/* Scoped styles for the header if needed */
.router-link-exact-active {
  color: var(--color-brand-yellow); /* Example: Highlight active link */
  font-weight: bold;
}
</style>
