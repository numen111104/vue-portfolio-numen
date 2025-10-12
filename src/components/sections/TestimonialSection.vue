<template>
  <section
    id="testimonials"
    class="container px-4 py-12 mx-auto text-white md:px-8 lg:px-16"
  >
    <div class="flex flex-col mb-10 md:flex-row md:justify-between md:items-start">
      <div class="max-w-3xl">
        <h2 class="mb-4 text-3xl font-bold text-white md:text-4xl">
          What <span class="text-brand-yellow">They Say</span> About Me
        </h2>
        <p class="text-brand-text/80">
          Listen to what clients and colleagues have to say about my work and dedication.
        </p>
      </div>
      <div class="flex flex-col gap-4 mt-6 md:flex-row md:mt-0">
        <a href="#" class="flex items-center justify-between space-x-2 btn btn-primary group">
          <span>Discover More</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 transition-transform duration-300 transform group-hover:rotate-45"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </a>
        <button
          @click="showTestimonialModal = true"
          class="flex items-center justify-between space-x-2 text-white bg-gray-600 btn hover:bg-gray-700 group"
        >
          <span>Add Testimonial</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div class="p-6 card-home fade-in-up-on-scroll">
        <div class="flex items-center gap-4 mb-4">
          <img
            alt="Ryan Florence"
            src="https://placehold.co/300x210/000000/FFF"
            class="object-cover w-12 h-12 rounded-full"
          />
          <div>
            <h4 class="font-semibold text-white">Ryan Florence</h4>
            <p class="text-sm text-gray-400">Remix & React Training</p>
          </div>
        </div>
        <p class="text-sm leading-relaxed text-white">
          I feel like an idiot for not using Tailwind CSS until now.
        </p>
      </div>

      <div class="p-6 card-home fade-in-up-on-scroll" style="animation-delay: 0.1s">
        <div class="flex items-center gap-4 mb-4">
          <img
            alt="Debbie O'Brien"
            src="https://placehold.co/300x210/000000/FFF"
            class="object-cover w-12 h-12 rounded-full"
          />
          <div>
            <h4 class="font-semibold text-white">Debbie O'Brien</h4>
            <p class="text-sm text-gray-400">Senior Program Manager at Microsoft</p>
          </div>
        </div>
        <p class="text-sm leading-relaxed text-white">
          Have been working with CSS for over ten years and Tailwind just makes my life easier. It
          is still CSS and you use flex, grid, etc. but just quicker to write and maintain.
        </p>
      </div>

      <div class="p-6 card-home fade-in-up-on-scroll" style="animation-delay: 0.2s">
        <div class="flex items-center gap-4 mb-4">
          <img
            alt="Kent C. Dodds"
            src="https://placehold.co/300x210/000000/FFF"
            class="object-cover w-12 h-12 rounded-full"
          />
          <div>
            <h4 class="font-semibold text-white">Kent C. Dodds</h4>
            <p class="text-sm text-gray-400">Developer and Educator</p>
          </div>
        </div>
        <p class="text-sm leading-relaxed text-white">Skip to the end. Use @tailwindcss.</p>
      </div>

      <div class="p-6 card-home fade-in-up-on-scroll" style="animation-delay: 0.3s">
        <div class="flex items-center gap-4 mb-4">
          <img
            alt="Guillermo Rauch"
            src="https://placehold.co/300x210/000000/FFF"
            class="object-cover w-12 h-12 rounded-full"
          />
          <div>
            <h4 class="font-semibold text-white">Guillermo Rauch</h4>
            <p class="text-sm text-gray-400">Vercel</p>
          </div>
        </div>
        <p class="text-sm leading-relaxed text-white">
          If I had to recommend a way of getting into programming today, it would be HTML + CSS with
          Tailwind CSS.
        </p>
      </div>

      <div
        class="flex flex-col justify-between p-6 card-home fade-in-up-on-scroll"
        style="animation-delay: 0.4s"
      >
        <div>
          <div class="flex items-center gap-4 mb-4">
            <img
              alt="Ben Furfie"
              src="https://placehold.co/300x210/000000/FFF"
              class="object-cover w-12 h-12 rounded-full"
            />
            <div>
              <h4 class="font-semibold text-white">Ben Furfie</h4>
              <p class="text-sm text-gray-400">Developer</p>
            </div>
          </div>
          <p
            class="text-sm leading-relaxed text-white"
            :class="{ 'line-clamp-3': !testimonialExpanded }"
          >
            I've been writing CSS for over 20 years, and up until 2017, the way I wrote it changed
            frequently. It's not a coincidence Tailwind was released the same year. It might look
            wrong, but spend time with it and you'll realize something... Tailwind is just CSS
            without the pain, and it makes building UIs incredibly fast and enjoyable. It's truly a
            game-changer for front-end development.
          </p>
        </div>
      </div>

      <div
        class="flex flex-col justify-between p-6 card-home fade-in-up-on-scroll"
        style="animation-delay: 0.5s"
      >
        <div>
          <div class="flex items-center gap-4 mb-4">
            <img
              alt="Shruti Balasa"
              src="https://placehold.co/300x210/000000/FFF"
              class="object-cover w-12 h-12 rounded-full"
            />
            <div>
              <h4 class="font-semibold text-white">Shruti Balasa</h4>
              <p class="text-sm text-gray-400">Full Stack Web Developer & Tech Educator</p>
            </div>
          </div>
          <p class="text-sm leading-relaxed text-white">
            I was bad at front-end until I discovered Tailwind CSS. I have learnt a lot more about
            design and CSS itself after I started working with Tailwind. Creating web pages is 5x
            faster now.
          </p>
        </div>
      </div>
    </div>

    <BaseModal
      :show="showTestimonialModal"
      @close="showTestimonialModal = false"
      modal-id="testimonial-form-modal"
      modal-class="max-w-lg"
    >
      <template #header>Add Your Recommendation</template>
      <form @submit.prevent="handleSubmitTestimonial">
        <div class="mb-4">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-300">Your Name</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            class="w-full p-3 text-white border border-gray-600 rounded-md bg-brand-light-gray focus:ring-brand-yellow focus:border-brand-yellow"
            placeholder="John Doe"
            required
          />
        </div>
        <div class="mb-4">
          <label for="job" class="block mb-2 text-sm font-medium text-gray-300"
            >Your Job/Title</label
          >
          <input
            type="text"
            id="job"
            v-model="formData.job"
            class="w-full p-3 text-white border border-gray-600 rounded-md bg-brand-light-gray focus:ring-brand-yellow focus:border-brand-yellow"
            placeholder="Software Engineer at Google"
            required
          />
        </div>
        <div class="mb-4">
          <label for="profile_image" class="block mb-2 text-sm font-medium text-gray-300"
            >Profile Image</label
          >
          <input
            type="file"
            id="profile_image"
            accept="image/*"
            @change="handleImageUpload"
            class="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-yellow file:text-brand-dark hover:file:bg-yellow-300"
          />
          <div v-if="profileImagePreview" class="mt-4">
            <img
              :src="profileImagePreview"
              alt="Profile preview"
              class="object-cover w-24 h-24 border-2 rounded-full border-brand-yellow"
            />
          </div>
        </div>
        <div class="mb-6">
          <label for="testimonial_text" class="block mb-2 text-sm font-medium text-gray-300"
            >Your Recommendation</label
          >
          <textarea
            id="testimonial_text"
            v-model="formData.testimonialText"
            rows="5"
            class="w-full p-3 text-white border border-gray-600 rounded-md bg-brand-light-gray focus:ring-brand-yellow focus:border-brand-yellow"
            placeholder="Share your thoughts about my work..."
            required
          ></textarea>
        </div>
        <div class="flex justify-end gap-4">
          <button
            type="button"
            @click="showTestimonialModal = false"
            class="px-6 py-2 text-gray-300 transition-colors border border-gray-500 rounded-md hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-6 py-2 transition-colors rounded-md bg-brand-yellow text-brand-dark hover:bg-yellow-300"
          >
            Submit
          </button>
        </div>
      </form>
    </BaseModal>
  </section>
