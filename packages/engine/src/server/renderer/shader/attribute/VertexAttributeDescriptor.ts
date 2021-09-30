import { GL_ARRAY_BUFFER, GL_DYNAMIC_DRAW, GL_ELEMENT_ARRAY_BUFFER, GL_STATIC_DRAW } from '../../_webgl_consts';

export enum VertexAttributeLocation {
    Position = 'Position',
    Normal = 'Normal',
    Tangent = 'Tangent',
    Color = 'Color',
    TexCoord0 = 'TexCoord0',
    TexCoord1 = 'TexCoord1',
    TexCoord2 = 'TexCoord2',
    TexCoord3 = 'TexCoord3',
    TexCoord4 = 'TexCoord4',
    TexCoord5 = 'TexCoord5',
    TexCoord6 = 'TexCoord6',
    TexCoord7 = 'TexCoord7',
    BlendWeight = 'BlendWeight',
    BlendIndices = 'BlendIndices',
    Indices = 'Indices',
}

export enum VertexAttributeSrcData {
    Float32,
    UNorm8,
    SNorm8,
    UNorm16,
    SNorm16,
    UInt8,
    SInt8,
    UInt16,
    SInt16,
    UInt32,
    SInt32,
}

export enum VertexTargetAttribute {
    ArrayAttribute = GL_ARRAY_BUFFER,
    ElementArrayBuffer = GL_ELEMENT_ARRAY_BUFFER,
}

export enum VertexTypeUsage {
    STATIC_DRAW = GL_STATIC_DRAW,
    DYNAMIC_DRAW = GL_DYNAMIC_DRAW,
}

export const ARRAY_CLASSES: { [index: number]: new (v: number[]) => ArrayBufferView } = {
    [VertexAttributeSrcData.Float32]: Float32Array,
    [VertexAttributeSrcData.UInt8]: Uint8Array,
    [VertexAttributeSrcData.UInt16]: Uint16Array,
    [VertexAttributeSrcData.UInt32]: Uint32Array,
};

export default class VertexAttributeDescriptor {
    get index(): string | VertexAttributeLocation {
        return this._index;
    }

    get type(): VertexAttributeSrcData {
        return this._type;
    }

    get size(): number {
        return this._size;
    }

    get usage(): VertexTypeUsage {
        return this._usage;
    }

    get target(): VertexTargetAttribute {
        return this._target;
    }

    constructor(
        private _index: string | VertexAttributeLocation,
        private _type: VertexAttributeSrcData,
        private _size: 1 | 2 | 3 | 4,
        private _usage: VertexTypeUsage,
        private _target: VertexTargetAttribute = VertexTargetAttribute.ArrayAttribute,
        private normalized: boolean = false,
        private stride: number = 0,
        private offset: number = 0,
    ) {}
}
