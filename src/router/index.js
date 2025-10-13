import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import Home from './home';
import Dashboard from './dashboard';
import Auth from './auth';
import NotFoundView from '@/views/NotFound.vue';

const routes = [
  {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView
  },
    ...Home,
    ...Dashboard,
    ...Auth,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Selalu scroll ke atas dengan animasi smooth setiap kali route berganti.
    return { top: 0, behavior: 'smooth' };
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' });
  } else if (to.name === 'login' && authStore.isAuthenticated) {
    next({ name: 'dashboard-main' });
  } else {
    next();
  }
});

export default router;
