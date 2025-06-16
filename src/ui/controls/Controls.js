import MenuUI from './MenuUI.js';
import PopupUI from './PopupUI.js';
import SliderUI from './SliderUI.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default class Controls {
    constructor(model, camera, renderer) {
        this.model = model;
        this.camera = camera;
        this.renderer = renderer;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.selectedPoint = null;
        this.isDragging = false;
        
        this.initializeComponents();
        this.initializeOrbitControls();
        this.initializeEvents();
    }

    initializeComponents() {
        this.popup = new PopupUI();
        this.menu = new MenuUI(() => {
            this.popup.show(
                'Êtes vus sûr de vouloir réinitialiser le modèle ?',
                () => this.model.reset(),
                () => {}
            );
        });
        this.menu.setModel(this.model); 
        this.slider = new SliderUI((value) => {
            this.model.applyDeformation(value);
        });
    }

    initializeOrbitControls() {
        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    }

    initializeEvents() {
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
            this.isDragging = true;
            this.selectedPoint = intersects[0].point;
            this.orbitControls.enabled = false;
        }
    }

    onMouseMove(event) {
        if (this.isDragging && this.selectedPoint) {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            this.raycaster.setFromCamera(this.mouse, this.camera);
            const intersects = this.raycaster.intersectObject(this.model.getMesh());

            if (intersects.length > 0) {
                this.model.deformAtPoint(this.selectedPoint, intersects[0].point);
            }
        }
    }

    onMouseUp() {
        this.isDragging = false;
        this.selectedPoint = null;
        this.orbitControls.enabled = true;
    }
}