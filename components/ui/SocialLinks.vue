<template>
  <section class="mb-20 flex justify-center">
    <div class="flex gap-6 text-2xl">
      <a
        v-for="item in links"
        :key="item.icon"
        :href="item.url"
        target="_blank"
        rel="noopener noreferrer"
        class="text-gray-500 dark:text-gray-400 hover:text-brand dark:hover:text-brand transition"
      >
        <i class="pi" :class="item.icon"></i>
      </a>
    </div>
  </section>
</template>

<script setup>
const links = [
  { icon: 'pi-instagram', url: 'https://www.instagram.com/felipepucinelli' },
  { icon: 'pi-linkedin', url: 'https://www.linkedin.com/in/felipepucinelli' },
  { icon: 'pi-github', url: 'https://github.com/felipepucinelli' },
]
</script>