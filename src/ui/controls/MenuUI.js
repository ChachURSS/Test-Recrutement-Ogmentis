import { createStyledButton } from './utils.js';

export default class MenuUI {
    constructor(onReset) {
        this.menuContainer = null;
        this.menu = null;
        this.onReset = onReset;
        this.init();
    }

    init() {
        this.menuOpen = false;
        this.settingsOpen = false;
        this.createMenuContainer();
        this.createToggleButton();
        this.createSettingsButton();
        this.createMenu();
        this.createSettingsMenu();
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
        const buttonStyles = {
            width: '40px',
            height: '40px',
            backgroundColor: '#666',
            border: 'none',
            borderRadius: '5px',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0',
            transition: 'background-color 0.3s ease',
            position: 'absolute',
            right: '10px',
            top: '10px',
            zIndex: '1001'
        };

        const toggle = document.createElement('button');
        toggle.textContent = '☰';
        Object.assign(toggle.style, buttonStyles);

        toggle.addEventListener('click', () => {
            this.menuOpen = !this.menuOpen;
            if (this.menuOpen && this.settingsOpen) {
                this.settingsOpen = false;
                this.settingsMenu.style.right = '-300px';
                this.settingsToggle.style.backgroundColor = '#666';
            }
            this.menu.style.right = this.menuOpen ? '0' : '-300px';
            toggle.style.backgroundColor = this.menuOpen ? '#888' : '#666';
        });

        this.menuContainer.appendChild(toggle);
        this.menuToggle = toggle;
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
        const resetButton = createStyledButton('Réinitialisation', {
            marginTop: '20px',
            width: '100%' // Pour le bouton reset qui est dans le menu
        });
        
        resetButton.addEventListener('click', this.onReset);
        this.menu.appendChild(resetButton);
    }

    createSettingsButton() {
        const buttonStyles = {
            width: '40px',
            height: '40px',
            backgroundColor: '#666',
            border: 'none',
            borderRadius: '5px',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0',
            transition: 'background-color 0.3s ease',
            position: 'absolute',
            right: '10px',
            top: '60px',
            zIndex: '1001'
        };

        const settingsToggle = document.createElement('button');
        settingsToggle.textContent = '⚙️';
        Object.assign(settingsToggle.style, buttonStyles);

        settingsToggle.addEventListener('click', () => {
            this.settingsOpen = !this.settingsOpen;
            if (this.settingsOpen && this.menuOpen) {
                this.menuOpen = false;
                this.menu.style.right = '-300px';
                this.menuToggle.style.backgroundColor = '#666';
            }
            this.settingsMenu.style.right = this.settingsOpen ? '0' : '-300px';
            settingsToggle.style.backgroundColor = this.settingsOpen ? '#888' : '#666';
        });

        this.menuContainer.appendChild(settingsToggle);
        this.settingsToggle = settingsToggle;
    }

    createSettingsMenu() {
        this.settingsMenu = document.createElement('div');
        Object.assign(this.settingsMenu.style, {
            position: 'absolute',
            top: '0',
            right: '-300px',
            width: '300px',
            height: '100%',
            backgroundColor: 'rgba(51, 51, 51, 0.95)',
            transition: 'right 0.3s ease-in-out',
            padding: '60px 20px 20px 20px',
            boxSizing: 'border-box',
            color: 'white',
            zIndex: '999' // En dessous du menu principal
        });

        const title = document.createElement('h3');
        title.textContent = 'Paramètres';
        title.style.marginBottom = '20px';

        const colorContainer = document.createElement('div');
        colorContainer.style.marginBottom = '20px';

        const colorLabel = document.createElement('label');
        colorLabel.textContent = 'Couleur du modèle';
        colorLabel.style.display = 'block';
        colorLabel.style.marginBottom = '10px';

        const colorPicker = document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.value = '#00ff00'; // Couleur initiale (vert)
        Object.assign(colorPicker.style, {
            width: '100%',
            height: '40px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
        });

        colorPicker.addEventListener('input', (e) => {
            if (this.model) {
                this.model.getMesh().material.color.setHex(
                    parseInt(e.target.value.substring(1), 16)
                );
            }
        });

        colorContainer.appendChild(colorLabel);
        colorContainer.appendChild(colorPicker);
        this.settingsMenu.appendChild(title);
        this.settingsMenu.appendChild(colorContainer);

        this.menuContainer.appendChild(this.settingsMenu);
    }

    setModel(model) {
        this.model = model;
    }

}