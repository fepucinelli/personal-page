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

    <template v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StationCard
          v-for="station in allStations"
          :key="station.id"
          :station="station"
        />
      </div>

      <Loader v-if="loadingMore" />
      <div v-if="hasMore" ref="sentinelRef" class="h-1" />
    </template>
  </div>
</template>

<script setup>
  import StationCard from '~/components/station/StationCard.vue'
  import Loader from '~/components/ui/Loader.vue'

  useHead({ title: 'All Stations' })
  useSeoMeta({
    description: 'Discover radio stations from around the world. Browse and listen to a curated collection of internet radio.',
    ogTitle: 'All Stations | Felipe Pucinelli',
    ogDescription: 'Discover radio stations from around the world. Browse and listen to internet radio.',
    ogUrl: 'https://pucinelli.me/stations',
  })

  const LIMIT = 50

  const { data: initialStations, pending } = await useStations({ limit: LIMIT, offset: 0 })

  const allStations = ref([...(initialStations.value || [])])
  const offset = ref(LIMIT)
  const hasMore = ref((initialStations.value?.length || 0) >= LIMIT)
  const loadingMore = ref(false)

  async function loadMore() {
    if (loadingMore.value || !hasMore.value) return
    loadingMore.value = true
    try {
      const batch = await fetchStations({ offset: offset.value, limit: LIMIT })
      allStations.value.push(...batch)
      offset.value += LIMIT
      if (batch.length < LIMIT) hasMore.value = false
    } finally {
      loadingMore.value = false
    }
  }

  const { sentinelRef } = useInfiniteScroll(loadMore)
</script>
