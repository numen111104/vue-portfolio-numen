<template>
  <section
    id="home"
    class="container relative flex flex-col items-center px-4 py-12 mx-auto md:px-8 md:py-12 md:flex-row lg:px-16"
  >
    <div class="mb-10 text-center md:w-1/2 md:text-left md:mb-0">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 mb-4 text-sm font-semibold rounded-full bg-brand-light-gray text-brand-yellow animate-on-load animate-page-load load-delay-1"
      >
        <span class="relative flex w-2 h-2">
          <span
            class="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-brand-yellow"
          ></span>
          <span class="relative inline-flex w-2 h-2 rounded-full bg-brand-yellow"></span>
        </span>
        OPEN TO WORK
      </div>
      <span
        class="inline-block px-3 py-1 mb-4 text-sm font-semibold rounded-full bg-brand-light-gray text-brand-yellow animate-on-load animate-page-load load-delay-1"
        >TALL STACK</span
      >
      <h1
        class="text-4xl font-semibold leading-tight text-white uppercase sm:text-5xl md:text-6xl animate-on-load animate-page-load load-delay-2"
      >
        <span class="inline text-brand-yellow">SHORT</span>
        PATH TO
        <span class="inline text-brand-yellow">INOVATION</span>
      </h1>
      <h3
        class="max-w-lg mx-auto mt-4 text-2xl font-semibold sm:text-3xl text-brand-text md:mx-0 animate-on-load animate-page-load load-delay-4"
      >
        NU'MAN NASYAR MZ
      </h3>
      <h4
        class="max-w-lg mx-auto mt-1 text-xl font-medium capitalize sm:text-2xl text-brand-text md:mx-0 animate-on-load animate-page-load load-delay-4"
      >
        Full Stack Developer
      </h4>
      <a
        href="#contact"
        class="inline-flex items-center mt-8 space-x-2 btn btn-primary animate-on-load animate-page-load load-delay-4 group"
      >
        <span>GET IN TOUCH</span>
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
    </div>
    <div
      class="relative justify-center flex md:w-1/2 animate-on-load animate-page-load load-delay-5"
    >
      <img src="@/assets/images/hero-person.png" alt="Programmer" class="w-full max-w-sm" />
      <div
        class="absolute left-0 p-4 shadow-lg -bottom-8 md:bottom-82 md:left-16 bg-brand-gray rounded-xl animate-float"
        style="animation-duration: 3.5s"
      >
        <h3 class="text-2xl font-bold text-brand-yellow">30+</h3>
        <p class="text-sm text-white">Happy Clients</p>
      </div>
      <div
        class="absolute top-0 right-0 p-4 shadow-lg md:-top-4 md:right-20 bg-brand-gray rounded-xl animate-float"
        style="animation-delay: 0.5s"
      >
        <h3 class="text-2xl font-bold text-brand-yellow">1+</h3>
        <p class="text-sm text-white">Years Experience</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
}
</script>

<style scoped></style>
