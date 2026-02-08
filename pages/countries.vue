<template>
  <div class="px-6 py-8 max-w-6xl mx-auto">
    <div class="mb-8">
      <h1 class="font-display text-3xl italic text-ink dark:text-neutral-50">
        Countries
      </h1>
      <p class="mt-2 text-sm text-ink-muted dark:text-neutral-500">
        Explore radio stations by country
      </p>
    </div>

    <Loader v-if="pending" />

    <template v-else>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <NuxtLink
          v-for="c in visibleCountries"
          :key="c.code"
          :to="`/country/${c.code}`"
          class="group p-4 rounded-2xl
                 bg-white dark:bg-night-elevated
                 border border-ink/5 dark:border-white/5
                 hover:border-brand/20 dark:hover:border-brand/20
                 transition-all duration-300"
        >
          <span class="text-sm font-medium text-ink dark:text-neutral-200 group-hover:text-brand transition-colors">
            {{ c.name }}
          </span>
          <span class="block mt-1 text-xs text-ink-muted dark:text-neutral-500">
            {{ c.count }} stations
          </span>
        </NuxtLink>
      </div>

      <div v-if="hasMore" ref="sentinelRef" class="h-1" />
    </template>
  </div>
</template>

<script setup>
  import Loader from '~/components/ui/Loader.vue'

  useHead({ title: 'Countries' })
  useSeoMeta({
    description: 'Explore radio stations by country. Find internet radio from every corner of the world.',
    ogTitle: 'Countries | Felipe Pucinelli',
    ogDescription: 'Explore radio stations by country. Find internet radio from every corner of the world.',
    ogUrl: 'https://pucinelli.me/countries',
  })

  const CHUNK = 40

  const { data: countries, pending } = await useCountries()

  const visibleCount = ref(CHUNK)
  const visibleCountries = computed(() => (countries.value || []).slice(0, visibleCount.value))
  const hasMore = computed(() => visibleCount.value < (countries.value?.length || 0))

  function showMore() {
    visibleCount.value += CHUNK
  }

  const { sentinelRef } = useInfiniteScroll(showMore)
</script>
