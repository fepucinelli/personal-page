import type { Station } from '~/types/radio'
import { usePlayerStore } from '~/stores/player'
import { useFavoritesStore } from '~/stores/favorites'

export function useStationActions() {
  const player = usePlayerStore()
  const favorites = useFavoritesStore()

  function playStation(station: Station) {
    player.play(station)
  }

  function toggleFavorite(station: Station) {
    favorites.toggleFavorite(station)
  }

  function isPlaying(station: Station) {
    return player.currentStation?.id === station.id && player.isPlaying
  }

  function isFavorite(station: Station) {
    return favorites.isFavorite(station.id)
  }

  return {
    playStation,
    toggleFavorite,
    isPlaying,
    isFavorite,
  }
}
