<template>
  <div class="px-6 py-8 max-w-6xl mx-auto">
    <div class="mb-8">
      <NuxtLink
        to="/genres"
        class="inline-flex items-center gap-1 text-xs tracking-widest uppercase
               text-ink-muted dark:text-neutral-500 hover:text-brand transition-colors mb-4"
      >
        &larr; All genres
      </NuxtLink>
      <h1 class="font-display text-3xl italic text-ink dark:text-neutral-50 capitalize">
        {{ route.params.slug }}
      </h1>
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

const route = useRoute()
const { data: stations, pending } = await useStations({ genre: String(route.params.slug) })
</script>
