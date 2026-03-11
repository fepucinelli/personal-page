import { defineStore, skipHydrate } from 'pinia'

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  if (!import.meta.client) return 'dark'

  const saved = localStorage.getItem('theme') as Theme | null
  if (saved) return saved

  return 'dark'
}

function applyTheme(theme: Theme) {
  if (!import.meta.client) return
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>(getInitialTheme())

  // Apply on creation (client-side only)
  applyTheme(theme.value)

  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', theme.value)
    applyTheme(theme.value)
  }

  return {
    theme: skipHydrate(theme),
    toggle,
  }
})
