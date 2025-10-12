<template>
  <section id="about" class="container px-4 py-8 mx-auto text-white md:px-8 lg:px-16 bg-brand-dark">
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
              <IconArrowRight class="w-5 h-5 transition-transform duration-300 transform group-hover:rotate-45" />
            </router-link>
          </div>

          <div class="flex justify-between gap-4 mt-4">
            <a
              v-for="link in socialMediaLinks" :key="link.id"
              :href="link.url"
              target="_blank"
              class="flex items-center justify-center p-4 transition duration-300 rounded-2xl hover:bg-brand-yellow/10"
            >
              <img
                :src="getSocialIcon(link.platform_name)"
                class="w-10 h-10 md:w-14 md:h-14"
                :alt="link.platform_name"
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
            <router-link
              to="/certifications"
              class="flex items-center justify-between transition-transform group hover:text-brand-yellow"
            >
              <span> Certifications </span>
              <IconArrowRight class="w-5 h-5 transition-transform duration-300 transform group-hover:rotate-45" />
            </router-link>
          </h3>
          <div class="relative w-full overflow-hidden">
            <div class="flex items-center gap-8 mb-4 animate-marquee">
              <img
                v-for="cert in certifications" :key="cert.id"
                :src="`/storage/${cert.credential_image_url}`"
                :alt="cert.title"
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
            <router-link to="/tech-stacks" class="flex items-center justify-between group">
              Techstacks
              <IconArrowRight class="w-5 h-5 transition-transform duration-300 transform group-hover:rotate-45" />
            </router-link>
          </h3>
          <div class="relative w-full overflow-hidden">
            <div
              class="flex items-center justify-center gap-8 animate-marquee"
              style="transition: all 500ms"
            >
              <img
                v-for="tech in technologies" :key="tech.id"
                :src="`/storage/${tech.icon_url}`"
                :alt="tech.name"
                class="shrink-0 w-24 h-24 object-contain bg-white/10 p-2 rounded-full"
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

<script setup>
import { ref, onMounted } from 'vue';
import apiService from '@/services/apiService';
import { IconArrowRight } from '@tabler/icons-vue';

import { useUiStore } from '@/stores/ui';

import githubIcon from '@/assets/images/icons/ic-github.png';
import linkedinIcon from '@/assets/images/icons/ic-linkedin.png';
import gmailIcon from '@/assets/images/icons/ic-gmail.png';

const uiStore = useUiStore();

// --- STATE ---
const certifications = ref([]);
const technologies = ref([]);
const socialMediaLinks = ref([]);

// --- ASSET HELPERS ---
const socialIconMap = {
  github: githubIcon,
  linkedin: linkedinIcon,
  gmail: gmailIcon,
};

const getSocialIcon = (platformName) => {
  if (!platformName) return 'https://placehold.co/48'; // Return placeholder if name is null/undefined
  const name = platformName.toLowerCase();
  return socialIconMap[name] || 'https://placehold.co/48';
};

// --- DATA FETCHING ---
const fetchData = async () => {
  uiStore.startLoading(); // For certs
  uiStore.startLoading(); // For techs
  uiStore.startLoading(); // For socials
  try {
    const [certsRes, techsRes, socialsRes] = await Promise.all([
      apiService.get('/certifications').finally(() => uiStore.stopLoading()),
      apiService.get('/technologies').finally(() => uiStore.stopLoading()),
      apiService.get('/social-media-links').finally(() => uiStore.stopLoading()),
    ]);

    certifications.value = certsRes.data.data;
    technologies.value = techsRes.data.data;
    socialMediaLinks.value = socialsRes.data.data;

  } catch (error) {
    console.error("Failed to fetch about section data:", error);
    // Ensure loading is stopped even on error if any promises reject before all complete
    // Note: The .finally() calls will handle stopping for each individual promise.
  }
};

onMounted(fetchData);
</script>
