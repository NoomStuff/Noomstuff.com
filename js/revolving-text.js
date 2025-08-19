function revolveText(id, texts, interval = 2500) {
    const element = document.getElementById(id);
    let index = Math.floor(Math.random() * texts.length);
    element.style.display = 'inline-block';
    element.style.transition = 'transform 0.3s cubic-bezier(0.7, -0.6, 0.32, 1.6), opacity 0.3s cubic-bezier(0.7, -0.6, 0.32, 1.6)';
    element.style.opacity = '1';
    element.innerHTML = texts[index];

    setInterval(() => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(-0.5em)';
        setTimeout(() => {
            index = (index + 1) % texts.length;
            element.textContent = texts[index];
            element.style.transition = 'none';
            element.style.transform = 'translateY(0.5em)';
            element.style.opacity = '0';

            void element.offsetWidth;
            element.style.transition = 'transform 0.3s cubic-bezier(0.7, -0.6, 0.32, 1.6), opacity 0.3s cubic-bezier(0.7, -0.6, 0.32, 1.6)';
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        }, 300);
    }, interval);
}


revolveText('revolving-text', ['creative', 'gamedev', 'artist', 'editor', 'programmer', 'animator', 'youtuber', 'coder', 'designer', 'developer', 'musician', 'creator', 'entertainer', 'idiot']);