import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StationCard from '~/components/station/StationCard.vue'
import type { Station } from '~/types/radio'

const station: Station = {
  id: 'test-1',
  name: 'Jazz FM',
  streamUrl: 'https://stream.jazzfm.com/live',
  favicon: 'https://jazzfm.com/icon.png',
  country: 'United Kingdom',
  countryCode: 'GB',
  tags: ['jazz', 'blues'],
  bitrate: 128,
  codec: 'MP3',
  popularity: 4200,
  isPlayable: true,
}

const defaultProps = {
  station,
  isPlaying: false,
  isFavorite: false,
}

describe('StationCard', () => {
  it('renders station name', () => {
    const wrapper = mount(StationCard, { props: defaultProps })
    expect(wrapper.text()).toContain('Jazz FM')
  })

  it('renders station country', () => {
    const wrapper = mount(StationCard, { props: defaultProps })
    expect(wrapper.text()).toContain('United Kingdom')
  })

  it('shows "Play" when not playing', () => {
    const wrapper = mount(StationCard, { props: defaultProps })
    expect(wrapper.text()).toContain('Play')
    expect(wrapper.text()).not.toContain('Playing')
  })

  it('shows "Playing" when isPlaying is true', () => {
    const wrapper = mount(StationCard, { props: { ...defaultProps, isPlaying: true } })
    expect(wrapper.text()).toContain('Playing')
  })

  it('shows playing indicator animation when playing', () => {
    const wrapper = mount(StationCard, { props: { ...defaultProps, isPlaying: true } })
    expect(wrapper.findAll('.animate-bounce').length).toBe(3)
  })

  it('hides playing indicator when not playing', () => {
    const wrapper = mount(StationCard, { props: defaultProps })
    expect(wrapper.findAll('.animate-bounce').length).toBe(0)
  })

  it('emits play event with station on play button click', async () => {
    const wrapper = mount(StationCard, { props: defaultProps })
    await wrapper.findAll('button')[0].trigger('click')

    expect(wrapper.emitted('play')).toHaveLength(1)
    expect(wrapper.emitted('play')![0]).toEqual([station])
  })

  it('emits toggleFavorite event on favorite button click', async () => {
    const wrapper = mount(StationCard, { props: defaultProps })
    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click')

    expect(wrapper.emitted('toggleFavorite')).toHaveLength(1)
    expect(wrapper.emitted('toggleFavorite')![0]).toEqual([station])
  })

  it('shows "Remove from favorites" aria-label when favorited', () => {
    const wrapper = mount(StationCard, { props: { ...defaultProps, isFavorite: true } })
    const favBtn = wrapper.findAll('button')[1]
    expect(favBtn.attributes('aria-label')).toBe('Remove from favorites')
  })

  it('shows "Add to favorites" aria-label when not favorited', () => {
    const wrapper = mount(StationCard, { props: defaultProps })
    const favBtn = wrapper.findAll('button')[1]
    expect(favBtn.attributes('aria-label')).toBe('Add to favorites')
  })

  it('hides favorite button when hideFavorite is true', () => {
    const wrapper = mount(StationCard, { props: { ...defaultProps, hideFavorite: true } })
    expect(wrapper.findAll('button')).toHaveLength(1) // only play button
  })
})
