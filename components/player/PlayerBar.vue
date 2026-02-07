<template>
  <div
    v-if="player.currentStation"
    class="fixed bottom-0 inset-x-0 h-20 px-4 gap-4
           flex items-center
           bg-white dark:bg-neutral-900
           text-gray-900 dark:text-white
           border-t border-gray-200 dark:border-gray-800"
  >
    <!-- Play / Pause -->
    <button @click="toggle">
      <i
        class="pi text-xl"
        :class="{
          'pi-spin pi-spinner text-gray-400': player.isLoading,
          'pi-pause-circle text-brand': !player.isLoading && player.isPlaying,
          'pi-play-circle text-gray-500': !player.isLoading && !player.isPlaying
        }"
      ></i>
    </button>

    <!-- Station info -->
    <div class="flex-1">
      <div
        class="font-semibold truncate max-w-[250px] md:max-w-[680px]"
        :title="player.currentStation.name"
      >
        {{ player.currentStation.name }}
      </div>
      <div class="text-sm opacity-70">
        {{ player.currentStation.country }}
      </div>
    </div>

    <!-- Volume -->
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      class="range-slider"
      :value="player.volume"
      @input="onVolume"
      :style="{
        background: `linear-gradient(
          to right,
          #16a34a ${volumePercent}%,
          #374151 ${volumePercent}%
        )`
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerStore } from '~/stores/player'

const player = usePlayerStore()

const toggle = () => {
  player.toggle()
}

const onVolume = (e: Event) => {
  player.setVolume(Number((e.target as HTMLInputElement).value))
}

const volumePercent = computed(() => player.volume * 100)
</script>