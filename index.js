/**
 * SillyTavern Extension
 * Adds a (+) upload button to the left side of the chat input.
 * Uses native #attachFile handler.
 */

const BUTTON_ID = 'mmPlusButton';
const CORE_ATTACH_ID = 'attachFile';

/**
 * Inject the (+) button
 */
function injectPlusButton() {
    if (document.getElementById(BUTTON_ID)) return;

    const leftForm = document.getElementById('leftSendForm');
    if (!leftForm) return;

    const plusButton = document.createElement('div');
    plusButton.id = BUTTON_ID;

    // Match native ST icon buttons
    plusButton.className = 'fa-solid fa-plus interactable';
    plusButton.setAttribute('tabindex', '0');
    plusButton.setAttribute('title', 'Attach File');

    // Match sizing of other left buttons
    plusButton.style.display = 'inline-flex';
    plusButton.style.alignItems = 'center';
    plusButton.style.justifyContent = 'center';
    plusButton.style.width = '32px';
    plusButton.style.height = '32px';
    plusButton.style.minWidth = '32px';
    plusButton.style.minHeight = '32px';
    plusButton.style.margin = '0 2px';
    plusButton.style.flexShrink = '0';

    // Push to end of flex row
    plusButton.style.order = '999';

    plusButton.addEventListener('click', () => {
        const attachButton = document.getElementById(CORE_ATTACH_ID);
        if (attachButton) {
            attachButton.click();
        } else {
            console.warn('[MMButton] #attachFile not found.');
        }
    });

    leftForm.appendChild(plusButton);
}

/**
 * Observe DOM changes so button survives UI rebuilds
 */
function observeUI() {
    const observer = new MutationObserver(() => {
        injectPlusButton();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    injectPlusButton();
}

jQuery(() => {
    observeUI();
});