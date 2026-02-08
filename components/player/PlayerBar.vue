<template>
  <div
    v-if="player.currentStation"
    class="fixed bottom-0 inset-x-0 z-50
           h-[72px] px-6 gap-5
           flex items-center
           backdrop-blur-xl
           bg-white/90 dark:bg-night-surface/90
           border-t border-ink/5 dark:border-white/5"
  >
    <!-- Play / Pause -->
    <button
      @click="toggle"
      class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
             transition-all duration-300"
      :class="{
        'bg-brand/10 text-brand animate-pulse-glow': player.isPlaying,
        'bg-ink/5 dark:bg-white/5 text-ink-secondary dark:text-neutral-400 hover:bg-brand/10 hover:text-brand': !player.isPlaying,
      }"
    >
      <i
        class="pi text-lg"
        :class="{
          'pi-spin pi-spinner text-ink-muted dark:text-neutral-500': player.isLoading,
          'pi-pause': !player.isLoading && player.isPlaying,
          'pi-play': !player.isLoading && !player.isPlaying
        }"
      ></i>
    </button>

    <!-- Station info -->
    <div class="flex-1 min-w-0">
      <div
        class="font-medium text-sm truncate text-ink dark:text-neutral-100"
        :title="player.currentStation.name"
      >
        {{ player.currentStation.name }}
      </div>
      <div class="text-xs text-ink-muted dark:text-neutral-500 tracking-wide uppercase mt-0.5">
        {{ player.currentStation.country }}
      </div>
    </div>

    <!-- Volume -->
    <div class="hidden sm:flex items-center gap-3 flex-shrink-0">
      <i class="pi pi-volume-down text-xs text-ink-muted dark:text-neutral-500"></i>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        class="range-slider w-24"
        :value="player.volume"
        @input="onVolume"
        :style="{
          background: `linear-gradient(
            to right,
            #c493ff ${volumePercent}%,
            rgba(58, 53, 48, 0.2) ${volumePercent}%
          )`
        }"
      />
      <i class="pi pi-volume-up text-xs text-ink-muted dark:text-neutral-500"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
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
