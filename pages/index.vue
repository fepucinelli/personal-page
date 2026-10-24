<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center
           text-center px-6 py-16 overflow-x-hidden"
  >
    <!-- Avatar — no entrance animation so it renders immediately as LCP candidate -->
    <div>
      <div class="avatar-blob-wrap" :class="{ 'is-playing': player.isPlaying }">
        <div class="avatar-blob blob1"></div>
        <div class="avatar-blob blob2"></div>
        <div class="avatar-blob-inner">
          <picture>
            <source type="image/webp" srcset="/avatar-sm.webp 336w, /avatar.webp 490w" sizes="168px" />
            <img
              src="/avatar.jpg"
              alt="Felipe Pucinelli"
              width="168"
              height="168"
              fetchpriority="high"
              class="w-[168px] h-[168px] rounded-full object-cover"
            />
          </picture>
        </div>
      </div>
    </div>

    <!-- Name + Role (accessible text for screen readers) -->
    <span class="sr-only">Felipe Pucinelli. Senior Front-End Engineer, Lead Developer, DJ.</span>

    <!-- Name -->
    <h1
      aria-hidden="true"
      class="animate-fade-up delay-2 mt-8 font-display text-4xl md:text-5xl italic
             text-ink dark:text-neutral-50 tracking-tight overflow-hidden whitespace-nowrap px-1"
      :class="{ 'opacity-0': !scramble.nameVisible }"
      style="min-height: 1.2em"
    >{{ scramble.nameText }}</h1>

    <!-- Role -->
    <p
      aria-hidden="true"
      class="animate-fade-up delay-3 mt-3 text-sm tracking-widest uppercase
             text-ink-muted dark:text-brand/70 font-mono overflow-hidden whitespace-nowrap px-1"
      :class="{ 'opacity-0': !scramble.roleVisible }"
      style="min-height: 1.5em"
    >{{ scramble.roleText }}</p>

    <!-- Bio -->
    <p class="animate-fade-up delay-4 mt-6 max-w-md text-sm leading-relaxed
              text-ink-secondary dark:text-neutral-400">
      I'm a 12y+ Senior Frontend Engineer & Lead Software Engineer who loves
      building products that feels good to use and to play music that feels good to hear.
    </p>

    <!-- Social links -->
    <div class="animate-fade-up delay-5 mt-8">
      <SocialLinks />
    </div>

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
  link: [{ rel: 'canonical', href: 'https://pucinelli.me/' }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Felipe Pucinelli',
        jobTitle: 'Senior Front-End Engineer',
        url: 'https://pucinelli.me',
        image: 'https://pucinelli.me/avatar.jpg',
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
  roles: ['Senior Front-End Engineer', 'Lead Engineer', 'Web Performance Enthusiast', 'Eletronic Music DJ'],
})
</script>
