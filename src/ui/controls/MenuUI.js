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

        this.createRenderingOptions();
        this.createRadiusSlider();
        this.createShapeSelector(); 

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
            width: '100%' 
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


    createRenderingOptions() {
    const optionsContainer = document.createElement('div');
    optionsContainer.style.marginBottom = '20px';
    optionsContainer.style.color = 'white';

    // Option pour les ombres
    const shadowContainer = document.createElement('div');
    shadowContainer.style.marginBottom = '10px';
    const shadowCheckbox = document.createElement('input');
    shadowCheckbox.type = 'checkbox';
    shadowCheckbox.id = 'shadows';
    const shadowLabel = document.createElement('label');
    shadowLabel.htmlFor = 'shadows';
    shadowLabel.textContent = ' Ombres sur les faces';
    shadowLabel.style.marginLeft = '8px';

    shadowCheckbox.addEventListener('change', (e) => {
        if (this.model) {
            this.model.getMesh().material.flatShading = e.target.checked;
            this.model.getMesh().material.needsUpdate = true;
        }
    });

    // Option pour les arêtes
    const wireframeContainer = document.createElement('div');
    const wireframeCheckbox = document.createElement('input');
    wireframeCheckbox.type = 'checkbox';
    wireframeCheckbox.id = 'wireframe';
    const wireframeLabel = document.createElement('label');
    wireframeLabel.htmlFor = 'wireframe';
    wireframeLabel.textContent = ' Afficher les arêtes';
    wireframeLabel.style.marginLeft = '8px';

    wireframeCheckbox.addEventListener('change', (e) => {
        if (this.model) {
            this.model.getMesh().material.wireframe = e.target.checked;
        }
    });

    // Assemblage des éléments
    shadowContainer.appendChild(shadowCheckbox);
    shadowContainer.appendChild(shadowLabel);
    wireframeContainer.appendChild(wireframeCheckbox);
    wireframeContainer.appendChild(wireframeLabel);
    optionsContainer.appendChild(shadowContainer);
    optionsContainer.appendChild(wireframeContainer);
    this.menu.appendChild(optionsContainer);
}
    createRadiusSlider() {
    const radiusContainer = document.createElement('div');
    radiusContainer.style.marginBottom = '20px';
    radiusContainer.style.color = 'white';

    const radiusLabel = document.createElement('label');
    radiusLabel.textContent = 'Rayon de déformation: ';
    radiusLabel.style.display = 'block';
    radiusLabel.style.marginBottom = '5px';

    const valueDisplay = document.createElement('span');
    valueDisplay.textContent = this.model?.radius || '0.5';
    valueDisplay.style.marginLeft = '10px';

    const slider = document.createElement('input');
    Object.assign(slider, {
        type: 'range',
        min: '0.1',
        max: '2',
        step: '0.1',
        value: this.model?.radius || '0.5'
    });

    Object.assign(slider.style, {
        width: '100%',
        height: '20px'
    });

    slider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        valueDisplay.textContent = value.toFixed(1);
        if (this.model) {
            this.model.radius = value;
        }
    });

    radiusLabel.appendChild(valueDisplay);
    radiusContainer.appendChild(radiusLabel);
    radiusContainer.appendChild(slider);
    this.menu.appendChild(radiusContainer);
}

createIncreaseVerticesButton() {
        const button = createStyledButton('+ Sommets', () => {
            if (window.deformableModel) {
                window.deformableModel.increaseVertices();
                this.onReset(); 
            }
        });
        this.menu.appendChild(button);
    }

createShapeSelector() {
        const container = document.createElement('div');
        Object.assign(container.style, {
            margin: '20px 0',
            color: 'white'
        });

        const label = document.createElement('div');
        label.textContent = 'Type de forme';
        label.style.marginBottom = '10px';

        const shapes = [
            { name: 'Cube', value: 'cube', vertices: 8 },
            { name: 'Pyramide', value: 'pyramid', vertices: 5 },
            { name: 'Octaèdre', value: 'octahedron', vertices: 6 },
            { name: 'Tétraèdre', value: 'tetrahedron', vertices: 4 }
        ];

        const select = document.createElement('select');
        Object.assign(select.style, {
            width: '100%',
            padding: '5px',
            backgroundColor: '#444',
            color: 'white',
            border: '1px solid #666',
            borderRadius: '4px'
        });

        const verticesInfo = document.createElement('div');
        verticesInfo.style.marginTop = '5px';
        verticesInfo.style.fontSize = '0.9em';
        verticesInfo.style.color = '#aaa';

        shapes.forEach(shape => {
            const option = document.createElement('option');
            option.value = shape.value;
            option.text = shape.name;
            select.appendChild(option);
        });        select.addEventListener('change', (e) => {
            const selectedShape = shapes.find(s => s.value === e.target.value);
            console.log('Changement de forme:', e.target.value);
            if (window.deformableModel) {
                console.log('deformableModel trouvé');
                window.deformableModel.updateShape(e.target.value);
                verticesInfo.textContent = `Nombre de sommets : ${selectedShape.vertices}`;
                this.onReset(); 
            } else {
                console.error('deformableModel non trouvé');
            }
        });


        verticesInfo.textContent = `Nombre de sommets : ${shapes[0].vertices}`;

        container.appendChild(label);
        container.appendChild(select);
        container.appendChild(verticesInfo);
        this.menu.appendChild(container);
    }

}