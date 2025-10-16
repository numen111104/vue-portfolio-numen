<template>
    <BaseModal :show="show" @close="close" modal-class="max-w-lg">
        <template #header>Document Files</template>
        
        <div v-if="docs && docs.length" class="space-y-3">
            <a 
                v-for="(doc, index) in docs" 
                :key="index" 
                :href="$storage(doc)" 
                target="_blank" 
                rel="noopener noreferrer"
                class="flex items-center p-3 rounded-lg bg-brand-dark/50 hover:bg-brand-dark transition-colors"
            >
                <IconFileText class="w-6 h-6 text-brand-yellow mr-3" />
                <span class="text-gray-200">{{ getFileName(doc) }}</span>
            </a>
        </div>
        <div v-else>
            <p class="text-gray-400">No documents available.</p>
        </div>

        <template #footer>
            <button @click="close" class="btn btn-secondary">Close</button>
        </template>
    </BaseModal>
</template>

<script setup>
import BaseModal from '@/components/ui/BaseModal.vue';
import { IconFileText } from '@tabler/icons-vue';

const props = defineProps({
    show: { type: Boolean, required: true },
    docs: { type: Array, default: () => [] },
});

const emit = defineEmits(['close']);

const close = () => emit('close');

const getFileName = (path) => {
    if (!path) return 'Unknown File';
    return path.split('/').pop();
}
</script>
