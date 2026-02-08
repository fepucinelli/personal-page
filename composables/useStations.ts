import type { Station, RawStation } from '~/types/radio'
import { radioFetch } from '~/composables/api/client'
import { mapStation } from '~/composables/api/mappers'

function processStations(data: RawStation[]): Station[] {
  return data
    .filter(s => s.url_resolved && s.bitrate > 0)
    .map(mapStation)
    .sort((a, b) => b.popularity - a.popularity)
}

export function useStations(params?: { country?: string; genre?: string; offset?: number; limit?: number }) {
  const limit = params?.limit ?? 50
  const offset = params?.offset ?? 0
  const key = `stations-${params?.country || ''}-${params?.genre || ''}-${offset}-${limit}`

  return useAsyncData(key, async () => {
    const searchParams: Record<string, string> = {
      limit: String(limit),
      offset: String(offset),
    }
    if (params?.country) searchParams.countrycode = params.country
    if (params?.genre) searchParams.tag = params.genre

    const data = await radioFetch<RawStation[]>('/stations/search', searchParams)
    return processStations(data)
  })
}

export async function fetchStations(params: { country?: string; genre?: string; offset: number; limit: number }): Promise<Station[]> {
  const searchParams: Record<string, string> = {
    limit: String(params.limit),
    offset: String(params.offset),
  }
  if (params.country) searchParams.countrycode = params.country
  if (params.genre) searchParams.tag = params.genre

  const data = await radioFetch<RawStation[]>('/stations/search', searchParams)
  return processStations(data)
}
