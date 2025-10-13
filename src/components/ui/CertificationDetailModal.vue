<template>
    <BaseModal :show="show" @close="close" modal-class="max-w-2xl">
        <template #header>{{ certification.title }}</template>
        
        <div v-if="certification">
            <img :src="`/storage/${certification.credential_image_url}`" :alt="certification.title" class="w-full h-auto object-contain rounded-lg mb-4 bg-gray-800">
            
            <div class="space-y-2">
                <p class="text-brand-yellow">Issued by: {{ certification.issuing_organization }}</p>
                <p class="text-gray-400 text-sm">{{ formatDate(certification.issue_date) }}</p>
                
                <p v-if="certification.description" class="text-gray-300 whitespace-pre-line pt-2">
                    {{ certification.description }}
                </p>

                <div v-if="certification.credential_url" class="pt-4">
                    <a :href="certification.credential_url" target="_blank" rel="noopener noreferrer" class="btn btn-primary inline-flex items-center">
                        Verify Credential
                        <IconExternalLink class="w-4 h-4 ml-2" />
                    </a>
                </div>
            </div>
        </div>

        <template #footer>
            <button @click="close" class="btn btn-secondary">Close</button>
        </template>
    </BaseModal>
</template>

<script setup>
import BaseModal from '@/components/ui/BaseModal.vue';
import { IconExternalLink } from '@tabler/icons-vue';

const props = defineProps({
    show: { type: Boolean, required: true },
    certification: { type: Object, default: null },
});

const emit = defineEmits(['close']);

const close = () => emit('close');

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
</script>
