export class SettingsMenu {
    constructor() {
        this.model = null;
        this.menu = this.createMenu();
    }

    setModel(model) {
        this.model = model;
    }

    getElement() {
        return this.menu;
    }

    createMenu() {
        const menu = document.createElement('div');
        Object.assign(menu.style, {
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
            zIndex: '999'
        });

        const title = document.createElement('h3');
        title.textContent = 'Paramètres';
        title.style.marginBottom = '20px';

        const colorContainer = this.createColorPicker();

        menu.appendChild(title);
        menu.appendChild(colorContainer);

        return menu;
    }

    createColorPicker() {
        const colorContainer = document.createElement('div');
        colorContainer.style.marginBottom = '20px';

        const colorLabel = document.createElement('label');
        colorLabel.textContent = 'Couleur du modèle';
        colorLabel.style.display = 'block';
        colorLabel.style.marginBottom = '10px';

        const colorPicker = document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.value = '#00ff00';
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
        return colorContainer;
    }
}