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

export interface Country {
  code: string
  name: string
  count: number
}

export interface Genre {
  slug: string
  count: number
}

export interface RawStation {
  stationuuid: string
  name: string
  url_resolved: string
  favicon: string
  country: string
  countrycode: string
  tags: string
  bitrate: number
  codec: string
  clickcount: number
}

export interface RawCountry {
  iso_3166_1: string
  name: string
  stationcount: number
}

export interface RawGenre {
  name: string
  stationcount: number
}
