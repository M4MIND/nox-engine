import Vector3 from '../../mathf/Vector3';
import BaseMesh from '../../server/renderer/mesh/BaseMesh';
import {
    VertexAttributeSrcData,
    VertexTypeUsage,
} from '../../server/renderer/shader/attribute/VertexAttributeDescriptor';

export default class Mesh extends BaseMesh {
    public vertices: Vector3[] = [];
    public indices: number[] = [];

    constructor() {
        super();

        this.createAttributeDescriptor('Position', VertexAttributeSrcData.Float32, 3, VertexTypeUsage.STATIC_DRAW);
        this.createIndicesDescriptor('Indices', VertexAttributeSrcData.UInt16, VertexTypeUsage.STATIC_DRAW);

        this.createBuffer('Position');
        this.createBuffer('Indices');
    }
}
