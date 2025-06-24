<template>
  <div>
    <div
      class="fixed inset-0 bg-brand-dark bg-opacity-70 z-40 lg:hidden lg:z-auto transition-opacity duration-200"
      :class="sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'"
      aria-hidden="true"
      @click="$emit('toggle-sidebar')"
    ></div>

    <div
      id="sidebar"
      ref="sidebarTarget"
      class="flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-brand-gray p-4 transition-all duration-200 ease-in-out"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-64'"
      @keydown.escape.prevent="$emit('toggle-sidebar')"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div class="flex justify-between mb-10 pr-1 sm:px-2">
        <button
          class="lg:hidden text-gray-400 hover:text-white"
          @click.stop="$emit('toggle-sidebar')"
          aria-controls="sidebar"
          :aria-expanded="sidebarOpen"
        >
          <span class="sr-only">Close sidebar</span>
          <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
          </svg>
        </button>
        <router-link class="block" to="/dashboard">
          <svg width="32" height="32" viewBox="0 0 32 32">
            <defs>
              <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                <stop stop-color="#A5B4FC" stop-opacity="0" offset="0%" />
                <stop stop-color="#A5B4FC" offset="100%" />
              </linearGradient>
              <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                <stop stop-color="#38BDF8" stop-opacity="0" offset="0%" />
                <stop stop-color="#38BDF8" offset="100%" />
              </linearGradient>
            </defs>
            <rect fill="#6366F1" width="32" height="32" rx="16" />
            <path
              d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
              fill="#4F46E5"
            />
            <path
              d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
              fill="url(#logo-a)"
            />
            <path
              d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
              fill="url(#logo-b)"
            />
          </svg>
        </router-link>
      </div>

      <div class="space-y-8">
        <div>
          <h3 class="text-xs uppercase text-gray-500 font-semibold pl-3">
            <span
              class="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
              aria-hidden="true"
              >•••</span
            >
            <span class="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
          </h3>
          <ul class="mt-3">
            <li
              class="px-2 py-2 rounded-sm mb-0.5 last:mb-0"
              :class="currentRoute.path.startsWith('/dashboard') ? 'bg-brand-dark' : ''"
            >
              <router-link
                class="block truncate transition duration-150"
                to="/dashboard"
                @click="
                  () => {
                    toggleDropdown('dashboard')
                    $emit('update:sidebar-expanded', true)
                  }
                "
                :class="
                  currentRoute.path.startsWith('/dashboard')
                    ? 'text-brand-yellow'
                    : 'text-gray-400 hover:text-white'
                "
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        class="fill-current"
                        :class="
                          currentRoute.path.startsWith('/dashboard')
                            ? 'text-brand-yellow'
                            : 'text-gray-400'
                        "
                        d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                      />
                      <path
                        class="fill-current"
                        :class="
                          currentRoute.path.startsWith('/dashboard')
                            ? 'text-brand-yellow'
                            : 'text-gray-400'
                        "
                        d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                      />
                      <path
                        class="fill-current"
                        :class="
                          currentRoute.path.startsWith('/dashboard')
                            ? 'text-brand-light-gray'
                            : 'text-gray-600'
                        "
                        d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                      />
                    </svg>
                    <span
                      class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                      >Dashboard</span
                    >
                  </div>
                  <div
                    class="flex shrink-0 ml-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                  >
                    <svg
                      class="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400"
                      :class="
                        openDropdown['dashboard'] && sidebarExpanded ? 'rotate-180' : 'rotate-0'
                      "
                      viewBox="0 0 12 12"
                    >
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </router-link>
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul class="pl-9 mt-1" :class="openDropdown['dashboard'] ? '!block' : 'hidden'">
                  <li class="mb-1 last:mb-0">
                    <router-link
                      class="block transition duration-150 truncate"
                      to="/dashboard"
                      :class="
                        currentRoute.path === '/dashboard'
                          ? 'text-brand-yellow'
                          : 'text-gray-400 hover:text-white'
                      "
                    >
                      <span
                        class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                        >Main</span
                      >
                    </router-link>
                  </li>
                  <li class="mb-1 last:mb-0">
                    <router-link
                      class="block transition duration-150 truncate"
                      to="/dashboard/analytics"
                      :class="
                        currentRoute.path === '/dashboard/analytics'
                          ? 'text-brand-yellow'
                          : 'text-gray-400 hover:text-white'
                      "
                    >
                      <span
                        class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                        >Analytics</span
                      >
                    </router-link>
                  </li>
                  <li class="mb-1 last:mb-0">
                    <router-link
                      class="block transition duration-150 truncate"
                      to="/dashboard/fintech"
                      :class="
                        currentRoute.path === '/dashboard/fintech'
                          ? 'text-brand-yellow'
                          : 'text-gray-400 hover:text-white'
                      "
                    >
                      <span
                        class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                        >Fintech</span
                      >
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div></div>
      </div>

      <div class="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
        <div class="px-3 py-2">
          <button @click="$emit('update:sidebar-expanded', !sidebarExpanded)">
            <span class="sr-only">Expand / collapse sidebar</span>
            <svg
              v-if="!sidebarExpanded"
              class="w-6 h-6 fill-current text-gray-400"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <svg v-else class="w-6 h-6 fill-current text-gray-400 rotate-180" viewBox="0 0 24 24">
              <path d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { onClickOutside } from '@vueuse/core' // Untuk @click.outside

