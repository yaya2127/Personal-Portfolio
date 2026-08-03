/* ==========================================================================
   Gold Sparkle Particle Canvas Background System
   ========================================================================== */

(function () {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = -Math.random() * 0.5 - 0.2;
      this.opacity = Math.random() * 0.8 + 0.2;
      this.fadeSpeed = Math.random() * 0.01 + 0.005;
      this.color = Math.random() > 0.3 ? '#e5b769' : '#f7d794';
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      this.opacity -= this.fadeSpeed;
      if (this.opacity <= 0 || this.y < 0) {
        this.reset();
        this.y = height + 10;
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  // Create 65 floating gold dust particles
  const particleCount = 65;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Render soft ambient glow in background center
    const gradient = ctx.createRadialGradient(
      width * 0.3, height * 0.4, 10,
      width * 0.3, height * 0.4, width * 0.6
    );
    gradient.addColorStop(0, 'rgba(229, 183, 105, 0.04)');
    gradient.addColorStop(1, 'rgba(9, 9, 11, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
})();
