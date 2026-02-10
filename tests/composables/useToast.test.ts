import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useToast } from '~/composables/useToast'

describe('useToast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // Reset toast state by showing empty and clearing
    const { show } = useToast()
    show('', 0)
    vi.runAllTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('show() sets message and visible', () => {
    const { message, visible, show } = useToast()

    show('Now playing: Jazz FM')

    expect(message.value).toBe('Now playing: Jazz FM')
    expect(visible.value).toBe(true)
  })

  it('auto-hides after specified duration', () => {
    const { visible, show } = useToast()

    show('Hello', 2000)
    expect(visible.value).toBe(true)

    vi.advanceTimersByTime(2000)
    expect(visible.value).toBe(false)
  })

  it('uses default 3000ms duration', () => {
    const { visible, show } = useToast()

    show('Hello')
    vi.advanceTimersByTime(2999)
    expect(visible.value).toBe(true)

    vi.advanceTimersByTime(1)
    expect(visible.value).toBe(false)
  })

  it('second show() replaces the first and resets timer', () => {
    const { message, visible, show } = useToast()

    show('First', 1000)
    vi.advanceTimersByTime(500)

    show('Second', 1000)
    expect(message.value).toBe('Second')

    vi.advanceTimersByTime(500)
    // First toast would have hidden by now, but second is still active
    expect(visible.value).toBe(true)

    vi.advanceTimersByTime(500)
    expect(visible.value).toBe(false)
  })
})
