export default defineEventHandler(async () => {
  const data = await $fetch<any[]>(
    'https://de1.api.radio-browser.info/json/tags'
  )

  return {
    genres: data
      .filter(t => t.stationcount > 20)
      .map(t => ({
        slug: t.name,
        count: t.stationcount,
      }))
      .sort((a, b) => b.count - a.count),
  }
})