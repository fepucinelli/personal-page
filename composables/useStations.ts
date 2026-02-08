import type { Station, RawStation } from '~/types/radio'
import { radioFetch } from '~/composables/api/client'
import { mapStation } from '~/composables/api/mappers'

function buildSearchParams(opts: { country?: string; genre?: string; offset: number; limit: number }): Record<string, string> {
  const params: Record<string, string> = {
    limit: String(opts.limit),
    offset: String(opts.offset),
    hidebroken: 'true',
    bitrateMin: '1',
    order: 'clickcount',
    reverse: 'true',
  }
  if (opts.country) params.countrycode = opts.country
  if (opts.genre) params.tag = opts.genre
  return params
}

function processStations(data: RawStation[]): Station[] {
  return data
    .filter(s => s.url_resolved)
    .map(mapStation)
}

export function useStations(params?: { country?: string; genre?: string; offset?: number; limit?: number }) {
  const limit = params?.limit ?? 50
  const offset = params?.offset ?? 0
  const key = `stations-${params?.country || ''}-${params?.genre || ''}-${offset}-${limit}`

  return useAsyncData(key, async () => {
    const searchParams = buildSearchParams({ ...params, limit, offset })
    const data = await radioFetch<RawStation[]>('/stations/search', searchParams)
    return processStations(data)
  })
}

export async function fetchStations(params: { country?: string; genre?: string; offset: number; limit: number }): Promise<Station[]> {
  const searchParams = buildSearchParams(params)
  const data = await radioFetch<RawStation[]>('/stations/search', searchParams)
  return processStations(data)
}
