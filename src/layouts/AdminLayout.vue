<template>
  <div class="flex h-screen overflow-hidden">
    <TheSidebar
      :sidebar-open="sidebarOpen"
      :sidebar-expanded="sidebarExpanded"
      @toggle-sidebar="sidebarOpen = !sidebarOpen"
      @update:sidebar-expanded="sidebarExpanded = $event"
    />

    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <DashboardHeader :sidebar-open="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import TheSidebar from '@/components/dashboard/TheSidebar.vue'
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue'

// State untuk sidebar
const sidebarOpen = ref(false) // Untuk mobile overlay
const sidebarExpanded = ref(localStorage.getItem('sidebar-expanded') === 'true') // Untuk desktop expand/collapse

// Watch untuk menyimpan state sidebar ke localStorage dan mengelola class di body
watch(sidebarExpanded, (value) => {
  localStorage.setItem('sidebar-expanded', value)
  if (value) {
    document.body.classList.add('sidebar-expanded')
  } else {
    document.body.classList.remove('sidebar-expanded')
  }
})

// Initial setup saat komponen dimount
onMounted(() => {
  // Terapkan class sidebar-expanded ke body saat dimuat berdasarkan localStorage
  if (localStorage.getItem('sidebar-expanded') === 'true') {
    document.body.classList.add('sidebar-expanded')
  } else {
    document.body.classList.remove('sidebar-expanded')
  }
})
</script>

<style scoped>
/* Scoped styles for AdminLayout if needed */
/* Ini adalah tempat untuk CSS yang terkait dengan layout dashboard, misal lebar sidebar */

/* Sidebar expanded state for desktop */
body.sidebar-expanded #sidebar {
  width: 16rem !important; /* w-64 */
}
body.sidebar-expanded #sidebar .lg\:opacity-0 {
  opacity: 1; /* Make text visible when expanded */
}
body.sidebar-expanded #sidebar .lg\:sidebar-expanded\:opacity-100 {
  opacity: 1;
}

/* Sidebar collapsed state for desktop */
body:not(.sidebar-expanded) #sidebar {
  width: 5rem !important; /* w-20 */
}
body:not(.sidebar-expanded) #sidebar .lg\:opacity-0 {
  opacity: 0; /* Hide text when collapsed */
}
body:not(.sidebar-expanded) #sidebar .lg\:sidebar-expanded\:hidden {
  display: block; /* Show '•••' */
}
body.sidebar-expanded #sidebar .lg\:sidebar-expanded\:hidden {
  display: none; /* Hide '•••' when expanded */
}

/* Ensure mobile sidebar is hidden by default and shown by JS */
#sidebar {
  transform: translateX(-100%);
}
/* This class is applied to body when mobile sidebar is open */
body.sidebar-open #sidebar {
  transform: translateX(0);
}

/* Backdrop for mobile sidebar */
body.sidebar-open .bg-opacity-70 {
  opacity: 1;
  pointer-events: auto;
}
body.sidebar-open .bg-opacity-70.pointer-events-none {
  opacity: 0;
  pointer-events: none;
}
</style>
