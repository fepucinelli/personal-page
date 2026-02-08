<template>
  <div class="px-6 py-8 max-w-6xl mx-auto">
    <div class="mb-8">
      <h1 class="font-display text-3xl italic text-ink dark:text-neutral-50">
        Genres
      </h1>
      <p class="mt-2 text-sm text-ink-muted dark:text-neutral-500">
        Browse stations by music genre
      </p>
    </div>

    <Loader v-if="pending" />

    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
    >
      <NuxtLink
        v-for="g in genres"
        :key="g.slug"
        :to="`/genre/${g.slug}`"
        class="group p-4 rounded-2xl
               bg-white dark:bg-night-elevated
               border border-ink/5 dark:border-white/5
               hover:border-brand/20 dark:hover:border-brand/20
               transition-all duration-300"
      >
        <span class="text-sm font-medium text-ink dark:text-neutral-200 group-hover:text-brand transition-colors">
          {{ g.slug }}
        </span>
        <span class="block mt-1 text-xs text-ink-muted dark:text-neutral-500">
          {{ g.count }} stations
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  import Loader from '~/components/ui/Loader.vue'

  useHead({ title: 'Genres' })
  useSeoMeta({
    description: 'Browse radio stations by music genre. Find your favorite style of music from jazz to electronic, rock, pop, and more.',
    ogTitle: 'Genres | Felipe Pucinelli',
    ogDescription: 'Browse radio stations by music genre. Find your favorite style from jazz to electronic, rock, pop, and more.',
    ogUrl: 'https://pucinelli.me/genres',
  })

  const { data: genres, pending } = await useGenres()
</script>
