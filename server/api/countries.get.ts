export default defineEventHandler(async () => {
  const data = await $fetch<any[]>(
    'https://de1.api.radio-browser.info/json/countries'
  )

  return {
    countries: data
      .filter(c => c.stationcount > 0)
      .map(c => ({
        code: c.iso_3166_1,
        name: c.name,
        count: c.stationcount,
      }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  }
})