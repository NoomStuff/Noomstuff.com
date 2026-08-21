const profileElement = document.querySelector('.profile-picture');
const profileImage = profileElement.querySelector('img');

const popupElement = document.createElement('span');
popupElement.className = 'profile-popup';
profileElement.appendChild(popupElement);

const popupTextElement = document.createElement('span');
popupTextElement.className = 'profile-popup-text';
popupElement.appendChild(popupTextElement);

const popupText = [
    'Double click!',
    'Triple click!',
    'Super click!',
    'Mega click!',
    'Ultra click!',
    'Hyper click!',
    'EPIC!!',
    'AWESOME!!',
    'FANTASTIC!!',
    'UNREAL!!',
    'INCREDIBLE!!',
    'EXTRAORDINARY!!',
    'UNBELIEVABLE!!!',
    'DIVINE!!!',
    'LEGENDARY!!!',
    'MYTHICAL!!!',
    'BEAST MODE!!!',
    'UNSTOPPABLE!!!',
    'GODLIKE!!!',
];

const popupTextRandom = [
    'MEGA',
    'SUPER',
    'ULTRA',
    'HYPER',

    'EPIC',
    'AWESOME',
    'FANTASTIC',
    'UNREAL',
    'INCREDIBLE',
    'EXTRAORDINARY',
    'UNBELIEVABLE',
    'DIVINE',
    'LEGENDARY',
    'MYTHICAL',
    'BEAST MODE',
    'UNSTOPPABLE',
    'GODLIKE',

    'WILD',
    'INSANE',
    'COLOSSAL',
    'TITANIC',
    'MONSTROUS',
    'ASTONISHING',
    'BREATHTAKING',
    'MINDBLOWING',
    'STAGGERING',
    'STUPENDOUS',
    'SPECTACULAR',
    'PHENOMENAL',
    'EXCEPTIONAL',
    'MARVELOUS',
    'ASTOUNDING',
    'TERRIFIC',
    'FANTABULOUS',
    'WONDERFUL',
    'FABULOUS',
    'SENSATIONAL',
    'BRILLIANT',
    'RAVISHING',
    'DAZZLING',
    'RADIANT',
    'ELECTRIFYING',
    'THUNDEROUS',
    'RAMPAGE',
    'DOMINATING',
    'OVERPOWERING',
    'UNRELENTING',
    'UNYIELDING',
    'JAWDROPPING',
    'MINDBLOWING',
    'COSMIC',
    'GALACTIC',
    'INTERSTELLAR',
    'ASTRONOMICAL',
    'COMBO',
    'ULTIMATE',
    'SUPREME',
    'EARTH SHATTERING',
    'LIFE CHANGING',
    'ZENITH',
    'APEX',
    'PINNACLE',
    'PEAK',
    'ALPHA',
    'OMEGA',
    'ASTOUNDING',
    'STUNNING',
    'EXHILARATING',
    'THRILLING',
    'EXHILARATING',
    'FLAWLESS',
    'IMPECCABLE',
    'UNMATCHED',
    'UNPARALLELED',
    'UNPRECEDENTED',
    'WOW',
    'GREAT',
    'COOL',
    'NEAT',
    'SUGOI',
    'HEARTSTOPPING',
    'FLASHY',
];

function generateShakeKeyframes(intensity, steps = 50) {
    const frames = [{ transform: 'translate(0, 0) rotate(0deg)' }];

    for (let i = 0; i < steps; i++) {
        const x = (Math.random() * 2 - 1) * intensity;
        const y = (Math.random() * 2 - 1) * intensity;
        const r = (Math.random() * 2 - 1) * (intensity * 0.25);
        frames.push({ transform: `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${r.toFixed(2)}deg)` });
    }

    frames.push({ transform: 'translate(0, 0) rotate(0deg)' });

    return frames;
}

let clickCount = -1;
let clickTimeout;

profileElement.addEventListener('click', () => {
    profileImage.animate([
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(360deg)' }
    ], {
        duration: 1000,
        easing: 'cubic-bezier(0.2, 1.1, 0.6, 1.025)',
        iterations: 1,
        composite: 'add'
    });

    clickCount++;

    const exclaimationText = "!".repeat(Math.floor(clickCount / 100) + 3);

    if (clickCount > 0) {
        if (clickCount < popupText.length + 1) {
            popupTextElement.textContent = popupText[clickCount - 1];
        } else {
            popupTextElement.textContent = `${popupTextRandom[Math.floor(Math.random() * popupTextRandom.length)]} x${clickCount}${exclaimationText}`;
        }

        popupElement.animate([
            { opacity: 0, transform: 'translateY(-16px)' },
            { opacity: 1, transform: 'translateY(0)' }
        ], {
            duration: 500,
            easing: 'cubic-bezier(0.2, 1.1, 0.6, 1.025)',
            fill: 'forwards'
        });

        popupTextElement.style.webkitTextFillColor = `rgba(192, 192, 192, ${Math.max(0, Math.min(1, 1 - (clickCount - 20) / 180))}`;
        popupTextElement.style.animationDuration = `${Math.max(0.5, 3 - clickCount / 500)}s`;

        const shakeIntensity = Math.max(0, Math.min((clickCount - 100) / 250, 8));

        popupTextElement.animate(
            generateShakeKeyframes(shakeIntensity),
            {
                duration: 1000,
                easing: 'cubic-bezier(0.2, 1.1, 0.6, 1.025)',
                fill: 'forwards'
            }
        );

        clearTimeout(clickTimeout);

        clickTimeout = setTimeout(() => {
            popupElement.animate([
                { opacity: 1, transform: 'translateY(0)' },
                { opacity: 0, transform: 'translateY(-16px)' }
            ], {
                duration: 750,
                easing: 'cubic-bezier(0.2, 1.1, 0.6, 1.025)',
                fill: 'forwards'
            });

            clickCount = -1;
        }, 2000 + clickCount);
    }
});

