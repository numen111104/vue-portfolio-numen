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
/* No specific scoped styles needed here, relies on global/Tailwind */
</style>
