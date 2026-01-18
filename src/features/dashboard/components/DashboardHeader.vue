<template>
  <header class="sticky top-0 bg-brand-gray border-b border-gray-600 z-30">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 -mb-px">
        <div class="flex items-center space-x-3">
          <!-- Hamburger button -->
          <button
            class="text-gray-400 hover:text-white lg:hidden"
            @click.stop="$emit('toggle-sidebar')"
            aria-controls="sidebar"
            :aria-expanded="sidebarOpen"
          >
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="5" width="16" height="2" />
              <rect x="4" y="11" width="16" height="2" />
              <rect x="4" y="17" width="16" height="2" />
            </svg>
          </button>

          <!-- Home button -->
          <router-link
            to="/"
            class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition duration-150 hover:bg-brand-light-gray hover:text-white"
          >
            <span class="sr-only">Go to main page</span>
            <IconHome class="h-5 w-5" />
          </router-link>
        </div>

        <div class="flex items-center space-x-3">
          <!-- Notifications (Placeholder) -->
          <div class="relative inline-flex">
            <button
              class="w-8 h-8 flex items-center justify-center bg-brand-light-gray hover:bg-brand-gray transition duration-150 rounded-full"
            >
              <span class="sr-only">Notifications</span>
              <IconBell class="w-5 h-5 text-gray-400" />
              <div
                class="absolute top-0 right-0 w-2.5 h-2.5 bg-brand-yellow border-2 border-brand-gray rounded-full"
              ></div>
            </button>
          </div>

          <hr class="w-px h-6 bg-gray-600" />

          <!-- User Menu -->
          <div class="relative inline-flex" ref="userButtonRef">
            <button
              class="inline-flex justify-center items-center group"
              aria-haspopup="true"
              @click.prevent="userDropdownOpen = !userDropdownOpen"
              :aria-expanded="userDropdownOpen"
            >
              <img
                v-if="user"
                class="w-8 h-8 rounded-full"
                :src="`https://ui-avatars.com/api/?name=${user.full_name}&background=dfff00&color=0f172a`"
                width="32"
                height="32"
                :alt="user.full_name"
              />
            </button>
            <transition
              enter-active-class="transition ease-out duration-200 transform"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-out duration-200"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <div
                v-show="userDropdownOpen"
                class="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-brand-gray border border-gray-600 py-1.5 rounded shadow-lg overflow-hidden mt-1"
              >
                <div class="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-600">
                  <div class="font-medium text-brand-text">{{ user?.full_name }}</div>
                  <div class="text-xs text-gray-400 italic">Administrator</div>
                </div>
                <ul>
                  <li>
                    <button
                      class="font-medium text-sm text-brand-yellow hover:text-yellow-400 flex items-center py-1 px-3 w-full"
                      @click="openSettingsModal"
                      >Settings</button
                    >
                  </li>
                  <li>
                    <button
                      class="font-medium text-sm text-brand-yellow hover:text-yellow-400 flex items-center py-1 px-3 w-full"
                      @click="handleLogout"
                      >Sign Out</button
                    >
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <!-- Settings Modal -->
    <BaseModal :show="showSettingsModal" @close="showSettingsModal = false" modal-class="max-w-2xl">
        <template #header>User Settings</template>
        <UserSettingsForm v-if="user" ref="settingsForm" :user="user" :errors="errors" @submit="handleProfileUpdate" />
        <template #footer>
            <button @click="showSettingsModal = false" class="btn btn-secondary">Cancel</button>
            <ButtonSpinner @click="settingsForm?.handleSubmit()" :loading="formLoading" class="btn-primary">Save Changes</ButtonSpinner>
        </template>
    </BaseModal>

  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { onClickOutside } from '@vueuse/core';
import { useAuthStore } from '@/stores/auth';
import { IconHome, IconBell } from '@tabler/icons-vue';
import BaseModal from '@/shared/components/BaseModal.vue';
import ButtonSpinner from '@/shared/components/ButtonSpinner.vue';
import UserSettingsForm from '@/features/dashboard/components/forms/UserSettingsForm.vue';
import { useErrorHandler } from '@/shared/composables/useErrorHandler';
import swal from '@/lib/sweetalert/swal';
import apiService from '@/services/apiService';

defineProps({
  sidebarOpen: {
    type: Boolean,
    required: true,
  },
});


const authStore = useAuthStore();
const router = useRouter();
const { errors, processErrors, clearErrors } = useErrorHandler();

const user = computed(() => authStore.currentUser);

const userDropdownOpen = ref(false);
const showSettingsModal = ref(false);
const formLoading = ref(false);
const settingsForm = ref(null);

const userButtonRef = ref(null);
onClickOutside(userButtonRef, () => {
  userDropdownOpen.value = false;
});

const handleLogout = async () => {
  userDropdownOpen.value = false;
  await authStore.logout();
  await router.push({ name: 'login' });
};

const openSettingsModal = () => {
    clearErrors();
    userDropdownOpen.value = false;
    showSettingsModal.value = true;
}

const handleProfileUpdate = async (payload) => {
    formLoading.value = true;
    clearErrors();
    try {
        const response = await apiService.put('/profile', payload);
        authStore.user = response.data.data; // Update user in store
        localStorage.setItem('user', JSON.stringify(response.data.data)); // also update local storage
        showSettingsModal.value = false;
        swal.fire('Success', 'Your profile has been updated.', 'success');
    } catch (error) {
        processErrors(error);
        if (error.response?.status !== 422) {
            swal.fire('Error', 'An unexpected error occurred.', 'error');
        }
    } finally {
        formLoading.value = false;
    }
};

</script>
