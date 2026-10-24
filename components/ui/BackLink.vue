<template>
  <NuxtLink
    :to="to"
    class="inline-flex items-center gap-1 py-2 -my-2 text-xs uppercase tracking-widest
           text-ink-muted dark:text-neutral-400 hover:text-brand transition-colors mb-4"
  >
    <span aria-hidden="true">&larr;</span> {{ label }}
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string
  label: string
}>()
</script>
