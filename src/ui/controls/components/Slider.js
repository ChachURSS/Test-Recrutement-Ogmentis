export const createSlider = (label, { min, max, step, defaultValue, onChange }) => {
    const container = document.createElement('div');
    container.style.marginBottom = '20px';
    container.style.color = 'white';

    const labelElement = document.createElement('label');
    labelElement.textContent = label;
    labelElement.style.display = 'block';
    labelElement.style.marginBottom = '5px';

    const valueDisplay = document.createElement('span');
    valueDisplay.textContent = defaultValue;
    valueDisplay.style.marginLeft = '10px';

    const slider = document.createElement('input');
    Object.assign(slider, {
        type: 'range',
        min: min,
        max: max,
        step: step,
        value: defaultValue
    });

    Object.assign(slider.style, {
        width: '100%',
        height: '20px'
    });

    slider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        valueDisplay.textContent = value.toFixed(1);
        onChange(value);
    });

    labelElement.appendChild(valueDisplay);
    container.appendChild(labelElement);
    container.appendChild(slider);
    
    return container;
};