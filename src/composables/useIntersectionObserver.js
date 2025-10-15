import { onMounted, onUnmounted, ref } from 'vue';

/**
 * A Vue composable for handling Intersection Observer logic.
 * @param {IntersectionObserverInit} options - Configuration options for the Intersection Observer.
 * @returns {{ observe: (element: HTMLElement) => void, unobserve: (element: HTMLElement) => void }} - Functions to observe and unobserve elements.
 */
export function useIntersectionObserver(options = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }) {
  const observer = ref(null);

  const observe = (element) => {
    if (element && observer.value) {
      observer.value.observe(element);
    }
  };

  const unobserve = (element) => {
    if (element && observer.value) {
      observer.value.unobserve(element);
    }
  };

  onMounted(() => {
    observer.value = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, options);
  });

  onUnmounted(() => {
    if (observer.value) {
      observer.value.disconnect();
    }
  });

  return { observe, unobserve };
}