const props = defineProps({
  sidebarOpen: {
    type: Boolean,
    required: true,
  },
  sidebarExpanded: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['toggle-sidebar', 'update:sidebar-expanded'])

const route = useRoute()
const currentRoute = ref(route)

// Untuk mengelola dropdown di sidebar
const openDropdown = ref({
  dashboard: true, // Dashboard aktif by default
  ecommerce: false,
  authentication: false,
  onboarding: false,
  component: false,
})

// Watch rute untuk menyesuaikan dropdown dan active state
watch(
  route,
  (newRoute) => {
    currentRoute.value = newRoute
    // Buka dropdown yang relevan berdasarkan rute
    // Hanya buka dropdown jika sidebar sedang expanded atau akan di-expanded oleh user
    if (props.sidebarExpanded || window.innerWidth < 1024) {
      // Mobile selalu terbuka
      for (const key in openDropdown.value) {
        if (newRoute.path.startsWith(`/${key}`)) {
          // Gunakan startsWith untuk mencocokkan sub-rute
          openDropdown.value[key] = true
        } else {
          openDropdown.value[key] = false
        }
      }
    } else {
      // Jika sidebar collapsed di desktop dan bukan hover, tutup semua dropdown
      for (const key in openDropdown.value) {
        openDropdown.value[key] = false
      }
    }
  },
  { immediate: true },
)

const toggleDropdown = (key) => {
  openDropdown.value[key] = !openDropdown.value[key]
  // Jika toggle dropdown, pastikan sidebar expanded (di mobile atau saat klik)
  if (window.innerWidth < 1024) {
    // Hanya toggle expand untuk mobile
    emit('update:sidebar-expanded', true)
  }
}

// Logic untuk hover-to-expand di desktop
const sidebarTarget = ref(null)
let hoverTimeout = null

const handleMouseEnter = () => {
  // Hanya berlaku di desktop (lg breakpoint dan di atasnya) dan jika sidebar belum expanded secara permanen
  if (!props.sidebarExpanded && window.innerWidth >= 1024 /* lg breakpoint */) {
    clearTimeout(hoverTimeout) // Clear any existing timeout
    hoverTimeout = setTimeout(() => {
      // HANYA expand jika belum expanded dan tidak ada dropdown yang terbuka dari klik
      const anyDropdownOpen = Object.values(openDropdown.value).some((val) => val === true)
      if (!anyDropdownOpen) {
        // Hindari konflik dengan state open dropdown
        emit('update:sidebar-expanded', true)
      }
    }, 100) // Small delay to prevent accidental expand
  }
}

const handleMouseLeave = () => {
  clearTimeout(hoverTimeout)
  // Hanya berlaku di desktop (lg breakpoint dan di atasnya) dan jika sidebar expanded karena hover
  if (props.sidebarExpanded && window.innerWidth >= 1024 /* lg breakpoint */) {
    // Check if the current route is NOT one of the sub-items that require sidebar to be expanded
    // This is a simplified check, you might need a more robust logic
    const pathRequiresExpansion = Object.keys(openDropdown.value).some((key) => {
      return route.path.startsWith(`/${key}`)
    })

    // Jika sidebar expanded karena hover DAN tidak ada sub-rute yang aktif
    if (!pathRequiresExpansion) {
      emit('update:sidebar-expanded', false) // Collapse sidebar
    }
  }
}

// click.outside untuk mobile sidebar
onMounted(() => {
  if (sidebarTarget.value) {
    onClickOutside(sidebarTarget, () => {
      if (props.sidebarOpen) {
        emit('toggle-sidebar')
      }
    })
  }
})
</script>

<style scoped>
/* No specific scoped styles needed, relies on global/Tailwind */
</style>