</template>

<script>
import BaseModal from '@/components/ui/BaseModal.vue' // Impor BaseModal

export default {
  name: 'TestimonialSection',
  components: {
    BaseModal, // Daftar BaseModal sebagai komponen anak
  },
  data() {
    return {
      showTestimonialModal: false,
      testimonialExpanded: false,
      formData: {
        name: '',
        job: '',
        profileImage: null, // Will hold File object
        testimonialText: '',
      },
      profileImagePreview: null,
    }
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.formData.profileImage = file
        const reader = new FileReader()
        reader.onload = (e) => {
          this.profileImagePreview = e.target.result
        }
        reader.readAsDataURL(file)
      } else {
        this.formData.profileImage = null
        this.profileImagePreview = null
      }
    },
    handleSubmitTestimonial() {
      console.log('Testimonial submitted:', this.formData)
      // In a real application, you would send this data to a server
      alert('Testimonial Submitted! (In a real app, this would send data to a server)')

      // Reset form fields after submission
      this.formData = {
        name: '',
        job: '',
        profileImage: null,
        testimonialText: '',
      }
      this.profileImagePreview = null
      // Clear file input manually (needed for <input type="file">)
      const fileInput = this.$el.querySelector('#profile_image')
      if (fileInput) {
        fileInput.value = ''
      }

      this.showTestimonialModal = false // Close modal
    },
  },
}
</script>

<style scoped>
/* Scoped styles for the Testimonials section if needed */
.card-home {
  background-color: var(--brand-gray);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.line-clamp-3 {
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
