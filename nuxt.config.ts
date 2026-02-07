export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  modules: ['@pinia/nuxt'],
  nitro: {
    preset: 'github-pages'
  },
  app: {
    baseURL: '/personal-page/',
    buildAssetsDir: 'assets'
  },
  ssr: false,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})