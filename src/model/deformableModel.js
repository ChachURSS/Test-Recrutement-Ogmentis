import * as THREE from 'three';

class DeformableModel {
    constructor() {
    this.geometry = new THREE.BoxGeometry(1, 1, 1, 32, 32, 32);
    this.originalPositions = this.geometry.attributes.position.array.slice();
    this.material = new THREE.MeshPhongMaterial({ 
        color: 0x00ff00,
        wireframe: false,
        flatShading: false
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.radius = 0.2;
}

    applyDeformation(deformationAmount) {
        const positionAttribute = this.geometry.attributes.position;
        for (let i = 0; i < positionAttribute.count; i++) {
            const x = positionAttribute.getX(i);
            const y = this.originalPositions[i * 3 + 1];
            const z = positionAttribute.getZ(i);

            positionAttribute.setY(i, y + Math.sin(deformationAmount * Math.PI + x) * 0.5);
        }
        positionAttribute.needsUpdate = true;
    }

    deformAtPoint(selectedPoint, newPosition) {
        const positionAttribute = this.geometry.attributes.position;

        for (let i = 0; i < positionAttribute.count; i++) {
            const x = positionAttribute.getX(i);
            const y = positionAttribute.getY(i);
            const z = positionAttribute.getZ(i);
            const vertex = new THREE.Vector3(x, y, z);

            const distance = selectedPoint.distanceTo(vertex);
            if (distance < this.radius) { // Utilisation de this.radius au lieu de radius
                const influence = 1 - (distance / this.radius);
                vertex.lerp(newPosition, influence * 0.5);
                positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
            }
        }

        positionAttribute.needsUpdate = true;
    }

    reset() {
        const positionAttribute = this.geometry.attributes.position;
        for (let i = 0; i < positionAttribute.count; i++) {
            positionAttribute.setXYZ(
                i,
                this.originalPositions[i * 3],
                this.originalPositions[i * 3 + 1],
                this.originalPositions[i * 3 + 2]
            );
        }
        positionAttribute.needsUpdate = true;
    }

    getMesh() {
        return this.mesh;
    }
}

export default DeformableModel;