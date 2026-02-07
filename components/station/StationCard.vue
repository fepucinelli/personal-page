<template>
  <div
    class="p-4 rounded-xl shadow transition flex flex-col gap-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
  >
    <div class="font-semibold">
      {{ props.station.name }}
    </div>

    <div class="text-sm text-gray-500">
      {{ props.station.country }}
    </div>

    <div class="flex items-center justify-between mt-auto">
      <button
        @click="player.play(props.station)"
        class="px-3 py-1 rounded flex items-center gap-2"
      >
        <template v-if="isPlaying">
          <i class="pi pi-pause-circle"></i>
          <span>Playing</span>
        </template>

        <template v-else>
          <i class="pi pi-play-circle"></i>
          <span>Play</span>
        </template>
      </button>

      <button @click="favorites.toggleFavorite(props.station)" class="text-xl">
        <i
          class="pi"
          :class="
            favorites.isFavorite(props.station.id) ? 'pi-bookmark-fill' : 'pi-bookmark'
          "
        ></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Station } from "~/types/station";
import { usePlayerStore } from "~/stores/player";
import { useFavoritesStore } from "~/stores/favorites";

const props = defineProps<{ station: Station }>();

const player = usePlayerStore();
const favorites = useFavoritesStore();

const isPlaying = computed(() => {
  return player.currentStation?.id === props.station.id && player.isPlaying;
});
</script>
