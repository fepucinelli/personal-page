<template>
  <div class="mb-8">
    <h1 class="flex items-baseline gap-2 font-body text-2xl sm:text-3xl font-semibold uppercase tracking-wide text-ink dark:text-neutral-50 dark:text-glow">
      <span class="text-brand" aria-hidden="true">&gt;</span>
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
