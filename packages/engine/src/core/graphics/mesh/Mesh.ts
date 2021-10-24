import { Vector3 } from '@nox-engine/mathf';
import { AttributeDescriptorFormat, BaseMesh } from '@nox-engine/renderer';

export default class Mesh extends BaseMesh {
    private _vertices: Vector3[] = [];
    private _normals: Vector3[] = [];
    private _triangles: number[] = [];

    public get vertices(): Vector3[] {
        return this._vertices;
    }

    public set vertices(value: Vector3[]) {
        this._vertices = value;
        this.getAttributeDescriptor('_A_Position')?.set(value.flat());
    }

    public get normals(): Vector3[] {
        return this._normals;
    }

    public set normals(value: Vector3[]) {
        this._normals = value;

        this.getAttributeDescriptor('_A_Normal')?.set(value.flat());
    }

    public get triangles(): number[] {
        return this._triangles;
    }

    public set triangles(value: number[]) {
        this._triangles = value;

        this.indicesDescriptor.set(value);
    }

    constructor() {
        super();

        this.createAttributeDescriptor('_A_Position', AttributeDescriptorFormat.Float32, 3);
        this.createAttributeDescriptor('_A_Normal', AttributeDescriptorFormat.Float32, 3);
    }
}
