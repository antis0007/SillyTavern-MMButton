/**
 * SillyTavern Extension
 * Adds a (+) upload button to the left side of the chat input.
 * Uses native #attachFile handler from core.
 */

import { eventSource, event_types } from '../../../../script.js';

const BUTTON_ID = 'quickUploadPlus';
const CORE_ATTACH_ID = 'attachFile';

/**
 * Inject the (+) button into #leftSendForm
 */
function injectPlusButton() {
    const leftForm = document.getElementById('leftSendForm');
    if (!leftForm) return;

    // Prevent duplicate injection
    if (document.getElementById(BUTTON_ID)) return;

    const plusButton = document.createElement('div');
    plusButton.id = BUTTON_ID;
    plusButton.classList.add('interactable');
    plusButton.setAttribute('tabindex', '0');
    plusButton.setAttribute('title', 'Attach File');

    // Simple inline "+" (you can replace later with icon)
    plusButton.innerHTML = `
        <div style="font-size:18px;font-weight:bold;line-height:1;">+</div>
    `;

    // Click triggers core #attachFile handler
    plusButton.addEventListener('click', () => {
        const attachButton = document.getElementById(CORE_ATTACH_ID);
        if (attachButton) {
            attachButton.click();
        } else {
            console.warn('[PlusUpload] #attachFile not found.');
        }
    });

    // Insert at far left
    leftForm.prepend(plusButton);
}

/**
 * Re-inject button when chat reloads
 */
function registerHooks() {
    eventSource.on(event_types.CHAT_CHANGED, injectPlusButton);
    eventSource.on(event_types.SETTINGS_UPDATED, injectPlusButton);
}

/**
 * Initialize extension
 */
jQuery(() => {
    injectPlusButton();
    registerHooks();
});
