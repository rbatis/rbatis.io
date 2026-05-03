/* ============================================
   rbatis.io - Particle Network Animation
   Canvas-based green particle system with
   mouse interaction
   ============================================ */

const ParticleNetwork = (function () {
  'use strict';

  const CONFIG = {
    count: 80,
    maxDistance: 150,
    lineWidth: 0.6,
    particleColor: '66, 185, 131',
    lineColor: '66, 185, 131',
    lineOpacity: 0.25,
    speed: 0.3,
    radius: 1.5,
    mouseRadius: 120,
  };

  let canvas, ctx, particles, animationId, mouse, isRunning;

  function init(canvasId) {
    canvas = document.getElementById(canvasId);
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    mouse = { x: null, y: null, active: false };
    particles = [];
    isRunning = true;

    resize();
    createParticles();
    bindEvents();
    animate();
  }

  function resize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }

  function bindEvents() {
    window.addEventListener('resize', function () {
      resize();
    });

    canvas.addEventListener('mousemove', function (e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });

    canvas.addEventListener('mouseleave', function () {
      mouse.active = false;
    });

    canvas.addEventListener('touchmove', function (e) {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouse.x = touch.clientX - rect.left;
      mouse.y = touch.clientY - rect.top;
      mouse.active = true;
    }, { passive: true });

    canvas.addEventListener('touchend', function () {
      mouse.active = false;
    });
  }

  function createParticles() {
    for (let i = 0; i < CONFIG.count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * CONFIG.speed,
        vy: (Math.random() - 0.5) * CONFIG.speed,
        r: CONFIG.radius + Math.random() * 0.5,
      });
    }
  }

  function animate() {
    if (!isRunning) return;
    animationId = requestAnimationFrame(animate);
    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Boundary wrap
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + CONFIG.particleColor + ', 0.6)';
      ctx.fill();

      // Mouse interaction
      if (mouse.active && mouse.x !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.mouseRadius) {
          const force = (CONFIG.mouseRadius - dist) / CONFIG.mouseRadius;
          p.x += (dx / dist) * force * 1.2;
          p.y += (dy / dist) * force * 1.2;
        }
      }

      // Connect to nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.maxDistance) {
          const opacity = (1 - dist / CONFIG.maxDistance) * CONFIG.lineOpacity;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = 'rgba(' + CONFIG.lineColor + ', ' + opacity + ')';
          ctx.lineWidth = CONFIG.lineWidth;
          ctx.stroke();
        }
      }
    }
  }

  function destroy() {
    isRunning = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    particles = [];
    canvas = null;
    ctx = null;
  }

  return { init: init, destroy: destroy };
})();
