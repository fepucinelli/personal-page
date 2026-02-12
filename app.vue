<script setup lang="ts">
import { useScriptGoogleAnalytics } from '#nuxt-scripts/registry/google-analytics'
import { useScriptTriggerIdleTimeout } from '#nuxt-scripts/composables/useScriptTriggerIdleTimeout'

// -----------------------------
// Google Analytics 4
// -----------------------------
useScriptGoogleAnalytics({
  id: 'G-4JTC9K9T3N',
  scriptOptions: {
    trigger: useScriptTriggerIdleTimeout({ timeout: 3000 }),
    warmupStrategy: false,
  },
})

// -----------------------------
// Global route loading indicator
// -----------------------------
const loading = ref(false)
const router = useRouter()

router.beforeEach(() => {
  loading.value = true
})

router.afterEach(() => {
  loading.value = false
})

// -----------------------------
// WebSite structured data
// -----------------------------
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Felipe Pucinelli',
        url: 'https://pucinelli.me',
        description: 'Senior Front-End Engineer, Lead Developer & DJ. Explore internet radio stations from around the world.',
      }),
    },
  ],
})
</script>

<template>
  <div
    class="grain min-h-screen font-body
           bg-surface-light text-ink
           dark:bg-night dark:text-neutral-100
           transition-colors duration-500"
  >
    <!-- Top loading bar -->
    <div
      v-if="loading"
      class="fixed top-0 left-0 right-0 h-0.5 z-[60]"
    >
      <div class="h-full bg-brand animate-pulse rounded-r-full" style="width: 60%" />
    </div>

    <NuxtLayout>
      <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
    </NuxtLayout>
  </div>
</template>
