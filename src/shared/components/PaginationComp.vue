<template>
  <div v-if="meta.total > 0" class="flex items-center justify-between text-sm text-gray-400">
    <div>
      <p>
        Showing <span class="font-medium text-white">{{ meta.from }}</span> to
        <span class="font-medium text-white">{{ meta.to }}</span> of
        <span class="font-medium text-white">{{ meta.total }}</span> results
      </p>
    </div>
    <div class="flex items-center space-x-2">
      <button
        v-for="(link, index) in meta.links"
        :key="index"
        @click.prevent="$emit('page-change', link.url)"
        :disabled="!link.url"
        class="px-3 py-2 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        :class="{
          'bg-brand-yellow text-brand-dark': link.active,
          'bg-brand-gray hover:bg-brand-light-gray': !link.active && link.url,
        }"
        v-html="link.label"
      ></button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  meta: {
    type: Object,
    required: true,
  },
});

defineEmits(['page-change']);
</script>
