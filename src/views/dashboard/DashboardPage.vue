<template>
  <div>
    <div class="fade-in-down-on-scroll">
      <HighlightedTitle unlighter="Dashboard" lighter="Overview" />
      <p class="text-brand-text/80 !mx-0 !max-w-full !text-left !text-base">
        Welcome to your analytics dashboard.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div class="card-home fade-in-up-on-scroll bg-brand-gray p-6" style="animation-delay: 0.1s">
        <h4 class="mb-2 font-semibold text-gray-400">Products Purchased</h4>
        <p class="text-3xl font-bold text-white">$4,273</p>
        <p class="mt-2 flex items-center text-sm text-green-400">
          <svg class="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M10 17a.75.75 0 01-.75-.75V5.612L6.03 8.84a.75.75 0 11-1.06-1.06l4.25-4.25a.75.75 0 011.06 0l4.25 4.25a.75.75 0 11-1.06 1.06L10.75 5.612V16.25A.75.75 0 0110 17z"
              clip-rule="evenodd" />
          </svg>
          <span>14 in last 30 days</span>
        </p>
      </div>

      <div class="card-home fade-in-up-on-scroll bg-brand-gray p-6" style="animation-delay: 0.2s">
        <h4 class="mb-2 font-semibold text-gray-400">Products Sold</h4>
        <p class="text-3xl font-bold text-white">$6,237</p>
        <p class="mt-2 flex items-center text-sm text-green-400">
          <svg class="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M10 17a.75.75 0 01-.75-.75V5.612L6.03 8.84a.75.75 0 11-1.06-1.06l4.25-4.25a.75.75 0 011.06 0l4.25 4.25a.75.75 0 11-1.06 1.06L10.75 5.612V16.25A.75.75 0 0110 17z"
              clip-rule="evenodd" />
          </svg>
          <span>18 in last 30 days</span>
        </p>
      </div>

      <div class="card-home fade-in-up-on-scroll bg-brand-gray p-6" style="animation-delay: 0.3s">
        <h4 class="mb-2 font-semibold text-gray-400">Total Purchases on Platform</h4>
        <p class="text-3xl font-bold text-white">$7.8M</p>
        <p class="mt-2 flex items-center text-sm text-green-400">
          <svg class="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M10 17a.75.75 0 01-.75-.75V5.612L6.03 8.84a.75.75 0 11-1.06-1.06l4.25-4.25a.75.75 0 011.06 0l4.25 4.25a.75.75 0 11-1.06 1.06L10.75 5.612V16.25A.75.75 0 0110 17z"
              clip-rule="evenodd" />
          </svg>
          <span>9,118 in last 30 days</span>
        </p>
      </div>
    </div>

    <div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
      <div class="card-home fade-in-up-on-scroll bg-brand-gray p-6 lg:col-span-3" style="animation-delay: 0.4s">
        <h4 class="mb-4 font-semibold text-white">Profit from Vendors</h4>
        <div class="flex h-64 items-end justify-between gap-2">
          <div class="chart-bar group" style="height: 80%"><span class="bar-label">$8000</span></div>
          <div class="chart-bar group" style="height: 70%"><span class="bar-label">$6500</span></div>
          <div class="chart-bar group" style="height: 78%"><span class="bar-label">$6100</span></div>
          <div class="chart-bar group" style="height: 55%"><span class="bar-label">$4000</span></div>
          <div class="chart-bar group" style="height: 20%"><span class="bar-label">$1000</span></div>
          <div class="chart-bar group" style="height: 50%"><span class="bar-label">$3500</span></div>
          <div class="chart-bar group" style="height: 30%"><span class="bar-label">$2000</span></div>
        </div>
        <div class="mt-2 flex justify-between border-t border-brand-light-gray pt-2 text-sm text-gray-400">
          <span>NIKE</span>
          <span>ADIDAS</span>
          <span>YEEZY</span>
          <span>JORDAN</span>
          <span>PUMA</span>
          <span>UNDER ARMOUR</span>
          <span>NEW BALANCE</span>
        </div>
      </div>

      <div class="card-home fade-in-up-on-scroll bg-brand-gray p-6 lg:col-span-2" style="animation-delay: 0.5s">
        <h4 class="mb-4 font-semibold text-white">Recent Purchases</h4>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead>
              <tr class="border-b border-brand-light-gray text-gray-400">
                <th class="py-2">Date</th>
                <th class="py-2">Vendor</th>
                <th class="py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-brand-light-gray/50">
                <td class="py-3">19 Aug</td>
                <td class="py-3">Nike Air Zoom Pegasus 37</td>
                <td class="py-3 font-medium text-white">$260</td>
              </tr>
              <tr class="border-b border-brand-light-gray/50">
                <td class="py-3">19 Aug</td>
                <td class="py-3">Adidas Ultra Boost</td>
                <td class="py-3 font-medium text-white">$260</td>
              </tr>
              <tr class="border-b border-brand-light-gray/50">
                <td class="py-3">17 Aug</td>
                <td class="py-3">Under Armour Charged B...</td>
                <td class="py-3 font-medium text-white">$260</td>
              </tr>
              <tr class="border-b border-brand-light-gray/50">
                <td class="py-3">16 Aug</td>
                <td class="py-3">Nike Air Max 270</td>
                <td class="py-3 font-medium text-white">$260</td>
              </tr>
              <tr>
                <td class="py-3">11 Aug</td>
                <td class="py-3">Nike Air Force 1 07</td>
                <td class="py-3 font-medium text-white">$200</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import HighlightedTitle from '@/components/ui/HighlightedTitle.vue'

onMounted(() => {
  const animatedElements = document.querySelectorAll(
    '.fade-in-up-on-scroll, .fade-in-down-on-scroll'
  )

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1, // trigger when 10% of the element is visible
      }
    )

    animatedElements.forEach((el) => {
      observer.observe(el)
    })
  } else {
    // Fallback untuk browser lama
    animatedElements.forEach((el) => {
      el.classList.add('is-visible')
    })
  }
})
</script>

<style scoped></style>
