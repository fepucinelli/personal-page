interface UseTypewriterOptions {
  name: string
  roles: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseAfterName?: number
  pauseAfterRole?: number
  pauseBeforeType?: number
  initialDelay?: number
}

type Phase =
  | 'idle'
  | 'typing-name'
  | 'pause-after-name'
  | 'typing-role'
  | 'pause-after-role'
  | 'deleting-role'
  | 'pause-before-type'

export function useTypewriter(options: UseTypewriterOptions) {
  const {
    name,
    roles,
    typingSpeed = 100,
    deletingSpeed = 60,
    pauseAfterName = 800,
    pauseAfterRole = 2000,
    pauseBeforeType = 500,
    initialDelay = 650,
  } = options

  const nameText = ref(name)
  const roleText = ref(roles.join(' \u00B7 '))
  const phase = ref<Phase>('idle')
  const isReady = ref(false)

  const cursorOnName = computed(() =>
    ['typing-name', 'pause-after-name'].includes(phase.value),
  )
  const cursorOnRole = computed(() =>
    ['typing-role', 'pause-after-role', 'deleting-role', 'pause-before-type'].includes(phase.value),
  )

  let timer: ReturnType<typeof setTimeout> | null = null
  let charIndex = 0
  let roleIndex = 0

  const schedule = (fn: () => void, delay: number) => {
    timer = setTimeout(fn, delay)
  }

  const typeName = () => {
    if (charIndex <= name.length) {
      nameText.value = name.slice(0, charIndex)
      charIndex++
      phase.value = 'typing-name'
      schedule(typeName, typingSpeed)
    } else {
      phase.value = 'pause-after-name'
      schedule(startRoles, pauseAfterName)
    }
  }

  const startRoles = () => {
    charIndex = 0
    typeRole()
  }

  const typeRole = () => {
    const currentRole = roles[roleIndex]
    if (charIndex <= currentRole.length) {
      roleText.value = currentRole.slice(0, charIndex)
      charIndex++
      phase.value = 'typing-role'
      schedule(typeRole, typingSpeed)
    } else {
      phase.value = 'pause-after-role'
      schedule(deleteRole, pauseAfterRole)
    }
  }

  const deleteRole = () => {
    const currentRole = roles[roleIndex]
    if (charIndex > 0) {
      charIndex--
      roleText.value = currentRole.slice(0, charIndex)
      phase.value = 'deleting-role'
      schedule(deleteRole, deletingSpeed)
    } else {
      roleIndex = (roleIndex + 1) % roles.length
      phase.value = 'pause-before-type'
      schedule(() => {
        charIndex = 0
        typeRole()
      }, pauseBeforeType)
    }
  }

  const cleanup = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  onMounted(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Keep static text, just mark ready
      isReady.value = true
      return
    }

    // Start typewriter: clear text, wait for fade-up to finish
    isReady.value = true
    nameText.value = ''
    roleText.value = ''
    charIndex = 0
    phase.value = 'idle'

    schedule(() => {
      charIndex = 0
      typeName()
    }, initialDelay)
  })

  onUnmounted(cleanup)

  return reactive({
    nameText,
    roleText,
    phase,
    isReady,
    cursorOnName,
    cursorOnRole,
  })
}
