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
        // Menu de droite
        const menu = document.createElement('div');
        menu.style.position = 'absolute';
        menu.style.top = '10px';
        menu.style.right = '10px';
        menu.style.padding = '10px';
        menu.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        menu.style.borderRadius = '5px';

        // Bouton Reset
        const resetButton = document.createElement('button');
        resetButton.innerText = 'Reset Model';
        resetButton.addEventListener('click', () => this.resetModel());
        menu.appendChild(resetButton);

        // Slider pour la déformation
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.top = '10px';
        container.style.left = '10px';
        container.style.zIndex = '100';

        const deformationSlider = document.createElement('input');
        deformationSlider.type = 'range';
        deformationSlider.min = '0';
        deformationSlider.max = '1';
        deformationSlider.step = '0.01';
        deformationSlider.value = '0';
        deformationSlider.addEventListener('input', (event) => {
            this.model.applyDeformation(event.target.value);
        });

        const label = document.createElement('label');
        label.innerText = 'Deformation Level: ';
        label.appendChild(deformationSlider);

        container.appendChild(label);
        document.body.appendChild(container);
        document.body.appendChild(menu);
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