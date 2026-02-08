import { defineStore } from 'pinia'
import type { Station } from '~/types/radio'

export const usePlayerStore = defineStore('player', () => {
  const currentStation = ref<Station | null>(null)
  const isPlaying = ref(false)
  const isLoading = ref(false)
  const volume = ref(import.meta.client ? Number(localStorage.getItem('player-volume') ?? 1) : 1)
  const error = ref<string | null>(null)

  let audio: HTMLAudioElement | null = null
  let _onError: (() => void) | null = null

  function onError(cb: () => void) {
    _onError = cb
  }

  function ensureAudio() {
    if (audio) return

    audio = new Audio()
    audio.crossOrigin = 'anonymous'
    audio.preload = 'none'
    audio.volume = volume.value

    audio.addEventListener('playing', () => {
      isPlaying.value = true
      isLoading.value = false
    })

    audio.addEventListener('pause', () => {
      isPlaying.value = false
    })

    audio.addEventListener('waiting', () => {
      isLoading.value = true
    })

    audio.addEventListener('canplay', () => {
      isLoading.value = false
    })

    audio.addEventListener('error', () => {
      error.value = 'Station unavailable'
      isLoading.value = false
      isPlaying.value = false
      _onError?.()
    })
  }

  async function play(station: Station) {
    ensureAudio()

    if (currentStation.value?.id === station.id) {
      toggle()
      return
    }

    currentStation.value = station
    isLoading.value = true
    error.value = null

    audio!.src = station.streamUrl

    try {
      await audio!.play()
    } catch {
      error.value = 'Unable to play station'
      isLoading.value = false
      _onError?.()
    }
  }

  function toggle() {
    if (!audio) return
    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
    }
  }

  function pause() {
    if (!audio) return
    audio.pause()
  }

  function setVolume(value: number) {
    volume.value = value
    if (audio) audio.volume = value
    localStorage.setItem('player-volume', String(value))
  }

  return {
    currentStation,
    isPlaying,
    isLoading,
    volume,
    error,
    play,
    toggle,
    pause,
    setVolume,
    onError,
  }
})
