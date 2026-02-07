export interface Station {
  id: string
  name: string
  streamUrl: string
  favicon: string | null
  country: string
  countryCode: string
  tags: string[]
  bitrate: number
  codec: string
  popularity: number
  isPlayable: boolean
}
