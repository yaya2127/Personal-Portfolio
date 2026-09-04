/* ==========================================================================
   Yared Kinetibeb Tesfaye Portfolio — Ambient Gold Constellation & Particle Canvas
   Low-Opacity, Slow-Moving Gold/Amber Mesh with Mobile Performance Cap
   ========================================================================== */

(function () {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 120 };

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  window.addEventListener('resize', resizeCanvas);
  
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.init();
    }

    init() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 1.8 + 0.8;
      this.speedX = (Math.random() - 0.5) * 0.35;
      this.speedY = (Math.random() - 0.5) * 0.35;
      this.baseAlpha = Math.random() * 0.4 + 0.15;
      this.alpha = this.baseAlpha;
      const colors = ['#f5b942', '#e5b769', '#dfa951', '#f7d794'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
          this.alpha = Math.min(0.85, this.baseAlpha + force * 0.5);
        } else {
          this.alpha = this.baseAlpha;
        }
      } else {
        this.alpha = this.baseAlpha;
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  function initParticles() {
    particles = [];
    const count = width < 768 ? 28 : Math.min(Math.floor((width * height) / 18000), 55);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function drawConstellationLines() {
    const maxDist = width < 768 ? 90 : 130;
    const len = particles.length;

    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.12;
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = '#f5b942';
          ctx.lineWidth = 0.75;
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createRadialGradient(
      width * 0.5, height * 0.4, 20,
      width * 0.5, height * 0.4, width * 0.75
    );
    gradient.addColorStop(0, 'rgba(245, 185, 66, 0.035)');
    gradient.addColorStop(0.6, 'rgba(229, 183, 105, 0.015)');
    gradient.addColorStop(1, 'rgba(9, 9, 11, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    drawConstellationLines();

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    requestAnimationFrame(animate);
  }

  resizeCanvas();
  animate();
})();
