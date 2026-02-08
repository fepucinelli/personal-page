<template>
  <Transition name="toast">
    <div
      v-if="toast.visible.value"
      class="fixed bottom-20 left-0 right-0 z-[55] flex justify-center pointer-events-none"
    >
      <div
        class="inline-flex items-center gap-2 px-5 py-2.5
               rounded-full backdrop-blur-xl
               bg-surface-light/90 dark:bg-night/90
               border border-brand/20
               shadow-lg shadow-brand/10
               text-sm text-ink dark:text-neutral-200"
      >
        <i class="pi pi-volume-up text-brand text-xs"></i>
        <span>{{ toast.message.value }}</span>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const toast = useToast()
</script>
