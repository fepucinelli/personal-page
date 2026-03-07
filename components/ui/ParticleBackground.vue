<template>
  <canvas ref="canvasRef" class="fixed inset-0 -z-10 w-full h-full pointer-events-none" />
</template>

<script setup lang="ts">
import { useThemeStore } from '~/stores/theme'

const theme = useThemeStore()
const canvasRef = ref<HTMLCanvasElement | null>(null)

// --- Theme colors ---
const DARK_PALETTE = ['#00C9B4', '#4DDFCF', '#009E8F', '#C8F53A', '#A0CC1E']
const LIGHT_PALETTE = ['#009E8F', '#00C9B4', '#A0CC1E', '#4A3558', '#007A6E']

// --- Mutable animation state ---
let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let rafId: number
let frameCount = 0
let resizeTimer: ReturnType<typeof setTimeout>
let autoDrift = true
let mouseX: number | null = null
let mouseY: number | null = null
let isDark = theme.theme === 'dark'

const particles: Particle[] = []
const fireworkParticles: Particle[] = []
const ripples: Ripple[] = []

// --- Helpers ---

function getPalette(): string[] {
  return isDark ? DARK_PALETTE : LIGHT_PALETTE
}

function randomColor(): string {
  const p = getPalette()
  return p[Math.floor(Math.random() * p.length)]
}

function hexAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha.toFixed(3)})`
}

function adjustParticleCount(): number {
  const h = canvas.height
  const w = canvas.width
  let n = 80
  const hBreaks: [number, number][] = [[200, 25], [300, 35], [400, 45], [500, 55], [600, 65]]
  const wBreaks: [number, number][] = [[450, 25], [600, 30], [900, 45], [1200, 55], [1600, 65]]
  for (const [limit, count] of hBreaks) { if (h < limit) { n = count; break } }
  for (const [limit, count] of wBreaks) { if (w < limit) { n = Math.min(n, count); break } }
  return n
}

// --- Particle class ---

class Particle {
  x: number; y: number
  vx: number; vy: number
  size: number; sizeDir: number
  color: string; alpha: number
  isFirework: boolean
  trail: { x: number; y: number; color: string; alpha: number }[]

  constructor(x: number, y: number, isFirework = false) {
    const speed = isFirework ? Math.random() * 2 + 1 : Math.random() * 0.5 + 0.3
    const angle = Math.random() * Math.PI * 2
    this.x = x; this.y = y
    this.vx = Math.cos(angle) * speed
    this.vy = Math.sin(angle) * speed
    this.size = isFirework ? Math.random() * 2 + 2 : Math.random() * 3 + 1
    this.sizeDir = Math.random() < 0.5 ? -1 : 1
    this.color = randomColor()
    this.alpha = 1
    this.isFirework = isFirework
    this.trail = []
  }

  update() {
    const dist = mouseX !== null ? (mouseX - this.x) ** 2 + (mouseY! - this.y) ** 2 : 0

    if (!this.isFirework) {
      const force = dist && dist < 22500 ? (22500 - dist) / 22500 : 0

      if (mouseX === null && autoDrift) {
        this.vx += (Math.random() - 0.5) * 0.03
        this.vy += (Math.random() - 0.5) * 0.03
      }

      if (dist && mouseX !== null) {
        const d = Math.sqrt(dist)
        this.vx += ((mouseX - this.x) / d) * force * 0.1
        this.vy += ((mouseY! - this.y) / d) * force * 0.1
      }

      this.vx *= mouseX !== null ? 0.99 : 0.998
      this.vy *= mouseY !== null ? 0.99 : 0.998
    } else {
      this.alpha -= 0.02
    }

    this.x += this.vx
    this.y += this.vy

    if (this.x <= 0 || this.x >= canvas.width - 1) this.vx *= -0.9
    if (this.y < 0 || this.y > canvas.height) this.vy *= -0.9

    this.size += this.sizeDir * 0.1
    if (this.size > 4 || this.size < 1) this.sizeDir *= -1

    if (frameCount % 2 === 0 && (Math.abs(this.vx) > 0.1 || Math.abs(this.vy) > 0.1)) {
      this.trail.push({ x: this.x, y: this.y, color: this.color, alpha: this.alpha })
      if (this.trail.length > 15) this.trail.shift()
    }
  }

  draw() {
    const a = Math.max(this.alpha, 0)
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size)
    gradient.addColorStop(0, hexAlpha(this.color, a * 0.4))
    gradient.addColorStop(1, hexAlpha(this.color, 0))
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()

    if (this.trail.length > 1) {
      ctx.lineWidth = 1
      for (let i = 0; i < this.trail.length - 1; i++) {
        const t = this.trail[i]
        const progress = i / this.trail.length
        ctx.strokeStyle = hexAlpha(t.color, Math.max(t.alpha, 0) * progress * 0.15)
        ctx.beginPath()
        ctx.moveTo(t.x, t.y)
        ctx.lineTo(this.trail[i + 1].x, this.trail[i + 1].y)
        ctx.stroke()
      }
    }
  }

  isDead(): boolean {
    return this.isFirework && this.alpha <= 0
  }
}

// --- Ripple class ---

class Ripple {
  x: number; y: number
  radius: number; maxRadius: number
  alpha: number; color: string

  constructor(x: number, y: number, color: string, maxRadius = 60) {
    this.x = x; this.y = y
    this.radius = 0; this.maxRadius = maxRadius
    this.alpha = 0.25; this.color = color
  }

  update() {
    this.radius += 1.5
    this.alpha -= 0.012
  }

  draw() {
    ctx.strokeStyle = hexAlpha(this.color, Math.max(this.alpha, 0))
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.stroke()
  }

  isDone(): boolean {
    return this.alpha <= 0 || this.radius >= this.maxRadius
  }
}

// --- Canvas setup ---

function createParticles() {
  particles.length = 0
  const n = adjustParticleCount()
  for (let i = 0; i < n; i++) {
    particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height))
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  createParticles()
}

function scheduleResize() {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(resizeCanvas, 150)
}

// --- Draw ---

function connectParticles() {
  const gridSize = 120
  const grid = new Map<string, Particle[]>()

  for (const p of particles) {
    const key = `${Math.floor(p.x / gridSize)},${Math.floor(p.y / gridSize)}`
    if (!grid.has(key)) grid.set(key, [])
    grid.get(key)!.push(p)
  }

  // Batch connections per particle: one beginPath+stroke per particle instead
  // of one per connection — reduces GPU state flushes from ~400 to ~80 per frame
  ctx.lineWidth = 1
  for (const p of particles) {
    const gx = Math.floor(p.x / gridSize)
    const gy = Math.floor(p.y / gridSize)
    ctx.beginPath()
    ctx.strokeStyle = hexAlpha(p.color, 0.07)
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const neighbors = grid.get(`${gx + dx},${gy + dy}`)
        if (!neighbors) continue
        for (const n of neighbors) {
          if (n === p) continue
          const diffX = n.x - p.x
          const diffY = n.y - p.y
          if (diffX * diffX + diffY * diffY < 10000) {
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(n.x, n.y)
          }
        }
      }
    }
    ctx.stroke()
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update(); particles[i].draw()
  }
  for (let i = ripples.length - 1; i >= 0; i--) {
    ripples[i].update(); ripples[i].draw()
    if (ripples[i].isDone()) ripples.splice(i, 1)
  }
  for (let i = fireworkParticles.length - 1; i >= 0; i--) {
    fireworkParticles[i].update(); fireworkParticles[i].draw()
    if (fireworkParticles[i].isDead()) fireworkParticles.splice(i, 1)
  }

  connectParticles()
  frameCount++
  rafId = requestAnimationFrame(animate)
}

// --- Event handlers ---

function onMouseMove(e: MouseEvent) {
  mouseX = e.clientX
  mouseY = e.clientY
  autoDrift = false
}

function onMouseLeave() {
  mouseX = null
  mouseY = null
  autoDrift = true
}

function onClick(e: MouseEvent) {
  const palette = getPalette()
  const color = palette[Math.floor(Math.random() * palette.length)]
  ripples.push(new Ripple(e.clientX, e.clientY, color))
  for (let i = 0; i < 15; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = Math.random() * 2 + 1
    const p = new Particle(e.clientX, e.clientY, true)
    p.vx = Math.cos(angle) * speed
    p.vy = Math.sin(angle) * speed
    fireworkParticles.push(p)
  }
}

function onTouchStart(e: TouchEvent) {
  const t = e.touches[0]
  mouseX = t.clientX
  mouseY = t.clientY
  autoDrift = false
}

function onTouchMove(e: TouchEvent) {
  const t = e.touches[0]
  mouseX = t.clientX
  mouseY = t.clientY
  autoDrift = false
}

function onTouchEnd(e: TouchEvent) {
  if (e.touches.length === 0) {
    // Treat tap-end as a click for fireworks
    if (mouseX !== null && mouseY !== null) {
      const palette = getPalette()
      const color = palette[Math.floor(Math.random() * palette.length)]
      ripples.push(new Ripple(mouseX, mouseY, color))
      for (let i = 0; i < 10; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 2 + 1
        const p = new Particle(mouseX, mouseY, true)
        p.vx = Math.cos(angle) * speed
        p.vy = Math.sin(angle) * speed
        fireworkParticles.push(p)
      }
    }
    mouseX = null
    mouseY = null
    autoDrift = true
  }
}

// --- Lifecycle ---

watch(() => theme.theme, (newTheme) => {
  isDark = newTheme === 'dark'
  for (const p of particles) p.color = randomColor()
})

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  canvas = canvasRef.value!
  ctx = canvas.getContext('2d')!
  resizeCanvas()
  animate()

  window.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseleave', onMouseLeave)
  window.addEventListener('click', onClick)
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchmove', onTouchMove, { passive: true })
  window.addEventListener('touchend', onTouchEnd)
  window.addEventListener('resize', scheduleResize)
})

onUnmounted(() => {
  if (!canvas) return
  cancelAnimationFrame(rafId)
  clearTimeout(resizeTimer)
  window.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseleave', onMouseLeave)
  window.removeEventListener('click', onClick)
  window.removeEventListener('touchstart', onTouchStart)
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('touchend', onTouchEnd)
  window.removeEventListener('resize', scheduleResize)
})
</script>
