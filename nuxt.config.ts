export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  modules: ['@pinia/nuxt', '@nuxt/scripts'],
  vite: {
    plugins: [
      {
        name: 'primeicons-font-display',
        enforce: 'pre' as const,
        transform(code: string, id: string) {
          if (id.includes('primeicons.css')) {
            return { code: code.replace('font-display: block', 'font-display: swap'), map: null }
          }
        },
      },
    ],
  },
  components: {
    dirs: [
      { path: '~/components', pathPrefix: false },
    ],
  },
  nitro: {
    preset: 'github-pages',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/stations'],
      failOnError: false,
    },
    routeRules: {
      '/_assets/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/station/**': { prerender: false },
    },
    hooks: {
      'prerender:generate'(route: { contents?: string }) {
        if (route.contents) {
          route.contents = route.contents.replace(
            'font-display:block;font-family:primeicons',
            'font-display:swap;font-family:primeicons',
          )
        }
      },
    },
  },
  app: {
    baseURL: '/',
    buildAssetsDir: '_assets',
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s | Felipe Pucinelli',
      script: [
        {
          innerHTML: "(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()",
          tagPosition: 'head',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://de1.api.radio-browser.info' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/syne-latin.woff2', crossorigin: 'anonymous' } as any,
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/chakra-petch-400-latin.woff2', crossorigin: 'anonymous' } as any,
        { rel: 'preload', as: 'image', type: 'image/webp', href: '/avatar-sm.webp', fetchpriority: 'high' } as any,
      ],
      meta: [
        { name: 'description', content: 'Felipe Pucinelli — Senior Front-End Engineer, Lead Developer & DJ. Explore my curated collection of internet radio stations from around the world.' },
        { name: 'author', content: 'Felipe Pucinelli' },
        { name: 'theme-color', content: '#2D1B3D' },
        { name: 'referrer', content: 'strict-origin-when-cross-origin' },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:site_name', content: 'Felipe Pucinelli' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://pucinelli.me/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://pucinelli.me/og-image.png' },
      ],
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
