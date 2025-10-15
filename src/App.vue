<script setup>
import { onMounted } from 'vue';
import { usePortfolioStore } from '@/stores/portfolio';
import { useAppSettingsStore } from '@/stores/appSettings';

const portfolioStore = usePortfolioStore();
const appSettingsStore = useAppSettingsStore();

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
