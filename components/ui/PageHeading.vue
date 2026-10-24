<template>
  <div class="mb-8">
    <h1 class="font-display text-3xl italic text-ink dark:text-neutral-50">
      {{ title }}
    </h1>
    <p v-if="subtitle" class="mt-2 text-sm text-ink-muted dark:text-neutral-400">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>
