<template>
  <div class="px-6 py-8 max-w-6xl mx-auto">
    <div class="mb-8">
      <NuxtLink
        to="/countries"
        class="inline-flex items-center gap-1 text-xs tracking-widest uppercase
               text-ink-muted dark:text-neutral-500 hover:text-brand transition-colors mb-4"
      >
        &larr; All countries
      </NuxtLink>
      <h1 class="font-display text-3xl italic text-ink dark:text-neutral-50">
        {{ countryName }} Stations
      </h1>
    </div>

    <Loader v-if="pending" />

    <div v-else-if="error" class="text-center py-16">
      <p class="text-ink-muted dark:text-neutral-500 text-sm">Failed to load stations.</p>
      <button @click="refresh" class="mt-4 text-sm text-brand hover:text-brand-dark transition-colors">
        Try again
      </button>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <StationCard
        v-for="station in stations"
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

<script setup lang="ts">
const route = useRoute()
const actions = useStationActions()
const { data: stations, pending, error, refresh } = await useStations({ country: String(route.params.code) })

const countryName = computed(() => stations.value?.[0]?.country || String(route.params.code).toUpperCase())

useSeoPage({
  title: () => `${countryName.value} Radio Stations`,
  description: () => `Listen to radio stations from ${countryName.value}. Browse and stream internet radio.`,
  path: () => `/country/${route.params.code}`,
})
</script>
