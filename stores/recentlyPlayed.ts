import { defineStore, skipHydrate } from 'pinia'
import type { Station } from '~/types/radio'

const MAX_STATIONS = 10

function loadRecentlyPlayed(): Station[] {
  if (!import.meta.client) return []
  const saved = localStorage.getItem('recently-played')
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      return []
    }
  }
  return []
}

export const useRecentlyPlayedStore = defineStore('recentlyPlayed', () => {
  const stations = ref<Station[]>(loadRecentlyPlayed())

  function addStation(station: Station) {
    stations.value = [
      station,
      ...stations.value.filter(s => s.id !== station.id),
    ].slice(0, MAX_STATIONS)

    localStorage.setItem('recently-played', JSON.stringify(stations.value))
  }

  return { stations: skipHydrate(stations), addStation }
})
