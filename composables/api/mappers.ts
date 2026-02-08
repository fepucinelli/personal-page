import type { Station, Country, Genre, RawStation, RawCountry, RawGenre } from '~/types/radio'

export function mapStation(s: RawStation): Station {
  return {
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
  }
}

export function mapCountry(c: RawCountry): Country {
  return {
    code: c.iso_3166_1,
    name: c.name,
    count: c.stationcount,
  }
}

export function mapGenre(t: RawGenre): Genre {
  return {
    slug: t.name,
    count: t.stationcount,
  }
}
