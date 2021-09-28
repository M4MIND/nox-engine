export enum VertexAttribute {
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
}

export enum VertexAttributeFormat {
    Float32,
    Float16,
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

export default class VertexAttributeDescriptor {
    get name(): string | VertexAttribute {
        return this._name;
    }

    get type(): VertexAttributeFormat {
        return this._type;
    }

    get size(): number {
        return this._size;
    }

    constructor(
        private _name: string | VertexAttribute,
        private _type: VertexAttributeFormat,
        private _size: 1 | 2 | 3 | 4,
    ) {}
}
