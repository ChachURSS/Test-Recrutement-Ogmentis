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
            if (distance < this.radius) { 
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
    }    increaseVertices() {
        const newGeometry = new THREE.BoxGeometry(1, 1, 1, 
            Math.min(64, this.geometry.parameters.widthSegments + 8), 
            Math.min(64, this.geometry.parameters.heightSegments + 8), 
            Math.min(64, this.geometry.parameters.depthSegments + 8)
        );
        
        this.geometry.dispose();
        this.geometry = newGeometry;
        this.originalPositions = this.geometry.attributes.position.array.slice();
        this.mesh.geometry = this.geometry;
    }

    updateVertices(segments) {
        const newGeometry = new THREE.BoxGeometry(1, 1, 1, segments, segments, segments);
        
        this.geometry.dispose();
        this.geometry = newGeometry;
        this.originalPositions = this.geometry.attributes.position.array.slice();
        this.mesh.geometry = this.geometry;
    }updateShape(shapeType) {
        if (this.geometry) {
            this.geometry.dispose();
        }

        switch(shapeType) {
            case 'cube':
                this.geometry = new THREE.BoxGeometry(1, 1, 1, 8, 8, 8);
                break;
            case 'pyramid':
                this.geometry = new THREE.ConeGeometry(0.7, 1, 4, 3);
                break;
            case 'octahedron':
                this.geometry = new THREE.OctahedronGeometry(0.7, 1);
                break;
            case 'tetrahedron':
                this.geometry = new THREE.TetrahedronGeometry(0.7, 1);
                break;
            default:
                this.geometry = new THREE.BoxGeometry(1, 1, 1, 8, 8, 8);
        }

        this.originalPositions = this.geometry.attributes.position.array.slice();
        this.mesh.geometry = this.geometry;
    }

    countVertices() {
        const positions = this.geometry.attributes.position;
        const uniqueVertices = new Set();
        
        for(let i = 0; i < positions.count; i++) {
            const x = positions.getX(i).toFixed(4);
            const y = positions.getY(i).toFixed(4);
            const z = positions.getZ(i).toFixed(4);
            uniqueVertices.add(`${x},${y},${z}`);
        }
        
        return uniqueVertices.size;
    }
    
    getMesh() {
        return this.mesh;
    }
}

export default DeformableModel;