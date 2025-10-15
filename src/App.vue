<script setup>
import { onMounted } from 'vue';
import { usePortfolioStore } from '@/stores/portfolio';

const portfolioStore = usePortfolioStore();

onMounted(() => {
  portfolioStore.fetchAllData();
});
</script>

<template>
  <router-view />
</template>

<style>
/* Your global styles here */
</style>
