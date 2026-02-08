import type { Station } from '~/types/station'

const BASE = 'https://de1.api.radio-browser.info/json'

export function useCountries() {
  return useAsyncData('countries', async () => {
    const data = await $fetch<any[]>(`${BASE}/countries`)
    return data
      .filter(c => c.stationcount > 0)
      .map(c => ({ code: c.iso_3166_1, name: c.name, count: c.stationcount }))
      .sort((a, b) => a.name.localeCompare(b.name))
  })
}

export function useStations(params?: { country?: string; genre?: string; offset?: number; limit?: number }) {
  const limit = params?.limit ?? 50
  const offset = params?.offset ?? 0
  const key = `stations-${params?.country || ''}-${params?.genre || ''}-${offset}-${limit}`
  return useAsyncData(key, async () => {
    const url = new URL(`${BASE}/stations/search`)
    if (params?.country) url.searchParams.set('countrycode', params.country)
    if (params?.genre) url.searchParams.set('tag', params.genre)
    url.searchParams.set('limit', String(limit))
    url.searchParams.set('offset', String(offset))
    const data = await $fetch<any[]>(url.toString())
    return data
      .filter(s => s.url_resolved && s.bitrate > 0)
      .map<Station>(s => ({
        id: s.stationuuid,
        name: s.name,
        streamUrl: s.url_resolved,
        favicon: s.favicon || null,
        country: s.country,
        countryCode: s.countrycode,
        tags: s.tags ? s.tags.split(',') : [],
        bitrate: s.bitrate,
        codec: s.codec,
        popularity: s.clickcount,
        isPlayable: true,
      }))
      .sort((a, b) => b.popularity - a.popularity)
  })
}

export async function fetchStations(params: { country?: string; genre?: string; offset: number; limit: number }): Promise<Station[]> {
  const url = new URL(`${BASE}/stations/search`)
  if (params.country) url.searchParams.set('countrycode', params.country)
  if (params.genre) url.searchParams.set('tag', params.genre)
  url.searchParams.set('limit', String(params.limit))
  url.searchParams.set('offset', String(params.offset))
  const data = await $fetch<any[]>(url.toString())
  return data
    .filter(s => s.url_resolved && s.bitrate > 0)
    .map<Station>(s => ({
      id: s.stationuuid,
      name: s.name,
      streamUrl: s.url_resolved,
      favicon: s.favicon || null,
      country: s.country,
      countryCode: s.countrycode,
      tags: s.tags ? s.tags.split(',') : [],
      bitrate: s.bitrate,
      codec: s.codec,
      popularity: s.clickcount,
      isPlayable: true,
    }))
    .sort((a, b) => b.popularity - a.popularity)
}

export function useGenres() {
  return useAsyncData('genres', async () => {
    const data = await $fetch<any[]>(`${BASE}/tags`)
    return data
      .filter(t => t.stationcount > 20)
      .map(t => ({ slug: t.name, count: t.stationcount }))
      .sort((a, b) => b.count - a.count)
  })
}
