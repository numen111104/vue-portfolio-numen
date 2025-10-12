<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-center text-white px-4">
    <div class="max-w-md">
      <h1 class="text-9xl font-bold text-brand-yellow animate-on-load animate-page-load">404</h1>
      <h2 class="mt-4 text-4xl font-semibold text-white animate-on-load animate-page-load load-delay-1">Page Not Found</h2>
      <p class="mt-4 text-lg text-brand-text/80 animate-on-load animate-page-load load-delay-2">
        Oops! The page you are looking for does not exist. It might have been moved or deleted.
      </p>
    </div>
    <router-link :to="{name: 'home'}" class="mt-8 btn btn-primary group animate-on-load animate-page-load load-delay-3 py-3 px-6 text-base uppercase tracking-wider">
      <span class="flex items-center">
          <IconHome class="mr-2" />
          Go Back Home
      </span>
    </router-link>
  </div>
</template>

<script setup>
import { IconHome } from '@tabler/icons-vue';
</script>
