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

trailerElement.style.left = `${window.innerWidth / 2 - trailerElement.offsetWidth / 2}px`;
trailerElement.style.top = `${window.innerHeight / 2 - trailerElement.offsetHeight / 2}px`;

let mouseTimeout;

document.body.addEventListener('pointermove', (event) => {
    clearTimeout(mouseTimeout);

    const x = event.clientX - trailerElement.offsetWidth / 2;
    const y = event.clientY - trailerElement.offsetHeight / 2;

    trailerElement.style.left = `${x}px`;
    trailerElement.style.top = `${y}px`;

    trailerElement.animate({
        left: `${x}px`,
        top: `${y}px`
    }, {
        duration: 4000,
        fill: 'forwards'
    });

    mouseTimeout = setTimeout(moveToCenter, 5000);
});

function moveToCenter() {
    const x = window.innerWidth / 2 - trailerElement.offsetWidth / 2;
    const y = window.innerHeight / 2 - trailerElement.offsetHeight / 2;

    trailerElement.animate({
        left: `${x}px`,
        top: `${y}px`
    }, {
        duration: 4000,
        fill: 'forwards'
    });
}