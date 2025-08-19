const profileElement = document.querySelector('.profile-picture');
const profileImage = profileElement.querySelector('img');

const popupElement = document.createElement('span');
popupElement.className = 'profile-popup';
profileElement.appendChild(popupElement);

const popupText = [
    'Double click!',
    'triple click!',
    'Super click!',
    'Mega click!',
    'Ultra click!',
    'Hyper click!',
    'LEGENDARY!!',
    'MYTHICAL!!',
    'UNREAL!!',
    'DIVINE!!',
    'UNBELIEVABLE!!!',
    'EXTRAORDINARY!!!',
    'BEAST MODE!!!',
    'UNSTOPPABLE!!!',
    'GODLIKE!!!',
];

let clickCount = 0;
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

    if (clickCount > 1)
    {
        if (clickCount < popupText.length + 2)
        {
            popupElement.textContent = popupText[clickCount - 2];
        } else
        {
            popupElement.textContent = `GODLIKE x${clickCount}${exclaimationText}`;
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

            clickCount = 0;
        }, 2000);
    }
});

