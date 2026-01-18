import { onMounted, onUnmounted, ref } from 'vue'

/**
 * A Vue composable for handling Intersection Observer logic.
 * @param {IntersectionObserverInit} options - Configuration options for the Intersection Observer.
 * @returns {{ observe: (element: HTMLElement) => void, unobserve: (element: HTMLElement) => void }} - Functions to observe and unobserve elements.
 */
export function useIntersectionObserver(
  options = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
) {
  const observer = ref(null)
  const pendingElements = ref([]) // Queue for elements observed before observer is ready

  /**
   * Check if element is already visible in viewport and add class immediately
   */
  const checkInitialVisibility = (element) => {
    if (!element) return

    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight

    // Check if element is within viewport (with threshold consideration)
    const threshold = options.threshold || 0.1
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
    const elementHeight = rect.height

    if (elementHeight > 0 && visibleHeight / elementHeight >= threshold) {
      // Element is already visible, add class immediately
      element.classList.add('is-visible')
    }
  }

  const observe = (element) => {
    if (!element) return

    if (observer.value) {
      // Observer is ready, check visibility and observe
      checkInitialVisibility(element)
      observer.value.observe(element)
    } else {
      // Observer not ready yet, queue the element
      pendingElements.value.push(element)
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

    // Process any pending elements that were queued before observer was ready
    if (pendingElements.value.length > 0) {
      pendingElements.value.forEach((element) => {
        checkInitialVisibility(element)
        observer.value.observe(element)
      })
      pendingElements.value = [] // Clear the queue
    }
  })

  onUnmounted(() => {
    if (observer.value) {
      observer.value.disconnect()
    }
  })

  return { observe, unobserve }
}
