import { ref, computed, reactive, readonly, watch, watchEffect, onMounted, onUnmounted, nextTick } from 'vue'

// Simulate Nuxt auto-imports for Vue APIs
Object.assign(globalThis, {
  ref,
  computed,
  reactive,
  readonly,
  watch,
  watchEffect,
  onMounted,
  onUnmounted,
  nextTick,
})

// Simulate import.meta.client for store code that checks it
Object.defineProperty(import.meta, 'client', { value: true })
