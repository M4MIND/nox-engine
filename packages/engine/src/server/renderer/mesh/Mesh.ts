import VertexAttributeDescriptor, {
    TypeDraw,
    VertexAttributeFormat,
    VertexAttributeLocation,
} from '../shader/attribute/VertexAttributeDescriptor';
import WebGLBuffer from '../shader/buffer/WebGLBuffer';
import IndicesDescriptor from '../shader/index/IndicesDescriptor';

export default class Mesh {
    public readonly vertexAttributeDescriptors: { [index: string]: VertexAttributeDescriptor } = {};
    public indicesDescriptor: IndicesDescriptor | null = null;
    public readonly buffers: { [index: string]: WebGLBuffer } = {};

    constructor() {}

    public setIndicesDescriptor(descriptor: IndicesDescriptor) {
        this.indicesDescriptor = descriptor;
    }

    public createIndicesDescriptor(type: VertexAttributeFormat, draw: TypeDraw) {
        this.setIndicesDescriptor(new IndicesDescriptor(type, draw));
    }

    public setAttributeDescriptor(descriptor: VertexAttributeDescriptor): VertexAttributeDescriptor {
        if (this.hasAttributeDescriptor(descriptor.name)) {
            this.removeAttributeDescriptor(descriptor.name);
        }

        this.vertexAttributeDescriptors[descriptor.name] = descriptor;

        return descriptor;
    }

    public createAttributeDescriptor(
        name: string | VertexAttributeLocation,
        type: VertexAttributeFormat,
        size: 1 | 2 | 3 | 4,
        typeDraw: TypeDraw,
    ) {
        return this.setAttributeDescriptor(new VertexAttributeDescriptor(name, type, size, typeDraw));
    }

    public removeAttributeDescriptor(name: string | VertexAttributeLocation): void {
        delete this.vertexAttributeDescriptors[name];
    }

    public hasAttributeDescriptor(name: string | VertexAttributeLocation): boolean {
        return !!this.vertexAttributeDescriptors[name];
    }

    public getAttributeDescriptor(name: string | VertexAttributeLocation): VertexAttributeDescriptor | null {
        return this.vertexAttributeDescriptors[name];
    }

    public getAttributeDescriptors() {
        return Object.values(this.vertexAttributeDescriptors);
    }

    setBuffer(buffer: WebGLBuffer): WebGLBuffer {
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
