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

    const rightForm = document.getElementById('rightSendForm');
    if (!rightForm) return;

    const plusButton = document.createElement('div');
    plusButton.id = BUTTON_ID;
    plusButton.className = 'fa-solid fa-plus interactable';
    plusButton.setAttribute('tabindex', '0');
    plusButton.setAttribute('title', 'Attach File');

    plusButton.addEventListener('click', () => {
        const attachButton = document.getElementById(CORE_ATTACH_ID);
        if (attachButton) attachButton.click();
    });

    // Insert before send button
    const sendButton = document.getElementById('send_but');
    if (sendButton) {
        rightForm.insertBefore(plusButton, sendButton);
    } else {
        rightForm.appendChild(plusButton);
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