<template>
  <section class="container px-4 py-8 mx-auto md:px-8 lg:px-16 text-white">
    <HighlightedTitle lighter="Timeline" unlighter="Education" class="text-center" />
    <div class="relative wrap overflow-hidden p-6 md:p-10 h-full">
      <div
        class="absolute border-opacity-20 border-brand-gray h-full border timeline-line"
        style="left: 50%"
      ></div>

      <div
        class="mb-8 flex justify-between items-center w-full timeline-item"
        :class="{ 'left-aligned': false, 'right-aligned': true }"
      >
        <div class="order-1 w-5/12 hidden md:block"></div>
        <div
          class="z-20 flex items-center order-1 bg-brand-yellow shadow-xl w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 rounded-full"
        >
          <h1 class="mx-auto text-white font-semibold text-lg"></h1>
        </div>
        <div
          class="order-1 bg-brand-gray rounded-lg shadow-xl w-full md:w-5/12 px-6 py-4 card transition-all duration-300 ease-in-out hover:scale-105"
        >
          <p class="text-xs text-gray-400 mb-2 md:text-left text-center">
            Oct <span class="text-xl font-bold block text-white">01</span> 2020
          </p>
          <h3 class="mb-2 text-xl font-semibold text-white text-center md:text-left">
            Office Inauguration Function
          </h3>
          <p class="text-sm leading-relaxed text-gray-400 text-center md:text-left">
            Started journey with new office
          </p>
          <div class="flex mt-4 space-x-2 justify-center md:justify-start">
            <img
              src="https://placehold.co/60x60/334155/FFF?text=Office1"
              alt="Office 1"
              class="w-16 h-16 object-cover rounded-md"
            />
            <img
              src="https://placehold.co/60x60/334155/FFF?text=Office2"
              alt="Office 2"
              class="w-16 h-16 object-cover rounded-md"
            />
            <img
              src="https://placehold.co/60x60/334155/FFF?text=Office3"
              alt="Office 3"
              class="w-16 h-16 object-cover rounded-md"
            />
          </div>
        </div>
      </div>

      <div
        class="mb-8 flex justify-between flex-row-reverse items-center w-full timeline-item"
        :class="{ 'left-aligned': true, 'right-aligned': false }"
      >
        <div class="order-1 w-5/12 hidden md:block"></div>
        <div
          class="z-20 flex items-center order-1 bg-brand-yellow shadow-xl w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 rounded-full"
        >
          <h1 class="mx-auto text-white font-semibold text-lg"></h1>
        </div>
        <div
          class="order-1 bg-brand-gray rounded-lg shadow-xl w-full md:w-5/12 px-6 py-4 card transition-all duration-300 ease-in-out hover:scale-105"
        >
          <p class="text-xs text-gray-400 mb-2 md:text-left text-center">
            Sept <span class="text-xl font-bold block text-white">16</span> 2020
          </p>
          <h3 class="mb-2 text-xl font-semibold text-white text-center md:text-left">
            Reached New record
          </h3>
          <p class="text-sm leading-relaxed text-gray-400 text-center md:text-left">
            Life time accreditation from IAO (First Business Advisory Firm in India)
          </p>
        </div>
      </div>

      <div
        class="mb-8 flex justify-between items-center w-full timeline-item"
        :class="{ 'left-aligned': false, 'right-aligned': true }"
      >
        <div class="order-1 w-5/12 hidden md:block"></div>
        <div
          class="z-20 flex items-center order-1 bg-brand-yellow shadow-xl w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 rounded-full"
        >
          <h1 class="mx-auto text-white font-semibold text-lg"></h1>
        </div>
        <div
          class="order-1 bg-brand-gray rounded-lg shadow-xl w-full md:w-5/12 px-6 py-4 card transition-all duration-300 ease-in-out hover:scale-105"
        >
          <p class="text-xs text-gray-400 mb-2 md:text-left text-center">
            Sept <span class="text-xl font-bold block text-white">12</span> 2020
          </p>
          <h3 class="mb-2 text-xl font-semibold text-white text-center md:text-left">
            Design Meetup
          </h3>
          <p class="text-sm leading-relaxed text-gray-400 text-center md:text-left">
            This is where it all goes down. You will compete head to head with your friends and
            rivals. Get ready!
          </p>
        </div>
      </div>

      <div
        class="mb-8 flex justify-between flex-row-reverse items-center w-full timeline-item"
        :class="{ 'left-aligned': true, 'right-aligned': false }"
      >
        <div class="order-1 w-5/12 hidden md:block"></div>
        <div
          class="z-20 flex items-center order-1 bg-brand-yellow shadow-xl w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 rounded-full"
        >
          <h1 class="mx-auto text-white font-semibold text-lg"></h1>
        </div>
        <div
          class="order-1 bg-brand-gray rounded-lg shadow-xl w-full md:w-5/12 px-6 py-4 card transition-all duration-300 ease-in-out hover:scale-105"
        >
          <p class="text-xs text-gray-400 mb-2 md:text-left text-center">
            Aug <span class="text-xl font-bold block text-white">20</span> 2020
          </p>
          <h3 class="mb-2 text-xl font-semibold text-white text-center md:text-left">
            New People joined with our journey
          </h3>
          <div class="flex items-center mt-4 justify-center md:justify-start">
            <img
              src="https://placehold.co/60x60/334155/FFF?text=John"
              alt="John Smith"
              class="w-12 h-12 object-cover rounded-full mr-3"
            />
            <div>
              <p class="text-sm font-semibold text-white text-left">John Smith</p>
              <p class="text-xs text-gray-400 text-left">Designer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import HighlightedTitle from '../common/HighlightedTitle.vue'

