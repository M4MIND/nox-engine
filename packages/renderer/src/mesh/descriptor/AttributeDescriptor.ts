import RendererServer from '../../RendererServer';
import { GL_BUFFERS_TARGET, GL_BUFFERS_USAGE, GL_DATA_FLOAT } from '../../_webgl_consts';
import BufferWrapper from '../buffer/BufferWrapper';

export type AttributeDescriptorSrc =
    | Float32Array
    | Int8Array
    | Int16Array
    | Int32Array
    | Uint8Array
    | Uint16Array
    | Uint32Array;

export enum AttributeDescriptorFormat {
    Float32,
    Int8,
    Int16,
    Int32,
    Uint8,
    Uint16,
    Uint32,
}

export const AttributeDescriptorSrcStorage: { [index: number]: new (value?: number[]) => AttributeDescriptorSrc } = {
    [AttributeDescriptorFormat.Float32]: Float32Array,
    [AttributeDescriptorFormat.Int8]: Int8Array,
    [AttributeDescriptorFormat.Int16]: Int16Array,
    [AttributeDescriptorFormat.Int32]: Int32Array,
    [AttributeDescriptorFormat.Uint8]: Uint8Array,
    [AttributeDescriptorFormat.Uint16]: Uint16Array,
    [AttributeDescriptorFormat.Uint32]: Uint32Array,
};

export default class AttributeDescriptor {
    public readonly index: string;
    private data: AttributeDescriptorSrc;
    private size: number;
    private normalize: boolean;
    private stride: number;
    private offset: number;
    private buffer: BufferWrapper;
    private readonly srcType: AttributeDescriptorFormat;

    private enableVertexAttribute: boolean = false;

    private dataLength: number = 0;

    constructor(
        index: string,
        srcType: AttributeDescriptorFormat,
        size: number,
        normalize: boolean,
        stride: number,
        offset: number,
    ) {
        this.index = index;
        this.srcType = srcType;
        this.data = new AttributeDescriptorSrcStorage[srcType]();
        this.size = size;
        this.normalize = normalize;
        this.stride = stride;
        this.offset = offset;

        this.buffer = new BufferWrapper();
    }

    public set(value: number[]) {
        if (this.dataLength !== value.length) {
            this.data = new AttributeDescriptorSrcStorage[this.srcType](value);
            this.dataLength = value.length;
        } else {
            this.data.set(value);
        }

        this.bind();
        this.buffer.setData(GL_BUFFERS_TARGET.ARRAY_BUFFER, this.data, GL_BUFFERS_USAGE.STATIC_DRAW);
        this.unbind();
    }

    public bind() {
        this.buffer.bind(GL_BUFFERS_TARGET.ARRAY_BUFFER);
    }

    public unbind() {
        this.buffer.unbind(GL_BUFFERS_TARGET.ARRAY_BUFFER);
    }

    public vertexAttribPointer() {
        if (this.enableVertexAttribute) {
            return;
        }

        let attributeLocation = RendererServer.programManager.activeProgram?.getAttributeLocation(this.index);

        if (attributeLocation === undefined || attributeLocation < 0) {
            return;
        }

        RendererServer.contextManager.context.vertexAttribPointer(
            attributeLocation,
            this.size,
            GL_DATA_FLOAT,
            this.normalize,
            this.stride,
            this.offset,
        );
    }

    public enableVertexAttribArray() {
        if (this.enableVertexAttribute) {
            return;
        }

        let attributeLocation = RendererServer.programManager.activeProgram?.getAttributeLocation(this.index);

        if (attributeLocation === undefined || attributeLocation < 0) {
            return;
        }

        RendererServer.contextManager.context.enableVertexAttribArray(attributeLocation);

        this.enableVertexAttribute = true;
    }
}
