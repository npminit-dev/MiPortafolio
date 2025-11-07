import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isTransitioning = ref(false)
const transitionCallbacks: Array<() => void> = []

export function usePageTransition() {
  const router = useRouter()

  function triggerTransition(targetRoute?: string, callback?: () => void) {
    if (isTransitioning.value) return

    isTransitioning.value = true

    // Execute callback when transition completes
    if (callback) {
      transitionCallbacks.push(callback)
    }

    // Navigate to route when white screen appears (after 2 seconds)
    if (targetRoute) {
      setTimeout(() => {
        router.push(targetRoute)
      }, 2000)
    }
  }

  function completeTransition() {
    isTransitioning.value = false
    
    // Execute all pending callbacks
    while (transitionCallbacks.length > 0) {
      const callback = transitionCallbacks.shift()
      callback?.()
    }
  }

  return {
    isTransitioning,
    triggerTransition,
    completeTransition
  }
}