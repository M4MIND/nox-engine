import { GL_ARRAY_BUFFER, GL_ELEMENT_ARRAY_BUFFER, GL_STATIC_DRAW } from '../../_webgl_consts';

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

export enum VertexAttributeFormat {
    Float16,
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

export enum TargetAttribute {
    ArrayAttribute = GL_ARRAY_BUFFER,
    ElementArrayBuffer = GL_ELEMENT_ARRAY_BUFFER,
}

export enum TypeDraw {
    STATIC_DRAW = GL_STATIC_DRAW,
}

export const ARRAY_CLASSES: { [index: number]: new (v: number[]) => ArrayBufferView } = {
    [VertexAttributeFormat.Float32]: Float32Array,
    [VertexAttributeFormat.UInt8]: Uint8Array,
    [VertexAttributeFormat.UInt16]: Uint16Array,
    [VertexAttributeFormat.UInt32]: Uint32Array,
};

export default class VertexAttributeDescriptor {
    get name(): string | VertexAttributeLocation {
        return this._name;
    }

    get type(): VertexAttributeFormat {
        return this._type;
    }

    get size(): number {
        return this._size;
    }

    get usage(): TypeDraw {
        return this._usage;
    }

    get target(): TargetAttribute {
        return this._target;
    }

    constructor(
        private _name: string | VertexAttributeLocation,
        private _type: VertexAttributeFormat,
        private _size: 1 | 2 | 3 | 4,
        private _usage: TypeDraw,
        private _target: TargetAttribute = TargetAttribute.ArrayAttribute,
    ) {}
}
