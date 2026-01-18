<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <TheSidebar :sidebar-open="sidebarOpen" :sidebar-expanded="sidebarExpanded"
      @toggle-sidebar="sidebarOpen = !sidebarOpen" @update:sidebar-expanded="(val) => (sidebarExpanded = val)" />

    <!-- Content area -->
    <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <!-- Site header -->
      <DashboardHeader :sidebar-open="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main>
        <div class="mx-auto w-full max-w-9xl px-4 py-8 sm:px-6 lg:px-8">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TheSidebar from '@/features/dashboard/components/TheSidebar.vue'
import DashboardHeader from '@/features/dashboard/components/DashboardHeader.vue'

const sidebarOpen = ref(true)
const sidebarExpanded = ref(true)

// watch(sidebarExpanded, (val) => {
//   localStorage.setItem('sidebar-expanded', val)
// })
</script>

<style scoped></style>
