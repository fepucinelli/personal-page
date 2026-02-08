<template>
  <div class="px-6 py-8 max-w-6xl mx-auto">
    <div class="mb-8">
      <h1 class="font-display text-3xl italic text-ink dark:text-neutral-50">
        All Stations
      </h1>
      <p class="mt-2 text-sm text-ink-muted dark:text-neutral-500">
        Discover radio stations from around the world
      </p>
    </div>

    <Loader v-if="pending" />

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <StationCard
        v-for="station in stations"
        :key="station.id"
        :station="station"
      />
    </div>
  </div>
</template>

<script setup>
  import StationCard from '~/components/station/StationCard.vue'
  import Loader from '~/components/ui/Loader.vue'

  const { data: stations, pending } = await useStations()
</script>
