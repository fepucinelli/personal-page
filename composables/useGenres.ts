import type { RawGenre } from '~/types/radio'
import { radioFetch } from '~/composables/api/client'
import { mapGenre } from '~/composables/api/mappers'

export function useGenres() {
  return useAsyncData('genres', async () => {
    const data = await radioFetch<RawGenre[]>('/tags')
    return data
      .filter(t => t.stationcount > 20)
      .map(mapGenre)
      .sort((a, b) => b.count - a.count)
  })
}
