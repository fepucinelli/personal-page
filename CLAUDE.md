# Personal Website — Nuxt 3 Static Site

## Commands
- Dev: `npm run dev`
- Build (static): `npm run build` (runs `nuxt generate`)
- Deploy: `npm run deploy` (build + push to GitHub Pages)
- No test suite configured
- Never run `npm run build` while the dev server is running: both write `.nuxt/` and the dev server breaks

## Architecture

Two pages: `pages/index.vue` (home) and `pages/about.vue`. No external data or API calls.

- **Composables**: `useScramble` (hero name/role animation), `useSeoPage` (page SEO)
- **Stores** (Pinia, Composition API): `theme.ts` only
- **Components** (`components/ui/`): `ClientsMarquee`, `SocialLinks`, `ParticleBackground`

## Critical Patterns

- Nuxt auto-imports composables, components, and Vue APIs — do NOT add explicit imports for these
- Store imports (`useThemeStore`) are NOT auto-imported — always use explicit imports from `~/stores/*`
- Use `import.meta.client` instead of `process.client` in Composition API stores
- Use `skipHydrate()` for values read from localStorage or that differ between server/client

## Home

- Hero is a 1-column grid (`grid-cols-1` = `minmax(0, 1fr)`) below `lg` and 2 columns from `lg`: portrait left, text right. Keep the explicit `grid-cols-1` — an implicit `auto` track lets the scrambling, `nowrap` name widen the column and resize the photo on mobile
- The portrait is the LCP element: preloaded in `useHead` with `imagesrcset`/`imagesizes` matching the `<img>`; its entrance uses `animate-fade-up-lcp` (starts at opacity 0.001 so Chrome still counts it as LCP)
- Portrait assets: `public/portrait-480.webp`, `public/portrait-800.webp` (cut-out with transparent background)

## Clients Marquee

- `components/ui/ClientsMarquee.vue` renders the list twice in `.marquee__track`; CSS in `assets/css/main.css` shifts it by -50% for a seamless loop
- CSS-only (transform animation, no JS): pauses on `:hover` / `:focus-within`; under `prefers-reduced-motion` it becomes a static wrapped grid and hides the duplicate list
- Logos live in `public/clients/*.webp`: 480×192, black on transparent, displayed at 160×64 with `dark:invert`. Keep new logos in the same format; marks whose ink reads small (short lowercase, tiny text, taglines) get an optical size boost inside the canvas

## Navigation

- Header: `~/fp` wordmark (home), `./about`, theme toggle
- Nav links are text-only: hover and the current page only turn the text `brand` (no background or border)

## Styling

- Touch targets use invisible padding + negative margins (e.g. `py-2 -my-2`) to meet 44px minimum without shifting layout
- TailwindCSS with `class` strategy for dark mode (`dark:` prefix)
- Palette ("graphite + lime") in tailwind.config.cjs: one accent, `brand` = the lime of the `~/fp` logo via `--brand` in main.css (#AAFF2E dark, #3F6600 light); `night` (dark grounds) and `surface`/`ink` are neutral graphite/greys with no green tint. Don't add other greens — use `brand` with opacity for tints
- Custom fonts: Syne (display), Chakra Petch (body), self-hosted in `public/fonts`
- Animations defined in `assets/css/main.css`

## SEO

- Use `useSeoPage()` in every page except home — it adds title suffix and og:url prefix automatically (home sets its own `useHead`/`useSeoMeta`)
- Structured data (JSON-LD) in app.vue (WebSite) and index.vue (Person)
- OG image: `public/og-image-v2.png` — when it changes, give it a new file name so social platforms don't serve their cached copy
- `public/sitemap.xml` lists `/` and `/about`

## Analytics

- GA4 via `@nuxt/scripts` — `useScriptGoogleAnalytics` composable in `app.vue`
- Deferred with `useScriptTriggerIdleTimeout` (3s after Nuxt ready) to protect Core Web Vitals
- Preload warmup disabled (`warmupStrategy: false`) to avoid competing with critical resources

## Error Handling

- Global: `error.vue` (404/500 templates, link back home)

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
- Don't create stores for ephemeral UI state — use composables
- Don't call store init() methods — stores self-initialize at creation time
- Don't create interactive elements without proper ARIA attributes — see Accessibility section
