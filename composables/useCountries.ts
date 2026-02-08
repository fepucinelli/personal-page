import type { RawCountry } from '~/types/radio'
import { radioFetch } from '~/composables/api/client'
import { mapCountry } from '~/composables/api/mappers'

export function useCountries() {
  return useAsyncData('countries', async () => {
    const data = await radioFetch<RawCountry[]>('/countries')
    return data
      .filter(c => c.stationcount > 0)
      .map(mapCountry)
      .sort((a, b) => a.name.localeCompare(b.name))
  })
}
