<template>
  <canvas ref="canvasRef" class="fixed inset-0 -z-10 w-full h-full pointer-events-none" />
</template>

<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null)

const CHARS = '0123456789ABCDEF>_[]=+-|/\\!?#@${}:<>'
const FONT_SIZE = 13
const MOUSE_RADIUS = 200

// Dark mode: bright terminal green at low opacity
// Light mode: dark green at higher opacity so it's visible on white
const RGB_DARK = '0,255,65'
const RGB_LIGHT = '0,100,40'

interface Column {
  baseX: number
  x: number
  vx: number
  y: number
  speed: number
  length: number
  chars: string[]
  opacity: number
  isVolt: boolean
}

let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let rafId: number
let columns: Column[] = []
let resizeTimer: ReturnType<typeof setTimeout>
let mouseX: number | null = null
let mouseY: number | null = null

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

function createColumns() {
  columns = []
  const colWidth = FONT_SIZE * 1.6
  const numCols = Math.floor(canvas.width / colWidth)

  for (let i = 0; i < numCols; i++) {
    if (Math.random() > 0.38) continue

    const len = Math.floor(Math.random() * 10 + 5)
    const baseX = i * colWidth + colWidth / 2
    columns.push({
      baseX,
      x: baseX,
      vx: 0,
      y: -Math.random() * canvas.height,
      speed: Math.random() * 0.45 + 0.18,
      length: len,
      chars: Array.from({ length: len }, randomChar),
      opacity: Math.random() * 0.04 + 0.018,
      isVolt: Math.random() < 0.12,
    })
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  createColumns()
}

function scheduleResize() {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(resizeCanvas, 150)
}

function animate() {
  const isDark = document.documentElement.classList.contains('dark')
  const primaryRgb = isDark ? RGB_DARK : RGB_LIGHT
  const opacityScale = isDark ? 1 : 7

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.font = `${FONT_SIZE}px ui-monospace, 'Cascadia Code', Menlo, Consolas, monospace`
  ctx.textAlign = 'center'

  for (const col of columns) {
    // Mouse attraction toward cursor
    if (mouseX !== null && mouseY !== null) {
      const colMidY = col.y + (col.length * FONT_SIZE) / 2
      const dx = mouseX - col.x
      const dy = mouseY - colMidY
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < MOUSE_RADIUS && dist > 0) {
        const strength = (1 - dist / MOUSE_RADIUS) * 0.2
        col.vx += (dx / dist) * strength
      }
    }

    // Spring back to original column position
    col.vx += (col.baseX - col.x) * 0.01

    // Damping
    col.vx *= 0.90

    col.x += col.vx

    // Occasionally mutate a random character for glitch flicker
    if (Math.random() < 0.025) {
      col.chars[Math.floor(Math.random() * col.chars.length)] = randomChar()
    }

    const rgb = primaryRgb

    for (let i = 0; i < col.chars.length; i++) {
      const cy = col.y + i * FONT_SIZE
      if (cy < -FONT_SIZE || cy > canvas.height + FONT_SIZE) continue

      // Head character is brightest, trail fades toward top
      const isHead = i === col.chars.length - 1
      const progress = i / col.chars.length
      const alpha = isHead
        ? Math.min(col.opacity * 3.5 * opacityScale, isDark ? 0.18 : 0.55)
        : col.opacity * (0.25 + progress * 0.75) * opacityScale

      ctx.fillStyle = `rgba(${rgb},${alpha})`
      ctx.fillText(col.chars[i], col.x, cy)
    }

    col.y += col.speed

    // Reset when fully off-screen
    if (col.y - col.length * FONT_SIZE > canvas.height) {
      col.y = -col.length * FONT_SIZE - Math.random() * canvas.height * 0.4
      col.speed = Math.random() * 0.45 + 0.18
      col.opacity = Math.random() * 0.04 + 0.018
      col.isVolt = Math.random() < 0.12
      col.length = Math.floor(Math.random() * 10 + 5)
      col.chars = Array.from({ length: col.length }, randomChar)
    }
  }

  rafId = requestAnimationFrame(animate)
}

function onMouseMove(e: MouseEvent) {
  mouseX = e.clientX
  mouseY = e.clientY
}

function onMouseLeave() {
  mouseX = null
  mouseY = null
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  canvas = canvasRef.value!
  ctx = canvas.getContext('2d')!
  resizeCanvas()
  animate()

  window.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseleave', onMouseLeave)
  window.addEventListener('resize', scheduleResize)
})

onUnmounted(() => {
  if (!canvas) return
  cancelAnimationFrame(rafId)
  clearTimeout(resizeTimer)
  window.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseleave', onMouseLeave)
  window.removeEventListener('resize', scheduleResize)
})
</script>
