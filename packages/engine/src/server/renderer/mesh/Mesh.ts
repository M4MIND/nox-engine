import ShaderAttribute from '../shader/attribute/ShaderAttribute';

export default class Mesh {
    private attributes: { [index: string]: ShaderAttribute } = {};

    constructor() {}

    public addAttribute(attribute: ShaderAttribute): ShaderAttribute {
        if (this.hasAttribute(attribute.name)) {
            this.removeAttribute(attribute.name);
        }

        this.attributes[attribute.name] = attribute;

        return attribute;
    }

    public createAttribute(name: string, type: new () => Int8Array | Uint8Array | Int16Array | Uint16Array | Float32Array, size: 1 | 2 | 3 | 4, semantic: string | null = null) {
        return this.addAttribute(new ShaderAttribute(name, type, size, semantic ?? null, []));
    }

    public removeAttribute(name: string): void {
        delete this.attributes[name];
    }

    public hasAttribute(name: string): boolean {
        return !!this.attributes[name];
    }

    public getAttribute(name: string): ShaderAttribute | null {
        return this.attributes[name];
    }
}
