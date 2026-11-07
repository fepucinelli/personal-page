# pucinelli.me

Personal site and portfolio of [Felipe Pucinelli](https://pucinelli.me) — Senior Front-End Engineer, Lead Software Engineer & DJ.

**[pucinelli.me](https://pucinelli.me)**

---

## Features

- **SEO Optimized** — Static pre-rendering, meta tags, Open Graph image, structured data (JSON-LD), sitemap, and robots.txt
- **Google Analytics 4** — GA4 via `@nuxt/scripts`, deferred with an idle timeout to protect Core Web Vitals
- **Performance Optimized** — Preloaded responsive LCP portrait, non-blocking self-hosted fonts, compositor-only animations, no layout shift
- **Accessible** — Semantic HTML, ARIA on interactive elements, 44px touch targets, reduced-motion fallbacks

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **Nuxt 3** (static generation via `github-pages` preset) |
| UI | **Vue 3** Composition API with `<script setup>` |
| Styling | **Tailwind CSS** with dark mode (class strategy) |
| State | **Pinia** (theme store) |
| Typography | Syne (display) + Chakra Petch (body), self-hosted |
| Icons | PrimeIcons |
| Analytics | **@nuxt/scripts** + Google Analytics 4 (idle-deferred) |
| Deploy | **GitHub Pages** via `gh-pages` |

---

## Project Structure

```
├── app.vue                     # Shell, particle background, GA4, WebSite JSON-LD
├── error.vue                   # 404 / 500 page
├── layouts/
│   └── default.vue             # Header, nav, theme toggle
├── pages/
│   ├── index.vue               # Hero (portrait, name, roles, bio, social links) + clients marquee
│   └── about.vue               # About page
├── components/ui/
│   ├── ClientsMarquee.vue      # CSS-only logo carousel
│   ├── ParticleBackground.vue  # Animated character rain
│   └── SocialLinks.vue         # Social media links
├── composables/
│   ├── useScramble.ts          # Glitch-scramble text animation for the hero
│   └── useSeoPage.ts           # Shared SEO setup (title suffix, og:url prefix)
├── stores/
│   └── theme.ts                # Dark/light mode, reads preference at creation
├── assets/css/
│   └── main.css                # Tokens, animations, marquee, theme toggle
└── public/
    ├── portrait-480.webp       # Responsive hero portrait
    ├── portrait-800.webp
    ├── clients/                # Client logos (480×192, black on transparent)
    ├── fonts/
    ├── og-image-v2.png
    ├── sitemap.xml
    └── robots.txt
```

---

## Getting Started

### Requirements

- Node.js **18+**
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

Generates the full static site with pre-rendered pages.

### Deploy

```bash
npm run deploy
```

Generates the static site and publishes to GitHub Pages via `gh-pages`.
