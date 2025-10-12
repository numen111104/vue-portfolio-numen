<template>
  <div v-if="errors && errors.length > 0" class="mt-1 text-sm text-red-400">
    <p v-for="(error, index) in errors" :key="index">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  errors: {
    type: Array,
    default: () => [],
  },
});
</script>