export default {
  name: 'EducationTimeline',
  components: {
    HighlightedTitle,
  },
}
</script>

<style scoped>
/* Scoped styles for the timeline */

/* Base styles for the wrap container */
.wrap {
  position: relative;
}

/* Garis tengah timeline */
.timeline-line {
  position: absolute;
  top: 0;
  width: 5px;
  height: 100%;
  background: linear-gradient(to bottom, var(--tw-border-brand-gray), var(--tw-border-brand-gray));
  transform: translateX(-50%);
  overflow: hidden;
  /* Posisi awal di tengah (untuk desktop dan sebagai fallback) */
  left: 50%;
}

/* Animasi cahaya berjalan */
.timeline-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(242, 255, 0, 0.8),
    rgba(255, 255, 255, 0)
  );
  animation: movingLight 6s infinite linear;
}

@keyframes movingLight {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(200vh);
  }
}

/* Styling untuk lingkaran di timeline */
.z-20 {
  /* Default positioning for desktop */
  position: absolute; /* Harus absolute untuk positioning yang akurat */
  left: 50%; /* Akan diatur ulang di media query mobile */
  transform: translateX(-50%); /* Memastikan lingkaran tepat di tengah garis */
  z-index: 20; /* Keep it on top */
}

/* Card Styling */
.card {
  /* Existing styles */
  position: relative; /* Penting untuk z-index jika nanti ada interaksi */
}

/* Aturan umum untuk item timeline */
.timeline-item {
  position: relative;
  display: flex; /* Ensure flexbox is active */
  flex-direction: row; /* Default desktop flex direction */
  align-items: center; /* Default desktop alignment */
}

/* Adjustments for larger screens (md breakpoint) */
@media (min-width: 768px) {
  .timeline-line {
    left: 50%; /* Posisikan di tengah untuk desktop */
    transform: translateX(-50%);
  }

  .z-20 {
    /* Reset for desktop to work with flexbox item order */
    position: static;
    transform: none;
  }

  .timeline-item.right-aligned {
    justify-content: space-between; /* Untuk desktop, dorong ke kanan garis */
    flex-direction: row;
  }

  .timeline-item.left-aligned {
    justify-content: space-between; /* Untuk desktop, dorong ke kiri garis */
    flex-direction: row-reverse; /* Balikkan urutan untuk menempatkan card di kiri */
  }

  /* Text alignment for left-aligned cards on desktop */
  .timeline-item.left-aligned .card {
    text-align: right;
  }
  /* Specific override for date section to align left even on left cards */
  .timeline-item.left-aligned .card .text-right {
    text-align: left; /* Tanggal di kiri untuk card kiri */
  }

  .timeline-item.left-aligned img {
    margin-right: auto; /* Dorong gambar ke kiri untuk card kiri */
    margin-left: 0;
  }
}

/* Mobile specific: Garis tengah dan card di bawah tengah */
@media (max-width: 767px) {
  .timeline-line {
    left: 50%; /* Posisikan garis di tengah untuk mobile */
    transform: translateX(-50%);
  }

  .z-20 {
    position: absolute; /* Kembali ke absolute untuk positioning */
    left: 50%; /* Posisikan lingkaran di tengah, sejajar garis */
    transform: translateX(-50%); /* Geser ke kiri setengah lebar lingkaran */
    margin-left: 0; /* Pastikan tidak ada margin tambahan */
  }

  .timeline-item {
    flex-direction: column; /* Tumpuk card di bawah lingkaran */
    align-items: center; /* Pusatkan card secara horizontal */
    width: 100%; /* Ambil lebar penuh */
  }

  /* Hapus div kosong yang mengganggu layout di mobile */
  .timeline-item .order-1.hidden.md\:block {
    display: none;
  }

  /* Card content positioning */
  .timeline-item > .card {
    /* Target the card directly */
    margin-left: 0; /* Hapus margin kiri */
    margin-top: 20px; /* Beri jarak antara lingkaran dan card */
    width: 90%; /* Sesuaikan lebar card agar tidak terlalu lebar */
    max-width: 300px; /* Batasi lebar maksimum card */
    text-align: center; /* Pusatkan teks di dalam card */
  }

  /* Override text alignment for content inside card on mobile */
  .timeline-item .card h3,
  .timeline-item .card p {
    text-align: center !important; /* Penting untuk override Tailwind */
  }

  /* Override text alignment for date on mobile to be centered */
  .timeline-item .card .text-xs.text-gray-400.mb-2 {
    /* Lebih spesifik ke paragraf tanggal */
    text-align: center !important;
  }

  /* Override image alignment for specific image groups on mobile */
  .timeline-item .card .flex {
    justify-content: center !important; /* Pusatkan flex container untuk gambar */
  }

  /* Override specific image alignment for John Smith image */
  .timeline-item .card .flex img {
    margin-left: auto !important;
    margin-right: auto !important;
  }

  /* Adjust alignment for John Smith text container */
  .timeline-item .card .flex > div {
    text-align: center !important; /* Pusatkan teks John Smith */
  }
  .timeline-item .card .flex > div p {
    text-align: center !important; /* Pastikan paragraf di dalam juga terpusat */
  }
}
</style>
