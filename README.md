# pucinelli.me

Personal site and internet radio discovery app built by [Felipe Pucinelli](https://pucinelli.me) — Senior Front-End Engineer, Lead Developer & DJ.

**[pucinelli.me](https://pucinelli.me)**

---

## Features

- **About Page** — Personal bio with avatar, centered header with decorative lines
- **Random Radio Discovery** — Start listening to a random station with one click, shuffle to discover new ones
- **Auto-Skip on Failure** — Broken streams are detected automatically and the player skips to the next available station
- **Curated System Stations** — Handpicked stations pinned to favorites that can't be removed or unfavorited
- **Now Playing Toast** — Toast notification appears when switching between stations
- **Typewriter Hero** — Name and roles animate with a typing effect on the landing page, respects `prefers-reduced-motion`
- **Avatar Pulse Animation** — Breathing ring animation on the avatar while music is playing
- **Recently Played** — Tracks last 10 played stations, persisted in localStorage, shown on the landing page
- **Station Count Badge** — Displays total available stations and countries from the Radio Browser API
- **Favorites** — Save and manage favorite stations, persisted in localStorage
- **Browse by Country** — Explore stations filtered by country with dedicated pages
- **Browse by Genre** — Explore stations filtered by music genre with dedicated pages
- **Infinite Scroll** — Stations, countries, and genres load progressively as you scroll
- **Persistent Player** — Audio keeps playing across page navigation with play/pause, volume control, and inline favorite toggle
- **Persistent Volume** — Volume level saved to localStorage and restored across sessions
- **Dark Mode** — Light/dark theme toggle, preference persisted in localStorage
- **SEO Optimized** — SSR pre-rendering, meta tags, Open Graph, structured data (JSON-LD), sitemap, and robots.txt
- **Performance Optimized** — Non-blocking font loading, compositor-hinted animations, cache headers for static assets
- **Mobile-Friendly Touch Targets** — Interactive buttons meet the 44px minimum tap target guideline
- **Accessible** — All interactive elements have accessible names (aria-labels), semantic HTML

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **Nuxt 3** (static generation via `github-pages` preset) |
| UI | **Vue 3** Composition API with `<script setup>` |
| Styling | **Tailwind CSS** with dark mode (class strategy) |
| State | **Pinia** (Composition API stores) |
| Typography | Instrument Serif + Satoshi (Fontshare) |
| Icons | PrimeIcons |
| Audio | HTML5 Audio API |
| Data | [Radio Browser API](https://www.radio-browser.info/) |
| Deploy | **GitHub Pages** via `gh-pages` |

---

## Architecture

### API Layer

```
composables/api/
  client.ts      # radioFetch() — thin wrapper around $fetch with base URL
  mappers.ts     # mapStation/Country/Genre — transform raw API responses to typed models
```

All external data flows through `radioFetch()` and gets mapped into typed interfaces defined in `types/radio.ts`. Raw API response shapes (`RawStation`, `RawCountry`, `RawGenre`) are separated from the app-facing types (`Station`, `Country`, `Genre`).

### Composables

```
composables/
  useStations.ts        # Station fetching with useAsyncData + direct fetch variant
  useCountries.ts       # Country listing
  useGenres.ts          # Genre listing
  useRadioStats.ts      # Total station/country counts from API stats endpoint
  useInfiniteScroll.ts  # Reusable infinite scroll with IntersectionObserver
  useToast.ts           # Singleton toast notification state and show()
  useSeoPage.ts         # Shared SEO setup (title suffix, og:url prefix)
  useStationActions.ts  # Unified play/favorite actions for components
  useTypewriter.ts      # Typewriter text animation with configurable speed and phases
```

Composables are auto-imported by Nuxt. Store imports (`usePlayerStore`, etc.) are **not** auto-imported and require explicit imports.

### Stores

All stores use Pinia's Composition API style and are self-initializing (no `init()` calls needed).

| Store | Responsibility |
|-------|---------------|
| `player.ts` | Audio playback state, lazy `HTMLAudioElement` via `ensureAudio()`, persistent volume (`skipHydrate`), error callback for auto-skip |
| `favorites.ts` | User favorites + system-curated stations, localStorage persistence |
| `recentlyPlayed.ts` | Last 10 played stations (deduplicated), localStorage persistence |
| `theme.ts` | Dark/light mode toggle, reads system preference at creation |

### Components

```
components/
  station/StationCard.vue   # Presentational — props: station, isPlaying, isFavorite, hideFavorite; emits: play, toggleFavorite
  player/PlayerBar.vue      # Global persistent player bar with favorite toggle, auto-skip fallback on stream errors
  ui/Loader.vue             # Shared loading spinner
  ui/SocialLinks.vue        # Social media links
```

`StationCard` is fully presentational — all logic is handled by the parent via `useStationActions()`.

### Error Handling

- **`error.vue`** — Catches unhandled errors at the app level
- **Inline error + retry** — Data pages show contextual error messages with a retry button
- **Player auto-skip** — When a stream fails, the `PlayerBar` fetches a random station from the API and plays it automatically

---

## Project Structure

```
├── app.vue
├── error.vue
├── layouts/
│   └── default.vue            # Header, nav, theme toggle, persistent PlayerBar
├── pages/
│   ├── index.vue              # Landing page with random station + favorites
│   ├── about.vue              # About page with bio and avatar
│   ├── stations.vue           # All stations with infinite scroll
│   ├── favorites.vue          # User's favorite stations
│   ├── countries.vue          # Country listing
│   ├── country/[code].vue     # Stations filtered by country
│   ├── genres.vue             # Genre listing
│   └── genre/[slug].vue       # Stations filtered by genre
├── components/
│   ├── station/StationCard.vue
│   ├── player/PlayerBar.vue
│   └── ui/
│       ├── Loader.vue
│       ├── SocialLinks.vue
│       └── Toast.vue
├── composables/
│   ├── api/
│   │   ├── client.ts
│   │   └── mappers.ts
│   ├── useStations.ts
│   ├── useCountries.ts
│   ├── useGenres.ts
│   ├── useRadioStats.ts
│   ├── useInfiniteScroll.ts
│   ├── useToast.ts
│   ├── useSeoPage.ts
│   ├── useStationActions.ts
│   └── useTypewriter.ts
├── stores/
│   ├── player.ts
│   ├── favorites.ts
│   ├── recentlyPlayed.ts
│   └── theme.ts
├── types/
│   └── radio.ts
├── assets/css/
│   └── main.css
└── public/
    ├── avatar.jpg
    ├── og-image.png
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
