<template>
  <div class="flex items-center justify-center min-h-screen antialiased">
    <div class="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 bg-brand-gray rounded-2xl shadow-2xl overflow-hidden">

        <div class="flex flex-col justify-center p-8 sm:p-12 animate-on-load load-delay-1">
          <div class="w-full max-w-md mx-auto">
            <div class="text-center mb-8">
              <h1 class="text-4xl font-bold text-white font-khand">ADMIN ACCESS</h1>
              <p class="text-brand-text/80">Welcome back, please sign in to your account.</p>
            </div>
            <form @submit.prevent="handleLogin" class="space-y-6">
              <div class="space-y-4">
                <div>
                  <label for="login" class="block mb-2 text-sm font-medium text-gray-300">Email / Username / Full
                    Name</label>
                  <input v-model="login" type="text" id="login" required
                    placeholder="Enter your email or username"
                    class="w-full p-3 rounded-lg bg-brand-light-gray text-brand-text border border-gray-600 focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow placeholder-gray-400 outline-none transition-all duration-300" />
                </div>
                <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-300">Password</label>
                  <input v-model="password" type="password" id="password" required placeholder="••••••••"
                    class="w-full p-3 rounded-lg bg-brand-light-gray text-brand-text border border-gray-600 focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow placeholder-gray-400 outline-none transition-all duration-300" />
                </div>
              </div>
              <div class="flex items-center justify-between text-sm">
                <label class="flex items-center text-gray-300">
                  <input type="checkbox"
                    class="w-4 h-4 mr-2 rounded bg-brand-light-gray border-gray-600 focus:ring-brand-yellow text-brand-yellow">
                  Remember me
                </label>
                <a href="#" class="font-medium text-brand-yellow hover:underline">Forgot password?</a>
              </div>
              <div v-if="error"
                class="p-3 text-sm text-center text-red-300 bg-red-800/60 rounded-lg border border-red-500/50">
                {{ error }}
              </div>
              <div>
                <button type="submit" :disabled="loading" class="w-full btn btn-primary group">
                  <span v-if="loading" class="flex items-center justify-center">
                    <svg class="w-5 h-5 mr-3 -ml-1 text-brand-dark animate-spin" xmlns="http://www.w3.org/2000/svg"
                      fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                      </path>
                    </svg>
                    Processing...
                  </span>
                  <span v-else class="flex items-center justify-center">
                    Sign In
                    <svg class="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none"
                      stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Kolom Kanan: Gambar -->
        <div class="hidden md:block relative animate-on-load load-delay-2">
          <img
            src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Login Image" class="absolute h-full w-full object-cover">
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const login = ref('');
const password = ref('');
const error = ref(null);
const loading = ref(false);

const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  loading.value = true;
  error.value = null;

  // Determine if the login input is an email or username
  const isEmail = login.value.includes('@');
  const credentials = {
    [isEmail ? 'email' : 'username']: login.value,
    password: password.value,
  };

  const result = await authStore.login(credentials);
  loading.value = false;

  if (result.success) {
    router.push({ name: 'dashboard-main' }); // Redirect to dashboard on successful login
  } else {
    error.value = result.error;
  }
};
</script>
