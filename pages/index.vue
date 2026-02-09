<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center
           text-center px-6 py-16"
  >
    <!-- Avatar -->
    <div class="animate-fade-up delay-1">
      <div class="avatar-blob-wrap" :class="{ 'is-playing': player.isPlaying }">
        <div class="avatar-blob blob1"></div>
        <div class="avatar-blob blob2"></div>
        <div class="avatar-blob-inner">
          <img
            src="/avatar.jpg"
            alt="Felipe Pucinelli"
            class="w-28 h-28 rounded-full object-cover"
          />
        </div>
      </div>
    </div>

    <!-- Name -->
    <h1 class="animate-fade-up delay-2 mt-8 font-display text-4xl md:text-5xl italic
               text-ink dark:text-neutral-50 tracking-tight">
      Felipe Pucinelli
    </h1>

    <!-- Role -->
    <p class="animate-fade-up delay-3 mt-3 text-sm tracking-widest uppercase
              text-ink-muted dark:text-neutral-500 font-medium">
      Senior Front-End Engineer &middot; Lead Developer &middot; DJ
    </p>

    <!-- Bio -->
    <p class="animate-fade-up delay-4 mt-6 max-w-md text-sm leading-relaxed
              text-ink-secondary dark:text-neutral-400">
      I'm a 12y+ Senior Frontend Engineer & Lead Software Engineer who loves
      building products that feels good to use and to play music that feels good to hear.
    </p>

    <!-- Social links -->
    <div class="animate-fade-up delay-5 mt-8">
      <SocialLinks />
    </div>

    <!-- Radio section -->
    <div class="animate-fade-up delay-6 mt-4 w-full max-w-lg">
      <div class="flex items-center gap-2 justify-center mb-6">
        <div class="h-px flex-1 max-w-[60px] bg-ink/10 dark:bg-white/10" />
        <span class="text-xs tracking-widest uppercase text-ink-muted dark:text-neutral-500 font-medium">
          Now playing
        </span>
        <div class="h-px flex-1 max-w-[60px] bg-ink/10 dark:bg-white/10" />
      </div>

      <!-- Current station -->
      <p v-if="currentStation" class="font-display text-xl italic text-ink dark:text-neutral-200 mb-1">
        {{ currentStation.name }}
      </p>
      <p v-if="currentStation" class="text-xs text-ink-muted dark:text-neutral-500 mb-8 tracking-wide uppercase">
        {{ currentStation.country }}
      </p>

      <!-- Controls -->
      <div v-if="currentStation" class="flex items-center justify-center gap-3">
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
          <i class="pi pi-sync text-sm"></i>
        </button>

        <button
          @click="playCurrent"
          class="px-6 py-2.5 rounded-full
                 bg-brand text-white text-sm font-medium
                 hover:bg-brand-dark
                 shadow-lg shadow-brand/20 hover:shadow-brand/30
                 transition-all duration-300"
        >
          <i class="pi pi-play-circle mr-1.5"></i>
          Start listening
        </button>

        <button
          @click="actions.toggleFavorite(currentStation)"
          class="w-10 h-10 rounded-full flex items-center justify-center
                 border border-ink/10 dark:border-white/10
                 text-ink-secondary dark:text-neutral-400
                 hover:border-brand/30 hover:text-brand
                 transition-all duration-300"
          :title="
            actions.isFavorite(currentStation)
              ? 'Remove from favorites'
              : 'Add to favorites'
          "
          :aria-label="
            actions.isFavorite(currentStation)
              ? 'Remove from favorites'
              : 'Add to favorites'
          "
        >
          <i
            class="pi text-sm"
            :class="actions.isFavorite(currentStation)
              ? 'pi-star-fill text-brand'
              : 'pi-star'"
          ></i>
        </button>
      </div>
    </div>

    <!-- Favorites section -->
    <section
      v-if="favorites.allFavorites.length > 0"
      class="mt-20 w-full max-w-5xl"
    >
      <div class="flex items-center gap-3 mb-6">
        <div class="h-px flex-1 bg-ink/5 dark:bg-white/5" />
        <h2 class="font-display text-lg italic text-ink dark:text-neutral-200 whitespace-nowrap">
          Favorite Stations
        </h2>
        <div class="h-px flex-1 bg-ink/5 dark:bg-white/5" />
      </div>

      <Loader v-if="pending" />

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

    <!-- Recently Played section -->
    <section
      v-if="recentlyPlayed.stations.length > 0"
      class="mt-20 w-full max-w-5xl"
    >
      <div class="flex items-center gap-3 mb-6">
        <div class="h-px flex-1 bg-ink/5 dark:bg-white/5" />
        <h2 class="font-display text-lg italic text-ink dark:text-neutral-200 whitespace-nowrap">
          Recently Played
        </h2>
        <div class="h-px flex-1 bg-ink/5 dark:bg-white/5" />
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

    <div class="mt-10 flex flex-col items-center gap-2">
      <NuxtLink
        to="/stations"
        class="text-xs tracking-widest uppercase text-ink-muted dark:text-neutral-500
               hover:text-brand transition-colors duration-300"
      >
        Browse all stations &rarr;
      </NuxtLink>

      <span
        v-if="stats?.stations"
        class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
               text-[11px] tracking-wide
               bg-brand/5 dark:bg-brand/10
               text-ink-muted dark:text-neutral-500
               border border-brand/10"
      >
        <i class="pi pi-wifi text-brand text-[10px]"></i>
        {{ stats.stations.toLocaleString() }} stations &middot; {{ stats.countries }} countries
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '~/stores/player'
import { useFavoritesStore } from '~/stores/favorites'
import { useRecentlyPlayedStore } from '~/stores/recentlyPlayed'
import type { Station } from '~/types/radio'

useHead({
  title: 'Senior Front-End Engineer, Lead Developer & DJ',
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Felipe Pucinelli',
        jobTitle: 'Senior Front-End Engineer',
        url: 'https://pucinelli.me',
        image: 'https://pucinelli.me/avatar.jpg',
        description: 'Senior Front-End Engineer, Lead Developer & DJ with 12+ years of experience building products that feel good to use.',
        sameAs: [
          'https://www.instagram.com/felipepucinelli',
          'https://www.linkedin.com/in/felipepucinelli',
          'https://github.com/fepucinelli',
        ],
      }),
    },
  ],
})

useSeoMeta({
  description: 'Felipe Pucinelli — Senior Front-End Engineer, Lead Developer & DJ. Explore my curated collection of internet radio stations from around the world.',
  ogTitle: 'Felipe Pucinelli — Senior Front-End Engineer, Lead Developer & DJ',
  ogDescription: 'Senior Front-End Engineer, Lead Developer & DJ. Explore internet radio stations from around the world.',
  ogUrl: 'https://pucinelli.me',
})

const favorites = useFavoritesStore()
const player = usePlayerStore()
const recentlyPlayed = useRecentlyPlayedStore()
const actions = useStationActions()

// Fetch stations & stats
const { data: stations, pending } = await useStations()
const { data: stats } = await useRadioStats()

// Current station
const currentStation = ref<Station | null>(null)

// Pick random station
const pickRandomStation = () => {
  if (!stations.value?.length) return
  const index = Math.floor(Math.random() * stations.value.length)
  currentStation.value = stations.value[index]
}

// Initial random pick
watchEffect(() => {
  if (!currentStation.value && stations.value?.length) {
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
