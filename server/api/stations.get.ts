import type { Station } from '~/types/station'

export default defineCachedEventHandler(async (event) => {
  const query = getQuery(event)

  const url = new URL('https://de1.api.radio-browser.info/json/stations/search')

  if (query.country) url.searchParams.set('countrycode', String(query.country))
  if (query.genre) url.searchParams.set('tag', String(query.genre))

  url.searchParams.set('limit', '50')

  const data = await $fetch<any[]>(url.toString())

  const stations: Station[] = data
    .filter(s => s.url_resolved && s.bitrate > 0)
    .map(s => ({
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
    }))
    .sort((a, b) => b.popularity - a.popularity)

  return { stations }
}, { maxAge: 60 * 10 })