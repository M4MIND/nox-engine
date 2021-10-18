import { Vector3 } from '@nox-engine/mathf';
import { BaseMesh } from '@nox-engine/renderer';
import { AttributeDescriptorFormat } from '@nox-engine/renderer/src/mesh/descriptor/AttributeDescriptor';

export default class Mesh extends BaseMesh {
    public vertices: Vector3[] = [];
    public normals: Vector3[] = [];
    public triangles: number[] = [];

    constructor() {
        super();

        this.createAttributeDescriptor('_A_Position', AttributeDescriptorFormat.Float32, 3);
    }
}
