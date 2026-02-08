<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header
      class="fixed top-0 left-0 right-0 z-50
             h-16 px-4 flex items-center justify-between
             bg-white dark:bg-gray-900
             text-gray-900 dark:text-gray-100"
    >
      <NuxtLink to="/" class="font-bold text-xl">
        🧑🏻‍💻
      </NuxtLink>

      <nav class="flex items-center gap-2 text-sm">
        <span class="text-gray-500 dark:text-gray-400 hidden md:inline">
          Search radio stations by:
        </span>

        <NuxtLink to="/countries" class="hover:underline">
          countries
        </NuxtLink>

        <NuxtLink to="/genres" class="hover:underline">
          genres
        </NuxtLink>

        <NuxtLink to="/favorites">
          <i class="pi pi-bookmark-fill ml-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"></i>
        </NuxtLink>

        <button
          @click="theme.toggle()"
          class="ml-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          <i class="pi pi-moon"></i>
        </button>
      </nav>
    </header>

    <!-- Page -->
    <main class="flex-1 pt-16 pb-20">
      <slot />
    </main>

    <!-- Persistent Player -->
    <PlayerBar />
  </div>
</template>

<script setup>
import PlayerBar from '~/components/player/PlayerBar.vue'
import { useThemeStore } from '~/stores/theme'

const theme = useThemeStore()
</script>