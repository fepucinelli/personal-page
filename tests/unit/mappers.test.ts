import { describe, it, expect } from 'vitest'
import { mapStation, mapCountry, mapGenre } from '~/composables/api/mappers'
import type { RawStation, RawCountry, RawGenre } from '~/types/radio'

const rawStation: RawStation = {
  stationuuid: 'abc-123',
  name: 'Jazz FM',
  url_resolved: 'https://stream.jazzfm.com/live',
  favicon: 'https://jazzfm.com/icon.png',
  country: 'United Kingdom',
  countrycode: 'GB',
  tags: 'jazz,blues,soul',
  bitrate: 128,
  codec: 'MP3',
  clickcount: 4200,
}

describe('mapStation', () => {
  it('maps all fields from raw API response', () => {
    const station = mapStation(rawStation)

    expect(station).toEqual({
      id: 'abc-123',
      name: 'Jazz FM',
      streamUrl: 'https://stream.jazzfm.com/live',
      favicon: 'https://jazzfm.com/icon.png',
      country: 'United Kingdom',
      countryCode: 'GB',
      tags: ['jazz', 'blues', 'soul'],
      bitrate: 128,
      codec: 'MP3',
      popularity: 4200,
      isPlayable: true,
    })
  })

  it('parses comma-separated tags into array', () => {
    const station = mapStation(rawStation)
    expect(station.tags).toEqual(['jazz', 'blues', 'soul'])
  })

  it('returns empty tags array when tags string is empty', () => {
    const station = mapStation({ ...rawStation, tags: '' })
    expect(station.tags).toEqual([])
  })

  it('returns null favicon when raw favicon is empty', () => {
    const station = mapStation({ ...rawStation, favicon: '' })
    expect(station.favicon).toBeNull()
  })

  it('always sets isPlayable to true', () => {
    const station = mapStation(rawStation)
    expect(station.isPlayable).toBe(true)
  })
})

describe('mapCountry', () => {
  const raw: RawCountry = { iso_3166_1: 'BR', name: 'Brazil', stationcount: 500 }

  it('maps code, name, and count', () => {
    expect(mapCountry(raw)).toEqual({ code: 'BR', name: 'Brazil', count: 500 })
  })
})

describe('mapGenre', () => {
  const raw: RawGenre = { name: 'electronic', stationcount: 1200 }

  it('maps slug from name and count from stationcount', () => {
    expect(mapGenre(raw)).toEqual({ slug: 'electronic', count: 1200 })
  })
})
