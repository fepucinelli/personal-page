import type { Station, Country, Genre, RawStation, RawCountry, RawGenre } from '~/types/radio'

export function mapStation(s: RawStation): Station {
  return {
    id: s.stationuuid,
    name: s.name,
    streamUrl: s.url_resolved,
    favicon: s.favicon || null,
    country: s.country,
    countryCode: s.countrycode,
    tags: s.tags ? s.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    bitrate: s.bitrate,
    codec: s.codec,
    popularity: s.clickcount,
    isPlayable: true,
    homepage: s.homepage || null,
    language: s.language || null,
    votes: s.votes ?? 0,
    clickTrend: s.clicktrend ?? 0,
    isHls: s.hls === 1,
    lastCheckOk: s.lastcheckok === 1,
    geoLat: s.geo_lat ?? null,
    geoLong: s.geo_long ?? null,
    state: s.state || null,
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
