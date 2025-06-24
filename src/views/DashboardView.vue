<template>
  <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
    <div class="relative bg-brand-gray p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
      <div
        class="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block"
        aria-hidden="true"
      >
        <svg width="319" height="198" xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs>
            <path id="welcome-a" d="M64 0l64 128-64-20-64 20z" />
            <path id="welcome-e" d="M40 0l40 80-40-12.5L0 80z" />
            <path id="welcome-g" d="M40 0l40 80-40-12.5L0 80z" />
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="welcome-b">
              <stop stop-color="#A5B4FC" offset="0%" />
              <stop stop-color="#818CF8" offset="100%" />
            </linearGradient>
            <linearGradient x1="50%" y1="24.537%" x2="50%" y2="100%" id="welcome-c">
              <stop stop-color="#4338CA" offset="0%" />
              <stop stop-color="#6366F1" stop-opacity="0" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="none" fill-rule="evenodd">
            <g transform="rotate(64 36.592 105.604)">
              <mask id="welcome-d" fill="#fff">
                <use xlink:href="#welcome-a" />
              </mask>
              <use fill="url(#welcome-b)" xlink:href="#welcome-a" />
              <path fill="url(#welcome-c)" mask="url(#welcome-d)" d="M64-24h80v152H64z" />
            </g>
            <g transform="rotate(-51 91.324 -105.372)">
              <mask id="welcome-f" fill="#fff">
                <use xlink:href="#welcome-e" />
              </mask>
              <use fill="url(#welcome-b)" xlink:href="#welcome-e" />
              <path fill="url(#welcome-c)" mask="url(#welcome-f)" d="M40.333-15.147h50v95h-50z" />
            </g>
            <g transform="rotate(44 61.546 392.623)">
              <mask id="welcome-h" fill="#fff">
                <use xlink:href="#welcome-g" />
              </mask>
              <use fill="url(#welcome-b)" xlink:href="#welcome-g" />
              <path fill="url(#welcome-c)" mask="url(#welcome-h)" d="M40.333-15.147h50v95h-50z" />
            </g>
          </g>
        </svg>
      </div>

      <div class="relative">
        <h1 class="text-2xl md:text-3xl text-brand-text font-bold mb-1">
          Good afternoon, Nu'man Nasyar MZ 👋
        </h1>
        <p class="text-gray-400">Welcome to your personalized dashboard!</p>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-6">
      <div class="card flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-brand-gray">
        <div class="px-5 pt-5">
          <h2 class="text-lg font-semibold text-brand-text mb-2">My First Widget</h2>
          <p class="text-sm text-gray-400">This is a placeholder for your custom content.</p>
        </div>
        <div class="grow flex items-center justify-center py-8">
          <p class="text-lg text-gray-500">Content goes here...</p>
        </div>
      </div>

      <div class="card flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-brand-gray">
        <div class="px-5 pt-5">
          <h2 class="text-lg font-semibold text-brand-text mb-2">Another Widget</h2>
          <p class="text-sm text-gray-400">
            You can add charts, lists, or other data visualizations here.
          </p>
        </div>
        <div class="grow flex items-center justify-center py-8">
          <p class="text-lg text-gray-500">Coming soon...</p>
        </div>
      </div>

      <div class="card flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-brand-gray">
        <div class="px-5 pt-5">
          <h2 class="text-lg font-semibold text-brand-text mb-2">Quick Stats</h2>
          <p class="text-sm text-gray-400">Summary of key metrics.</p>
        </div>
        <div class="grow flex items-center justify-center py-8">
          <p class="text-lg text-gray-500">Data will appear here.</p>
        </div>
      </div>

      <div class="card flex flex-col col-span-full bg-brand-gray">
        <header class="px-5 py-4 border-b border-gray-600">
          <h2 class="font-semibold text-brand-text">Overall Report</h2>
        </header>
        <div class="p-3 grow flex items-center justify-center py-12">
          <p class="text-lg text-gray-500">Detailed reports or a large chart can be placed here.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Anda bisa menambahkan logika spesifik dashboard di sini
</script>

<style scoped>
/* Scoped styles for DashboardView if needed */
/* Pastikan .card styles are inherited or defined globally */
</style>
