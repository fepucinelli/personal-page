<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useThemeStore } from '~/stores/theme'
import { useFavoritesStore } from '~/stores/favorites'

const theme = useThemeStore()
const favorites = useFavoritesStore()

// -----------------------------
// Init client-only logic
// -----------------------------
onMounted(() => {
  theme.init()
  favorites.init()
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
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
