const trailerContainer = document.createElement('div');
trailerContainer.className = 'mouse-trailer-container';
trailerContainer.style.filter = 'blur(' + Math.max(screen.width * 0.1, screen.height * 0.1) + 'px)';
document.body.appendChild(trailerContainer);

const trailerElement = document.createElement('div');
trailerElement.className = 'mouse-trailer';

trailerElement.style.width = Math.min(screen.width * 0.7, screen.height * 0.7, 400) + 'px';
trailerElement.style.height = Math.min(screen.width * 0.3, screen.height * 0.3, 160) + 'px';

trailerContainer.appendChild(trailerElement);

document.body.addEventListener('pointermove', (event) => {
    const x = event.clientX - trailerElement.offsetWidth / 2;
    const y = event.clientY - trailerElement.offsetHeight / 2;

    trailerElement.animate({
        left: `${x}px`,
        top: `${y}px`
    }, {
        duration: 3000,
        fill: 'forwards'
    });
});