<template>
  <div class="px-6 py-8 max-w-4xl mx-auto">
    <Loader v-if="pending" />

    <div v-else-if="error" class="text-center py-16">
      <p class="text-ink-muted dark:text-neutral-500 text-sm">Failed to load station.</p>
      <button @click="refresh" class="mt-4 text-sm text-brand hover:text-brand-dark transition-colors">
        Try again
      </button>
    </div>

    <template v-else-if="station">
      <!-- Back link -->
      <NuxtLink
        to="/stations"
        class="inline-flex items-center gap-1 text-xs tracking-widest uppercase
               text-ink-muted dark:text-neutral-500 hover:text-brand transition-colors mb-8"
      >
        &larr; All stations
      </NuxtLink>

      <!-- Hero -->
      <div class="flex items-start gap-5 mb-6">
        <div
          class="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0
                 bg-surface dark:bg-night-surface flex items-center justify-center"
        >
          <img
            v-if="station.favicon && !faviconError"
            :src="station.favicon"
            :alt="station.name"
            width="80"
            height="80"
            loading="lazy"
            decoding="async"
            class="w-full h-full object-cover"
            @error="faviconError = true"
          />
          <i v-else class="pi pi-headphones text-2xl text-ink-muted dark:text-neutral-500" />
        </div>

        <div class="min-w-0">
          <h1 class="font-display text-3xl italic text-ink dark:text-neutral-50 leading-tight">
            {{ station.name }}
          </h1>
          <p class="mt-1 text-sm text-ink-muted dark:text-neutral-500">
            <NuxtLink
              v-if="station.countryCode"
              :to="`/country/${station.countryCode.toLowerCase()}`"
              class="hover:text-brand transition-colors"
            >
              {{ station.country }}
            </NuxtLink>
            <template v-if="station.state">
              <span class="mx-1.5">&middot;</span>{{ station.state }}
            </template>
            <template v-if="station.language">
              <span class="mx-1.5">&middot;</span>{{ station.language }}
            </template>
          </p>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="flex items-center gap-3 mb-8">
        <button
          @click="actions.playStation(station)"
          class="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium
                 transition-all duration-200 shadow-sm"
          :class="actions.isPlaying(station)
            ? 'bg-brand text-white shadow-brand/20'
            : 'bg-ink/5 dark:bg-white/5 text-ink dark:text-neutral-100 hover:bg-brand/10 dark:hover:bg-brand/10 hover:text-brand'"
        >
          <i class="pi" :class="actions.isPlaying(station) ? 'pi-pause' : 'pi-play'" />
          {{ actions.isPlaying(station) ? 'Playing' : 'Play' }}
        </button>

        <button
          @click="actions.toggleFavorite(station)"
          :aria-label="actions.isFavorite(station) ? 'Remove from favorites' : 'Add to favorites'"
          class="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium
                 bg-ink/5 dark:bg-white/5 transition-all duration-200
                 hover:bg-brand/10 dark:hover:bg-brand/10"
          :class="actions.isFavorite(station) ? 'text-brand' : 'text-ink dark:text-neutral-100 hover:text-brand'"
        >
          <i class="pi" :class="actions.isFavorite(station) ? 'pi-bookmark-fill' : 'pi-bookmark'" />
          {{ actions.isFavorite(station) ? 'Saved' : 'Save' }}
        </button>

        <button
          @click="shareStation.share(station.id, station.name)"
          aria-label="Share station"
          class="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium
                 bg-ink/5 dark:bg-white/5 text-ink dark:text-neutral-100
                 hover:bg-brand/10 dark:hover:bg-brand/10 hover:text-brand
                 transition-all duration-200"
        >
          <i class="pi pi-share-alt" />
          Share
        </button>
      </div>

      <!-- Metadata grid -->
      <div
        v-if="station.bitrate || station.codec || station.votes || station.popularity || station.language || station.homepage"
        class="grid grid-cols-2 sm:grid-cols-3 gap-px rounded-2xl overflow-hidden
               border border-ink/5 dark:border-white/5 mb-8"
      >
        <div v-if="station.bitrate" class="p-4 bg-white dark:bg-night-elevated">
          <div class="text-xs text-ink-muted dark:text-neutral-500 uppercase tracking-wide">Bitrate</div>
          <div class="mt-1 text-sm font-medium text-ink dark:text-neutral-100">{{ station.bitrate }} kbps</div>
        </div>
        <div v-if="station.codec" class="p-4 bg-white dark:bg-night-elevated">
          <div class="text-xs text-ink-muted dark:text-neutral-500 uppercase tracking-wide">Codec</div>
          <div class="mt-1 text-sm font-medium text-ink dark:text-neutral-100">{{ station.codec }}</div>
        </div>
        <div v-if="station.votes" class="p-4 bg-white dark:bg-night-elevated">
          <div class="text-xs text-ink-muted dark:text-neutral-500 uppercase tracking-wide">Votes</div>
          <div class="mt-1 text-sm font-medium text-ink dark:text-neutral-100">{{ station.votes.toLocaleString() }}</div>
        </div>
        <div v-if="station.popularity" class="p-4 bg-white dark:bg-night-elevated">
          <div class="text-xs text-ink-muted dark:text-neutral-500 uppercase tracking-wide">Listeners</div>
          <div class="mt-1 text-sm font-medium text-ink dark:text-neutral-100">{{ station.popularity.toLocaleString() }}</div>
        </div>
        <div v-if="station.language" class="p-4 bg-white dark:bg-night-elevated">
          <div class="text-xs text-ink-muted dark:text-neutral-500 uppercase tracking-wide">Language</div>
          <div class="mt-1 text-sm font-medium text-ink dark:text-neutral-100 capitalize">{{ station.language }}</div>
        </div>
        <div v-if="station.homepage" class="p-4 bg-white dark:bg-night-elevated">
          <div class="text-xs text-ink-muted dark:text-neutral-500 uppercase tracking-wide">Website</div>
          <a
            :href="station.homepage"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-1 text-sm font-medium text-brand hover:text-brand-dark transition-colors inline-flex items-center gap-1"
          >
            Visit <i class="pi pi-external-link text-xs" />
          </a>
        </div>
      </div>

      <!-- Genre tags -->
      <div v-if="station.tags.length" class="flex flex-wrap gap-2 mb-10">
        <NuxtLink
          v-for="tag in station.tags"
          :key="tag"
          :to="`/genre/${tag}`"
          class="px-3 py-1.5 rounded-full text-xs font-medium tracking-wide
                 bg-ink/5 dark:bg-white/5
                 text-ink-secondary dark:text-neutral-400
                 hover:bg-brand/10 hover:text-brand dark:hover:bg-brand/10 dark:hover:text-brand
                 transition-all duration-200"
        >
          {{ tag }}
        </NuxtLink>
      </div>

      <!-- Related Stations -->
      <div v-if="relatedStations?.length" class="mt-12">
        <div class="flex items-center gap-4 mb-6">
          <div class="flex-1 h-px bg-ink/5 dark:bg-white/5" />
          <h2 class="text-xs tracking-widest uppercase text-ink-muted dark:text-neutral-500">
            Related Stations
          </h2>
          <div class="flex-1 h-px bg-ink/5 dark:bg-white/5" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StationCard
            v-for="related in relatedStations"
            :key="related.id"
            :station="related"
            :is-playing="actions.isPlaying(related)"
            :is-favorite="actions.isFavorite(related)"
            @play="actions.playStation"
            @toggle-favorite="actions.toggleFavorite"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useStation, useRelatedStations } from '~/composables/useStation'
import { useShareStation } from '~/composables/useShareStation'

const route = useRoute()
const id = String(route.params.id)

const { data: station, pending, error, refresh } = await useStation(id)

if (!pending.value && !station.value) {
  showError(createError({ statusCode: 404, message: 'Station not found' }))
}

const actions = useStationActions()
const shareStation = useShareStation()
const faviconError = ref(false)

const { data: relatedStations } = await useRelatedStations(station)

useSeoPage({
  title: () => station.value?.name ?? 'Station',
  description: () => {
    const s = station.value
    if (!s) return 'Listen to internet radio stations.'
    const parts = [s.name]
    if (s.country) parts.push(`from ${s.country}`)
    if (s.tags.length) parts.push(`— ${s.tags.slice(0, 3).join(', ')}`)
    return parts.join(' ')
  },
  path: () => `/station/${id}`,
})
</script>
