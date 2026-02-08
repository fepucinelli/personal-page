<template>
  <div class="p-4 dark:bg-gray-950">
    <h1 class="text-2xl font-bold mb-4 dark:text-gray-100"><i class="pi pi-headphones"></i> Find stations by countries</h1>
    
    <Loader v-if="pending" />
    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <NuxtLink
        v-for="c in countries"
        :key="c.code"
        :to="`/country/${c.code}`"
        class="p-3 border rounded-lg hover:bg-gray-50 dark:text-gray-100 dark:hover:text-gray-700"
      >
        {{ c.name }}
        <span class="text-sm text-gray-500">
          ({{ c.count }})
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  import Loader from '~/components/ui/Loader.vue'
  const { data: countries, pending } = await useCountries()
</script>