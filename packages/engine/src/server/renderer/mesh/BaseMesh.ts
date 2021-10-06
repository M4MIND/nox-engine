import VertexAttributeDescriptor, {
    VertexAttributeSrcData,
    VertexTypeUsage,
} from '../shader/attribute/VertexAttributeDescriptor';
import WebGLBuffer from '../shader/buffer/WebGLBuffer';
import IndicesDescriptor from '../shader/index/IndicesDescriptor';

export default class BaseMesh {
    private readonly vertexAttributeDescriptors: Map<string, VertexAttributeDescriptor> = new Map<
        string,
        VertexAttributeDescriptor
    >();
    private readonly buffers: { [index: string]: WebGLBuffer } = {};
    private _indicesDescriptor: IndicesDescriptor | null = null;

    public get indicesDescriptor(): IndicesDescriptor | null {
        return this._indicesDescriptor;
    }

    constructor() {}

    public setIndicesDescriptor(descriptor: IndicesDescriptor) {
        this._indicesDescriptor = descriptor;
    }

    public createIndicesDescriptor(index: string, type: VertexAttributeSrcData, draw: VertexTypeUsage) {
        this.setIndicesDescriptor(new IndicesDescriptor(index, type, draw));
    }

    public setAttributeDescriptor(descriptor: VertexAttributeDescriptor): VertexAttributeDescriptor {
        if (this.hasAttributeDescriptor(descriptor.index)) {
            this.removeAttributeDescriptor(descriptor.index);
        }

        this.vertexAttributeDescriptors.set(descriptor.index, descriptor);

        return descriptor;
    }

    public createAttributeDescriptor(
        index: string,
        type: VertexAttributeSrcData,
        size: 1 | 2 | 3 | 4,
        typeDraw: VertexTypeUsage,
        normalized: boolean = false,
        stride: number = 0,
        offset: number = 0,
    ) {
        return this.setAttributeDescriptor(
            new VertexAttributeDescriptor(index, type, size, typeDraw, normalized, stride, offset),
        );
    }

    public removeAttributeDescriptor(name: string): void {
        this.vertexAttributeDescriptors.delete(name);
    }

    public hasAttributeDescriptor(name: string): boolean {
        return this.vertexAttributeDescriptors.has(name);
    }

    public getAttributeDescriptor(name: string): VertexAttributeDescriptor | undefined {
        return this.vertexAttributeDescriptors.get(name);
    }

    public getAttributeDescriptors() {
        return this.vertexAttributeDescriptors.values();
    }

    public setBuffer(buffer: WebGLBuffer): WebGLBuffer {
        if (this.hasBuffer(buffer.name)) {
            this.removeBuffer(buffer.name);
        }

        this.buffers[buffer.name] = buffer;

        return buffer;
    }

    public createBuffer(name: string): WebGLBuffer {
        return this.setBuffer(new WebGLBuffer(name));
    }

    public getBuffer(name: string): WebGLBuffer | null {
        return this.buffers[name];
    }

    public hasBuffer(name: string) {
        return !!this.buffers[name];
    }

    public removeBuffer(name: string): void {
        delete this.buffers[name];
    }
}
