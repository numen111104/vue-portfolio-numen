<template>
  <main class="container px-4 py-8 mx-auto text-white md:px-8 lg:px-16">
    <section class="min-h-[20rem] h-[30rem] grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div
        class="w-full hidden md:block bg-[url('@/assets/images/about-image/me.png')] bg-center bg-cover rounded-2xl brand-border card-home"
      ></div>
      <div
        class="w-full bg-[url('@/assets/images/about-image/me-2.png')] bg-top bg-cover rounded-2xl brand-border card-home"
      ></div>
    </section>

    <section class="mb-8 p-4 md:p-0">
      <p class="text-brand-text text-2xl md:text-4xl font-semibold">Hi👋, I'm Nu'man Nasyar MZ</p>
      <p class="text-brand-text text-xl md:text-2xl font-medium">
        Fullstack Developer Enthusiast | Lifetime Learner
      </p>
    </section>

    <section class="card mb-8">
      <h2 class="text-brand-text font-semibold text-xl mb-4">About Me</h2>
      <p class="text-gray-400 font-normal text-base leading-relaxed">
        A passionate and dedicated student specializing in full-stack web development, with a strong
        interest in frontend development and backend development. Enjoys designing user-focused web
        application products and conducting research to discover effective and innovative solutions.
        Eager to contribute and grow within a creative and collaborative development team.
      </p>
    </section>

    <section class="flex flex-col md:flex-row gap-8 mb-8 items-stretch">
      <div class="card w-full md:w-2/3 flex flex-col">
        <h2 class="text-brand-text font-semibold text-xl mb-4">My Passion</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
          <div class="text-brand-text">
            <p class="text-lg font-medium">Web Developer</p>
            <p class="text-sm font-light text-gray-400">
              My passion is to develop websites that are highly accessible and user-friendly, with a
              strong focus on responsive design.
            </p>
          </div>
          <div class="text-brand-text">
            <p class="text-lg font-medium">Mobile Developer</p>
            <p class="text-sm font-light text-gray-400">
              I’m passionate about mobile app development and specialize in creating user-friendly,
              seamless, and functional applications.
            </p>
          </div>
          <div class="text-brand-text">
            <p class="text-lg font-medium">Visual Designer</p>
            <p class="text-sm font-light text-gray-400">
              I have developed unique and eye-catching designs that capture the attention of users
              effortlessly
            </p>
          </div>
          <div class="text-brand-text">
            <p class="text-lg font-medium">Content Writer</p>
            <p class="text-sm font-light text-gray-400">
              I have a deep interest and extensive experience in creating engaging, distinctive
              content that captivates and attracts users and readers.
            </p>
          </div>
        </div>
      </div>

      <div class="card w-full md:w-1/3 flex flex-col">
        <h2 class="text-brand-text font-semibold text-xl mb-4">Language</h2>
        <div class="flex flex-col space-y-4 h-full justify-center">
          <div class="flex items-center text-brand-text">
            <div class="w-12 h-12 bg-gray-600 rounded-full mr-3 flex-shrink-0"></div>
            <div>
              <p class="font-semibold">Indonesia</p>
              <p class="text-xs text-gray-400">
                Indonesian is my native language that I use every day
              </p>
            </div>
          </div>
          <div class="flex items-center text-brand-text">
            <div class="w-12 h-12 bg-gray-600 rounded-full mr-3 flex-shrink-0"></div>
            <div>
              <p class="font-semibold">English</p>
              <p class="text-xs text-gray-400">
                I have a lot of experience in using English such as communication, speeches,
                presentations, etc
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <EducationTimeline />
  </main>
</template>

<script>
import EducationTimeline from '@/components/timelines/EducationTimeline.vue'

export default {
  name: 'AboutDetailView',
  components: {
    EducationTimeline,
  },
}
</script>
