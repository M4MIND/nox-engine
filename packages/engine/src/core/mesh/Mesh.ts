import Vector3 from '../../mathf/Vector3';
import BaseMesh from '../../server/renderer/mesh/BaseMesh';
import {
    VertexAttributeSrcData,
    VertexTypeUsage,
} from '../../server/renderer/shader/attribute/VertexAttributeDescriptor';

export default class Mesh extends BaseMesh {
    private _vertices: Vector3[] = [];
    private _indices: number[] = [];
    private _normals: Vector3[] = [];

    public get vertices(): Vector3[] {
        return this._vertices;
    }

    public set vertices(value: Vector3[]) {
        this._vertices = value;
    }

    public get indices(): number[] {
        return this._indices;
    }

    public set indices(value: number[]) {
        this._indices = value;
    }

    public get normals(): Vector3[] {
        return this._normals;
    }

    public set normals(value: Vector3[]) {
        this._normals = value;
    }

    constructor() {
        super();

        this.createAttributeDescriptor('Position', VertexAttributeSrcData.Float32, 3, VertexTypeUsage.STATIC_DRAW);
        this.createAttributeDescriptor('Normals', VertexAttributeSrcData.Float32, 3, VertexTypeUsage.STATIC_DRAW);
        this.createIndicesDescriptor('Indices', VertexAttributeSrcData.UInt16, VertexTypeUsage.STATIC_DRAW);

        this.createBuffer('Position');
        this.createBuffer('Normals');
        this.createBuffer('Indices');
    }
}
