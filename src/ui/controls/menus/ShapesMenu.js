export class ShapesMenu {
    constructor(onReset) {
        this.model = null;
        this.onReset = onReset;
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
        });

        select.addEventListener('change', (e) => {
            const selectedShape = shapes.find(s => s.value === e.target.value);
            if (window.deformableModel) {
                window.deformableModel.updateShape(e.target.value);
                verticesInfo.textContent = `Nombre de sommets : ${selectedShape.vertices}`;
                this.onReset();
            }
        });

        verticesInfo.textContent = `Nombre de sommets : ${shapes[0].vertices}`;

        container.appendChild(label);
        container.appendChild(select);
        container.appendChild(verticesInfo);
        
        return container;
    }
}