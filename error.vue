<template>
  <div
    class="grain min-h-screen font-body flex items-center justify-center
           bg-surface-light text-ink
           dark:bg-night dark:text-neutral-100
           transition-colors duration-500"
  >
    <div class="text-center px-6">
      <h1 class="font-display italic">
        <span class="block text-6xl text-brand-dark dark:text-brand">{{ error?.statusCode || 500 }}</span>
        <span class="block mt-4 text-2xl text-ink dark:text-neutral-50">{{ error?.message || 'Something went wrong' }}</span>
      </h1>
      <p class="mt-2 text-sm text-ink-muted dark:text-neutral-400">
        The page you're looking for doesn't exist or an error occurred.
      </p>
      <button
        @click="handleError"
        class="mt-8 px-6 py-2.5 rounded-full text-sm font-medium
               bg-brand text-white
               hover:bg-brand-dark
               shadow-lg shadow-brand/20 hover:shadow-brand/30
               transition-all duration-300"
      >
        Go home
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number
    message: string
  }
}>()

const handleError = () => clearError({ redirect: '/' })

useHead({
  title: `${props.error?.statusCode || 'Error'} — Something went wrong`,
})
</script>
