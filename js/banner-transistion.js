const background = document.getElementById('banner-background');
const svgNS = "http://www.w3.org/2000/svg";

background.style.position = "relative";

// Get CSS variables
function getCSSVar(name) {
  return ;
}

// Triangle Particle Class
class TriangleParticle {
  constructor() {
    const backgroundRect = background.getBoundingClientRect();
    const baseSize = 100;
    const color = getComputedStyle(document.documentElement).getPropertyValue('--background-color').trim();

    this.x = -50 + Math.random() * (backgroundRect.width + 100);
    const center = backgroundRect.width / 2;
    const distFromCenter = Math.abs(this.x - center) / center;
    const widthFactor = backgroundRect.width / 1920;
    this.scale = (2.5 + widthFactor) + distFromCenter * (1.5 + widthFactor) + Math.random() * (0.5 + widthFactor);
    this.visualSize = baseSize;
    this.y = backgroundRect.height + 40;
    this.baseY = this.y;
    this.speed = 0.12 + Math.random() * 0.3;
    this.waveAmplitude = 25 + Math.random() * 20;
    this.waveFrequency = 0.01 + Math.random() * 0.02;
    this.wavePhase = Math.random() * Math.PI * 2;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 0.4;
    this.shrinkRate = 0.002 + Math.random() * 0.005;

    // SVG container
    this.svg = document.createElementNS(svgNS, "svg");
    this.svg.setAttribute("width", this.visualSize);
    this.svg.setAttribute("height", this.visualSize);
    this.svg.setAttribute("viewBox", "0 0 100 100");
    this.svg.style.position = "absolute";
    this.svg.style.left = `${this.x}px`;
    this.svg.style.top = `${this.y}px`;
    this.svg.style.overflow = "visible";
    this.svg.style.zIndex = -1;

    // Triangle shape
    this.triangle = document.createElementNS(svgNS, "polygon");
    this.triangle.setAttribute("points", "50,13.4 100,100 0,100");
    this.triangle.setAttribute("fill", color);

    this.svg.appendChild(this.triangle);
    background.appendChild(this.svg);

    this.update = this.update.bind(this);
    requestAnimationFrame(this.update);
  }

  update() {
    this.y -= this.speed;
    this.rotation += this.rotationSpeed;
    this.scale -= this.shrinkRate;
    const waveOffset = Math.sin(this.wavePhase + this.lifetime * this.waveFrequency) * this.waveAmplitude;
    this.svg.style.left = `${this.x + waveOffset}px`;
    this.svg.style.top = `${this.y}px`;
    this.triangle.setAttribute(
      "transform",
      `scale(${this.scale}) rotate(${this.rotation} 50 50)`
    );

    if (this.y + 100 > -200 && this.scale > 0.1) {
      requestAnimationFrame(this.update);
    } else {
      this.svg.remove();
    }
  }
}

const backgroundRect = background.getBoundingClientRect();
const widthFactor = backgroundRect.width / 1920;
const initialCount = Math.round(20 + widthFactor * 20);
const prewarmParticles = [];
for (let i = 0; i < initialCount; i++) {
  const p = new TriangleParticle();
  prewarmParticles.push(p);
}

// Prewarm
prewarmParticles.forEach(p => {
  const frames = Math.floor(Math.random() * 1200);
  for (let f = 0; f < frames; f++) {
    p.y -= p.speed;
    p.rotation += p.rotationSpeed;
    p.scale -= p.shrinkRate;
    const waveOffset = Math.sin(p.wavePhase + f * p.waveFrequency) * p.waveAmplitude;
    p.svg.style.left = `${p.x + waveOffset}px`;
    p.svg.style.top = `${p.y}px`;
    p.triangle.setAttribute(
      "transform",
      `scale(${p.scale}) rotate(${p.rotation} 50 50)`
    );
  }
});

const spawnInterval = Math.max(30, Math.round(90 - widthFactor * 30));
setInterval(() => {
  new TriangleParticle();
}, spawnInterval);