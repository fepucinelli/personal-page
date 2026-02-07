export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],

  modules: ['@pinia/nuxt'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})