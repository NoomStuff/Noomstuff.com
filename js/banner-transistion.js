const bannerBackground = document.getElementById('banner-background');

// Create canvas
canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.left = '0';
canvas.style.top = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
bannerBackground.appendChild(canvas);

const context = canvas.getContext('2d');

class TriangleParticle {
  constructor(rect) {
    this.color = getComputedStyle(document.documentElement).getPropertyValue('--background-color').trim();
    this.x = -50 + Math.random() * (rect.width + 100);
    const center = rect.width / 2;
    const distanceFromCenter = Math.abs(this.x - center) / center;
    const widthFactor = rect.width / 1920;
    this.targetScale = (1 + widthFactor) + distanceFromCenter * widthFactor + Math.random() * 2;
    this.scale = 0.1;
    this.y = rect.height + 200;
    this.speed = 0.05 + Math.random() * 0.15;
    this.speedUpRate = Math.random() * 0.0005;
    this.waveAmplitude = 15 + Math.random() * 20;
    this.waveFrequency = 0.002 + Math.random() * 0.01;
    this.wavePhase = Math.random() * Math.PI * 2;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 0.3;
    this.shrinkRate = 0.0015 + Math.random() * 0.004;
    this.lifetime = 0;
    this.alive = true;
  }

  updateParticle(context) {
    this.y -= this.speed;
    this.speed += this.speedUpRate;
    this.rotation += this.rotationSpeed;
    this.targetScale -= this.shrinkRate;
    const time = Math.min(1, this.lifetime / 240);
    this.scale = (1 - (1 - time) * (1 - time)) * this.targetScale;
    this.lifetime++;
    if (this.y + 100 <= -200 || (this.scale <= 0.1 && this.lifetime > 120)) {
      this.alive = false;
      return;
    }

    const waveOffset = Math.sin(this.wavePhase + this.lifetime * this.waveFrequency) * this.waveAmplitude;
    context.save();
    context.translate(this.x + waveOffset + 50, this.y - 43.3);
    context.rotate((this.rotation * Math.PI) / 180);
    context.scale(this.scale, this.scale);
    context.beginPath();
    context.moveTo(-50, 43.3);
    context.lineTo(50, 43.3);
    context.lineTo(0, -43.3);
    context.closePath();
    context.fillStyle = this.color;
    if (this.scale < 1) {
      context.globalAlpha = Math.max(0, Math.min(1, this.scale));
    }
    context.fill();
    context.restore();
  }
}

let triangleParticles = [];

function getBannerRect() {
  return bannerBackground.getBoundingClientRect();
}

function resizecanvas() {
  const rect = getBannerRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
}
resizecanvas();
window.addEventListener('resize', resizecanvas);

function prewarmParticles() {
  const rect = getBannerRect();
  const widthFactor = rect.width / 1920;
  const initialCount = Math.round(100 + widthFactor * 100);
  triangleParticles = [];
  for (let i = 0; i < initialCount; i++) {
    const particle = new TriangleParticle(rect);
    const frames = Math.floor(Math.random() * 1200);
    for (let f = 0; f < frames; f++) {
      particle.y -= particle.speed;
      particle.speed += particle.speedUpRate;
      particle.rotation += particle.rotationSpeed;
      particle.targetScale -= particle.shrinkRate;
      const time = Math.min(1, particle.lifetime / 240);
      particle.scale = (1 - (1 - time) * (1 - time)) * particle.targetScale;
      particle.lifetime++;
      if (particle.y + 100 <= -200 || (particle.scale <= 0.1 && particle.lifetime > 120)) break;
    }
    triangleParticles.push(particle);
  }
}
prewarmParticles();
window.addEventListener('resize', prewarmParticles);

function spawnParticle() {
  triangleParticles.push(new TriangleParticle(getBannerRect()));
}

const rect = getBannerRect();
const widthFactor = rect.width / 1920;
const spawnInterval = Math.max(16, Math.round(60 - widthFactor * 40));
setInterval(spawnParticle, spawnInterval);

function animateParticles() {
  resizecanvas();
  context.clearRect(0, 0, canvas.width, canvas.height);
  let aliveParticles = [];
  for (let i = 0; i < triangleParticles.length; i++) {
    const p = triangleParticles[i];
    if (p.alive) {
      p.updateParticle(context);
      aliveParticles.push(p);
    }
  }
  triangleParticles = aliveParticles;
  requestAnimationFrame(animateParticles);
}
animateParticles();