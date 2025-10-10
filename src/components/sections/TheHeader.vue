<template>
  <!-- Header for Tablet and Desktop -->
  <header
    class="fixed top-0 left-0 right-0 z-40 hidden px-4 py-2 md:block bg-brand-dark/80 backdrop-blur-md animate-on-load animate-page-load">
    <div class="container flex items-center justify-center mx-auto">
      <!-- Tablet Nav (Icon + Text, No Expand) -->
      <nav class="items-center hidden space-x-1 md:flex lg:hidden">
        <router-link v-for="item in navItems" :key="item.name" :to="item.path"
          class="flex items-center px-3 py-1.5 text-sm transition-colors rounded-full text-white/80 hover:bg-brand-yellow hover:text-brand-dark"
          exact-active-class="active-link">
          <component :is="item.icon" class="w-5 h-5 mr-2 shrink-0" />
          <span class="whitespace-nowrap">{{ item.name }}</span>
        </router-link>
      </nav>

      <!-- Desktop Nav (Icon with Expand) -->
      <nav class="items-center hidden p-1 space-x-1 rounded-full lg:flex bg-black/20">
        <router-link v-for="item in navItems" :key="item.name" :to="item.path"
          class="flex items-center px-3 py-1.5 transition-all duration-300 rounded-full group text-white/70 hover:text-brand-yellow"
          exact-active-class="active-link">
          <component :is="item.icon" class="w-5 h-5" />
          <span class="nav-text">
            {{ item.name }}
          </span>
        </router-link>
      </nav>
    </div>
  </header>

  <!-- Mobile Bottom Nav (Icon Only) -->
  <nav
    class="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around p-2 md:hidden bg-brand-dark/80 backdrop-blur-md">
    <router-link v-for="item in navItems" :key="item.name" :to="item.path"
      class="flex items-center justify-center w-12 h-12 transition-colors rounded-full text-white/70 hover:bg-brand-yellow hover:text-brand-yellow"
      exact-active-class="active-link">
      <component :is="item.icon" class="w-7 h-7" />
    </router-link>
  </nav>
</template>

<script>
import {
  IconHome,
  IconUser,
  IconBriefcase,
  IconFileText,
  IconMessageCircle
} from '@tabler/icons-vue'

export default {
  name: 'TheHeader',
  components: {
    IconHome,
    IconUser,
    IconBriefcase,
    IconFileText,
    IconMessageCircle
  },
  data() {
    return {
      navItems: [
        { name: 'HOME', path: '/', icon: 'IconHome' },
        { name: 'ABOUT', path: '/about', icon: 'IconUser' },
        { name: 'PROJECTS', path: '/project', icon: 'IconBriefcase' },
        { name: 'EXPERIENCES', path: '/experience', icon: 'IconFileText' },
        { name: 'TESTIMONIALS', path: '/testimonial', icon: 'IconMessageCircle' }
      ]
    }
  }
}
</script>

<style scoped>
/* --- Desktop Nav --- */
.nav-text {
  max-width: 0;
  overflow: hidden;
  transition: max-width 0.4s ease-in-out, margin-left 0.4s ease-in-out;
  margin-left: 0;
  white-space: nowrap;
  font-size: 0.875rem;
  /* 14px */
  font-weight: 500;
}

.group:hover .nav-text,
.active-link.group .nav-text {
  max-width: 120px;
  margin-left: 0.5rem;
}

/* Common Active Link Style for All Views */
.active-link {
  background-color: var(--color-brand-yellow);
  color: var(--color-brand-dark);
}
</style>
