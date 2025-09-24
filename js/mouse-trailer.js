const trailerContainer = document.createElement('div');
trailerContainer.className = 'mouse-trailer-container';
trailerContainer.style.filter = 'blur(' + Math.min(screen.width, screen.height) * 0.25 + 'px)';
document.body.appendChild(trailerContainer);

const trailerElement = document.createElement('div');
trailerElement.className = 'mouse-trailer';

const trailerSize = Math.min(screen.width, screen.height) * 0.35;
trailerElement.style.width = trailerSize + 'px';
trailerElement.style.height = trailerSize + 'px';

trailerContainer.appendChild(trailerElement);

let targetX = window.innerWidth / 2 - trailerElement.offsetWidth / 2;
let targetY = window.innerHeight / 2 - trailerElement.offsetHeight / 2;
let currentX = targetX;
let currentY = targetY;

trailerElement.style.left = `${currentX}px`;
trailerElement.style.top = `${currentY}px`;

let mouseTimeout;

document.body.addEventListener('pointermove', (event) => 
{
    clearTimeout(mouseTimeout);

    targetX = event.clientX - trailerElement.offsetWidth / 2;
    targetY = event.clientY - trailerElement.offsetHeight / 2;

    mouseTimeout = setTimeout(moveToCenter, 5000);
});

function moveToCenter() 
{
    targetX = window.innerWidth / 2 - trailerElement.offsetWidth / 2;
    targetY = window.innerHeight / 2 - trailerElement.offsetHeight / 2;
}

function animate() 
{
    currentX += (targetX - currentX) * 0.02;
    currentY += (targetY - currentY) * 0.02;

    trailerElement.style.left = `${currentX}px`;
    trailerElement.style.top = `${currentY}px`;

    requestAnimationFrame(animate);
}

animate();
