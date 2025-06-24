<template>
  <header class="sticky top-0 bg-brand-gray border-b border-gray-600 z-30">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 -mb-px">
        <div class="flex">
          <button
            class="text-gray-400 hover:text-white lg:hidden"
            @click.stop="$emit('toggle-sidebar')"
            aria-controls="sidebar"
            :aria-expanded="sidebarOpen"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="4" y="5" width="16" height="2" />
              <rect x="4" y="11" width="16" height="2" />
              <rect x="4" y="17" width="16" height="2" />
            </svg>
          </button>
        </div>

        <div class="flex items-center space-x-3">
          <div class="relative inline-flex" v-click-outside="() => (notificationOpen = false)">
            <button
              class="w-8 h-8 flex items-center justify-center bg-brand-light-gray hover:bg-brand-gray transition duration-150 rounded-full"
              :class="{ 'bg-brand-gray': notificationOpen }"
              aria-haspopup="true"
              @click.prevent="notificationOpen = !notificationOpen"
              :aria-expanded="notificationOpen"
            >
              <span class="sr-only">Notifications</span>
              <svg class="w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path
                  class="fill-current text-gray-400"
                  d="M6.5 0C2.91 0 0 2.462 0 5.5c0 1.075.37 2.074 1 2.922V12l2.699-1.542A7.454 7.454 0 006.5 11c3.59 0 6.5-2.462 6.5-5.5S10.09 0 6.5 0z"
                />
                <path
                  class="fill-current text-gray-500"
                  d="M16 9.5c0-.987-.429-1.897-1.147-2.639C14.124 10.348 10.66 13 6.5 13c-.103 0-.202-.018-.305-.021C7.231 13.617 8.556 14 10 14c.449 0 .886-.04 1.307-.11L15 16v-4h-.012C15.627 11.285 16 10.425 16 9.5z"
                />
              </svg>
              <div
                class="absolute top-0 right-0 w-2.5 h-2.5 bg-brand-yellow border-2 border-brand-gray rounded-full"
              ></div>
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
                v-show="notificationOpen"
                class="origin-top-right z-10 absolute top-full right-0 -mr-48 sm:mr-0 min-w-80 bg-brand-gray border border-gray-600 py-1.5 rounded shadow-lg overflow-hidden mt-1"
              >
                <div class="text-xs font-semibold text-gray-400 uppercase pt-1.5 pb-2 px-4">
                  Notifications
                </div>
                <ul>
                  <li class="border-b border-gray-600 last:border-0">
                    <a
                      class="block py-2 px-4 hover:bg-brand-dark"
                      href="#0"
                      @click="notificationOpen = false"
                    >
                      <span class="block text-sm mb-2"
                        >📣
                        <span class="font-medium text-brand-text"
                          >Edit your information in a swipe</span
                        >
                        Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim.</span
                      >
                      <span class="block text-xs font-medium text-gray-400">Feb 12, 2021</span>
                    </a>
                  </li>
                  <li class="border-b border-gray-600 last:border-0">
                    <a
                      class="block py-2 px-4 hover:bg-brand-dark"
                      href="#0"
                      @click="notificationOpen = false"
                    >
                      <span class="block text-sm mb-2"
                        >📣
                        <span class="font-medium text-brand-text"
                          >Edit your information in a swipe</span
                        >
                        Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim.</span
                      >
                      <span class="block text-xs font-medium text-gray-400">Feb 9, 2021</span>
                    </a>
                  </li>
                  <li class="border-b border-gray-600 last:border-0">
                    <a
                      class="block py-2 px-4 hover:bg-brand-dark"
                      href="#0"
                      @click="notificationOpen = false"
                    >
                      <span class="block text-sm mb-2"
                        >🚀<span class="font-medium text-brand-text"
                          >Say goodbye to paper receipts!</span
                        >
                        Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim.</span
                      >
                      <span class="block text-xs font-medium text-gray-400">Jan 24, 2020</span>
                    </a>
                  </li>
                </ul>
              </div>
            </transition>
          </div>

          <div class="relative inline-flex" v-click-outside="() => (infoOpen = false)">
            <button
              class="w-8 h-8 flex items-center justify-center bg-brand-light-gray hover:bg-brand-gray transition duration-150 rounded-full"
              :class="{ 'bg-brand-gray': infoOpen }"
              aria-haspopup="true"
              @click.prevent="infoOpen = !infoOpen"
              :aria-expanded="infoOpen"
            >
              <span class="sr-only">Info</span>
              <svg class="w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path
                  class="fill-current text-gray-400"
                  d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z"
                />
              </svg>
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
                v-show="infoOpen"
                class="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-brand-gray border border-gray-600 py-1.5 rounded shadow-lg overflow-hidden mt-1"
              >
                <div class="text-xs font-semibold text-gray-400 uppercase pt-1.5 pb-2 px-3">
                  Need help?
                </div>
                <ul>
                  <li>
                    <a
                      class="font-medium text-sm text-brand-yellow hover:text-yellow-400 flex items-center py-1 px-3"
                      href="#0"
                      @click="infoOpen = false"
                    >
                      <svg
                        class="w-3 h-3 fill-current text-brand-yellow shrink-0 mr-2"
                        viewBox="0 0 12 12"
                      >
                        <rect y="3" width="12" height="9" rx="1" />
                        <path d="M2 0h8v2H2z" />
                      </svg>
                      <span>Documentation</span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="font-medium text-sm text-brand-yellow hover:text-yellow-400 flex items-center py-1 px-3"
                      href="#0"
                      @click="infoOpen = false"
                    >
                      <svg
                        class="w-3 h-3 fill-current text-brand-yellow shrink-0 mr-2"
                        viewBox="0 0 12 12"
                      >
                        <path
                          d="M10.5 0h-9A1.5 1.5 0 000 1.5v9A1.5 1.5 0 001.5 12h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0010.5 0zM10 7L8.207 5.207l-3 3-1.414-1.414 3-3L5 2h5v5z"
                        />
                      </svg>
                      <span>Support Site</span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="font-medium text-sm text-brand-yellow hover:text-yellow-400 flex items-center py-1 px-3"
                      href="#0"
                      @click="infoOpen = false"
                    >
                      <svg
                        class="w-3 h-3 fill-current text-brand-yellow shrink-0 mr-2"
                        viewBox="0 0 12 12"
                      >
                        <path
                          d="M11.854.146a.5.5 0 00-.525-.116l-11 4a.5.5 0 00-.015.934l4.8 1.921 1.921 4.8A.5.5 0 007.5 12h.008a.5.5 0 00.462-.329l4-11a.5.5 0 00-.116-.525z"
                        />
                      </svg>
                      <span>Contact us</span>
                    </a>
                  </li>
                </ul>
              </div>
            </transition>
          </div>

          <hr class="w-px h-6 bg-gray-600" />

          <div class="relative inline-flex" v-click-outside="() => (userDropdownOpen = false)">
            <button
              class="inline-flex justify-center items-center group"
              aria-haspopup="true"
              @click.prevent="userDropdownOpen = !userDropdownOpen"
              :aria-expanded="userDropdownOpen"
            >
              <img
                class="w-8 h-8 rounded-full"
                src="https://placehold.co/300x210/000000/FFF"
                width="32"
                height="32"
                alt="User"
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
                  <div class="font-medium text-brand-text">Nu'man Nasyar MZ</div>
                  <div class="text-xs text-gray-400 italic">Administrator</div>
                </div>
                <ul>
                  <li>
                    <a
                      class="font-medium text-sm text-brand-yellow hover:text-yellow-400 flex items-center py-1 px-3"
                      href="settings.html"
                      @click="userDropdownOpen = false"
                      >Settings</a
                    >
                  </li>
                  <li>
                    <a
                      class="font-medium text-sm text-brand-yellow hover:text-yellow-400 flex items-center py-1 px-3"
                      href="login.html"
                      @click="userDropdownOpen = false"
                      >Sign Out</a
                    >
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  sidebarOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['toggle-sidebar'])

const notificationOpen = ref(false)
const infoOpen = ref(false)
const userDropdownOpen = ref(false)

// Direktif kustom onClickOutside (dari @vueuse/core) digunakan langsung di template sebagai v-click-outside
// Anda perlu mendaftarkan direktif ini secara global di main.js jika ingin menggunakan v-click-outside="handler"
// Atau, jika tidak mendaftarkan direktif, Anda bisa menggunakan onClickOutside() hook di setup()
// seperti yang saya lakukan di TheSidebar.vue
// Untuk komponen ini, saya akan tetap menggunakan ref dan onClickOutside() hook
const notificationButtonRef = ref(null)
onClickOutside(notificationButtonRef, () => {
  notificationOpen.value = false
})
const infoButtonRef = ref(null)
onClickOutside(infoButtonRef, () => {
  infoOpen.value = false
})
const userButtonRef = ref(null)
onClickOutside(userButtonRef, () => {
  userDropdownOpen.value = false
})
</script>

<style scoped>
/* No specific scoped styles needed, relies on global/Tailwind */
</style>
