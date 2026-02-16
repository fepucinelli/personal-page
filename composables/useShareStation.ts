export function useShareStation() {
  const toast = useToast()

  async function share(stationId: string, stationName: string) {
    const url = `https://pucinelli.me/station/${stationId}`

    if (navigator.share) {
      try {
        await navigator.share({ title: stationName, url })
      } catch (e) {
        if (e instanceof Error && e.name === 'AbortError') return
      }
    } else {
      await navigator.clipboard.writeText(url)
      toast.show('Link copied to clipboard')
    }
  }

  return { share }
}
