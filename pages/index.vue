<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center
           text-center px-6 py-16"
  >
    <!-- Avatar -->
    <div class="animate-fade-up delay-1">
      <div class="relative group">
        <div
          class="absolute -inset-1 rounded-full bg-gradient-to-br from-brand/30 to-brand-dark/10
                 blur-md group-hover:blur-lg transition-all duration-500"
        />
        <img
          src="/avatar.jpg"
          alt="Felipe Pucinelli"
          class="relative w-28 h-28 rounded-full object-cover
                 ring-2 ring-brand/20
                 group-hover:ring-brand/40
                 transition-all duration-500"
        />
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
      <div v-if="currentStation" class="flex flex-col sm:flex-row gap-3 items-center justify-center">
        <button
          @click="playCurrent"
          class="group px-6 py-2.5 rounded-full
                 bg-brand text-white text-sm font-medium
                 hover:bg-brand-dark
                 shadow-lg shadow-brand/20 hover:shadow-brand/30
                 transition-all duration-300"
        >
          <i class="pi pi-play-circle mr-1.5"></i>
          Start listening
        </button>

        <button
          @click="shuffle"
          class="px-6 py-2.5 rounded-full text-sm font-medium
                 border border-ink/10 dark:border-white/10
                 text-ink-secondary dark:text-neutral-400
                 hover:border-brand/30 hover:text-brand
                 transition-all duration-300"
        >
          <i class="pi pi-sync mr-1.5"></i>
          Shuffle station
        </button>

        <button
          @click="favorites.toggleFavorite(currentStation)"
          class="p-2.5 rounded-full
                 border border-ink/10 dark:border-white/10
                 text-ink-secondary dark:text-neutral-400
                 hover:border-brand/30 hover:text-brand
                 transition-all duration-300"
          :title="
            favorites.isFavorite(currentStation.id)
              ? 'Remove from favorites'
              : 'Add to favorites'
          "
        >
          <i
            class="pi text-sm"
            :class="favorites.isFavorite(currentStation.id)
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
        />
      </div>
    </section>

    <NuxtLink
      to="/stations"
      class="mt-10 text-xs tracking-widest uppercase text-ink-muted dark:text-neutral-500
             hover:text-brand transition-colors duration-300"
    >
      Browse all stations &rarr;
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '~/stores/player'
import { useFavoritesStore } from '~/stores/favorites'
import type { Station } from '~/types/station'

import Loader from '~/components/ui/Loader.vue'
import SocialLinks from '~/components/ui/SocialLinks.vue'
import StationCard from '~/components/station/StationCard.vue'

const favorites = useFavoritesStore()
const player = usePlayerStore()

// Fetch stations
const { data: stations, pending } = await useStations()

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
