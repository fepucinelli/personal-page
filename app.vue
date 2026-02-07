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
</script>

<template>
  <div
    class="min-h-screen
           bg-gray-50 text-gray-900
           dark:bg-gray-950 dark:text-gray-100"
  >
    <!-- Top loading bar -->
    <div
      v-if="loading"
      class="fixed top-0 left-0 right-0 h-1 bg-brand animate-pulse z-50"
    />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>