<template>
  <Multiselect
    :options="options"
    :searchable="true"
    :close-on-select="false"
    mode="tags"
    class="multiselect-custom"
    v-bind="$attrs"
  />
</template>

<script setup>
import Multiselect from '@vueform/multiselect';

defineProps({
  options: {
    type: Array,
    required: true,
  },
});
</script>

<style>
/* Import the base styles */
@import '@vueform/multiselect/themes/default.css';

/* Custom theme variables */
.multiselect-custom {
  --ms-tag-bg: var(--color-brand-yellow);
  --ms-tag-color: var(--color-brand-dark);
  --ms-tag-radius: 6px;

  --ms-border-color: #4b5563; /* border-gray-600 */
  --ms-border-width: 1px;
  --ms-border-color-active: var(--color-brand-yellow);
  --ms-border-width-active: 1px;

  --ms-bg: var(--color-brand-light-gray);
  --ms-color: var(--color-brand-text);
  --ms-radius: 8px;
  --ms-line-height: 1.25rem;
  --ms-py: 0.75rem;
  --ms-px: 0.75rem;

  --ms-dropdown-bg: var(--color-brand-gray);
  --ms-dropdown-border-color: var(--color-brand-light-gray);
  --ms-dropdown-radius: 8px;

  --ms-option-bg-pointed: var(--color-brand-light-gray);
  --ms-option-color-pointed: var(--color-brand-yellow);
  --ms-option-bg-selected: var(--color-brand-yellow);
  --ms-option-color-selected: var(--color-brand-dark);
  --ms-option-bg-selected-pointed: #facc15; /* yellow-400 */
  --ms-option-color-selected-pointed: var(--color-brand-dark);

  --ms-ring-color: rgba(223, 255, 0, 0.3); /* brand-yellow with opacity */
  --ms-ring-width: 3px;

  --ms-placeholder-color: #6b7280; /* placeholder-gray-500 */
  --ms-max-height: 10rem;
}
</style>
