import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';

export function useMarquee(containerRef, contentRef) {
  const isAnimating = ref(false);

  const calculate = () => {
    if (!containerRef.value || !contentRef.value) return;

    const containerWidth = containerRef.value.offsetWidth;
    const contentWidth = contentRef.value.scrollWidth / 2; // Since content is duplicated

    if (contentWidth <= containerWidth) {
      // Content fits, no need to animate
      isAnimating.value = false;
      contentRef.value.style.animationName = 'none';
    } else {
      // Content overflows, animate
      const scrollAmount = contentWidth;
      const duration = scrollAmount / 50; // Adjust 50 to control speed (pixels per second)

      contentRef.value.style.setProperty('--marquee-translate-x', `-${scrollAmount}px`);
      contentRef.value.style.setProperty('--marquee-duration', `${duration}s`);
      isAnimating.value = true;
      contentRef.value.style.animationName = 'marquee-dynamic';
    }
  };

  onMounted(() => {
    // Use a MutationObserver to wait for images to load and content to be stable
    const observer = new MutationObserver(() => {
        nextTick(calculate);
    });

    if (contentRef.value) {
        observer.observe(contentRef.value, { childList: true, subtree: true });
    }

    window.addEventListener('resize', calculate);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', calculate);
  });

  // Watch for data changes that might affect the content width
  watch(contentRef, () => {
      nextTick(calculate);
  }, { deep: true });

  return { isAnimating };
}
