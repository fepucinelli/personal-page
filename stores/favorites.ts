import { defineStore } from 'pinia'
import type { Station } from '~/types/radio'

const SYSTEM_FAVORITE: Station = {
  id: 'system-radio-8150',
  name: 'Deep Electronic Vibes',
  streamUrl: 'https://az1.sednastream.com/radio/8150/Live',
  country: 'Albany',
  countryCode: 'US',
  tags: ['electronic', 'deep house'],
  bitrate: 128,
  codec: 'MP3',
  popularity: 0,
  isPlayable: true,
  favicon: '',
}

function loadFavorites(): Station[] {
  if (!import.meta.client) return []
  const saved = localStorage.getItem('favorites')
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      return []
    }
  }
  return []
}

export const useFavoritesStore = defineStore('favorites', () => {
  const stations = ref<Station[]>(loadFavorites())

  const allFavorites = computed<Station[]>(() => [SYSTEM_FAVORITE, ...stations.value])

  const isFavorite = (id: string) => {
    if (id === SYSTEM_FAVORITE.id) return true
    return stations.value.some(s => s.id === id)
  }

  function toggleFavorite(station: Station) {
    if (station.id === SYSTEM_FAVORITE.id) return

    if (isFavorite(station.id)) {
      stations.value = stations.value.filter(s => s.id !== station.id)
    } else {
      stations.value.push(station)
    }

    localStorage.setItem('favorites', JSON.stringify(stations.value))
  }

  return {
    stations,
    allFavorites,
    isFavorite,
    toggleFavorite,
  }
})
