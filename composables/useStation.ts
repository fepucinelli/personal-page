import type { Station, RawStation } from '~/types/radio'
import { radioFetch } from '~/composables/api/client'
import { mapStation } from '~/composables/api/mappers'

export function useStation(id: string) {
  return useAsyncData(`station-${id}`, async () => {
    const data = await radioFetch<RawStation[]>('/stations/byuuid', { uuids: id })
    if (!data.length) return null
    return mapStation(data[0])
  })
}

export function useRelatedStations(station: Ref<Station | null>) {
  return useAsyncData(
    () => `related-${station.value?.id ?? 'none'}`,
    async () => {
      if (!station.value || !station.value.tags.length) return []

      const tag = station.value.tags[0]
      const country = station.value.countryCode
      const baseParams: Record<string, string> = {
        hidebroken: 'true',
        bitrateMin: '1',
        order: 'clickcount',
        reverse: 'true',
        limit: '12',
      }

      // First: same tag + same country
      const primary = await radioFetch<RawStation[]>('/stations/search', {
        ...baseParams,
        tag,
        countrycode: country,
      })

      const selfId = station.value.id
      let results = primary
        .filter(s => s.url_resolved && s.stationuuid !== selfId)
        .map(mapStation)

      // Fallback: same tag, any country
      if (results.length < 6) {
        const fallback = await radioFetch<RawStation[]>('/stations/search', {
          ...baseParams,
          tag,
        })

        const existingIds = new Set(results.map(s => s.id))
        const extra = fallback
          .filter(s => s.url_resolved && s.stationuuid !== selfId && !existingIds.has(s.stationuuid))
          .map(mapStation)

        results = [...results, ...extra]
      }

      return results.slice(0, 6)
    },
    { watch: [station] },
  )
}
