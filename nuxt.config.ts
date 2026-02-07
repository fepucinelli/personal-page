export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  modules: ['@pinia/nuxt'],
  app: {
    baseURL: '/personal-page/',
    buildAssetsDir: 'assets'
  },
  nitro: {
    preset: 'github-pages'
  },
  ssr: false,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})