<template>
  <div class="flex flex-col items-center justify-center py-16 gap-4">
    <div class="relative w-10 h-10">
      <div
        class="absolute inset-0 rounded-full border-2
               border-ink/5 dark:border-white/5"
      />
      <div
        class="absolute inset-0 rounded-full border-2 border-transparent
               border-t-brand animate-spin-slow"
      />
    </div>
    <span class="text-xs tracking-widest uppercase text-ink-muted dark:text-neutral-500">
      Loading
    </span>
  </div>
</template>
