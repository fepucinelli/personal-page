<template>
  <div class="flex gap-1 justify-center mb-6">
    <a
      v-for="item in links"
      :key="item.icon"
      :href="item.url"
      :aria-label="item.label"
      target="_blank"
      rel="noopener noreferrer"
      class="p-3 rounded-full
             text-ink-muted dark:text-neutral-500
             hover:text-brand hover:bg-brand/5
             transition-all duration-300"
    >
      <i class="pi text-base" :class="item.icon"></i>
    </a>
  </div>
</template>

<script setup lang="ts">
const links = [
  { icon: 'pi-instagram', url: 'https://www.instagram.com/felipepucinelli', label: 'Instagram' },
  { icon: 'pi-linkedin', url: 'https://www.linkedin.com/in/felipepucinelli', label: 'LinkedIn' },
  { icon: 'pi-github', url: 'https://github.com/fepucinelli', label: 'GitHub' },
]
</script>
