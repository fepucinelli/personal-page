export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  modules: ['@pinia/nuxt'],
  components: {
    dirs: [
      { path: '~/components', pathPrefix: false },
    ],
  },
  nitro: {
    preset: 'github-pages',
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      failOnError: false,
    },
  },
  app: {
    baseURL: '/',
    buildAssetsDir: '_assets',
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s | Felipe Pucinelli',
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'preconnect', href: 'https://api.fontshare.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap' },
        { rel: 'stylesheet', href: 'https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap' },
      ],
      meta: [
        { name: 'description', content: 'Felipe Pucinelli — Senior Front-End Engineer, Lead Developer & DJ. Explore my curated collection of internet radio stations from around the world.' },
        { name: 'author', content: 'Felipe Pucinelli' },
        { name: 'theme-color', content: '#c493ff' },
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
