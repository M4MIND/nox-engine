export class BufferFactory {
    constructor(private readonly api: WebGLRenderingContext) {}

    createArrayBuffer(v: number[] = []) {
        let buffer = this.api.createBuffer();
        this.api.bindBuffer(this.api.ARRAY_BUFFER, buffer);
        this.api.bufferData(this.api.ARRAY_BUFFER, new Float32Array(v), this.api.STATIC_DRAW);
    }

    createElementArrayBuffer(i: number[] = []) {
        let buffer = this.api.createBuffer();
        this.api.bindBuffer(this.api.ELEMENT_ARRAY_BUFFER, buffer);
        this.api.bufferData(this.api.ELEMENT_ARRAY_BUFFER, new Uint16Array(i), this.api.STATIC_DRAW);
    }
}