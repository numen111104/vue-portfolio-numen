<template>
  <label class="flex items-center cursor-pointer">
    <div class="relative">
      <input type="checkbox" class="sr-only" :checked="modelValue" @change="$emit('update:modelValue', $event.target.checked)" />
      <div class="block bg-brand-light-gray w-14 h-8 rounded-full"></div>
      <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300"
        :class="{ 'translate-x-6 !bg-brand-yellow': modelValue }"></div>
    </div>
    <div class="ml-3 text-white font-medium">
      <slot />
    </div>
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

defineEmits(['update:modelValue']);
</script>
