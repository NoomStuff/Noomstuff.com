const bannerBackground = document.getElementById('banner-background');

// Create canvas
canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.left = '0';
canvas.style.top = '0';
canvas.style.zIndex = '-1';
bannerBackground.appendChild(canvas);

const context = canvas.getContext('2d');

class TriangleParticle {
  constructor(rect) {
    this.color = getComputedStyle(document.documentElement).getPropertyValue('--background-color').trim() || '#0c080e';
    this.x = -50 + Math.random() * (rect.width + 100);
    const center = rect.width / 2;
    const distanceFromCenter = Math.abs(this.x - center) / center;
    const widthFactor = rect.width / 1920;
    this.targetScale = (1 + widthFactor) + distanceFromCenter * widthFactor + Math.random() * 2;
    this.scale = 0.1;
    this.y = rect.height + 200;

    this.speed = Math.random() * 25;
    this.speedUpRate = 0.5 + Math.random() * 2;

    this.waveAmplitude = 15 + Math.random() * 25;
    this.waveFrequency = 0.2 + Math.random() * 0.6;
    this.wavePhase = Math.random() * Math.PI * 2;

    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 24;

    this.shrinkRate = 0.1 + Math.random() * 0.25;

    this.lifetime = 0;
    this.alive = true;
  }

  updateParticle(deltaTime) {
    this.y -= this.speed * deltaTime;
    this.speed += this.speedUpRate * deltaTime;
    this.rotation += this.rotationSpeed * deltaTime;
    this.targetScale -= this.shrinkRate * deltaTime;

    const time = Math.min(1, this.lifetime / 4);
    this.scale = (1 - (1 - time) * (1 - time)) * this.targetScale;
    this.lifetime += deltaTime;

    if (this.y + 100 <= -200 || (this.scale <= 0.1 && this.lifetime > 2)) {
      this.alive = false;
    }
  }

  drawParticle(context) {
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

  updateAndDraw(context, deltaTime) {
    this.updateParticle(deltaTime);

    if (this.alive) {
      this.drawParticle(context);
    }
  }
}

let triangleParticles = [];

let animationPaused = false;

let spawnInterval = 100;
let spawnTimer = 0;

function getBannerRect() {
  return bannerBackground.getBoundingClientRect();
}

function resizecanvas() {
  const vh = window.innerHeight;
  bannerBackground.style.height = vh + 'px';
  const banner = document.getElementById('banner');
  if (banner) banner.style.height = vh + 'px';
  canvas.style.height = vh + 'px';

  const rect = getBannerRect();
  canvas.width = rect.width;
  canvas.height = rect.height;

  const widthFactor = rect.width / 1920;
  spawnInterval = Math.max(5, Math.round(180 - widthFactor * 120));
}

resizecanvas();
window.addEventListener('resize', resizecanvas);

function prewarmParticles() {
  const rect = getBannerRect();
  const widthFactor = rect.width / 1920;
  const initialCount = Math.round(240 - widthFactor * 50);

  triangleParticles = [];

  for (let i = 0; i < initialCount; i++) {
    const particle = new TriangleParticle(rect);
    const frames = Math.floor(Math.random() * 1200);
    const prewarmTime = frames / 60;

    let elapsedTime = 0;
    const deltaTime = 1 / 60;

    while (elapsedTime < prewarmTime && particle.alive) {
      particle.updateParticle(deltaTime);
      elapsedTime += deltaTime;
    }

    triangleParticles.push(particle);
  }

  spawnTimer = 0;
}

prewarmParticles();
window.addEventListener('resize', prewarmParticles);

function spawnParticle() {
  if (!animationPaused) {
    triangleParticles.push(new TriangleParticle(getBannerRect()));
  }
}

function animateParticles(currentTime) {
  const deltaTime = Math.min((currentTime - animateParticles.lastTime) / 1000, 0.1);
  animateParticles.lastTime = currentTime;

  if (!animationPaused) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    spawnTimer += deltaTime * 1000;

    while (spawnTimer >= spawnInterval) {
      spawnParticle();
      spawnTimer -= spawnInterval;
    }

    const aliveParticles = [];

    for (let i = 0; i < triangleParticles.length; i++) {
      const particle = triangleParticles[i];

      if (particle.alive) {
        particle.updateAndDraw(context, deltaTime);
        aliveParticles.push(particle);
      }
    }

    triangleParticles = aliveParticles;
  }

  requestAnimationFrame(animateParticles);
}

animateParticles.lastTime = performance.now();
requestAnimationFrame(animateParticles);

function checkBannerView() {
  const banner = document.getElementById('banner-background');
  if (!banner) return;
  const rect = banner.getBoundingClientRect();
  animationPaused = rect.bottom < 0;
}

window.addEventListener('scroll', checkBannerView);
window.addEventListener('resize', checkBannerView);
checkBannerView();