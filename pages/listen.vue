<template>
  <div class="px-6 py-8 max-w-6xl mx-auto">
    <PageHeading title="Listen" subtitle="Internet radio from around the world, picked by a DJ" />

    <!-- Random station -->
    <section aria-labelledby="random-station-heading" class="text-center">
      <div class="flex items-center gap-2 justify-center mb-6">
        <div class="h-px flex-1 max-w-[60px] bg-ink/8 dark:bg-white/8" />
        <h2 id="random-station-heading" class="text-xs tracking-widest uppercase text-ink-muted dark:text-neutral-400 font-medium">
          Random Station
        </h2>
        <div class="h-px flex-1 max-w-[60px] bg-ink/8 dark:bg-white/8" />
      </div>

      <!-- Reserve height so the client-only pick doesn't shift the layout -->
      <div class="min-h-[132px]">
        <template v-if="currentStation">
          <p class="font-display text-xl italic text-ink dark:text-neutral-200 mb-1">
            {{ currentStation.name }}
          </p>
          <p class="text-xs text-ink-muted dark:text-neutral-400 mb-8 tracking-wide uppercase">
            {{ currentStation.country }}
          </p>

          <div class="flex items-center justify-center gap-3">
            <button
              @click="shuffle"
              class="w-10 h-10 rounded-full flex items-center justify-center
                     border border-ink/10 dark:border-white/10
                     text-ink-secondary dark:text-neutral-400
                     hover:border-brand/30 hover:text-brand
                     transition-all duration-300"
              title="Shuffle station"
              aria-label="Shuffle station"
            >
              <i class="pi pi-sync text-sm" aria-hidden="true"></i>
            </button>

            <button
              @click="playCurrent"
              class="px-6 py-2.5 rounded-full
                     bg-brand dark:bg-[#3F6600] text-white text-sm font-medium
                     hover:bg-brand-dark dark:hover:bg-[#2D4A00]
                     transition-all duration-300"
            >
              <i class="pi pi-play-circle mr-1.5" aria-hidden="true"></i>
              Start listening
            </button>

            <button
              @click="actions.toggleFavorite(currentStation)"
              class="w-10 h-10 rounded-full flex items-center justify-center
                     border border-ink/10 dark:border-white/10
                     text-ink-secondary dark:text-neutral-400
                     hover:border-brand/30 hover:text-brand
                     transition-all duration-300"
              :title="favoriteLabel"
              :aria-label="favoriteLabel"
            >
              <i
                class="pi text-sm"
                aria-hidden="true"
                :class="actions.isFavorite(currentStation)
                  ? 'pi-star-fill text-brand'
                  : 'pi-star'"
              ></i>
            </button>
          </div>
        </template>
      </div>
    </section>

    <!-- Browse shortcuts -->
    <nav aria-label="Browse radio" class="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <NuxtLink
        v-for="item in browseItems"
        :key="item.to"
        :to="item.to"
        class="group p-5 rounded
               bg-white dark:bg-night-elevated
               border border-ink/5 dark:border-white/5
               hover:border-brand/20 dark:hover:border-brand/20
               transition-all duration-300"
      >
        <span class="flex items-center gap-2 font-display text-lg italic text-ink dark:text-neutral-200 group-hover:text-brand transition-colors">
          <i class="pi text-brand text-xs" :class="item.icon" aria-hidden="true"></i>
          {{ item.label }}
        </span>
        <span class="block mt-2 text-xs text-ink-muted dark:text-neutral-400">
          {{ item.description }}
        </span>
      </NuxtLink>
    </nav>

    <!-- Favorites section (client-only: user favorites come from localStorage) -->
    <ClientOnly>
      <section
        v-if="favorites.allFavorites.length > 0"
        aria-labelledby="favorites-heading"
        class="mt-16"
      >
        <div class="flex items-center gap-3 mb-6">
          <div class="h-px flex-1 bg-ink/8 dark:bg-white/8" />
          <h2 id="favorites-heading" class="font-display text-lg italic text-ink dark:text-neutral-200 whitespace-nowrap">
            Favorite Stations
          </h2>
          <div class="h-px flex-1 bg-ink/8 dark:bg-white/8" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StationCard
            v-for="station in favorites.allFavorites"
            :key="station.id"
            :station="station"
            :is-playing="actions.isPlaying(station)"
            :is-favorite="actions.isFavorite(station)"
            :hide-favorite="favorites.isSystemFavorite(station.id)"
            @play="actions.playStation"
            @toggle-favorite="actions.toggleFavorite"
          />
        </div>
      </section>
    </ClientOnly>

    <!-- Recently Played section (client-only: data comes from localStorage) -->
    <ClientOnly>
      <section
        v-if="recentlyPlayed.stations.length > 0"
        aria-labelledby="recent-heading"
        class="mt-16"
      >
        <div class="flex items-center gap-3 mb-6">
          <div class="h-px flex-1 bg-ink/8 dark:bg-white/8" />
          <h2 id="recent-heading" class="font-display text-lg italic text-ink dark:text-neutral-200 whitespace-nowrap">
            Recently Played
          </h2>
          <div class="h-px flex-1 bg-ink/8 dark:bg-white/8" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StationCard
            v-for="station in recentlyPlayed.stations"
            :key="station.id"
            :station="station"
            :is-playing="actions.isPlaying(station)"
            :is-favorite="actions.isFavorite(station)"
            :hide-favorite="favorites.isSystemFavorite(station.id)"
            @play="actions.playStation"
            @toggle-favorite="actions.toggleFavorite"
          />
        </div>
      </section>
    </ClientOnly>

    <div v-if="stats?.stations" class="mt-12 flex justify-center">
      <span
        class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
               text-[11px] tracking-wide
               bg-brand/5 dark:bg-brand/10
               text-ink-muted dark:text-neutral-400
               border border-brand/10"
      >
        <i class="pi pi-wifi text-brand text-[10px]" aria-hidden="true"></i>
        {{ stats.stations.toLocaleString('en-US') }} stations &middot; {{ stats.countries }} countries
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '~/stores/player'
import { useFavoritesStore } from '~/stores/favorites'
import { useRecentlyPlayedStore } from '~/stores/recentlyPlayed'
import type { Station } from '~/types/radio'

useSeoPage({
  title: 'Listen',
  description: 'Internet radio from around the world, curated by a DJ. Shuffle a random station or browse by station, country and genre.',
  path: '/listen',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Listen', url: '/listen' },
  ],
})

const favorites = useFavoritesStore()
const player = usePlayerStore()
const recentlyPlayed = useRecentlyPlayedStore()
const actions = useStationActions()

const { data: stats } = await useRadioStats()

const browseItems = computed(() => [
  {
    to: '/stations',
    label: 'Stations',
    icon: 'pi-wifi',
    description: stats.value?.stations
      ? `${stats.value.stations.toLocaleString('en-US')} stations streaming now`
      : 'Every station, most popular first',
  },
  {
    to: '/countries',
    label: 'Countries',
    icon: 'pi-globe',
    description: stats.value?.countries
      ? `Radio from ${stats.value.countries} countries`
      : 'Radio from every corner of the world',
  },
  {
    to: '/genres',
    label: 'Genres',
    icon: 'pi-tags',
    description: 'From jazz to drum & bass',
  },
])

// Current station
const currentStation = ref<Station | null>(null)

const favoriteLabel = computed(() =>
  currentStation.value && actions.isFavorite(currentStation.value)
    ? 'Remove from favorites'
    : 'Add to favorites',
)

// Pick random station from curated list, avoiding the current one
const pickRandomStation = () => {
  const pool = favorites.systemFavorites.filter(s => s.id !== currentStation.value?.id)
  if (!pool.length) return
  const index = Math.floor(Math.random() * pool.length)
  currentStation.value = pool[index]
}

// Pick on client only to avoid SSR/client mismatch (Math.random differs)
onMounted(() => {
  if (!currentStation.value) {
    pickRandomStation()
  }
})

const playCurrent = () => {
  if (currentStation.value) {
    player.play(currentStation.value)
  }
}

const shuffle = () => {
  pickRandomStation()
  if (currentStation.value) {
    player.play(currentStation.value)
  }
}
</script>
