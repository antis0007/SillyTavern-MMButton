/**
 * SillyTavern Extension
 * Adds a (+) upload button to the left side of the chat input.
 * Uses native #attachFile handler.
 */

const BUTTON_ID = 'mmPlusButton';
const CORE_ATTACH_ID = 'attachFile';

/**
 * Inject the (+) button in correct position
 */
function injectPlusButton() {
    if (document.getElementById(BUTTON_ID)) return;

    const optionsButton = document.getElementById('options_button');
    const extensionsButton = document.getElementById('extensionsMenuButton');

    if (!optionsButton && !extensionsButton) return;

    const plusButton = document.createElement('div');
    plusButton.id = BUTTON_ID;
    plusButton.classList.add('interactable');
    plusButton.setAttribute('tabindex', '0');
    plusButton.setAttribute('title', 'Attach File');

    plusButton.innerHTML = `
        <div style="font-size:28px;font-weight:bold;line-height:1;">+</div>
    `;

    plusButton.addEventListener('click', () => {
        const attachButton = document.getElementById(CORE_ATTACH_ID);
        if (attachButton) {
            attachButton.click();
        } else {
            console.warn('[MMButton] #attachFile not found.');
        }
    });

    // Insert after extensions button if it exists
    if (extensionsButton) {
        extensionsButton.insertAdjacentElement('afterend', plusButton);
    }
    // Otherwise insert after options button
    else if (optionsButton) {
        optionsButton.insertAdjacentElement('afterend', plusButton);
    }
}

/**
 * Observe DOM for when buttons appear
 */
function observeUI() {
    const observer = new MutationObserver(() => {
        injectPlusButton();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Try immediately too
    injectPlusButton();
}

jQuery(() => {
    observeUI();
});