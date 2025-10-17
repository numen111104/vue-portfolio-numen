<template>
  <BaseModal :show="show" @close="closeModal" modal-class="max-w-2xl">
    <template #header>Activity Log Detail</template>
    <div v-if="hit" class="space-y-4 text-sm">
      <div v-for="(value, key) in formattedHit" :key="key">
        <p class="font-semibold text-brand-yellow capitalize">{{ key.replace(/_/g, ' ') }}</p>
        <p class="text-gray-300 bg-brand-dark/50 p-2 rounded-md mt-1 whitespace-pre-wrap break-words">{{ value }}</p>
      </div>
    </div>
    <div v-else class="text-center text-gray-400">No data available.</div>
    <template #footer>
      <button @click="closeModal" class="btn btn-secondary">Close</button>
    </template>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue';
import BaseModal from '@/components/ui/BaseModal.vue';

const props = defineProps({
  show: { type: Boolean, required: true },
  hit: { type: Object, default: null },
});

const emit = defineEmits(['close']);

const closeModal = () => emit('close');

const formattedHit = computed(() => {
  if (!props.hit) return {};
  const { id, created_at, updated_at, ...rest } = props.hit;
  return {
    ...rest,
    created_at: new Date(created_at).toLocaleString(),
    updated_at: new Date(updated_at).toLocaleString(),
  };
});

</script>
