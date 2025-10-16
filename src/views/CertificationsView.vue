<template>
  <div ref="viewRoot" class="container px-4 py-16 mx-auto text-white md:px-8 lg:px-16">
    <div class="animate-on-scroll fade-in-down-on-scroll">
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
      <CertificationCard
        v-for="(cert, index) in certifications"
        :key="cert.id"
        :certification="cert"
        :observe="observe"
        :delay="index * 100"
        @open="openModal"
      />
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
import { ref, watchEffect, computed, onMounted, inject } from 'vue';
import { useRoute } from 'vue-router';
import { useUiStore } from '@/stores/ui';
import { usePortfolioStore } from '@/stores/portfolio';
import HighlightedTitle from '@/components/ui/HighlightedTitle.vue';
import CertificationDetailModal from '@/components/ui/CertificationDetailModal.vue';
import { IconLoader2 } from '@tabler/icons-vue';
import CertificationCard from '@/components/cards/CertificationCard.vue';

const uiStore = useUiStore();
const route = useRoute();
const portfolioStore = usePortfolioStore();

const certifications = computed(() => portfolioStore.certifications);

// --- Animation Logic ---
const { observe } = inject('observer');
const viewRoot = ref(null);
const isMounted = ref(false);
onMounted(() => { isMounted.value = true; });

const isDataReady = computed(() => certifications.value && certifications.value.length > 0);

const setupAnimations = () => {
  if (viewRoot.value) {
    const header = viewRoot.value.querySelector('.animate-on-scroll');
    if (header) {
      observe(header);
    }
  }
};

watchEffect(() => {
  if (isMounted.value && isDataReady.value) {
    setupAnimations();
  }
});
// --- End Animation Logic ---

const selectedCertification = ref(null);
const isModalOpen = ref(false);

const openModal = (cert) => {
  selectedCertification.value = cert;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  setTimeout(() => selectedCertification.value = null, 300);
};

watchEffect(() => {
  const certIdToOpen = route.query.open;
  if (certIdToOpen && certifications.value.length) {
    const certToOpen = certifications.value.find(c => c.id == certIdToOpen);
    if (certToOpen) {
      openModal(certToOpen);
    }
  }
});
</script>
