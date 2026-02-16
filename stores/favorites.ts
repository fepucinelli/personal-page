import { defineStore, skipHydrate } from 'pinia'
import type { Station } from '~/types/radio'

const SYSTEM_FAVORITE_IDS = new Set([
  '962a748b-0601-11e8-ae97-52543be04c81', // 1.FM - Deep House Radio
  'bafbd6cc-65e0-4af7-907b-dd1c425e8917', // 70s 80s Disco Funk ModernSoul Boogie
])

const SYSTEM_FAVORITES: Station[] = [
  {
    id: '962a748b-0601-11e8-ae97-52543be04c81',
    name: '1.FM - Deep House Radio',
    streamUrl: 'http://strm112.1.fm/deephouse_mobile_mp3',
    country: 'Switzerland',
    countryCode: 'CH',
    tags: ['deep house', 'techno'],
    bitrate: 192,
    codec: 'MP3',
    popularity: 60,
    isPlayable: true,
    favicon: '',
  },
  {
    id: 'bafbd6cc-65e0-4af7-907b-dd1c425e8917',
    name: '70s 80s Disco Funk ModernSoul Boogie',
    streamUrl: 'https://discofunk.streamingmedia.it/usa',
    country: 'The United States Of America',
    countryCode: 'US',
    tags: ['disco', 'funk', 'boogie', '70s', '80s'],
    bitrate: 192,
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

  const isSystemFavorite = (id: string) => SYSTEM_FAVORITE_IDS.has(id)

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
    stations: skipHydrate(stations),
    allFavorites,
    isSystemFavorite,
    isFavorite,
    toggleFavorite,
  }
})
