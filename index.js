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
    plusButton.classList.add('interactable');
    plusButton.setAttribute('tabindex', '0');
    plusButton.setAttribute('title', 'Attach File');

    plusButton.innerHTML = `
        <div style="font-size:28px;font-weight:bold;line-height:1;">+</div>
    `;

    // Match ST button sizing
    plusButton.style.display = 'inline-flex';
    plusButton.style.alignItems = 'center';
    plusButton.style.justifyContent = 'center';
    plusButton.style.width = '32px';
    plusButton.style.height = '32px';
    plusButton.style.minWidth = '32px';
    plusButton.style.minHeight = '32px';
    plusButton.style.margin = '0 2px';
    plusButton.style.flexShrink = '0';

    plusButton.addEventListener('click', () => {
        const attachButton = document.getElementById(CORE_ATTACH_ID);
        if (attachButton) {
            attachButton.click();
        }
    });

    // Insert as FIRST child because flex is row-reverse
    leftForm.insertBefore(plusButton, leftForm.firstChild);
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