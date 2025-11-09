<template>
  <nav aria-label="Breadcrumb" class="flex items-center space-x-2 text-sm text-gray-400">
    <ol class="flex items-center space-x-2">
      <li v-for="(crumb, index) in crumbs" :key="index" class="flex items-center space-x-2">
        <router-link
          v-if="index < crumbs.length - 1"
          :to="crumb.to"
          class="transition-colors hover:text-brand-yellow"
        >
          {{ crumb.label }}
        </router-link>
        <span v-else class="font-semibold text-white" aria-current="page">
          {{ crumb.label }}
        </span>
        <svg v-if="index < crumbs.length - 1" class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </li>
    </ol>
  </nav>
</template>

<script setup>

defineProps({
  crumbs: {
    type: Array,
    required: true,
    default: () => [], // e.g., [{ label: 'Home', to: '/' }, { label: 'Current Page' }]
  },
});
</script>
