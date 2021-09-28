export default class ShaderAttribute {
    get name(): string {
        return this._name;
    }

    get type(): new () => Int8Array | Uint8Array | Int16Array | Uint16Array | Float32Array {
        return this._type;
    }

    get size(): number {
        return this._size;
    }

    get semantic(): string | null {
        return this._semantic;
    }

    constructor(
        private _name: string,
        private _type: new () => Int8Array | Uint8Array | Int16Array | Uint16Array | Float32Array,
        private _size: 1 | 2 | 3 | 4,
        private _semantic: string | null = null,
        private value?: [],
    ) {}
}
