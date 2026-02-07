import { defineStore } from 'pinia'
import { Station } from '~/types/station'

let audio: HTMLAudioElement | null = null

export const usePlayerStore = defineStore('player', {
  state: () => ({
    currentStation: null as Station | null,
    isPlaying: false,
    isLoading: false,
    volume: 1,
    error: null as string | null,
  }),

  getters: {
    audioElement(): HTMLAudioElement | null {
      return audio
    }
  },

  actions: {
    init() {
      if (audio) return

      audio = new Audio()
      audio.crossOrigin = 'anonymous'
      audio.preload = 'none'
      audio.volume = this.volume

      audio.addEventListener('playing', () => {
        this.isPlaying = true
        this.isLoading = false
      })

      audio.addEventListener('pause', () => {
        this.isPlaying = false
      })

      audio.addEventListener('waiting', () => {
        this.isLoading = true
      })

      audio.addEventListener('canplay', () => {
        this.isLoading = false
      })

      audio.addEventListener('error', () => {
        this.error = 'Station unavailable'
        this.isLoading = false
        this.isPlaying = false
      })
    },

    async play(station: Station) {
      this.init()

      if (this.currentStation?.id === station.id) {
        this.toggle()
        return
      }

      this.currentStation = station
      this.isLoading = true
      this.error = null

      audio!.src = station.streamUrl

      try {
        await audio!.play()
      } catch {
        this.error = 'Unable to play station'
        this.isLoading = false
      }
    },

    toggle() {
      if (!audio) return

      if (audio.paused) {
        audio.play()
      } else {
        audio.pause()
      }
    },

    pause() {
      if (!audio) return
      audio.pause()
    },

    setVolume(value: number) {
      this.volume = value
      if (audio) audio.volume = value
    },
  },
})