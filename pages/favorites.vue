<script setup lang="ts">
import { useFavoritesStore } from '~/stores/favorites'

const actions = useStationActions()

useSeoPage({
  title: 'Favorites',
  description: 'Your saved radio stations. Keep track of the stations you love.',
  path: '/favorites',
  robots: 'noindex',
})

const favorites = useFavoritesStore()
</script>

<template>
  <div class="px-6 py-8 max-w-6xl mx-auto">
    <div class="mb-8">
      <h1 class="font-display text-3xl italic text-ink dark:text-neutral-50">
        Favorites
      </h1>
      <p class="mt-2 text-sm text-ink-muted dark:text-neutral-500">
        Your saved radio stations
      </p>
    </div>

    <div v-if="favorites.allFavorites.length === 0" class="text-center py-16">
      <p class="text-ink-muted dark:text-neutral-500 text-sm">
        No favorites yet. Start exploring and save stations you love.
      </p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <StationCard
        v-for="station in favorites.allFavorites"
        :key="station.id"
        :station="station"
        :is-playing="actions.isPlaying(station)"
        :is-favorite="actions.isFavorite(station)"
        @play="actions.playStation"
        @toggle-favorite="actions.toggleFavorite"
      />
    </div>
  </div>
</template>
