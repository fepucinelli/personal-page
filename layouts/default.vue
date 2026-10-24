<template>
  <div class="min-h-screen flex flex-col">
    <!-- Skip link -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]
             focus:px-4 focus:py-2 focus:rounded focus:outline-none
             focus:bg-brand focus:text-night focus:text-sm focus:font-mono focus:shadow-lg"
    >
      Skip to main content
    </a>

    <!-- Header -->
    <header
      class="fixed top-0 left-0 right-0 z-50
             h-14 px-6 flex items-center justify-between
             backdrop-blur-xl
             bg-surface-light/90 dark:bg-night/90
             border-b border-ink/8 dark:border-brand/15"
    >
      <!-- Logo -->
      <NuxtLink
        to="/"
        :aria-current="route.path === '/' ? 'page' : undefined"
        aria-label="Felipe Pucinelli, home"
        class="flex items-baseline gap-1 group"
      >
        <span class="font-mono text-xs text-brand group-hover:text-brand transition-colors select-none">~/</span>
        <span class="font-display text-xl italic text-ink dark:text-neutral-100 group-hover:text-brand dark:group-hover:text-brand transition-colors">fp</span>
      </NuxtLink>

      <nav aria-label="Main" class="flex items-center gap-1">
        <!-- Listen (radio hub; active across all radio routes) -->
        <NuxtLink
          to="/listen"
          :aria-current="route.path === '/listen' ? 'page' : undefined"
          :class="isListenActive
            ? 'bg-brand/10 dark:bg-brand/15 text-brand border-brand/25 dark:border-brand/30'
            : 'text-ink-secondary dark:text-neutral-400 hover:text-brand dark:hover:text-brand border-transparent hover:bg-brand/5 dark:hover:bg-brand/5'"
          class="px-3 py-1.5 text-sm font-mono border rounded transition-all duration-200"
        >
          ./listen
        </NuxtLink>

        <!-- About -->
        <NuxtLink
          to="/about"
          :aria-current="route.path === '/about' ? 'page' : undefined"
          :class="route.path === '/about'
            ? 'bg-brand/10 dark:bg-brand/15 text-brand border-brand/25 dark:border-brand/30'
            : 'text-ink-secondary dark:text-neutral-400 hover:text-brand dark:hover:text-brand border-transparent hover:bg-brand/5 dark:hover:bg-brand/5'"
          class="px-3 py-1.5 text-sm font-mono border rounded transition-all duration-200"
        >
          ./about
        </NuxtLink>

        <!-- Favorites -->
        <NuxtLink
          to="/favorites"
          aria-label="Favorites"
          :aria-current="route.path === '/favorites' ? 'page' : undefined"
          :class="route.path === '/favorites'
            ? 'text-brand bg-brand/10 dark:bg-brand/15 border-brand/25 dark:border-brand/30'
            : 'text-ink-secondary dark:text-neutral-400 hover:text-brand border-transparent hover:bg-brand/5 dark:hover:bg-brand/5'"
          class="ml-1 p-2 rounded border transition-all duration-200"
        >
          <i class="pi pi-bookmark-fill text-sm" aria-hidden="true"></i>
        </NuxtLink>

        <!-- Theme toggle -->
        <button
          @click="theme.toggle()"
          role="switch"
          :aria-checked="theme.theme === 'dark'"
          :aria-label="theme.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          class="theme-toggle ml-1"
        >
          <span class="theme-toggle__knob">
            <i class="pi pi-sun theme-toggle__icon theme-toggle__icon--light"></i>
            <i class="pi pi-moon theme-toggle__icon theme-toggle__icon--dark"></i>
          </span>
        </button>
      </nav>
    </header>

    <!-- Page -->
    <main id="main-content" tabindex="-1" class="flex-1 pt-14 pb-24">
      <slot />
    </main>

    <!-- Persistent Player -->
    <PlayerBar />

    <!-- Toast notification -->
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '~/stores/theme'
import { usePlayerStore } from '~/stores/player'
import { useRecentlyPlayedStore } from '~/stores/recentlyPlayed'

const route = useRoute()
const theme = useThemeStore()
const player = usePlayerStore()
const recentlyPlayed = useRecentlyPlayedStore()
const toast = useToast()

const LISTEN_ROUTES = ['/listen', '/stations', '/countries', '/genres']
const LISTEN_PREFIXES = ['/country/', '/genre/', '/station/']

const isListenActive = computed(() =>
  LISTEN_ROUTES.includes(route.path)
  || LISTEN_PREFIXES.some(prefix => route.path.startsWith(prefix)),
)

watch(() => player.currentStation, (newStation, oldStation) => {
  if (!newStation) return

  recentlyPlayed.addStation(newStation)

  if (oldStation) {
    toast.show(`Now playing: ${newStation.name}`)
  }
})
</script>
