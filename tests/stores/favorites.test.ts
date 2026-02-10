import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFavoritesStore } from '~/stores/favorites'
import type { Station } from '~/types/radio'

const makeStation = (id: string, name = 'Test Station'): Station => ({
  id,
  name,
  streamUrl: `https://stream.example.com/${id}`,
  favicon: null,
  country: 'Brazil',
  countryCode: 'BR',
  tags: ['test'],
  bitrate: 128,
  codec: 'MP3',
  popularity: 100,
  isPlayable: true,
})

describe('favorites store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('starts with no user favorites', () => {
    const store = useFavoritesStore()
    expect(store.stations).toEqual([])
  })

  it('allFavorites includes system favorites', () => {
    const store = useFavoritesStore()
    expect(store.allFavorites.length).toBeGreaterThanOrEqual(3)
    expect(store.allFavorites.some(s => s.name === 'Deep Electronic Vibes')).toBe(true)
    expect(store.allFavorites.some(s => s.name === 'Bossa Jazz Brasil')).toBe(true)
  })

  it('toggleFavorite adds a station', () => {
    const store = useFavoritesStore()
    const station = makeStation('user-1')

    store.toggleFavorite(station)

    expect(store.stations).toHaveLength(1)
    expect(store.isFavorite('user-1')).toBe(true)
  })

  it('toggleFavorite removes a previously added station', () => {
    const store = useFavoritesStore()
    const station = makeStation('user-1')

    store.toggleFavorite(station)
    store.toggleFavorite(station)

    expect(store.stations).toHaveLength(0)
    expect(store.isFavorite('user-1')).toBe(false)
  })

  it('prevents removing system favorites', () => {
    const store = useFavoritesStore()
    const systemStation = store.allFavorites[0]

    store.toggleFavorite(systemStation)

    expect(store.isFavorite(systemStation.id)).toBe(true)
  })

  it('isSystemFavorite returns true for system stations', () => {
    const store = useFavoritesStore()
    expect(store.isSystemFavorite('system-radio-8150')).toBe(true)
    expect(store.isSystemFavorite('user-1')).toBe(false)
  })

  it('persists user favorites to localStorage', () => {
    const store = useFavoritesStore()
    const station = makeStation('user-1')

    store.toggleFavorite(station)

    const saved = JSON.parse(localStorage.getItem('favorites')!)
    expect(saved).toHaveLength(1)
    expect(saved[0].id).toBe('user-1')
  })

  it('allFavorites merges system and user favorites', () => {
    const store = useFavoritesStore()
    store.toggleFavorite(makeStation('user-1'))

    expect(store.allFavorites.length).toBe(4) // 3 system + 1 user
    expect(store.allFavorites[store.allFavorites.length - 1].id).toBe('user-1')
  })
})
