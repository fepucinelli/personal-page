import { defineStore } from 'pinia'
import type { Station } from '~/types/station'

const SYSTEM_FAVORITE: Station = {
  id: 'system-radio-8150',
  name: 'Deep Electronic Vibes',
  streamUrl: 'https://az1.sednastream.com/radio/8150/Live',
  country: 'Albany',
  favicon: '',
}

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    stations: [] as Station[], // ONLY user favorites
  }),

  getters: {
    allFavorites(state): Station[] {
      return [SYSTEM_FAVORITE, ...state.stations]
    },

    isFavorite: (state) => (id: string) => {
      if (id === SYSTEM_FAVORITE.id) return true
      return state.stations.some(s => s.id === id)
    },
  },

  actions: {
    init() {
      if (!process.client) return
      const saved = localStorage.getItem('favorites')
      if (saved) {
        try {
          this.stations = JSON.parse(saved)
        } catch {
          this.stations = []
        }
      }
    },

    toggleFavorite(station: Station) {
      if (station.id === SYSTEM_FAVORITE.id) return

      if (this.isFavorite(station.id)) {
        this.stations = this.stations.filter(s => s.id !== station.id)
      } else {
        this.stations.push(station)
      }

      localStorage.setItem('favorites', JSON.stringify(this.stations))
    },
  },
})