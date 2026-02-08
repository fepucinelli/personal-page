<template>
  <div
    class="z-10 min-h-screen bg-transparent dark:bg-gray-950
           flex flex-col items-center justify-center
           text-center p-6"
  >
    <!-- Avatar -->
    <div class="flip-container">
      <img
        src="/avatar.jpg"
        alt="Me"
        class="flip-image w-32 h-32 rounded-full object-cover mb-4
               border-4 dark:border-gray-800
               transition-transform hover:scale-105"
      />
    </div>

    <h1 class="text-3xl font-bold mb-4 dark:text-gray-100">
      Felipe Pucinelli
    </h1>

    <h2 class="text-base mb-4 dark:text-gray-100">
      Senior Front-End Engineer • Lead Software Developer • DJ
    </h2>

    <h3 class="mb-4 text-sm text-gray-600 dark:text-gray-400">
      "I’m a 12y+ Senior Frontend Engineer & Lead Software Engineer who loves
      building products that feels good to use and to play music that feels good to hear."
    </h3>

    <SocialLinks />

    <h4 class="font-bold dark:text-gray-100">
      <i class="pi pi-headphones"></i>
      By the way, my personal webpage is also a global radio station, enjoy:
    </h4>

    <!-- Current station -->
    <p v-if="currentStation" class="text-lg text-gray-600 dark:text-gray-400 mb-6">
      {{ currentStation.name }} — {{ currentStation.country }}
    </p>

    <!-- Controls -->
    <div v-if="currentStation" class="flex flex-col sm:flex-row gap-4 items-center">
      <button
        @click="playCurrent"
        class="px-6 py-3 rounded-xl bg-brand text-white
               hover:bg-brand-dark transition"
      >
        <i class="pi pi-play-circle"></i> Start listening
      </button>

      <button
        @click="shuffle"
        class="px-6 py-3 rounded-xl border border-gray-300
               hover:bg-gray-100 transition
               dark:text-gray-100 dark:hover:text-gray-700"
      >
        <i class="pi pi-sync"></i> Another random station
      </button>

      <!-- Favorite toggle -->
      <button
        @click="favorites.toggleFavorite(currentStation)"
        class="text-2xl"
        :title="
          favorites.isFavorite(currentStation.id)
            ? 'Remove from favorites'
            : 'Add to favorites'
        "
      >
        <i
          class="pi"
          :class="favorites.isFavorite(currentStation.id)
            ? 'pi-star-fill'
            : 'pi-star'"
        ></i>
      </button>
    </div>

    <!-- Favorites section -->
    <section
      v-if="favorites.allFavorites.length > 0"
      class="mt-12 w-full max-w-5xl"
    >
      <h2 class="text-xl font-bold mb-4 text-left dark:text-gray-100">
        <i class="pi pi-bookmark"></i> Our favorite radio stations
      </h2>

      <Loader v-if="pending" />

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <StationCard
          v-for="station in favorites.allFavorites"
          :key="station.id"
          :station="station"
        />
      </div>
    </section>

    <NuxtLink
      to="/stations"
      class="mt-8 text-sm text-gray-500 hover:underline"
    >
      Browse all stations →
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