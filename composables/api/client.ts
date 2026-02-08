const BASE = 'https://de1.api.radio-browser.info/json'

export function radioFetch<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${BASE}${path}`)
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value)
    }
  }
  return $fetch<T>(url.toString())
}
