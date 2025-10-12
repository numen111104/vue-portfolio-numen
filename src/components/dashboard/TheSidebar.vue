<template>
  <aside ref="sidebar"
    class="no-scrollbar group absolute left-0 top-0 z-40 flex h-screen shrink-0 flex-col overflow-y-scroll bg-brand-gray border-r border-brand-light-gray p-4 transition-all duration-500 ease-in-out lg:static lg:left-auto lg:top-auto lg:overflow-y-auto"
    :class="[
      sidebarOpen ? 'translate-x-0' : '-translate-x-64',
      sidebarExpanded ? 'w-64' : 'w-20 hover:w-64',
    ]">
    <!-- Sidebar header -->
    <div class="mb-10 flex justify-end pr-3 sm:px-2">
      <!-- Logo -->
      <!-- <router-link class="block" to="/">
        <h1 class="text-2xl font-bold text-white" :class="!sidebarExpanded && 'lg:hidden lg:group-hover:block'">
          Dash<span class="text-brand-yellow">Board</span>
        </h1>
      </router-link> -->

      <!-- Close button (mobile) -->
      <button class="text-gray-400 hover:text-brand-yellow lg:hidden" @click.stop="$emit('toggle-sidebar')"
        aria-controls="sidebar" :aria-expanded="sidebarOpen">
        <span class="sr-only">Close sidebar</span>
        <IconArrowLeft class="h-6 w-6" />
      </button>

      <!-- Collapse button (desktop) -->
      <button class="hidden lg:block hover:text-brand-yellow transition-transform duration-300"
        :class="sidebarExpanded && 'rotate-180'" @click.stop="$emit('update:sidebar-expanded', !sidebarExpanded)">
        <span class="sr-only">Expand / collapse sidebar</span>
        <IconLayoutSidebarLeftCollapse class="h-6 w-6" />
      </button>
    </div>

    <!-- Links -->
    <div class="space-y-8">
      <div>
        <div class="px-3 py-2">
          <h3 class="text-xs font-semibold uppercase text-gray-500">
            <div class="flex items-center" :class="!sidebarExpanded && 'justify-start'">
              <span :class="sidebarExpanded ? 'block' : 'hidden group-hover:block'
                ">Pages</span>
              <span :class="sidebarExpanded ? 'hidden' : 'block group-hover:hidden'
                ">
                <IconDots class="h-6 w-6" />
              </span>
            </div>
          </h3>
        </div>
        <ul class="mt-3">
          <li class="mb-0.5 rounded-sm px-3 py-2 last:mb-0" :class="{ 'bg-brand-yellow': $route.path === '/admin/dashboard' }">
            <router-link class="block truncate transition duration-150 hover:text-gray-500"
              :class="{ 'text-brand-dark': $route.path === '/admin/dashboard' }" to="/admin/dashboard">
              <div class="flex items-center">
                <IconLayoutDashboard class="h-6 w-6 shrink-0" />
                <span class="ml-3 text-sm font-medium"
                  :class="!sidebarExpanded && 'lg:hidden lg:group-hover:block'">Dashboard</span>
              </div>
            </router-link>
          </li>
          <li class="mb-0.5 rounded-sm px-3 py-2 last:mb-0"
            :class="{ 'bg-brand-yellow': $route.path.includes('/admin/projects') }">
            <router-link class="block truncate transition duration-150 hover:text-gray-500"
              :class="{ 'text-brand-dark': $route.path.includes('/admin/projects') }"
              to="/admin/projects">
              <div class="flex items-center">
                <IconBriefcase class="h-6 w-6 shrink-0" />
                <span class="ml-3 text-sm font-medium"
                  :class="!sidebarExpanded && 'lg:hidden lg:group-hover:block'">Projects</span>
              </div>
            </router-link>
          </li>
          <li class="mb-0.5 rounded-sm px-3 py-2 last:mb-0"
            :class="{ 'bg-brand-yellow': $route.path.includes('/admin/hero-settings') }">
            <router-link class="block truncate transition duration-150 hover:text-gray-500"
              :class="{ 'text-brand-dark': $route.path.includes('/admin/hero-settings') }"
              to="/admin/hero-settings">
              <div class="flex items-center">
                <IconHome class="h-6 w-6 shrink-0" />
                <span class="ml-3 text-sm font-medium"
                  :class="!sidebarExpanded && 'lg:hidden lg:group-hover:block'">Hero Settings</span>
              </div>
            </router-link>
          </li>
          <li class="mb-0.5 rounded-sm px-3 py-2 last:mb-0"
            :class="{ 'bg-brand-yellow': $route.path.includes('/admin/tech-stacks') }">
            <router-link class="block truncate transition duration-150 hover:text-gray-500"
              :class="{ 'text-brand-dark': $route.path.includes('/admin/tech-stacks') }"
              to="/admin/tech-stacks">
              <div class="flex items-center">
                <IconCode class="h-6 w-6 shrink-0" />
                <span class="ml-3 text-sm font-medium"
                  :class="!sidebarExpanded && 'lg:hidden lg:group-hover:block'">Tech Stacks</span>
              </div>
            </router-link>
          </li>
          <li class="mb-0.5 rounded-sm px-3 py-2 last:mb-0"
            :class="{ 'bg-brand-yellow': $route.path.includes('/admin/certifications') }">
            <router-link class="block truncate transition duration-150 hover:text-gray-500"
              :class="{ 'text-brand-dark': $route.path.includes('/admin/certifications') }"
              to="/admin/certifications">
              <div class="flex items-center">
                <IconCertificate class="h-6 w-6 shrink-0" />
                <span class="ml-3 text-sm font-medium"
                  :class="!sidebarExpanded && 'lg:hidden lg:group-hover:block'">Certifications</span>
              </div>
            </router-link>
          </li>
          <li class="mb-0.5 rounded-sm px-3 py-2 last:mb-0"
            :class="{ 'bg-brand-yellow': $route.path.includes('/admin/social-media-links') }">
            <router-link class="block truncate transition duration-150 hover:text-gray-500"
              :class="{ 'text-brand-dark': $route.path.includes('/admin/social-media-links') }"
              to="/admin/social-media-links">
              <div class="flex items-center">
                <IconLink class="h-6 w-6 shrink-0" />
                <span class="ml-3 text-sm font-medium"
                  :class="!sidebarExpanded && 'lg:hidden lg:group-hover:block'">Social Links</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script setup>
import {
  IconArrowLeft,
  IconLayoutSidebarLeftCollapse,
  IconDots,
  IconLayoutDashboard,
  IconBriefcase,
  IconHome,
  IconCode,
  IconCertificate,
  IconLink
} from '@tabler/icons-vue';

defineProps({
  sidebarOpen: {
    type: Boolean,
    required: true,
  },
  sidebarExpanded: {
    type: Boolean,
    required: true,
  },
})

defineEmits(['toggle-sidebar', 'update:sidebar-expanded'])
</script>
