<template>
  <div class="p-4 dark:bg-gray-950">
    <h1 class="text-2xl font-bold mb-4 dark:text-gray-100"><i class="pi pi-megaphone"></i> All Stations</h1>

    <Loader v-if="pending" />

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
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