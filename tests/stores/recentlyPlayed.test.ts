import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useRecentlyPlayedStore } from '~/stores/recentlyPlayed'
import type { Station } from '~/types/radio'

const makeStation = (id: string): Station => ({
  id,
  name: `Station ${id}`,
  streamUrl: `https://stream.example.com/${id}`,
  favicon: null,
  country: 'Brazil',
  countryCode: 'BR',
  tags: [],
  bitrate: 128,
  codec: 'MP3',
  popularity: 0,
  isPlayable: true,
})

describe('recentlyPlayed store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('starts empty', () => {
    const store = useRecentlyPlayedStore()
    expect(store.stations).toEqual([])
  })

  it('prepends a new station', () => {
    const store = useRecentlyPlayedStore()
    store.addStation(makeStation('a'))
    store.addStation(makeStation('b'))

    expect(store.stations[0].id).toBe('b')
    expect(store.stations[1].id).toBe('a')
  })

  it('deduplicates by moving existing station to front', () => {
    const store = useRecentlyPlayedStore()
    store.addStation(makeStation('a'))
    store.addStation(makeStation('b'))
    store.addStation(makeStation('a'))

    expect(store.stations).toHaveLength(2)
    expect(store.stations[0].id).toBe('a')
    expect(store.stations[1].id).toBe('b')
  })

  it('caps at 10 stations', () => {
    const store = useRecentlyPlayedStore()
    for (let i = 0; i < 12; i++) {
      store.addStation(makeStation(String(i)))
    }

    expect(store.stations).toHaveLength(10)
    expect(store.stations[0].id).toBe('11') // most recent
  })

  it('persists to localStorage', () => {
    const store = useRecentlyPlayedStore()
    store.addStation(makeStation('a'))

    const saved = JSON.parse(localStorage.getItem('recently-played')!)
    expect(saved).toHaveLength(1)
    expect(saved[0].id).toBe('a')
  })
})
