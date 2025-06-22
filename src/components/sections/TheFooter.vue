<template>
  <footer class="px-4 py-12 text-white bg-brand-gray md:px-8 lg:px-16">
    <div class="container grid grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:grid-cols-4">
      <div>
        <h3 class="mb-4 text-xl font-bold text-brand-yellow">Nu'man Nasyar MZ</h3>
        <p class="text-sm leading-relaxed text-gray-400">
          Crafting innovative solutions with a passion for clean code and impactful design. Let's
          build something amazing together.
        </p>
      </div>

      <div>
        <h4 class="mb-4 text-lg font-semibold text-white">Quick Links</h4>
        <ul class="space-y-2">
          <li>
            <router-link
              to="/"
              class="text-sm text-gray-400 transition-colors hover:text-brand-yellow"
              >HOME</router-link
            >
          </li>
          <li>
            <router-link
              to="/about"
              class="text-sm text-gray-400 transition-colors hover:text-brand-yellow"
              >ABOUT</router-link
            >
          </li>
          <li>
            <router-link
              to="/work"
              class="text-sm text-gray-400 transition-colors hover:text-brand-yellow"
              >WORKS</router-link
            >
          </li>
          <li>
            <router-link
              to="/experience"
              class="text-sm text-gray-400 transition-colors hover:text-brand-yellow"
              >EXPERIENCES</router-link
            >
          </li>
          <li>
            <router-link
              to="/testimonial"
              class="text-sm text-gray-400 transition-colors hover:text-brand-yellow"
              >TESTIMONIAL</router-link
            >
          </li>
        </ul>
      </div>

      <div>
        <h4 class="mb-4 text-lg font-semibold text-white">Contact Info</h4>
        <p class="mb-2 text-sm text-gray-400">
          Email:
          <a href="mailto:numannasyarmz11@gmail.com" class="text-brand-yellow hover:underline"
            >numannasyarmz11@gmail.com</a
          >
        </p>
        <p class="mb-2 text-sm text-gray-400">Location: Jonggol, West Java, Indonesia</p>
        <p class="text-sm text-gray-400">Phone: +62 812 1131 8956 (WhatsApp)</p>
      </div>

      <div>
        <h4 class="mb-4 text-lg font-semibold text-white">Let's Connect!</h4>
        <div class="flex flex-col gap-3">
          <button
            @click="copyEmail"
            class="flex items-center gap-2 p-3 text-white transition-colors rounded-lg bg-brand-light-gray hover:bg-brand-yellow hover:text-brand-dark"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H5.25a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5A2.25 2.25 0 0 0 2.25 6.75m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <span>{{ copied ? 'Email Copied!' : 'Email Me' }}</span>
          </button>

          <a
            href="https://github.com/numen111104  "
            target="_blank"
            class="flex items-center gap-2 p-3 text-white transition-colors rounded-lg bg-brand-light-gray hover:bg-brand-yellow hover:text-brand-dark"
          >
            <img src="@/assets/images/icons/ic-github.png" alt="GitHub" class="w-5 h-5" />
            <span>GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/numannasyarmz"
            target="_blank"
            class="flex items-center gap-2 p-3 text-white transition-colors rounded-lg bg-brand-light-gray hover:bg-brand-yellow hover:text-brand-dark"
          >
            <img src="@/assets/images/icons/ic-linkedin.png" alt="LinkedIn" class="w-5 h-5" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>

    <div class="pt-6 mt-10 text-sm text-center text-gray-500 border-t border-gray-700">
      &copy; {{ currentYear }} Nu'man Nasyar MZ. All rights reserved.
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  data() {
    return {
      copied: false,
      email: 'numannasyarmz11gmail.com',
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
  },
  methods: {
    async copyEmail() {
      try {
        await navigator.clipboard.writeText(this.email)
        this.copied = true
        setTimeout(() => {
          this.copied = false
        }, 2000)
      } catch (err) {
        console.error('Failed to copy email: ', err)
      }
    },
  },
}
</script>

<style scoped>
.router-link-exact-active {
  color: var(--color-brand-yellow); /* Example: Highlight active link */
  font-weight: bold;
}
</style>
