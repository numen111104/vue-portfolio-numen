<template>
  <button :disabled="loading" class="btn flex items-center justify-center" :class="{ 'opacity-50 cursor-not-allowed': loading }">
    <span v-if="loading" class="flex items-center">
      <IconLoader2 class="animate-spin mr-2" />
      Processing...
    </span>
    <span v-else>
      <slot />
    </span>
  </button>
</template>

<script setup>
import { IconLoader2 } from '@tabler/icons-vue';

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>
