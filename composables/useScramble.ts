import type { Ref } from 'vue'

const CHARS = '!<>-_\\/[]{}—=+*^?#░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌'

interface UseScrambleOptions {
  name: string
  roles: string[]
  pauseAfterName?: number
  pauseAfterRole?: number
  initialDelay?: number
}

export function useScramble(options: UseScrambleOptions) {
  const {
    name,
    roles,
    pauseAfterName = 800,
    pauseAfterRole = 2000,
    initialDelay = 650,
  } = options

  const nameText = ref('')
  const roleText = ref('')
  const nameVisible = ref(false)
  const roleVisible = ref(false)

  let intervalId: ReturnType<typeof setInterval> | null = null
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let roleIndex = 0

  const clearTimers = () => {
    if (intervalId) { clearInterval(intervalId); intervalId = null }
    if (timeoutId) { clearTimeout(timeoutId); timeoutId = null }
  }

  const scrambleTo = (target: Ref<string>, newText: string, onDone: () => void) => {
    if (intervalId) { clearInterval(intervalId); intervalId = null }
    const len = Math.max(target.value.length, newText.length)
    let iter = 0

    intervalId = setInterval(() => {
      target.value = newText
        .split('')
        .map((ch, i) => {
          if (i < iter) return newText[i]
          if (ch === ' ') return ' '
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')

      if (iter >= len + 4) {
        clearInterval(intervalId!)
        intervalId = null
        target.value = newText
        onDone()
      }
      iter += 0.6
    }, 38)
  }

  const cycleRole = () => {
    roleVisible.value = true
    scrambleTo(roleText, roles[roleIndex], () => {
      timeoutId = setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length
        cycleRole()
      }, pauseAfterRole)
    })
  }

  onMounted(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      nameText.value = name
      roleText.value = roles[0]
      nameVisible.value = true
      roleVisible.value = true
      return
    }

    timeoutId = setTimeout(() => {
      nameVisible.value = true
      scrambleTo(nameText, name, () => {
        timeoutId = setTimeout(cycleRole, pauseAfterName)
      })
    }, initialDelay)
  })

  onUnmounted(clearTimers)

  return reactive({ nameText, roleText, nameVisible, roleVisible })
}
