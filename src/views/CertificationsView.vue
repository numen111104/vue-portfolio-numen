<template>
  <div class="container px-4 py-16 mx-auto text-white md:px-8 lg:px-16">
    <div class="flex sm:flex-row flex-col justify-between animate-on-load load-delay-1">
      <div class="mb-1">
        <HighlightedTitle unlighter="My" lighter="Certifications" />
        <p class="section-subtitle">
          A collection of certifications I've earned throughout my learning journey.
        </p>
      </div>
    </div>

    <div v-if="uiStore.isLoading && certifications.length === 0" class="text-center py-20">
        <IconLoader2 class="animate-spin inline-block w-12 h-12" />
    </div>

    <div v-else class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <div 
        v-for="(cert, index) in certifications" 
        :key="cert.id" 
        class="card animate-on-load group cursor-pointer" 
        :style="{ animationDelay: `${(index + 2) * 0.1}s` }"
        @click="openModal(cert)"
      >
        <div class="overflow-hidden rounded-t-lg">
            <img :src="`/storage/${cert.credential_image_url}`" :alt="cert.title" class="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div class="p-6">
          <h4 class="text-lg font-semibold text-brand-yellow">{{ cert.title }}</h4>
          <p class="mt-2 text-sm text-gray-400">Issued by: {{ cert.issuing_organization }}</p>
          <p class="text-sm text-gray-400">Date: {{ formatDate(cert.issue_date) }}</p>
        </div>
      </div>
    </div>

    <CertificationDetailModal 
        v-if="selectedCertification" 
        :show="isModalOpen" 
        :certification="selectedCertification" 
        @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import apiService from '@/services/apiService';
import { useUiStore } from '@/stores/ui';
import HighlightedTitle from '@/components/ui/HighlightedTitle.vue';
import CertificationDetailModal from '@/components/ui/CertificationDetailModal.vue';
import { IconLoader2 } from '@tabler/icons-vue';

const uiStore = useUiStore();
const route = useRoute();

const certifications = ref([]);
const selectedCertification = ref(null);
const isModalOpen = ref(false);

const openModal = (cert) => {
    selectedCertification.value = cert;
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
    // Optional: clear selected cert after transition
    setTimeout(() => selectedCertification.value = null, 300);
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

const fetchCertifications = async () => {
    uiStore.startLoading();
    try {
        const response = await apiService.get('/certifications');
        certifications.value = response.data.data;
    } catch (error) {
        console.error("Failed to fetch certifications:", error);
    } finally {
        uiStore.stopLoading();
    }
};

onMounted(async () => {
    await fetchCertifications();

    // Check if we need to open a modal from URL query
    watchEffect(() => {
        const certIdToOpen = route.query.open;
        if (certIdToOpen && certifications.value.length) {
            const certToOpen = certifications.value.find(c => c.id === certIdToOpen);
            if (certToOpen) {
                openModal(certToOpen);
            }
        }
    });
});
</script>