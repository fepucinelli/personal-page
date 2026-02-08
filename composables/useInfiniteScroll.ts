export function useInfiniteScroll(onIntersect: () => void) {
  const sentinelRef = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver | null = null

  function cleanup() {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  watch(sentinelRef, (el) => {
    cleanup()
    if (!el) return
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) onIntersect()
      },
      { rootMargin: '200px' },
    )
    observer.observe(el)
  })

  onUnmounted(cleanup)

  return { sentinelRef }
}
