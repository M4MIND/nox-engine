import { BaseMesh } from '@nox-engine/renderer';
import { AttributeDescriptorFormat } from '@nox-engine/renderer/src/mesh/descriptor/AttributeDescriptor';

export default class Mesh extends BaseMesh {
    constructor() {
        super();

        this.createAttributeDescriptor('_A_Position', AttributeDescriptorFormat.Float32, 3);
    }
}
