// /c:/Users/nmons/Projects/policyBook/public/javascripts/edit.js
// GitHub Copilot
// Functions to require a password before allowing editing of a card.
// Usage: initEditAuth({ editButtonSelector, cardSelector, authUrl, saveUrl })

(function () {
    const state = {
        options: {
            editButtonSelector: '.edit-btn',
            cardSelector: '.card',
            authUrl: '/api/cards/:id/authenticate', // POST { password }
            saveUrl: '/api/cards/:id',               // PUT { content }
            modalId: 'pw-auth-modal',
        },
        currentCardId: null,
        currentCardEl: null,
        originalHtml: null,
    };

    // Initialize: pass config overrides
    function initEditAuth(opts = {}) {
        Object.assign(state.options, opts);
        createPasswordModal();
        document.addEventListener('click', handleDocumentClick);
    }

    // Create a simple modal used to ask for password
    function createPasswordModal() {
        if (document.getElementById(state.options.modalId)) return;

        const modal = document.createElement('div');
        modal.id = state.options.modalId;
        modal.style = 'position:fixed;left:0;top:0;width:100%;height:100%;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,0.4);z-index:9999;';
        modal.innerHTML = `
            <div style="background:#fff;padding:16px;border-radius:6px;min-width:280px;box-shadow:0 2px 10px rgba(0,0,0,0.2)">
                <div style="margin-bottom:8px;font-weight:600">Password required</div>
                <input id="pw-auth-input" type="password" placeholder="Password" style="width:100%;padding:8px;margin-bottom:8px;box-sizing:border-box"/>
                <div style="text-align:right">
                    <button id="pw-auth-cancel" style="margin-right:8px">Cancel</button>
                    <button id="pw-auth-submit">Submit</button>
                </div>
                <div id="pw-auth-error" style="color:#c00;margin-top:8px;display:none"></div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('#pw-auth-cancel').addEventListener('click', hidePasswordModal);
        modal.querySelector('#pw-auth-submit').addEventListener('click', onSubmitPassword);
        modal.querySelector('#pw-auth-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') onSubmitPassword();
            if (e.key === 'Escape') hidePasswordModal();
        });
        modal.addEventListener('click', (e) => { if (e.target === modal) hidePasswordModal(); });
    }

    function showPasswordModal(cardId, cardEl) {
        state.currentCardId = cardId;
        state.currentCardEl = cardEl;
        const modal = document.getElementById(state.options.modalId);
        if (!modal) return;
        modal.style.display = 'flex';
        const input = modal.querySelector('#pw-auth-input');
        input.value = '';
        input.focus();
        hideError();
    }

    function hidePasswordModal() {
        const modal = document.getElementById(state.options.modalId);
        if (!modal) return;
        modal.style.display = 'none';
        state.currentCardId = null;
        state.currentCardEl = null;
        hideError();
    }

    function showError(msg) {
        const err = document.querySelector('#pw-auth-error');
        if (!err) return;
        err.textContent = msg;
        err.style.display = 'block';
    }

    function hideError() {
        const err = document.querySelector('#pw-auth-error');
        if (!err) return;
        err.textContent = '';
        err.style.display = 'none';
    }

    async function onSubmitPassword() {
        const input = document.querySelector('#pw-auth-input');
        const password = input ? input.value : '';
        if (!state.currentCardId || !state.currentCardEl) return hidePasswordModal();
        try {
            const ok = await authenticate(state.currentCardId, password);
            if (ok) {
                hidePasswordModal();
                enableEditing(state.currentCardEl);
            } else {
                showError('Incorrect password.');
            }
        } catch (err) {
            showError('Authentication failed.');
            console.error(err);
        }
    }

    // Authenticate password against server endpoint.
    // Expects authUrl to be like '/api/cards/:id/authenticate' or a URL without :id (in which case cardId sent in body).
    async function authenticate(cardId, password) {
        const urlTemplate = state.options.authUrl;
        const hasPlaceholder = urlTemplate.includes(':id');
        const url = hasPlaceholder ? urlTemplate.replace(':id', encodeURIComponent(cardId)) : urlTemplate;
        const body = hasPlaceholder ? { password } : { cardId, password };

        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            credentials: 'same-origin',
        });

        if (!res.ok) {
            // treat 401/403 as auth failure; other errors bubble
            if (res.status === 401 || res.status === 403) return false;
            throw new Error('Auth request failed: ' + res.status);
        }
        const data = await res.json().catch(() => null);
        // server can respond { ok:true } or 200 OK -> accept
        if (data && typeof data.ok !== 'undefined') return !!data.ok;
        return true;
    }

    // Enable editing UI on a card element
    function enableEditing(cardEl) {
        if (!cardEl) return;
        // store original to allow cancel
        state.originalHtml = cardEl.innerHTML;

        // Mark editable fields: any element with data-editable="true" becomes contenteditable
        const editableEls = cardEl.querySelectorAll('[data-editable="true"]');
        editableEls.forEach(el => {
            el.setAttribute('contenteditable', 'true');
            el.classList.add('editable-active');
        });

        // hide edit button and add save/cancel
        const editBtn = cardEl.querySelector(state.options.editButtonSelector);
        if (editBtn) editBtn.style.display = 'none';

        let actions = cardEl.querySelector('.card-edit-actions');
        if (!actions) {
            actions = document.createElement('div');
            actions.className = 'card-edit-actions';
            actions.style = 'margin-top:8px';
            actions.innerHTML = `<button class="card-save-btn">Save</button><button class="card-cancel-btn" style="margin-left:8px">Cancel</button>`;
            cardEl.appendChild(actions);
        }

        actions.querySelector('.card-save-btn').addEventListener('click', onSaveClick);
        actions.querySelector('.card-cancel-btn').addEventListener('click', onCancelClick);
    }

    // Save handler
    async function onSaveClick(e) {
        const cardEl = findAncestorCard(e.target);
        if (!cardEl) return;
        const cardId = cardEl.dataset.cardId || cardEl.getAttribute('data-card-id');
        // collect editable content; simplistic: take innerHTML of each data-editable element keyed by data-field
        const payload = {};
        cardEl.querySelectorAll('[data-editable="true"]').forEach(el => {
            const key = el.dataset.field || el.getAttribute('data-field') || null;
            // if no data-field, store into "content" (if only one)
            const content = el.innerHTML;
            if (key) payload[key] = content;
            else payload.content = content;
        });

        try {
            await saveCard(cardId, payload);
            disableEditing(cardEl);
        } catch (err) {
            console.error('Save failed', err);
            alert('Save failed. See console.');
        }
    }

    // Cancel handler
    function onCancelClick(e) {
        const cardEl = findAncestorCard(e.target);
        if (!cardEl) return;
        // revert saved html
        if (state.originalHtml) cardEl.innerHTML = state.originalHtml;
        disableEditing(cardEl, true);
    }

    // Save to server: PUT to saveUrl (supports :id placeholder)
    async function saveCard(cardId, data) {
        const urlTemplate = state.options.saveUrl;
        const hasPlaceholder = urlTemplate.includes(':id');
        const url = hasPlaceholder ? urlTemplate.replace(':id', encodeURIComponent(cardId)) : urlTemplate;
        const res = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'same-origin',
        });
        if (!res.ok) throw new Error('Save failed: ' + res.status);
        return await res.json().catch(() => null);
    }

    // Disable editing and cleanup
    function disableEditing(cardEl, cancelled = false) {
        if (!cardEl) return;
        cardEl.querySelectorAll('[data-editable="true"]').forEach(el => {
            el.removeAttribute('contenteditable');
            el.classList.remove('editable-active');
        });
        const actions = cardEl.querySelector('.card-edit-actions');
        if (actions) actions.remove();

        const editBtn = cardEl.querySelector(state.options.editButtonSelector);
        if (editBtn) editBtn.style.display = '';

        state.currentCardId = null;
        state.currentCardEl = null;
        state.originalHtml = null;
    }

    // Handle clicks: open modal when edit button clicked
    function handleDocumentClick(e) {
        const editBtn = e.target.closest(state.options.editButtonSelector);
        if (editBtn) {
            const cardEl = findAncestorCard(editBtn);
            if (!cardEl) return;
            const cardId = cardEl.dataset.cardId || cardEl.getAttribute('data-card-id');
            showPasswordModal(cardId, cardEl);
        }
    }

    function findAncestorCard(el) {
        if (!el) return null;
        return el.closest(state.options.cardSelector) || null;
    }

    // Expose public API
    window.EditAuth = {
        init: initEditAuth,
        showPasswordModal,
        hidePasswordModal,
        authenticate, // exported for testing or custom flows
        enableEditing,
        disableEditing,
        saveCard,
    };
})();