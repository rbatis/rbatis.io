/* ============================================
   rbatis.io - Particle Network Animation
   Canvas-based particle network with
   blue-green colors and mouse interaction
   ============================================ */

const COLORS = [
  '66, 185, 131',   // green (brand)
  '46, 204, 113',   // emerald
  '52, 152, 219',   // blue
  '41, 128, 185',   // dark blue
  '26, 188, 156',   // teal
  '59, 130, 246',   // blue
  '14, 165, 233',   // sky blue
  '16, 185, 129',   // emerald
  '20, 184, 166',   // dark teal
  '34, 211, 238',   // cyan
]

const CONFIG = {
  count: 80,
  maxDistance: 200,
  lineWidth: 1.0,
  lineOpacity: 0.2,
  speed: 0.3,
  radius: 2.5,
  radiusRand: 1.5,
  mouseRadius: 150,
}

let canvas, ctx, particles, animationId, mouse, isRunning

export function initParticles(canvasId) {
  canvas = document.getElementById(canvasId)
  if (!canvas) return

  ctx = canvas.getContext('2d')
  mouse = { x: null, y: null, active: false }
  particles = []
  isRunning = true

  resize()
  createParticles()
  bindEvents()
  animate()
}

function resize() {
  canvas.width = canvas.parentElement.offsetWidth
  canvas.height = canvas.parentElement.offsetHeight
}

function bindEvents() {
  window.addEventListener('resize', resize)

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect()
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top
    mouse.active = true
  })

  canvas.addEventListener('mouseleave', () => {
    mouse.active = false
  })

  canvas.addEventListener('touchmove', (e) => {
    const rect = canvas.getBoundingClientRect()
    const touch = e.touches[0]
    mouse.x = touch.clientX - rect.left
    mouse.y = touch.clientY - rect.top
    mouse.active = true
  }, { passive: true })

  canvas.addEventListener('touchend', () => {
    mouse.active = false
  })
}

function createParticles() {
  for (let i = 0; i < CONFIG.count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * CONFIG.speed,
      vy: (Math.random() - 0.5) * CONFIG.speed,
      r: CONFIG.radius + Math.random() * CONFIG.radiusRand,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    })
  }
}

function animate() {
  if (!isRunning) return
  animationId = requestAnimationFrame(animate)
  draw()
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]

    // Move
    p.x += p.vx
    p.y += p.vy

    // Boundary wrap
    if (p.x < 0) p.x = canvas.width
    if (p.x > canvas.width) p.x = 0
    if (p.y < 0) p.y = canvas.height
    if (p.y > canvas.height) p.y = 0

    // Draw particle
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(' + p.color + ', 0.7)'
    ctx.fill()

    // Mouse interaction
    if (mouse.active && mouse.x !== null) {
      const dx = p.x - mouse.x
      const dy = p.y - mouse.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < CONFIG.mouseRadius) {
        const force = (CONFIG.mouseRadius - dist) / CONFIG.mouseRadius
        p.x += (dx / dist) * force * 1.2
        p.y += (dy / dist) * force * 1.2
      }
    }

    // Connect to nearby particles
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j]
      const dx = p.x - p2.x
      const dy = p.y - p2.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < CONFIG.maxDistance) {
        const opacity = (1 - dist / CONFIG.maxDistance) * CONFIG.lineOpacity
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.strokeStyle = 'rgba(' + p.color + ', ' + opacity + ')'
        ctx.lineWidth = CONFIG.lineWidth
        ctx.stroke()
      }
    }
  }
}

export function destroyParticles() {
  isRunning = false
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
  particles = []
  canvas = null
  ctx = null
}
