# Radio Discovery App & Personal Website — Nuxt 3 Static Site

## Commands
- Dev: `npm run dev`
- Build (static): `npm run build` (runs `nuxt generate`)
- Deploy: `npm run deploy` (build + push to GitHub Pages)
- No test suite configured

## Architecture

Three-layer data flow: `radioFetch()` → Raw API types → Mappers → App types

- **Types**: `types/radio.ts` — Station, Country, Genre + Raw* API interfaces
- **API**: `composables/api/client.ts` (radioFetch), `composables/api/mappers.ts`
- **Composables**: Data fetching (useStations, useStation, useCountries, useGenres), UI logic (useInfiniteScroll, useSeoPage, useStationActions, useShareStation, useToast)
- **Stores** (Pinia, Composition API): player.ts, favorites.ts, recentlyPlayed.ts, theme.ts

## Critical Patterns

- Nuxt auto-imports composables, components, and Vue APIs — do NOT add explicit imports for these
- Store imports (usePlayerStore, etc.) are NOT auto-imported — always use explicit imports from `~/stores/*`
- Use `import.meta.client` instead of `process.client` in Composition API stores
- Use `skipHydrate()` for values read from localStorage or that differ between server/client
- Wrap client-only sections (favorites, recently played) in `<ClientOnly>`

## Component Design

- StationCard is fully presentational (props + emits only, no logic); station name links to `/station/[id]`
- Container components use `useStationActions()` to coordinate player + favorites stores
- Pass `hideFavorite` flag when rendering system stations (can't be unfavorited)

## Station Detail Pages

- Route: `pages/station/[id].vue` — fetches station by UUID via `useStation(id)`
- Related stations via `useRelatedStations(station)` — same tag + country, fallback to tag only
- Share via `useShareStation()` — Web Share API with clipboard fallback + toast
- Station pages are **not prerendered** (`/station/**` has `prerender: false` in nuxt.config.ts)
- 404 handling uses `showError(createError(...))` (not `throw`) for client-side navigation

## Navigation

- "Listen" dropdown groups stations, countries, and genres in header nav
- Dropdown uses click-outside handler and closes on route navigation
- System favorites use real Radio Browser API UUIDs (not synthetic IDs) so detail pages work

## Styling

- Touch targets use invisible padding + negative margins (e.g. `py-2 -my-2`) to meet 44px minimum without shifting layout
- TailwindCSS with `class` strategy for dark mode (`dark:` prefix)
- Custom palette in tailwind.config.cjs: brand (#c493ff), surface, ink, night
- Custom fonts: Instrument Serif (display), Satoshi (body)
- Animations defined in `assets/css/main.css`

## SEO

- Use `useSeoPage()` in every page — it adds title suffix and og:url prefix automatically
- Structured data (JSON-LD) in app.vue and index.vue

## Analytics

- GA4 via `@nuxt/scripts` — `useScriptGoogleAnalytics` composable in `app.vue`
- Deferred with `useScriptTriggerIdleTimeout` (3s after Nuxt ready) to protect Core Web Vitals
- Preload warmup disabled (`warmupStrategy: false`) to avoid competing with critical resources

## Error Handling

- Global: `error.vue` (404/500 templates)
- Page-level: inline error message + retry button
- Player: auto-skip to random station on stream failure via onError callback

## Accessibility

- All interactive elements MUST have accessible names (`aria-label`, visible text, or `aria-labelledby`)
- Dropdowns/popups MUST use `aria-haspopup`, `:aria-expanded`, and `aria-controls` linking to the panel's `id`
- Menu panels MUST use `role="menu"` with `role="menuitem"` on each item
- Toggle buttons MUST use `role="switch"` with `:aria-checked`
- Images MUST have `alt` text (or `alt=""` for decorative images)
- Touch targets MUST meet 44px minimum (use invisible padding technique)
- Use semantic HTML elements (`<nav>`, `<main>`, `<header>`, `<button>`) over generic `<div>`/`<span>`
- Links that open in a new tab MUST include `rel="noopener noreferrer"`

## Don'ts

- Don't use Options API — this project uses Composition API exclusively
- Don't use Vuex — we use Pinia
- Don't add CSS-in-JS or scoped styles — use Tailwind utility classes
- Don't create stores for ephemeral UI state — use composables (see useToast pattern)
- Don't call store init() methods — stores self-initialize at creation time
- Don't create interactive elements without proper ARIA attributes — see Accessibility section
