const toastMessage = ref('')
const toastVisible = ref(false)

let timeout: ReturnType<typeof setTimeout> | null = null

export function useToast() {
  function show(message: string, duration = 3000) {
    if (timeout) clearTimeout(timeout)

    toastMessage.value = message
    toastVisible.value = true

    timeout = setTimeout(() => {
      toastVisible.value = false
    }, duration)
  }

  return { message: readonly(toastMessage), visible: readonly(toastVisible), show }
}
