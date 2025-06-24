<template>
  <main class="container px-4 py-8 mx-auto text-white md:px-8 lg:px-16">
    <div class="h-20 md:h-24"></div>
    <section class="mb-8">
      <div
        class="hover:scale-105 transition duration-300 cursor-pointer brand-border card-home bg-brand-light-gray flex rounded-xl items-center justify-center h-12 w-40 group p-2"
      >
        <svg
          class="w-5 h-5 text-brand-yellow transform"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <path d="M14 2v6h6"></path>
          <path d="M12 17v-6"></path>
          <path d="M9 14h6"></path>
        </svg>
        <div class="w-2"></div>
        <p class="text-brand-yellow font-medium text-md">Testimonials</p>
      </div>
      <div class="flex sm:flex-row flex-col justify-between">
        <div>
          <h2 class="text-brand-text mb-3 font-medium text-3xl">
            What <span class="text-brand-yellow">They Say</span> About Me
          </h2>
          <p class="text-gray-400 font-normal text-base">
            Listen to what clients and colleagues have to say about my work and dedication.
          </p>
        </div>
        <div class="md:h-0 h-10"></div>
      </div>
    </section>

    <section class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div class="p-6 card transition-all duration-300 ease-in-out hover:scale-105">
        <div class="flex items-center gap-4 mb-4">
          <img
            alt="Ryan Florence"
            src="https://placehold.co/100x100/000000/FFF?text=RF"
            class="object-cover w-16 h-16 rounded-full"
          />
          <div>
            <h4 class="font-semibold text-white text-lg">Ryan Florence</h4>
            <p class="text-sm text-gray-400">Remix & React Training</p>
          </div>
        </div>
        <p class="text-base leading-relaxed text-white">
          "I feel like an idiot for not using Tailwind CSS until now. It makes styling so much
          faster and more enjoyable. Truly a game-changer!"
        </p>
      </div>

      <div class="p-6 card transition-all duration-300 ease-in-out hover:scale-105">
        <div class="flex items-center gap-4 mb-4">
          <img
            alt="Debbie O'Brien"
            src="https://placehold.co/100x100/000000/FFF?text=DO"
            class="object-cover w-16 h-16 rounded-full"
          />
          <div>
            <h4 class="font-semibold text-white text-lg">Debbie O'Brien</h4>
            <p class="text-sm text-gray-400">Senior Program Manager at Microsoft</p>
          </div>
        </div>
        <p class="text-base leading-relaxed text-white">
          "Have been working with CSS for over ten years and Tailwind just makes my life easier. It
          is still CSS and you use flex, grid, etc. but just quicker to write and maintain."
        </p>
      </div>

      <div class="p-6 card transition-all duration-300 ease-in-out hover:scale-105">
        <div class="flex items-center gap-4 mb-4">
          <img
            alt="Kent C. Dodds"
            src="https://placehold.co/100x100/000000/FFF?text=KCD"
            class="object-cover w-16 h-16 rounded-full"
          />
          <div>
            <h4 class="font-semibold text-white text-lg">Kent C. Dodds</h4>
            <p class="text-sm text-gray-400">Developer and Educator</p>
          </div>
        </div>
        <p class="text-base leading-relaxed text-white">
          "Skip to the end. Use @tailwindcss. It truly changes the game for front-end development,
          making it much more efficient and enjoyable."
        </p>
      </div>

      <div class="p-6 card transition-all duration-300 ease-in-out hover:scale-105">
        <div class="flex items-center gap-4 mb-4">
          <img
            alt="Guillermo Rauch"
            src="https://placehold.co/100x100/000000/FFF?text=GR"
            class="object-cover w-16 h-16 rounded-full"
          />
          <div>
            <h4 class="font-semibold text-white text-lg">Guillermo Rauch</h4>
            <p class="text-sm text-gray-400">CEO, Vercel</p>
          </div>
        </div>
        <p class="text-base leading-relaxed text-white">
          "If I had to recommend a way of getting into programming today, it would be HTML + CSS
          with Tailwind CSS. The speed and flexibility are unmatched."
        </p>
      </div>

      <div class="p-6 card transition-all duration-300 ease-in-out hover:scale-105">
        <div>
          <div class="flex items-center gap-4 mb-4">
            <img
              alt="Ben Furfie"
              src="https://placehold.co/100x100/000000/FFF?text=BF"
              class="object-cover w-16 h-16 rounded-full"
            />
            <div>
              <h4 class="font-semibold text-white text-lg">Ben Furfie</h4>
              <p class="text-sm text-gray-400">Developer</p>
            </div>
          </div>
          <p class="text-base leading-relaxed text-white">
            "I've been writing CSS for over 20 years, and up until 2017, the way I wrote it changed
            frequently. It's not a coincidence Tailwind was released the same year. It might look
            wrong, but spend time with it and you'll realize something... Tailwind is just CSS
            without the pain, and it makes building UIs incredibly fast and enjoyable. It's truly a
            game-changer for front-end development."
          </p>
        </div>
      </div>

      <div class="p-6 card transition-all duration-300 ease-in-out hover:scale-105">
        <div>
          <div class="flex items-center gap-4 mb-4">
            <img
              alt="Shruti Balasa"
              src="https://placehold.co/100x100/000000/FFF?text=SB"
              class="object-cover w-16 h-16 rounded-full"
            />
            <div>
              <h4 class="font-semibold text-white text-lg">Shruti Balasa</h4>
              <p class="text-sm text-gray-400">Full Stack Web Developer & Tech Educator</p>
            </div>
          </div>
          <p class="text-base leading-relaxed text-white">
            "I was bad at front-end until I discovered Tailwind CSS. I have learnt a lot more about
            design and CSS itself after I started working with Tailwind. Creating web pages is 5x
            faster now."
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'TestimonialDetailView',
  // Jika Anda ingin mengelola daftar testimonial secara dinamis, Anda bisa menambahkannya di sini
  // data() {
  //   return {
  //     testimonials: [
  //       {
  //         name: "Ryan Florence",
  //         title: "Remix & React Training",
  //         image: "https://placehold.co/100x100/000000/FFF?text=RF",
  //         description: "I feel like an idiot for not using Tailwind CSS until now...",
  //       },
  //       // ... testimonial lainnya
  //     ]
  //   };
  // },
}
</script>
