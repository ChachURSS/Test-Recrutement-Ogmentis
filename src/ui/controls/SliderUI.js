export default class SliderUI {
    constructor(onValueChange) {
        this.container = null;
        this.slider = null;
        this.onValueChange = onValueChange;
        this.init();
    }

    init() {
        this.createContainer();
        this.createSlider();
        this.createLabel();
        document.body.appendChild(this.container);
    }

    createContainer() {
        this.container = document.createElement('div');
        Object.assign(this.container.style, {
            position: 'absolute',
            top: '10px',
            left: '10px',
            padding: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '5px',
            zIndex: '1000'
        });
    }

    createSlider() {
        this.slider = document.createElement('input');
        Object.assign(this.slider, {
            type: 'range',
            min: '0',
            max: '1',
            step: '0.01',
            value: '0'
        });
        
        this.slider.addEventListener('input', (e) => {
            this.onValueChange(parseFloat(e.target.value));
        });
    }

    createLabel() {
        const label = document.createElement('div');
        label.textContent = 'Deformation';
        label.style.marginBottom = '5px';
        
        this.container.appendChild(label);
        this.container.appendChild(this.slider);
    }

    getValue() {
        return parseFloat(this.slider.value);
    }

    setValue(value) {
        this.slider.value = value;
    }
}