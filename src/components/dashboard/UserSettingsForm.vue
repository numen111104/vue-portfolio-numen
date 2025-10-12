<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium mb-1">Full Name</label>
        <input v-model="form.full_name" type="text" required class="input-field w-full" />
        <ErrorDisplay :errors="errors.full_name" />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Username</label>
        <input v-model="form.username" type="text" required class="input-field w-full" />
        <ErrorDisplay :errors="errors.username" />
      </div>
    </div>
    <div>
      <label class="block text-sm font-medium mb-1">Email</label>
      <input v-model="form.email" type="email" required class="input-field w-full" />
      <ErrorDisplay :errors="errors.email" />
    </div>
    <div class="border-t border-brand-light-gray pt-4">
        <p class="text-sm text-gray-400 mb-4">Leave password fields blank to keep current password.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium mb-1">New Password</label>
                <input v-model="form.password" type="password" placeholder="Min. 4 characters" class="input-field w-full" />
                <ErrorDisplay :errors="errors.password" />
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Confirm New Password</label>
                <input v-model="form.password_confirmation" type="password" class="input-field w-full" />
            </div>
        </div>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';
import ErrorDisplay from '@/components/ui/ErrorDisplay.vue';

const props = defineProps({
  user: { 
    type: Object,
    required: true,
  },
  errors: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['submit']);

const form = ref({});

watch(() => props.user, (newUser) => {
  // Reset form with user data, but clear password fields
  form.value = { ...newUser };
  form.value.password = '';
  form.value.password_confirmation = '';
}, { immediate: true, deep: true });

const handleSubmit = () => {
    // Create a clean payload, don't send empty password fields
    const payload = { ...form.value };
    if (!payload.password) {
        delete payload.password;
        delete payload.password_confirmation;
    }
    emit('submit', payload);
};

defineExpose({ handleSubmit });
</script>
