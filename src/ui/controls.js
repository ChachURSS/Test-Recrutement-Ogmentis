import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class Controls {
    constructor(model, camera, renderer) {
        this.model = model;
        this.camera = camera;
        this.renderer = renderer;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.selectedPoint = null;
        this.isDragging = false;
        this.orbitControls = new OrbitControls(camera, renderer.domElement);
        
        this.initUI();
        this.initEvents();
    }

    initUI() {
        // Créer le conteneur du menu
        const menuContainer = document.createElement('div');
        menuContainer.style.position = 'absolute';
        menuContainer.style.top = '0';
        menuContainer.style.right = '0';
        menuContainer.style.height = '100%';
        menuContainer.style.display = 'flex';
        menuContainer.style.flexDirection = 'column';
        menuContainer.style.zIndex = '1000';

        // Créer le bouton pour ouvrir/fermer le menu
        const menuToggle = document.createElement('button');
        menuToggle.innerHTML = '☰';
        menuToggle.style.position = 'absolute';
        menuToggle.style.right = '10px';
        menuToggle.style.top = '10px';
        menuToggle.style.padding = '10px';
        menuToggle.style.backgroundColor = '#444';
        menuToggle.style.color = 'white';
        menuToggle.style.border = 'none';
        menuToggle.style.borderRadius = '5px';
        menuToggle.style.cursor = 'pointer';
        menuToggle.style.zIndex = '1001';

        // Créer le menu principal
        const menu = document.createElement('div');
        menu.style.position = 'absolute';
        menu.style.top = '0';
        menu.style.right = '-300px'; // Caché par défaut
        menu.style.width = '300px';
        menu.style.height = '100%';
        menu.style.backgroundColor = 'rgba(51, 51, 51, 0.95)';
        menu.style.transition = 'right 0.3s ease-in-out';
        menu.style.padding = '60px 20px 20px 20px';
        menu.style.boxSizing = 'border-box';
        menu.style.color = 'white';

        // Bouton reset
        const resetButton = document.createElement('button');
        resetButton.innerText = 'Reset Model';
        resetButton.style.width = '100%';
        resetButton.style.padding = '10px';
        resetButton.style.marginBottom = '10px';
        resetButton.style.backgroundColor = '#666';
        resetButton.style.color = 'white';
        resetButton.style.border = 'none';
        resetButton.style.borderRadius = '5px';
        resetButton.style.cursor = 'pointer';
        
        // Confirmer
        const confirmationPopup = document.createElement('div');
        confirmationPopup.style.display = 'none';
        confirmationPopup.style.position = 'fixed';
        confirmationPopup.style.left = '50%';
        confirmationPopup.style.top = '50%';
        confirmationPopup.style.transform = 'translate(-50%, -50%)';
        confirmationPopup.style.backgroundColor = '#444';
        confirmationPopup.style.padding = '20px';
        confirmationPopup.style.borderRadius = '10px';
        confirmationPopup.style.zIndex = '2000';
        confirmationPopup.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';

        // Contenu popup
        const popupText = document.createElement('p');
        popupText.textContent = 'Are you sure you want to reset the model?';
        popupText.style.color = 'white';
        popupText.style.marginBottom = '15px';

        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '10px';
        buttonContainer.style.justifyContent = 'center';

        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Confirm';
        confirmButton.style.padding = '8px 15px';
        confirmButton.style.backgroundColor = '#4CAF50';
        confirmButton.style.border = 'none';
        confirmButton.style.borderRadius = '5px';
        confirmButton.style.color = 'white';
        confirmButton.style.cursor = 'pointer';

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.style.padding = '8px 15px';
        cancelButton.style.backgroundColor = '#f44336';
        cancelButton.style.border = 'none';
        cancelButton.style.borderRadius = '5px';
        cancelButton.style.color = 'white';
        cancelButton.style.cursor = 'pointer';

        // Overlay
        const overlay = document.createElement('div');
        overlay.style.display = 'none';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
        overlay.style.zIndex = '1999';

        // Evenments
        resetButton.addEventListener('click', () => {
            confirmationPopup.style.display = 'block';
            overlay.style.display = 'block';
        });

        confirmButton.addEventListener('click', () => {
            this.model.reset();
            confirmationPopup.style.display = 'none';
            overlay.style.display = 'none';
        });

        cancelButton.addEventListener('click', () => {
            confirmationPopup.style.display = 'none';
            overlay.style.display = 'none';
        });

        buttonContainer.appendChild(confirmButton);
        buttonContainer.appendChild(cancelButton);
        confirmationPopup.appendChild(popupText);
        confirmationPopup.appendChild(buttonContainer);

        document.body.appendChild(overlay);
        document.body.appendChild(confirmationPopup);
        menu.appendChild(resetButton);

        // Gestion de l'ouverture/fermeture du menu
        let isMenuOpen = false;
        menuToggle.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            menu.style.right = isMenuOpen ? '0' : '-300px';
            menuToggle.innerHTML = isMenuOpen ? '×' : '☰';
        });

        // Ajouter les éléments au menu
        menu.appendChild(resetButton);
        menuContainer.appendChild(menuToggle);
        menuContainer.appendChild(menu);
        document.body.appendChild(menuContainer);

        // Créer le slider de déformation 
        const sliderContainer = document.createElement('div');
        sliderContainer.style.position = 'absolute';
        sliderContainer.style.top = '10px';
        sliderContainer.style.left = '10px';
        sliderContainer.style.padding = '10px';
        sliderContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        sliderContainer.style.borderRadius = '5px';

        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = '0';
        slider.max = '1';
        slider.step = '0.01';
        slider.value = '0';
        slider.addEventListener('input', (e) => {
            this.model.applyDeformation(parseFloat(e.target.value));
        });

        const label = document.createElement('div');
        label.textContent = 'Deformation';
        
        sliderContainer.appendChild(label);
        sliderContainer.appendChild(slider);
        document.body.appendChild(sliderContainer);
    }

    initEvents() {
        const canvas = this.renderer.domElement;
        
        canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        canvas.addEventListener('mouseup', () => this.onMouseUp());
    }

    onMouseDown(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObject(this.model.getMesh());

        if (intersects.length > 0) {
            this.orbitControls.enabled = false;
            this.isDragging = true;
            this.selectedPoint = intersects[0].point;
        }
    }

    onMouseMove(event) {
        if (this.isDragging && this.selectedPoint) {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            this.raycaster.setFromCamera(this.mouse, this.camera);
            const intersects = this.raycaster.intersectObject(this.model.getMesh());

            if (intersects.length > 0) {
                const newPosition = intersects[0].point;
                this.model.deformAtPoint(this.selectedPoint, newPosition);
            }
        }
    }

    onMouseUp() {
        this.isDragging = false;
        this.selectedPoint = null;
        this.orbitControls.enabled = true;
    }

    resetModel() {
        this.model.reset();
    }
}

export default Controls;