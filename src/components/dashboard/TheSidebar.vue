<template>
  <aside ref="sidebar"
    class="no-scrollbar group absolute left-0 top-0 z-40 flex h-screen shrink-0 flex-col overflow-y-auto bg-brand-gray border-r border-brand-light-gray p-4 transition-all duration-500 ease-in-out lg:static lg:left-auto lg:top-auto lg:overflow-y-auto"
    :class="[
      sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      sidebarExpanded ? 'w-64' : 'w-20 hover:w-64',
    ]">

    <!-- Sidebar header -->
    <div class="relative flex items-center mb-8 h-8" :class="!sidebarExpanded ? 'justify-center group-hover:justify-between' : 'justify-between'">
        <!-- Logo & Title -->
        <router-link to="/admin/dashboard" class="flex items-center">
            <img v-if="appSettingsStore.logoUrl" :src="$storage(appSettingsStore.logoUrl)" alt="Site Logo" class="w-10 h-10 shrink-0 object-cover ms-3">
            <IconBrandTabler v-else class="w-10 h-10 shrink-0 text-brand-yellow" />
            <span
                class="text-white text-lg font-bold ml-3 whitespace-nowrap transition-all duration-200 ease-in-out"
                :class="sidebarExpanded ? 'max-w-xs opacity-100' : 'max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100'"
            >
                Portfolio
            </span>
        </router-link>

        <!-- Buttons -->
        <div class="absolute top-1/2 -translate-y-1/2 right-0">
            <!-- Desktop Collapse/Expand Button -->
            <button
                class="hidden lg:block text-gray-400 hover:text-brand-yellow transition-opacity duration-300"
                :class="sidebarExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'"
                @click.stop="$emit('update:sidebar-expanded', !sidebarExpanded)"
            >
                <span class="sr-only">Expand / collapse sidebar</span>
                <IconCircleDot v-if="sidebarExpanded" class="w-6 h-6" />
                <IconCircle v-else class="w-6 h-6" />
            </button>

            <!-- Mobile Close Button -->
            <button class="lg:hidden text-gray-400 hover:text-brand-yellow" @click.stop="$emit('toggle-sidebar')">
                <span class="sr-only">Close sidebar</span>
                <IconX class="h-6 w-6" />
            </button>
        </div>
    </div>

    <!-- Links -->
    <div class="space-y-8">
      <div>
        <!-- Links group -->
        <div class="px-3 py-2">
          <h3 class="text-xs font-semibold uppercase text-gray-500">
            <div class="flex items-center" :class="!sidebarExpanded && 'justify-start'">
              <span :class="sidebarExpanded ? 'block' : 'hidden group-hover:block'
                ">Portfolio</span>
              <span :class="sidebarExpanded ? 'hidden' : 'block group-hover:hidden'
                ">
                <IconDots class="h-6 w-6" />
              </span>
            </div>
          </h3>
        </div>

        <ul class="space-y-2">
          <li class="mb-0.5 rounded-sm px-3 py-2 last:mb-0"
            :class="{ 'bg-brand-yellow': $route.path === '/admin/dashboard' }">
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
            :class="{ 'bg-brand-yellow': $route.path.includes('/admin/experiences') }">
            <router-link class="block truncate transition duration-150 hover:text-gray-500"
              :class="{ 'text-brand-dark': $route.path.includes('/admin/experiences') }" to="/admin/experiences">
              <div class="flex items-center">
                <IconBriefcase class="h-6 w-6 shrink-0" />
                <span class="ml-3 text-sm font-medium"
                  :class="!sidebarExpanded && 'lg:hidden lg:group-hover:block'">Experiences</span>
              </div>
            </router-link>
          </li>
          <li class="mb-0.5 rounded-sm px-3 py-2 last:mb-0"
            :class="{ 'bg-brand-yellow': $route.path.includes('/admin/projects') }">
            <router-link class="block truncate transition duration-150 hover:text-gray-500"
              :class="{ 'text-brand-dark': $route.path.includes('/admin/projects') }" to="/admin/projects">
              <div class="flex items-center">
                <IconAssembly class="h-6 w-6 shrink-0" />
                <span class="ml-3 text-sm font-medium"
                  :class="!sidebarExpanded && 'lg:hidden lg:group-hover:block'">Projects</span>
              </div>
            </router-link>
          </li>
          <li class="mb-0.5 rounded-sm px-3 py-2 last:mb-0"
            :class="{ 'bg-brand-yellow': $route.path.includes('/admin/education') }">
            <router-link class="block truncate transition duration-150 hover:text-gray-500"
              :class="{ 'text-brand-dark': $route.path.includes('/admin/education') }" to="/admin/education">
              <div class="flex items-center">
                <IconSchool class="h-6 w-6 shrink-0" />
                <span class="ml-3 text-sm font-medium"
                  :class="!sidebarExpanded && 'lg:hidden lg:group-hover:block'">Education</span>
              </div>
            </router-link>
          </li>
          <li class="mb-0.5 rounded-sm px-3 py-2 last:mb-0"
            :class="{ 'bg-brand-yellow': $route.path.includes('/admin/tech-stacks') }">
            <router-link class="block truncate transition duration-150 hover:text-gray-500"
              :class="{ 'text-brand-dark': $route.path.includes('/admin/tech-stacks') }" to="/admin/tech-stacks">
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
              :class="{ 'text-brand-dark': $route.path.includes('/admin/certifications') }" to="/admin/certifications">
              <div class="flex items-center">
                <IconCertificate class="h-6 w-6 shrink-0" />
                <span class="ml-3 text-sm font-medium"
                  :class="!sidebarExpanded && 'lg:hidden lg:group-hover:block'">Certifications</span>
              </div>
            </router-link>
          </li>
          <li class="mb-0.5 rounded-sm px-3 py-2 last:mb-0"
            :class="{ 'bg-brand-yellow': $route.path.includes('/admin/testimonials') }">
            <router-link class="block truncate transition duration-150 hover:text-gray-500"
              :class="{ 'text-brand-dark': $route.path.includes('/admin/testimonials') }" to="/admin/testimonials">
              <div class="flex items-center">
                <IconMessageCircle class="h-6 w-6 shrink-0" />
                <span class="ml-3 text-sm font-medium"
                  :class="!sidebarExpanded && 'lg:hidden lg:group-hover:block'">Testimonials</span>
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


        <div class="px-3 py-2">
          <h3 class="text-xs font-semibold uppercase text-gray-500">
            <div class="flex items-center" :class="!sidebarExpanded && 'justify-start'">
              <span :class="sidebarExpanded ? 'block' : 'hidden group-hover:block'
                ">Settings</span>
              <span :class="sidebarExpanded ? 'hidden' : 'block group-hover:hidden'
                ">
                <IconDots class="h-6 w-6" />
              </span>
            </div>
          </h3>
        </div>

        <ul class="space-y-2">
          <li class="mb-0.5 rounded-sm px-3 py-2 last:mb-0"
            :class="{ 'bg-brand-yellow': $route.path.includes('/admin/hero-settings') }">
            <router-link class="block truncate transition duration-150 hover:text-gray-500"
              :class="{ 'text-brand-dark': $route.path.includes('/admin/hero-settings') }" to="/admin/hero-settings">
              <div class="flex items-center">
                <IconHome class="h-6 w-6 shrink-0" />
                <span class="ml-3 text-sm font-medium"
                  :class="!sidebarExpanded && 'lg:hidden lg:group-hover:block'">Hero Settings</span>
              </div>
            </router-link>
          </li>
          <li class="mb-0.5 rounded-sm px-3 py-2 last:mb-0"
            :class="{ 'bg-brand-yellow': $route.path.includes('/admin/about-content') }">
            <router-link class="block truncate transition duration-150 hover:text-gray-500"
              :class="{ 'text-brand-dark': $route.path.includes('/admin/about-content') }" to="/admin/about-content">
              <div class="flex items-center">
                <IconUser class="h-6 w-6 shrink-0" />
                <span class="ml-3 text-sm font-medium"
                  :class="!sidebarExpanded && 'lg:hidden lg:group-hover:block'">About Content</span>
              </div>
            </router-link>
          </li>
          <li class="mb-0.5 rounded-sm px-3 py-2 last:mb-0"
            :class="{ 'bg-brand-yellow': $route.path.includes('/admin/cache-management') }">
            <router-link class="block truncate transition duration-150 hover:text-gray-500"
              :class="{ 'text-brand-dark': $route.path.includes('/admin/cache-management') }" to="/admin/cache-management">
              <div class="flex items-center">
                <IconDatabase class="h-6 w-6 shrink-0" />
                <span class="ml-3 text-sm font-medium"
                  :class="!sidebarExpanded && 'lg:hidden lg:group-hover:block'">Cache</span>
              </div>
            </router-link>
          </li>
          <li class="mb-0.5 rounded-sm px-3 py-2 last:mb-0"
            :class="{ 'bg-brand-yellow': $route.path.includes('/admin/site-settings') }">
            <router-link class="block truncate transition duration-150 hover:text-gray-500"
              :class="{ 'text-brand-dark': $route.path.includes('/admin/site-settings') }" to="/admin/site-settings">
              <div class="flex items-center">
                <IconSettings class="h-6 w-6 shrink-0" />
                <span class="ml-3 text-sm font-medium"
                  :class="!sidebarExpanded && 'lg:hidden lg:group-hover:block'">Site Settings</span>
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
  IconX,
  IconDots,
  IconLayoutDashboard,
  IconBriefcase,
  IconHome,
  IconCode,
  IconCertificate,
  IconLink,
  IconSchool,
  IconUser,
  IconMessageCircle,
  IconAssembly,
  IconDatabase,
  IconSettings,
  IconBrandTabler,
  IconCircle,
  IconCircleDot,
} from '@tabler/icons-vue';
import { useAppSettingsStore } from '@/stores/appSettings';

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

const appSettingsStore = useAppSettingsStore();
</script>
