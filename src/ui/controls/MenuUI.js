import { createToggleButton, createStyledButton } from './components/Button.js';
import { SettingsMenu } from './menus/SettingsMenu.js';
import { ShapesMenu } from './menus/ShapesMenu.js';
import { RenderingMenu } from './menus/RenderingMenu.js';

export default class MenuUI {
    constructor(onReset) {
        this.menuContainer = null;
        this.menu = null;
        this.onReset = onReset;
        this.model = null;

        this.settingsMenu = new SettingsMenu();
        this.shapesMenu = new ShapesMenu(onReset);
        this.renderingMenu = new RenderingMenu();

        this.init();
    }

    init() {
        this.menuOpen = false;
        this.settingsOpen = false;
        this.createMenuContainer();
        this.createMainMenu();
        this.addToggleButtons();
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

    createMainMenu() {
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

        this.menu.appendChild(this.renderingMenu.getElement());
        this.menu.appendChild(this.shapesMenu.getElement());
        
        const resetButton = createStyledButton('Réinitialisation', {
            marginTop: '20px',
            width: '100%'
        });
        resetButton.addEventListener('click', this.onReset);
        this.menu.appendChild(resetButton);

        this.menuContainer.appendChild(this.menu);
        this.menuContainer.appendChild(this.settingsMenu.getElement());
        document.body.appendChild(this.menuContainer);
    }

    addToggleButtons() {
        const menuToggle = createToggleButton('☰', {
            position: 'top',
            onClick: () => {
                this.menuOpen = !this.menuOpen;
                if (this.menuOpen && this.settingsOpen) {
                    this.settingsOpen = false;
                    this.settingsMenu.getElement().style.right = '-300px';
                    this.settingsToggle.style.backgroundColor = '#666';
                }
                this.menu.style.right = this.menuOpen ? '0' : '-300px';
                menuToggle.style.backgroundColor = this.menuOpen ? '#888' : '#666';
            }
        });

        const settingsToggle = createToggleButton('⚙️', {
            position: 'bottom',
            onClick: () => {
                this.settingsOpen = !this.settingsOpen;
                if (this.settingsOpen && this.menuOpen) {
                    this.menuOpen = false;
                    this.menu.style.right = '-300px';
                    menuToggle.style.backgroundColor = '#666';
                }
                this.settingsMenu.getElement().style.right = this.settingsOpen ? '0' : '-300px';
                settingsToggle.style.backgroundColor = this.settingsOpen ? '#888' : '#666';
            }
        });

        this.menuContainer.appendChild(menuToggle);
        this.menuContainer.appendChild(settingsToggle);
        this.menuToggle = menuToggle;
        this.settingsToggle = settingsToggle;
    }

    setModel(model) {
        this.model = model;
        this.settingsMenu.setModel(model);
        this.shapesMenu.setModel(model);
        this.renderingMenu.setModel(model);
    }
}