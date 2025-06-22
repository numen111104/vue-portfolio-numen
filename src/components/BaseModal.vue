<template>
  <transition
    enter-active-class="ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isVisible"
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs"
      aria-hidden="true"
      @click.self="closeModalOnClickOutside"
    ></div>
  </transition>

  <transition
    enter-active-class="ease-out duration-300"
    enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    enter-to-class="opacity-100 translate-y-0 sm:scale-100"
    leave-active-class="ease-in duration-200"
    leave-from-class="opacity-100 translate-y-0 sm:scale-95"
    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  >
    <div
      v-if="isVisible"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="modalId + '-title'"
    >
      <div class="w-full p-6 rounded-lg shadow-xl bg-brand-gray" :class="modalClass" @click.stop="">
        <div class="flex justify-between items-center mb-4">
          <h3 :id="modalId + '-title'" class="text-2xl font-bold text-white">
            <slot name="header"></slot>
          </h3>
          <button
            v-if="showCloseButton"
            @click="closeModal"
            class="text-gray-400 hover:text-white"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="modal-body">
          <slot></slot>
        </div>

        <div v-if="$slots.footer" class="modal-footer mt-6 flex justify-end gap-4">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    modalId: {
      type: String,
      default: 'base-modal',
    },
    modalClass: {
      type: String,
      default: 'max-w-lg', // Default width
    },
    closeOnOutsideClick: {
      type: Boolean,
      default: true,
    },
    showCloseButton: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['close'],
  computed: {
    isVisible() {
      return this.show
    },
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden' // Prevent scrolling on body
        document.addEventListener('keydown', this.handleEscapeKey)
      } else {
        document.body.style.overflow = '' // Restore scrolling
        document.removeEventListener('keydown', this.handleEscapeKey)
      }
    },
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    closeModalOnClickOutside() {
      if (this.closeOnOutsideClick) {
        this.closeModal()
      }
    },
    handleEscapeKey(event) {
      if (event.key === 'Escape') {
        this.closeModal()
      }
    },
  },
  beforeUnmount() {
    document.body.style.overflow = '' // Ensure scrolling is re-enabled if modal is destroyed
    document.removeEventListener('keydown', this.handleEscapeKey)
  },
}
</script>

<style scoped>
.modal-body {
  padding: 1rem;
  max-height: 80vh;
  overflow-y: auto;
}
</style>
