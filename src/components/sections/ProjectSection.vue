<template>
  <section
    id="projects"
    class="container px-4 py-12 mx-auto text-white md:px-8 lg:px-16 bg-brand-dark"
  >
    <div class="flex flex-col mb-10 md:flex-row md:justify-between md:items-start">
      <div class="max-w-xl">
        <h2 class="mb-4 text-3xl font-bold text-white md:text-4xl">
          Innovating for a
          <span class="text-brand-yellow">Brighter Future</span>
        </h2>
        <p class="text-brand-text/80">
          I innovate to create solutions that pave the way for a brighter and more sustainable
          future.
        </p>
      </div>
      <router-link
        to="/project"
        class="flex items-center justify-between mt-6 space-x-2 btn btn-primary group md:mt-0"
      >
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
      </router-link>
    </div>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div class="project-card card-home fade-in-up-on-scroll is-visible">
        <img
          src="https://placehold.co/300x510/000000/FFF"
          alt="PT Shafulra Digital Indonesia Project"
          class="object-cover w-full h-48 mb-4 rounded-lg"
        />
        <h3 class="mb-2 text-xl font-semibold text-white">
          PT Shafulra Digital Indonesia. Company Profile & Management Company
        </h3>
        <p class="mb-4 text-sm text-gray-400">
          Saya bersama teman-teman, Vallian Soyoga dan Mawaldy Adha, mendapatkan kesempatan untuk
          mengerjakan...
        </p>
        <a href="#" class="inline-flex items-center text-brand-yellow hover:text-yellow-300 group">
          <span>Read more</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 ml-2 transition-transform duration-300 transform group-hover:translate-x-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </a>
      </div>

      <div
        class="project-card card-home fade-in-up-on-scroll is-visible"
        style="animation-delay: 0.1s"
      >
        <img
          src="https://placehold.co/300x510/000000/FFF"
          alt="Restaurant App Project"
          class="object-cover w-full h-48 mb-4 rounded-lg"
        />
        <h3 class="mb-2 text-xl font-semibold text-white">
          Restaurant App. With Flutter & Dicoding Restaurant API
        </h3>
        <div class="flex items-center gap-3 mb-4 text-brand-yellow">
          <div class="inline-flex items-center space-x-2">
            <img
              src="https://placehold.co/300x210/000000/FFF"
              alt="Tech Stack Icon"
              class="w-5 h-5"
            />
            <span class="text-sm font-medium">Tech Stack</span>
          </div>
          <div class="inline-flex items-center space-x-2">
            <img
              src="https://placehold.co/300x210/000000/FFF"
              alt="Tech Stack Icon"
              class="w-5 h-5"
            />
            <span class="text-sm font-medium">Tech Stack</span>
          </div>
        </div>
        <p class="mb-4 text-sm text-gray-400">
          Saya mendapat kesempatan berharga untuk mengikuti program beasiswa belajar aplikasi
          multiplatform menggunakan...
        </p>
        <a href="#" class="inline-flex items-center text-brand-yellow hover:text-yellow-300 group">
          <span>Read more</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 ml-2 transition-transform duration-300 transform group-hover:translate-x-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </a>
      </div>

      <div
        class="project-card card-home fade-in-up-on-scroll is-visible"
        style="animation-delay: 0.2s"
      >
        <img
          src="https://placehold.co/300x510/000000/FFF"
          alt="Digital Things Developer Project"
          class="object-cover w-full h-48 mb-4 rounded-lg"
        />
        <h3 class="mb-2 text-xl font-semibold text-white">
          Learn Anytime, Anywhere. Digital Things Developer
        </h3>
        <p class="mb-4 text-sm text-gray-400">
          Digital Things Developer adalah platform eLearning yang dirancang untuk membantu individu
          mengasah...
        </p>
        <a href="#" class="inline-flex items-center text-brand-yellow hover:text-yellow-300 group">
          <span>Read more</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 ml-2 transition-transform duration-300 transform group-hover:translate-x-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProjectSection',
}
</script>
