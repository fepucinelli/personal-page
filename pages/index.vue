<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center
           text-center px-6 py-16 overflow-x-hidden"
  >
    <!-- Hero: stacked and centred on phones/tablets; from lg the photo on the left looks into the text on the right -->
    <!-- grid-cols-1 = minmax(0, 1fr): the scrambling nowrap name/role can't widen the track and resize the photo -->
    <section class="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 items-center gap-2 lg:gap-14 lg:text-left">
      <!-- Portrait — cut-out with soft edges; enters with the text, one step ahead of the name -->
      <div class="portrait animate-fade-up-lcp delay-1 relative w-full max-w-[420px] mx-auto lg:max-w-[520px] lg:mr-0" :class="{ 'is-playing': player.isPlaying }">
        <!-- Lime aura behind the head while a station plays -->
        <div class="avatar-blob blob1" aria-hidden="true"></div>
        <div class="avatar-blob blob2" aria-hidden="true"></div>
        <img
          src="/portrait-800.webp"
          srcset="/portrait-480.webp 480w, /portrait-800.webp 800w"
          sizes="(min-width: 1024px) 520px, min(100vw - 48px, 420px)"
          alt="Felipe Pucinelli wearing DJ headphones"
          width="800"
          height="731"
          fetchpriority="high"
          class="relative z-10 block w-full h-auto"
        />
      </div>

      <div>
        <!-- Name + Role (accessible text for screen readers) -->
        <span class="sr-only">Felipe Pucinelli. Senior Front-End Engineer, Lead Developer, DJ.</span>

        <!-- Name -->
        <h1
          aria-hidden="true"
          class="animate-fade-up delay-2 font-display text-4xl md:text-5xl
                 text-ink dark:text-neutral-50 tracking-tight overflow-hidden whitespace-nowrap"
          :class="{ 'opacity-0': !scramble.nameVisible }"
          style="min-height: 1.2em"
        >{{ scramble.nameText }}</h1>

        <!-- Role -->
        <p
          aria-hidden="true"
          class="animate-fade-up delay-3 mt-3 text-sm tracking-widest uppercase
                 text-ink-muted dark:text-brand font-mono overflow-hidden whitespace-nowrap"
          :class="{ 'opacity-0': !scramble.roleVisible }"
          style="min-height: 1.5em"
        >{{ scramble.roleText }}</p>

        <!-- Bio -->
        <p class="animate-fade-up delay-4 mt-6 max-w-md mx-auto lg:mx-0 text-sm leading-relaxed
                  text-ink-secondary dark:text-neutral-400">
          I'm a 12y+ Senior Frontend Engineer & Lead Software Engineer who loves
          building products that feels good to use and to play music that feels good to hear.
        </p>

        <!-- Social links (icons carry p-3, so on lg pull the row back to the text edge) -->
        <div class="animate-fade-up delay-5 mt-8 lg:-ml-3">
          <SocialLinks class="justify-center lg:justify-start" />
        </div>
      </div>
    </section>

    <!-- Clients -->
    <ClientsMarquee class="animate-fade-up delay-6 mt-16" />

    <NuxtLink
      to="/listen"
      class="animate-fade-up delay-6 mt-12 py-2 -my-2 text-xs tracking-widest uppercase
             text-ink-muted dark:text-neutral-400 hover:text-brand transition-colors duration-300"
    >
      Tune in to the radio &rarr;
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '~/stores/player'

useHead({
  title: 'Senior Front-End Engineer, Lead Developer & DJ',
  link: [
    { rel: 'canonical', href: 'https://pucinelli.me/' },
    // Hero portrait is the LCP element: fetch the size the browser will pick, before CSS/JS
    { rel: 'preload', as: 'image', type: 'image/webp', href: '/portrait-800.webp', imagesrcset: '/portrait-480.webp 480w, /portrait-800.webp 800w', imagesizes: '(min-width: 1024px) 520px, min(100vw - 48px, 420px)', fetchpriority: 'high' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Felipe Pucinelli',
        jobTitle: 'Senior Front-End Engineer',
        url: 'https://pucinelli.me',
        image: 'https://pucinelli.me/portrait-800.webp',
        description: 'Senior Front-End Engineer, Lead Developer & DJ with 12+ years of experience building products that feel good to use.',
        sameAs: [
          'https://www.instagram.com/felipepucinelli',
          'https://www.linkedin.com/in/felipepucinelli',
          'https://github.com/fepucinelli',
        ],
      }),
    },
  ],
})

useSeoMeta({
  description: 'Felipe Pucinelli — Senior Front-End Engineer, Lead Developer & DJ with 12+ years building products for companies like Itaú, Qualcomm, Natura and Siemens.',
  ogTitle: 'Felipe Pucinelli — Senior Front-End Engineer, Lead Developer & DJ',
  ogDescription: 'Senior Front-End Engineer, Lead Developer & DJ with 12+ years building products that feel good to use.',
  ogUrl: 'https://pucinelli.me',
})

const player = usePlayerStore()

const scramble = useScramble({
  name: 'Felipe Pucinelli',
  roles: ['Senior Front-End Engineer', 'Lead Engineer', 'Web Performance Specialist', 'Eletronic Music DJ'],
})
</script>
