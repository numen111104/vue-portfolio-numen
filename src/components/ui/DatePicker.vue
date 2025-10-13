<template>
  <VueDatePicker
  :model-value="modelValue"
  @update:model-value="updateValue"
  :enable-time-picker="false"
  :dark="true"
  :teleport-center="true" auto-apply input-class-name="input-field w-full"
  :disabled="disabled"
  :clearable="clearable"
  :hide-input-icon="true"
  :placeholder="placeholder"  />
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

defineProps({
  modelValue: {
    type: [Date, String],
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
  flow: {
    type: String,
    default: 'calendar',
  }
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (value) => {
  if (value) {
    const year = value.getFullYear();
    const month = (`0${value.getMonth() + 1}`).slice(-2);
    const day = (`0${value.getDate()}`).slice(-2);
    emit('update:modelValue', `${year}-${month}-${day}`);
  } else {
    emit('update:modelValue', null);
  }
};
</script>

<style>
.dp__theme_dark {
  --dp-background-color: var(--color-brand-gray);
  --dp-text-color: var(--color-brand-text);
  --dp-hover-color: var(--color-brand-light-gray);
  --dp-hover-text-color: var(--color-brand-text);
  --dp-hover-icon-color: var(--color-brand-text);
  --dp-primary-color: var(--color-brand-yellow);
  --dp-primary-disabled-color: rgba(223, 255, 0, 0.5);
  /* Brand yellow with 50% opacity */
  --dp-primary-text-color: var(--color-brand-dark);
  --dp-secondary-color: var(--color-brand-light-gray);
  --dp-border-color: var(--color-brand-light-gray);
  --dp-menu-border-color: var(--color-brand-light-gray);
  --dp-border-color-hover: var(--color-brand-yellow);
  --dp-border-color-focus: var(--color-brand-yellow);
  --dp-disabled-color: var(--color-brand-gray);
  --dp-disabled-color-text: rgba(226, 232, 240, 0.5);
  /* Brand text with 50% opacity */
  --dp-scroll-bar-background: var(--color-brand-dark);
  --dp-scroll-bar-color: var(--color-brand-light-gray);
  --dp-success-color: var(--color-success-500);
  --dp-success-color-disabled: rgba(16, 185, 129, 0.5);
  /* Success color with 50% opacity */
  --dp-icon-color: var(--color-brand-text);
  --dp-danger-color: var(--color-danger-500);
  --dp-marker-color: var(--color-danger-500);
  --dp-tooltip-color: var(--color-brand-dark);
  --dp-highlight-color: rgba(223, 255, 0, 0.15);
  /* Brand yellow with 15% opacity */
  --dp-range-between-dates-background-color: var(--color-brand-light-gray);
  --dp-range-between-dates-text-color: var(--color-brand-text);
  --dp-range-between-border-color: var(--color-brand-light-gray);
  --dp-loader: 5px solid var(--color-brand-yellow);
}

.dp__input {
  border-radius: 0.375rem !important;
  /* rounded-md */
  border-color: var(--dp-border-color) !important;
}

.dp__input:hover {
  border-color: var(--dp-border-color-hover) !important;
}
</style>
