const profileElement = document.querySelector('.profile-picture');
const profileImage = profileElement.querySelector('img');

const popupElement = document.createElement('span');
popupElement.className = 'profile-popup';
profileElement.appendChild(popupElement);

const popupText = [
    'Double click!',
    'Triple click!',
    'Super click!',
    'Mega click!',
    'Ultra click!',
    'Hyper click!',
    'LEGENDARY!!',
    'MYTHICAL!!',
    'UNREAL!!',
    'EPIC!!',
    'AWESOME!!',
    'DIVINE!!',
    'UNBELIEVABLE!!!',
    'EXTRAORDINARY!!!',
    'INCREDIBLE!!!',
    'FANTASTIC!!!',
    'BEAST MODE!!!',
    'UNSTOPPABLE!!!',
    'GODLIKE!!!',
];

const popupTextRandom = [
    'WILD',
    'SUPER',
    'INSANE',
    'HYPER',
    'ULTRA',
    'MEGA',
    'COLOSSAL',
    'LEGENDARY',
    'MYTHICAL',
    'UNREAL',
    'EPIC',
    'AWESOME',
    'DIVINE',
    'UNBELIEVABLE',
    'EXTRAORDINARY',
    'INCREDIBLE',
    'FANTASTIC',
    'BEAST MODE',
    'UNSTOPPABLE',
    'GODLIKE',
];


let clickCount = -1;
let clickTimeout;

profileElement.addEventListener('click', () =>
{
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

    if (clickCount > 0)
    {
        if (clickCount < popupText.length + 1)
        {
            popupElement.textContent = popupText[clickCount - 1];
        } else
        {
            popupElement.textContent = `${popupTextRandom[Math.floor(Math.random() * popupTextRandom.length)]} x${clickCount}${exclaimationText}`;
        }

        popupElement.animate([
            { opacity: 0, transform: 'translateY(-20px)' },
            { opacity: 1, transform: 'translateY(0)' }
        ], {
            duration: 500,
            easing: 'cubic-bezier(0.2, 1.1, 0.6, 1.025)',
            fill: 'forwards'
        });


        clearTimeout(clickTimeout);

        clickTimeout = setTimeout(() =>
        {
            popupElement.animate([
                { opacity: 1, transform: 'translateY(0)' },
                { opacity: 0, transform: 'translateY(-10px)' }
            ], {
                duration: 750,
                easing: 'cubic-bezier(0.2, 1.1, 0.6, 1.025)',
                fill: 'forwards'
            });

            clickCount = -1;
        }, 2000);
    }
});

