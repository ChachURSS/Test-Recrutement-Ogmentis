export default class PopupUI {
    constructor() {
        this.popup = null;
        this.overlay = null;
        this.init();
    }

    init() {
        this.createOverlay();
        this.createPopup();
    }

    createOverlay() {
        this.overlay = document.createElement('div');
        Object.assign(this.overlay.style, {
            display: 'none',
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: '1999'
        });
        document.body.appendChild(this.overlay);
    }

    createPopup() {
        this.popup = document.createElement('div');
        Object.assign(this.popup.style, {
            display: 'none',
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#444',
            padding: '20px',
            borderRadius: '10px',
            zIndex: '2000',
            boxShadow: '0 0 20px rgba(0,0,0,0.5)'
        });
        document.body.appendChild(this.popup);
    }

    show(message, onConfirm, onCancel) {
        this.popup.innerHTML = '';
        this.createContent(message, onConfirm, onCancel);
        this.popup.style.display = 'block';
        this.overlay.style.display = 'block';
    }

    hide() {
        this.popup.style.display = 'none';
        this.overlay.style.display = 'none';
    }

    createContent(message, onConfirm, onCancel) {
        const text = document.createElement('p');
        text.textContent = message;
        text.style.color = 'white';
        text.style.marginBottom = '15px';

        const buttonContainer = document.createElement('div');
        Object.assign(buttonContainer.style, {
            display: 'flex',
            gap: '10px',
            justifyContent: 'center'
        });

        const buttons = {
            confirm: { text: 'Confirm', color: '#4CAF50', handler: onConfirm },
            cancel: { text: 'Cancel', color: '#f44336', handler: onCancel }
        };

        Object.entries(buttons).forEach(([key, { text, color, handler }]) => {
            const button = document.createElement('button');
            Object.assign(button.style, {
                padding: '8px 15px',
                backgroundColor: color,
                border: 'none',
                borderRadius: '5px',
                color: 'white',
                cursor: 'pointer'
            });
            button.textContent = text;
            button.addEventListener('click', () => {
                handler();
                this.hide();
            });
            buttonContainer.appendChild(button);
        });

        this.popup.appendChild(text);
        this.popup.appendChild(buttonContainer);
    }
}