import { radioFetch } from '~/composables/api/client'

interface RadioStats {
  stations: number
  countries: number
}

export function useRadioStats() {
  return useAsyncData('radio-stats', async () => {
    const data = await radioFetch<RadioStats>('/stats')
    return {
      stations: data.stations,
      countries: data.countries,
    }
  })
}
