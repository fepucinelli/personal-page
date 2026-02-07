import { defineStore } from 'pinia'

type Theme = 'light' | 'dark'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: 'light' as Theme,
  }),

  actions: {
    init() {
      if (!process.client) return

      const saved = localStorage.getItem('theme') as Theme | null
      if (saved) {
        this.theme = saved
      } else {
        // respect system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        this.theme = prefersDark ? 'dark' : 'light'
      }

      this.apply()
    },

    toggle() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', this.theme)
      this.apply()
    },

    apply() {
      const html = document.documentElement
      html.classList.toggle('dark', this.theme === 'dark')
    },
  },
})