<template>
  <div
    class="group relative p-5 rounded-2xl transition-all duration-300
           bg-white dark:bg-night-elevated
           border border-ink/5 dark:border-white/5
           hover:border-brand/20 dark:hover:border-brand/20
           hover:shadow-lg hover:shadow-brand/5"
  >
    <!-- Playing indicator -->
    <div
      v-if="isPlaying"
      class="absolute top-4 right-4 flex items-center gap-1"
    >
      <span class="w-1 h-3 bg-brand rounded-full animate-bounce" style="animation-delay: 0s" />
      <span class="w-1 h-4 bg-brand rounded-full animate-bounce" style="animation-delay: 0.15s" />
      <span class="w-1 h-2 bg-brand rounded-full animate-bounce" style="animation-delay: 0.3s" />
    </div>

    <div class="font-medium text-sm text-ink dark:text-neutral-100 leading-snug pr-8">
      {{ props.station.name }}
    </div>

    <div class="mt-1 text-xs text-ink-muted dark:text-neutral-500 tracking-wide uppercase">
      {{ props.station.country }}
    </div>

    <div class="flex items-center justify-between mt-4 pt-3 border-t border-ink/5 dark:border-white/5">
      <button
        @click="player.play(props.station)"
        class="flex items-center gap-2 text-xs font-medium tracking-wide uppercase
               text-ink-secondary dark:text-neutral-400
               hover:text-brand transition-colors duration-200"
      >
        <template v-if="isPlaying">
          <i class="pi pi-pause-circle text-brand"></i>
          <span class="text-brand">Playing</span>
        </template>
        <template v-else>
          <i class="pi pi-play-circle"></i>
          <span>Play</span>
        </template>
      </button>

      <button
        @click="favorites.toggleFavorite(props.station)"
        class="p-1 transition-all duration-200
               hover:scale-110"
      >
        <i
          class="pi text-sm"
          :class="
            favorites.isFavorite(props.station.id)
              ? 'pi-bookmark-fill text-brand'
              : 'pi-bookmark text-ink-muted dark:text-neutral-500 hover:text-brand'
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
