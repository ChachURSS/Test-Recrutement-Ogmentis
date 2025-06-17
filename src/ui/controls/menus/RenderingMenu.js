import { createSlider } from '../components/Slider.js';

export class RenderingMenu {
    constructor() {
        this.model = null;
        this.container = this.createContainer();
    }

    setModel(model) {
        this.model = model;
    }

    getElement() {
        return this.container;
    }

    createContainer() {
        const container = document.createElement('div');

        this.addRenderingOptions(container);
        this.addRadiusSlider(container);

        return container;
    }

    addRenderingOptions(container) {
        const optionsContainer = document.createElement('div');
        optionsContainer.style.marginBottom = '20px';
        optionsContainer.style.color = 'white';

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

        shadowContainer.appendChild(shadowCheckbox);
        shadowContainer.appendChild(shadowLabel);
        wireframeContainer.appendChild(wireframeCheckbox);
        wireframeContainer.appendChild(wireframeLabel);
        optionsContainer.appendChild(shadowContainer);
        optionsContainer.appendChild(wireframeContainer);
        container.appendChild(optionsContainer);
    }

    addRadiusSlider(container) {
        const slider = createSlider('Rayon de déformation', {
            min: '0.1',
            max: '2',
            step: '0.1',
            defaultValue: this.model?.radius || '0.5',
            onChange: (value) => {
                if (this.model) {
                    this.model.radius = value;
                }
            }
        });
        container.appendChild(slider);
    }
}