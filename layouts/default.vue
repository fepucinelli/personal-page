<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header
      class="fixed top-0 left-0 right-0 z-50
             h-14 px-6 flex items-center justify-between
             backdrop-blur-xl
             bg-surface-light/80 dark:bg-night/80
             border-b border-ink/5 dark:border-white/5"
    >
      <NuxtLink to="/" class="font-display text-xl italic text-ink dark:text-neutral-100 hover:text-brand transition-colors">
        fp
      </NuxtLink>

      <nav class="flex items-center gap-1">
        <NuxtLink
          to="/countries"
          class="px-3 py-1.5 text-sm text-ink-secondary dark:text-neutral-400
                 hover:text-ink dark:hover:text-neutral-100
                 rounded-lg hover:bg-ink/5 dark:hover:bg-white/5
                 transition-all duration-200"
        >
          countries
        </NuxtLink>

        <NuxtLink
          to="/genres"
          class="px-3 py-1.5 text-sm text-ink-secondary dark:text-neutral-400
                 hover:text-ink dark:hover:text-neutral-100
                 rounded-lg hover:bg-ink/5 dark:hover:bg-white/5
                 transition-all duration-200"
        >
          genres
        </NuxtLink>

        <NuxtLink
          to="/favorites"
          class="ml-1 p-2 rounded-lg text-ink-secondary dark:text-neutral-400
                 hover:text-brand hover:bg-brand/5
                 transition-all duration-200"
        >
          <i class="pi pi-bookmark-fill text-sm"></i>
        </NuxtLink>

        <button
          @click="theme.toggle()"
          class="p-2 rounded-lg text-ink-secondary dark:text-neutral-400
                 hover:text-brand hover:bg-brand/5
                 transition-all duration-200"
        >
          <i class="pi pi-moon text-sm"></i>
        </button>
      </nav>
    </header>

    <!-- Page -->
    <main class="flex-1 pt-14 pb-24">
      <slot />
    </main>

    <!-- Persistent Player -->
    <PlayerBar />
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '~/stores/theme'

const theme = useThemeStore()
</script>
