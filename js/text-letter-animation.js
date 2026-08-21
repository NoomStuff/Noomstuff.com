const spanElement = document.getElementById('banner-subtitle');
const text = spanElement.textContent;

spanElement.textContent = '';
spanElement.style.whiteSpace = 'pre';

for (let i = 0; i < text.length; i++) {
    const letter = text[i];
    const span = document.createElement('span');
    span.textContent = letter;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.transform = 'translateY(100%) rotateX(90deg)';
    spanElement.appendChild(span);

    span.animate([
        { transform: 'translateY(100%) rotateX(90deg)', opacity: '0' },
        { transform: 'translateY(0) rotateX(0deg)', opacity: '1' }
    ], {
        duration: 500,
        easing: 'cubic-bezier(0.4, 1.5, 0.6, 1.025)',
        delay: 2500 + i * 25,
        fill: 'forwards'
    });
}

