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

    const leftForm = document.getElementById('leftSendForm');
    if (!leftForm) return;

    const plusButton = document.createElement('div');
    plusButton.id = BUTTON_ID;
    plusButton.className = 'fa-solid fa-plus interactable';
    plusButton.setAttribute('tabindex', '0');
    plusButton.setAttribute('title', 'Attach File');

    // Make it align to the right edge of leftSendForm
    plusButton.style.marginLeft = 'auto';

    plusButton.addEventListener('click', () => {
        const attachButton = document.getElementById(CORE_ATTACH_ID);
        if (attachButton) attachButton.click();
    });

    leftForm.appendChild(plusButton);
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