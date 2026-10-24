<template>
  <section aria-labelledby="clients-heading" class="w-full max-w-3xl">
    <div class="flex items-center gap-2 justify-center mb-6">
      <div class="h-px flex-1 max-w-[60px] bg-ink/8 dark:bg-white/8" />
      <h2 id="clients-heading" class="text-xs tracking-widest uppercase text-ink-muted dark:text-neutral-400 font-medium">
        Companies I've worked with
      </h2>
      <div class="h-px flex-1 max-w-[60px] bg-ink/8 dark:bg-white/8" />
    </div>

    <!-- CSS-only marquee (see .marquee in main.css): pauses on hover/focus, static under reduced motion -->
    <div class="marquee">
      <div class="marquee__track">
        <ul
          v-for="copy in 2"
          :key="copy"
          class="marquee__list"
          :aria-hidden="copy === 2 ? 'true' : undefined"
        >
          <li v-for="client in clients" :key="client.name" class="px-5 sm:px-6">
            <img
              :src="client.src"
              :alt="copy === 1 ? client.name : ''"
              width="160"
              height="64"
              loading="lazy"
              decoding="async"
              class="h-12 w-[120px] sm:h-16 sm:w-40 opacity-60 hover:opacity-100 dark:invert transition-opacity duration-300"
            />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Logos are pre-normalized: 480x192 WebP, black on transparent (dark mode inverts them)
const clients = [
  { name: 'Azul', src: '/clients/azul.webp' },
  { name: 'Bradesco', src: '/clients/bradesco.webp' },
  { name: 'Danone', src: '/clients/danone.webp' },
  { name: 'Deutsche Bank', src: '/clients/deutsche-bank.webp' },
  { name: 'Itaú', src: '/clients/itau.webp' },
  { name: 'Natura', src: '/clients/natura.webp' },
  { name: 'Qualcomm', src: '/clients/qualcomm.webp' },
  { name: 'Siemens', src: '/clients/siemens.webp' },
  { name: 'Toyota', src: '/clients/toyota.webp' },
  { name: 'Vivo', src: '/clients/vivo.webp' },
]
</script>
