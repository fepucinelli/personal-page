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
        <div class="relative" ref="listenMenuRef">
          <button
            ref="listenTriggerRef"
            @click="listenOpen = !listenOpen"
            @keydown="onTriggerKeydown"
            aria-haspopup="menu"
            :aria-expanded="listenOpen"
            aria-controls="listen-menu"
            class="px-3 py-1.5 text-sm text-ink-secondary dark:text-neutral-400
                   hover:text-ink dark:hover:text-neutral-100
                   rounded-lg hover:bg-ink/5 dark:hover:bg-white/5
                   transition-all duration-200 flex items-center gap-1"
          >
            listen
            <i class="pi pi-chevron-down text-[10px] transition-transform duration-200" :class="{ 'rotate-180': listenOpen }" />
          </button>

          <Transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="opacity-0 scale-95 -translate-y-1"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 -translate-y-1"
          >
            <div
              v-if="listenOpen"
              id="listen-menu"
              role="menu"
              @keydown="onMenuKeydown"
              class="absolute right-0 top-full mt-1 w-40 py-1
                     rounded-xl border border-ink/5 dark:border-white/5
                     bg-white dark:bg-night-elevated
                     shadow-lg shadow-ink/5 dark:shadow-black/20"
            >
              <NuxtLink
                v-for="item in listenItems"
                :key="item.to"
                :to="item.to"
                role="menuitem"
                @click="listenOpen = false"
                class="block px-4 py-2 text-sm text-ink-secondary dark:text-neutral-400
                       hover:text-ink dark:hover:text-neutral-100
                       hover:bg-ink/5 dark:hover:bg-white/5
                       transition-colors duration-150"
              >
                {{ item.label }}
              </NuxtLink>
            </div>
          </Transition>
        </div>

        <NuxtLink
          to="/about"
          class="px-3 py-1.5 text-sm text-ink-secondary dark:text-neutral-400
                 hover:text-ink dark:hover:text-neutral-100
                 rounded-lg hover:bg-ink/5 dark:hover:bg-white/5
                 transition-all duration-200"
        >
          about
        </NuxtLink>

        <NuxtLink
          to="/favorites"
          aria-label="Favorites"
          class="ml-1 p-2 rounded-lg text-ink-secondary dark:text-neutral-400
                 hover:text-brand hover:bg-brand/5
                 transition-all duration-200"
        >
          <i class="pi pi-bookmark-fill text-sm"></i>
        </NuxtLink>

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
    <main class="flex-1 pt-14 pb-24">
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

const theme = useThemeStore()
const player = usePlayerStore()
const recentlyPlayed = useRecentlyPlayedStore()
const toast = useToast()

const listenOpen = ref(false)
const listenMenuRef = ref<HTMLElement | null>(null)
const listenTriggerRef = ref<HTMLButtonElement | null>(null)
const listenItems = [
  { to: '/stations', label: 'stations' },
  { to: '/countries', label: 'countries' },
  { to: '/genres', label: 'genres' },
]

function getMenuItems(): HTMLElement[] {
  return Array.from(listenMenuRef.value?.querySelectorAll('[role="menuitem"]') ?? []) as HTMLElement[]
}

function onTriggerKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    listenOpen.value = false
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    listenOpen.value = true
    nextTick(() => getMenuItems()[0]?.focus())
  }
}

function onMenuKeydown(e: KeyboardEvent) {
  const items = getMenuItems()
  const idx = items.indexOf(document.activeElement as HTMLElement)
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    items[(idx + 1) % items.length]?.focus()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    items[(idx - 1 + items.length) % items.length]?.focus()
  } else if (e.key === 'Escape') {
    listenOpen.value = false
    listenTriggerRef.value?.focus()
  }
}

function onClickOutside(e: Event) {
  if (listenMenuRef.value && !listenMenuRef.value.contains(e.target as Node)) {
    listenOpen.value = false
    listenTriggerRef.value?.focus()
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))

watch(() => player.currentStation, (newStation, oldStation) => {
  if (!newStation) return

  recentlyPlayed.addStation(newStation)

  if (oldStation) {
    toast.show(`Now playing: ${newStation.name}`)
  }
})
</script>
