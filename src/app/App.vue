<script setup>
import { onMounted, provide } from 'vue';
import { usePortfolioStore } from '@/stores/portfolio';
import { useAppSettingsStore } from '@/stores/appSettings';
import { useIntersectionObserver } from '@/shared/composables/useIntersectionObserver';

const portfolioStore = usePortfolioStore();
const appSettingsStore = useAppSettingsStore();

const { observe } = useIntersectionObserver();

// Provide the 'observe' function to all child components
provide('observer', { observe });

onMounted(() => {
  portfolioStore.fetchAllData();
  appSettingsStore.fetchSettings();
});
</script>

<template>
  <router-view />
</template>

<style>
/* Your global styles here */
</style>
