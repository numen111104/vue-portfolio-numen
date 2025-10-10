<template>
  <aside ref="sidebar"
    class="no-scrollbar group absolute left-0 top-0 z-40 flex h-screen shrink-0 flex-col overflow-y-scroll bg-brand-gray p-4 transition-all duration-500 ease-in-out lg:static lg:left-auto lg:top-auto lg:overflow-y-auto"
    :class="[
      sidebarOpen ? 'translate-x-0' : '-translate-x-64',
      sidebarExpanded ? 'w-64' : 'w-20 lg:hover:w-64',
    ]">
    <!-- Sidebar header -->
    <div class="mb-10 flex justify-between pr-3 sm:px-2">
      <!-- Logo -->
      <router-link class="block" to="/">
        <h1 class="text-2xl font-bold text-white" :class="!sidebarExpanded && 'lg:hidden lg:group-hover:block'">
          Dash<span class="text-brand-yellow">Board</span>
        </h1>
      </router-link>

      <!-- Close button (mobile) -->
      <button class="text-gray-400 hover:text-white lg:hidden" @click.stop="$emit('toggle-sidebar')"
        aria-controls="sidebar" :aria-expanded="sidebarOpen">
        <span class="sr-only">Close sidebar</span>
        <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
        </svg>
      </button>

      <!-- Collapse button (desktop) -->
      <button class="hidden lg:block text-gray-400 hover:text-white"
        @click.stop="$emit('update:sidebar-expanded', !sidebarExpanded)">
        <span class="sr-only">Expand / collapse sidebar</span>
        <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
          <path v-if="sidebarExpanded" d="M15 16l-4-4 4-4" />
          <path v-else d="M9 8l4 4-4 4" />
        </svg>
      </button>
    </div>

    <!-- Links -->
    <div class="space-y-8">
      <div>
        <div class="px-3 py-2">
          <h3 class="text-xs font-semibold uppercase text-gray-500">
            <div class="flex items-center" :class="!sidebarExpanded && 'justify-center'">
              <span :class="sidebarExpanded ? 'block' : 'hidden group-hover:block'
                ">Pages</span>
              <span :class="sidebarExpanded ? 'hidden' : 'block group-hover:hidden'
                ">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </span>
            </div>
          </h3>
        </div>
        <ul class="mt-3">
          <li class="mb-0.5 rounded-sm px-3 py-2 last:mb-0" :class="{ 'bg-brand-dark': $route.path === '/dashboard' }">
            <router-link class="block truncate text-gray-400 transition duration-150 hover:text-white"
              :class="{ 'text-brand-yellow': $route.path === '/dashboard' }" to="/dashboard">
              <div class="flex items-center">
                <svg class="h-6 w-6 shrink-0" viewBox="0 0 24 24">
                  <path class="fill-current" :class="{
                    'text-brand-yellow': $route.path === '/dashboard',
                    'text-gray-400': $route.path !== '/dashboard',
                  }" d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z" />
                  <path class="fill-current" :class="{
                    'text-brand-yellow': $route.path === '/dashboard',
                    'text-gray-600': $route.path !== '/dashboard',
                  }" d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z" />
                  <path class="fill-current" :class="{
                    'text-brand-light-gray': $route.path === '/dashboard',
                    'text-gray-700': $route.path !== '/dashboard',
                  }"
                    d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z" />
                </svg>
                <span class="ml-3 text-sm font-medium"
                  :class="!sidebarExpanded && 'lg:hidden lg:group-hover:block'">Dashboard</span>
              </div>
            </router-link>
          </li>
          <li class="mb-0.5 rounded-sm px-3 py-2 last:mb-0"
            :class="{ 'bg-brand-dark': $route.path.includes('/dashboard/projects') }">
            <router-link class="block truncate text-gray-400 transition duration-150 hover:text-white"
              :class="{ 'text-brand-yellow': $route.path.includes('/dashboard/projects') }" to="/dashboard/projects">
              <div class="flex items-center">
                <svg class="h-6 w-6 shrink-0" viewBox="0 0 24 24">
                  <path class="fill-current" :class="{
                    'text-brand-yellow': $route.path.includes('/dashboard/projects'),
                    'text-gray-400': !$route.path.includes('/dashboard/projects'),
                  }"
                    d="M13 15l-2 2-2-2m2-2v4M8 11h8M5 17h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span class="ml-3 text-sm font-medium"
                  :class="!sidebarExpanded && 'lg:hidden lg:group-hover:block'">Projects</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script setup>

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
