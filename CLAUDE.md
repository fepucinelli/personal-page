# Radio Discovery App — Nuxt 3 Static Site

## Commands
- Dev: `npm run dev`
- Build (static): `npm run build` (runs `nuxt generate`)
- Deploy: `npm run deploy` (build + push to GitHub Pages)
- No test suite configured

## Architecture

Three-layer data flow: `radioFetch()` → Raw API types → Mappers → App types

- **Types**: `types/radio.ts` — Station, Country, Genre + Raw* API interfaces
- **API**: `composables/api/client.ts` (radioFetch), `composables/api/mappers.ts`
- **Composables**: Data fetching (useStations, useCountries, useGenres), UI logic (useInfiniteScroll, useSeoPage, useStationActions, useToast)
- **Stores** (Pinia, Composition API): player.ts, favorites.ts, recentlyPlayed.ts, theme.ts

## Critical Patterns

- Nuxt auto-imports composables, components, and Vue APIs — do NOT add explicit imports for these
- Store imports (usePlayerStore, etc.) are NOT auto-imported — always use explicit imports from `~/stores/*`
- Use `import.meta.client` instead of `process.client` in Composition API stores
- Use `skipHydrate()` for values read from localStorage or that differ between server/client
- Wrap client-only sections (favorites, recently played) in `<ClientOnly>`

## Component Design

- StationCard is fully presentational (props + emits only, no logic)
- Container components use `useStationActions()` to coordinate player + favorites stores
- Pass `hideFavorite` flag when rendering system stations (can't be unfavorited)

## Styling

- TailwindCSS with `class` strategy for dark mode (`dark:` prefix)
- Custom palette in tailwind.config.cjs: brand (#c493ff), surface, ink, night
- Custom fonts: Instrument Serif (display), Satoshi (body)
- Animations defined in `assets/css/main.css`

## SEO

- Use `useSeoPage()` in every page — it adds title suffix and og:url prefix automatically
- Structured data (JSON-LD) in app.vue and index.vue

## Error Handling

- Global: `error.vue` (404/500 templates)
- Page-level: inline error message + retry button
- Player: auto-skip to random station on stream failure via onError callback

## Don'ts

- Don't use Options API — this project uses Composition API exclusively
- Don't use Vuex — we use Pinia
- Don't add CSS-in-JS or scoped styles — use Tailwind utility classes
- Don't create stores for ephemeral UI state — use composables (see useToast pattern)
- Don't call store init() methods — stores self-initialize at creation time
