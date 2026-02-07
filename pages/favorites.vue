

<script setup lang="ts">
  import { useFavoritesStore } from '~/stores/favorites'
  import StationCard from '~/components/station/StationCard.vue'

  const favorites = useFavoritesStore()
</script>

<template>
  <div class="p-6">
     <h1 class="text-2xl font-bold mb-4"><i class="pi pi-bookmark"></i> Favorite radio stations</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StationCard
        v-for="station in favorites.allFavorites"
        :key="station.id"
        :station="station"
      />
    </div>
  </div>
</template>