import { createStyledButton } from './utils.js';

export default class MenuUI {
    constructor(onReset) {
        this.menuContainer = null;
        this.menu = null;
        this.onReset = onReset;
        this.init();
    }

    init() {
        this.createMenuContainer();
        this.createToggleButton();
        this.createMenu();
        this.createResetButton(); 
    }

    createMenuContainer() {
        this.menuContainer = document.createElement('div');
        Object.assign(this.menuContainer.style, {
            position: 'absolute',
            top: '0',
            right: '0',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            zIndex: '1000'
        });
    }

    createToggleButton() {
        const menuToggle = createStyledButton('☰', {
            position: 'absolute',
            right: '10px',
            top: '10px',
            zIndex: '1001'
        });

        let isMenuOpen = false;
        menuToggle.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            this.menu.style.right = isMenuOpen ? '0' : '-300px';
            menuToggle.innerHTML = isMenuOpen ? '×' : '☰';
        });

        this.menuContainer.appendChild(menuToggle);
    }

    createMenu() {
        this.menu = document.createElement('div');
        Object.assign(this.menu.style, {
            position: 'absolute',
            top: '0',
            right: '-300px',
            width: '300px',
            height: '100%',
            backgroundColor: 'rgba(51, 51, 51, 0.95)',
            transition: 'right 0.3s ease-in-out',
            padding: '60px 20px 20px 20px',
            boxSizing: 'border-box',
            color: 'white'
        });

        this.menuContainer.appendChild(this.menu);
        document.body.appendChild(this.menuContainer);
    }

    addButton(text, onClick) {
        const button = createStyledButton(text, {
            width: '100%',
            marginBottom: '10px'
        });
        button.addEventListener('click', onClick);
        this.menu.appendChild(button);
        return button;
    }

    createResetButton() {
        const resetButton = createStyledButton('Reset Model', {
            width: '100%',
            marginBottom: '10px'
        });
        
        resetButton.addEventListener('click', () => {
            if (this.onReset) {
                this.onReset();
            }
        });

        this.menu.appendChild(resetButton);
    }

}