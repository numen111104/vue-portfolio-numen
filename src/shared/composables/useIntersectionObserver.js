import { onMounted, onUnmounted, ref } from 'vue';

/**
 * A Vue composable for handling Intersection Observer logic.
 * @param {IntersectionObserverInit} options - Configuration options for the Intersection Observer.
 * @returns {{ observe: (element: HTMLElement) => void, unobserve: (element: HTMLElement) => void }} - Functions to observe and unobserve elements.
 */
export function useIntersectionObserver(options = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }) {
  const observer = ref(null)

  /**
   * Check if element is already visible in viewport and add class immediately
   */
  const checkInitialVisibility = (element) => {
    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight

    // Check if element is within viewport (with threshold consideration)
    const threshold = options.threshold || 0.1
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
    const elementHeight = rect.height

    if (visibleHeight / elementHeight >= threshold) {
      // Element is already visible, add class immediately
      element.classList.add('is-visible')
    }
  }

  const observe = (element) => {
    if (element && observer.value) {
      // Check initial visibility immediately
      checkInitialVisibility(element)
      // Then observe for future changes
      observer.value.observe(element)
    }
  }

  const unobserve = (element) => {
    if (element && observer.value) {
      observer.value.unobserve(element)
    }
  }

  onMounted(() => {
    observer.value = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        } else {
          entry.target.classList.remove('is-visible')
        }
      })
    }, options)
  })

  onUnmounted(() => {
    if (observer.value) {
      observer.value.disconnect()
    }
  })

  return { observe, unobserve }
}

