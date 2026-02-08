import { defineStore } from 'pinia'
import type { Station } from '~/types/radio'

const SYSTEM_FAVORITES: Station[] = [
  {
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
  },
  {
    id: 'system-disco-funk',
    name: '70s 80s Disco Funk ModernSoul Boogie',
    streamUrl: 'https://discofunk.streamingmedia.it/usa',
    country: 'Italy',
    countryCode: 'IT',
    tags: ['disco', 'funk', 'soul', 'boogie'],
    bitrate: 128,
    codec: 'MP3',
    popularity: 0,
    isPlayable: true,
    favicon: '',
  },
]

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

  const allFavorites = computed<Station[]>(() => [...SYSTEM_FAVORITES, ...stations.value])

  const isSystemFavorite = (id: string) => SYSTEM_FAVORITES.some(s => s.id === id)

  const isFavorite = (id: string) => {
    if (isSystemFavorite(id)) return true
    return stations.value.some(s => s.id === id)
  }

  function toggleFavorite(station: Station) {
    if (isSystemFavorite(station.id)) return

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
