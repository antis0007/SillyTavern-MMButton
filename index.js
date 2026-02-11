/**
 * SillyTavern Extension
 * Adds a (+) upload button to the left side of the chat input.
 * Uses native #attachFile handler.
 */

const BUTTON_ID = 'mmPlusButton';
const CORE_ATTACH_ID = 'attachFile';

function injectPlusButton() {
    const leftForm = document.getElementById('leftSendForm');
    if (!leftForm) return;

    // Prevent duplicate button
    if (document.getElementById(BUTTON_ID)) return;

    const plusButton = document.createElement('div');
    plusButton.id = BUTTON_ID;
    plusButton.classList.add('interactable');
    plusButton.setAttribute('tabindex', '0');
    plusButton.setAttribute('title', 'Attach File');

    plusButton.innerHTML = `
        <div style="font-size:18px;font-weight:bold;line-height:1;">+</div>
    `;

    plusButton.addEventListener('click', () => {
        const attachButton = document.getElementById(CORE_ATTACH_ID);
        if (attachButton) {
            attachButton.click();
        } else {
            console.warn('[MMButton] #attachFile not found.');
        }
    });

    leftForm.prepend(plusButton);
}

/**
 * Wait until UI is ready before injecting
 */
function waitForUI() {
    const interval = setInterval(() => {
        const leftForm = document.getElementById('leftSendForm');
        if (leftForm) {
            injectPlusButton();
            clearInterval(interval);
        }
    }, 500);
}

jQuery(() => {
    waitForUI();
});
