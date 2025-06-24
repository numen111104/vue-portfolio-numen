<template>
  <section id="about" class="container px-4 py-8 mx-auto text-white md:px-8 lg:px-16">
    <h3 class="section-title md:hidden block hover:text-brand-yellow transition-all">About Me</h3>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div class="col-span-1 card-home fade-in-up-on-scroll" style="animation-delay: 0.2s">
        <img
          src="@/assets/images/about.png"
          alt="Nu'man Nasyar MZ"
          class="object-cover w-full h-full rounded-lg"
        />
      </div>

      <div class="grid grid-cols-1 col-span-1 gap-8 md:grid-cols-1 lg:col-span-1">
        <div class="card-home fade-in-up-on-scroll" style="animation-delay: 0.3s">
          <div class="relative w-full overflow-hidden rounded-lg">
            <div class="relative">
              <img
                src="@/assets/images/tidore.png"
                alt="Map of Pulau Tidore"
                class="object-cover w-full h-auto max-w-xl mx-auto"
              />

              <div
                class="absolute z-10 transform"
                style="top: 17%; left: 44%; transform: translate(-50%, -50%)"
              >
                <div
                  class="absolute w-2.5 h-2.5 bg-yellow-400 rounded-full opacity-75 animate-ping"
                ></div>
                <div class="relative w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
              </div>
            </div>
          </div>

          <div class="my-4">
            <router-link
              to="/about"
              class="flex items-center justify-between space-x-2 btn btn-primary group"
            >
              <span>MORE ABOUT ME</span>
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
            </router-link>
          </div>

          <div class="flex justify-between gap-4 mt-4">
            <a
              href="https://github.com/numen111104"
              target="_blank"
              class="flex items-center justify-center p-4 transition duration-300 rounded-2xl hover:bg-brand-yellow/10"
            >
              <img
                src="@/assets/images/icons/ic-github.png"
                class="w-10 h-10 md:w-14 md:h-14"
                alt="GitHub"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/numannasyarmz"
              target="_blank"
              class="flex items-center justify-center p-4 transition duration-300 rounded-2xl hover:bg-brand-yellow/10"
            >
              <img
                src="@/assets/images/icons/ic-linkedin.png"
                class="w-10 h-10 md:w-14 md:h-14"
                alt="LinkedIn"
              />
            </a>
            <a
              href="mailto:numannasyarmz11@gmail.com"
              target="_blank"
              class="flex items-center justify-center p-4 transition duration-300 rounded-2xl hover:bg-brand-yellow/10"
            >
              <img
                src="@/assets/images/icons/ic-gmail.png"
                class="w-10 h-10 md:w-14 md:h-14"
                alt="Email"
              />
            </a>
          </div>
        </div>

        <div class="card-home fade-in-up-on-scroll" style="animation-delay: 0.6s">
          <h3 class="mb-2 text-xl font-semibold">Education</h3>

          <div class="flex items-center justify-start gap-4 p-4">
            <img
              src="@/assets/images/icons/idn-poltek.png"
              alt="IDN Boarding School Logo"
              class="w-20 h-20"
            />
            <div>
              <h4 class="text-lg font-semibold text-brand-yellow">2023 - Now</h4>
              <p class="text-base text-white">Student At IDN Polytechnic Bogor</p>
              <p class="text-sm text-gray-400">Software Engineer</p>
            </div>
          </div>
          <p class="self-end text-sm text-gray-400">
            There are many things that I have learned during my education that are useful for
            developing my skills.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 col-span-1 gap-8 md:col-span-2 lg:col-span-1">
        <div
          class="flex flex-col justify-between card-home fade-in-up-on-scroll"
          style="animation-delay: 0.4s"
        >
          <h3 class="mb-2 text-xl font-semibold">
            <a
              href="#"
              class="flex items-center justify-between transition-transform group hover:text-brand-yellow"
            >
              <span> Certifications </span>
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
                ></path>
              </svg>
            </a>
          </h3>
          <div class="relative w-full overflow-hidden">
            <div class="flex items-center gap-8 mb-4 animate-marquee">
              <img
                src="https://placehold.co/300x210/000000/FFF"
                alt="Certificate 1"
                class="shrink-0 object-cover rounded-lg w-28 sm:w-32 md:w-38"
              />
              <img
                src="https://placehold.co/300x210/000000/FFF"
                alt="Certificate 2"
                class="shrink-0 object-cover rounded-lg w-28 sm:w-32 md:w-38"
              />
              <img
                src="https://placehold.co/300x210/000000/FFF"
                alt="Certificate 3"
                class="shrink-0 object-cover rounded-lg w-28 sm:w-32 md:w-38"
              />
              <img
                src="https://placehold.co/300x210/000000/FFF"
                alt="Certificate 4"
                class="shrink-0 object-cover rounded-lg w-28 sm:w-32 md:w-38"
              />
              <img
                src="https://placehold.co/300x210/000000/FFF"
                alt="Certificate 5"
                class="shrink-0 object-cover rounded-lg w-28 sm:w-32 md:w-38"
              />
            </div>
          </div>
          <p class="py-2 text-sm text-gray-400">
            Grateful for the certifications I've achieved—each one represents a milestone in my
            journey.
          </p>
        </div>
        <div
          class="flex flex-col justify-between card-home fade-in-up-on-scroll"
          style="animation-delay: 0.5s"
        >
          <h3 class="mb-2 text-xl font-semibold">
            <a href="#" class="flex items-center justify-between group">
              Techstacks
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewbox="0 0 24 24"
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
          </h3>
          <div class="relative w-full overflow-hidden">
            <div
              class="flex items-center justify-center gap-8 animate-marquee"
              style="transition: all 500ms"
            >
              <img
                src="https://placehold.co/300x210/000000/FFF"
                alt="JavaScript"
                class="shrink-0 w-24 h-24"
              />
              <img
                src="https://placehold.co/300x210/000000/FFF"
                alt="TypeScript"
                class="shrink-0 w-24 h-24"
              />
              <img
                src="https://placehold.co/300x210/000000/FFF"
                alt="Vue.js"
                class="shrink-0 w-24 h-24"
              />
              <img
                src="https://placehold.co/300x210/000000/FFF"
                alt="Git"
                class="shrink-0 w-24 h-24"
              />
              <img
                src="https://placehold.co/300x210/000000/FFF"
                alt="Figma"
                class="shrink-0 w-24 h-24"
              />
              <img
                src="https://placehold.co/300x210/000000/FFF"
                alt="Chakra UI"
                class="shrink-0 w-24 h-24"
              />
              <img
                src="https://placehold.co/300x210/000000/FFF"
                alt="JavaScript"
                class="shrink-0 w-24 h-24"
              />
              <img
                src="https://placehold.co/300x210/000000/FFF"
                alt="TypeScript"
                class="shrink-0 w-24 h-24"
              />
              <img
                src="https://placehold.co/300x210/000000/FFF"
                alt="Vue.js"
                class="shrink-0 w-24 h-24"
              />
              <img
                src="https://placehold.co/300x210/000000/FFF"
                alt="Git"
                class="shrink-0 w-24 h-24"
              />
              <img
                src="https://placehold.co/300x210/000000/FFF"
                alt="Figma"
                class="shrink-0 w-24 h-24"
              />
              <img
                src="https://placehold.co/300x210/000000/FFF"
                alt="Chakra UI"
                class="shrink-0 w-24 h-24"
              />
            </div>
          </div>
          <p class="text-sm text-gray-400">
            I am familiar with several tech stacks that I'm currently refining and actively
            expending my expertise in, including frontend, backend, and Design tools.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutSection',
  mounted() {
    // Optionally re-initialize Intersection Observer specifically for this component if needed
    // However, the global observer in App.vue should handle this.
  },
}
</script>

<style scoped></style>
