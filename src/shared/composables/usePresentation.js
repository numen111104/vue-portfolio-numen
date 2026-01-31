import { ref, computed, onMounted, onUnmounted } from 'vue'

/**
 * Composable for managing presentation state and navigation
 * Handles keyboard and touch events for slide navigation
 * @param {number} totalSlides - Total number of slides in the presentation
 * @returns {Object} Presentation state and navigation methods
 */
export function usePresentation(totalSlides = 10) {
  const currentSlide = ref(0)
  const touchStartX = ref(0)
  const touchEndX = ref(0)

  // Computed progress percentage
  const progress = computed(() => ((currentSlide.value + 1) / totalSlides) * 100)

  /**
   * Navigate to next slide
   */
  const nextSlide = () => {
    if (currentSlide.value < totalSlides - 1) {
      currentSlide.value++
    }
  }

  /**
   * Navigate to previous slide
   */
  const previousSlide = () => {
    if (currentSlide.value > 0) {
      currentSlide.value--
    }
  }

  /**
   * Jump to specific slide
   * @param {number} index - Target slide index (0-based)
   */
  const goToSlide = (index) => {
    if (index >= 0 && index < totalSlides) {
      currentSlide.value = index
    }
  }

  /**
   * Reset presentation to first slide
   */
  const resetPresentation = () => {
    currentSlide.value = 0
  }

  /**
   * Handle keyboard navigation
   * @param {KeyboardEvent} event
   */
  const handleKeydown = (event) => {
    // Prevent default behavior for navigation keys
    const navigationKeys = [
      'ArrowLeft',
      'ArrowRight',
      'Backspace',
      ' ',
      'Enter',
      'Home',
      'End',
    ]

    if (navigationKeys.includes(event.key)) {
      event.preventDefault()
    }

    switch (event.key) {
      case 'ArrowLeft':
      case 'Backspace':
        previousSlide()
        break
      case 'Home':
        goToSlide(0)
        break
      case 'End':
        goToSlide(totalSlides - 1)
        break
      default:
        // Any other key advances to next slide
        if (!event.ctrlKey && !event.metaKey && !event.altKey) {
          nextSlide()
        }
        break
    }
  }

  /**
   * Handle touch start event
   * @param {TouchEvent} event
   */
  const handleTouchStart = (event) => {
    touchStartX.value = event.changedTouches[0].screenX
  }

  /**
   * Handle touch end event - detect swipe direction
   * @param {TouchEvent} event
   */
  const handleTouchEnd = (event) => {
    touchEndX.value = event.changedTouches[0].screenX
    handleSwipe()
  }

  /**
   * Process swipe gesture
   */
  const handleSwipe = () => {
    const swipeThreshold = 50 // Minimum distance for swipe
    const swipeDistance = touchStartX.value - touchEndX.value

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        // Swiped left - next slide
        nextSlide()
      } else {
        // Swiped right - previous slide
        previousSlide()
      }
    }
  }

  // Lifecycle: Add event listeners
  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)
  })

  // Lifecycle: Remove event listeners
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
    window.removeEventListener('touchstart', handleTouchStart)
    window.removeEventListener('touchend', handleTouchEnd)
  })

  return {
    currentSlide,
    totalSlides,
    progress,
    nextSlide,
    previousSlide,
    goToSlide,
    resetPresentation,
  }
}
