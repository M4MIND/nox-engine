import Vector3 from '../../../mathf/Vector3';
import VertexAttributeDescriptor, {
    VertexAttribute,
    VertexAttributeFormat,
} from '../shader/attribute/VertexAttributeDescriptor';

export default class Mesh {
    private attributes: { [index: string]: VertexAttributeDescriptor } = {};
    private _vertices: Vector3[] = [];
    private _triangles: number[] = [];

    public get vertices(): Vector3[] {
        return this._vertices;
    }

    public set vertices(value: Vector3[]) {
        this._vertices = value;
    }

    public get triangles(): number[] {
        return this._triangles;
    }

    public set triangles(value: number[]) {
        this._triangles = value;
    }

    constructor() {
        this.createAttributeDescriptor(VertexAttribute.Position, VertexAttributeFormat.Float32, 3);
    }

    public setAttribute(attribute: VertexAttributeDescriptor): VertexAttributeDescriptor {
        if (this.hasAttributeDescriptor(attribute.name)) {
            this.removeAttributeDescriptor(attribute.name);
        }

        this.attributes[attribute.name] = attribute;

        return attribute;
    }

    public setVertices(v: Vector3[]): this {
        this._vertices = v;

        return this;
    }

    public setTriangles(v: number[]): this {
        this.triangles = v;

        return this;
    }

    public createAttributeDescriptor(name: string | VertexAttribute, type: VertexAttributeFormat, size: 1 | 2 | 3 | 4) {
        return this.setAttribute(new VertexAttributeDescriptor(name, type, size));
    }

    public removeAttributeDescriptor(name: string | VertexAttribute): void {
        delete this.attributes[name];
    }

    public hasAttributeDescriptor(name: string | VertexAttribute): boolean {
        return !!this.attributes[name];
    }

    public getAttributeDescriptor(name: string | VertexAttribute): VertexAttributeDescriptor | null {
        return this.attributes[name];
    }

    public getAttributeDescriptors() {
        return Object.keys(this.attributes);
    }
}
