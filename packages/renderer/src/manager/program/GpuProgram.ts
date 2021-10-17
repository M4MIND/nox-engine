import RendererServer from '../../RendererServer';

export default class GpuProgram {
    public readonly id: number;
    private readonly _webGLProgram: WebGLProgram;

    private attributeLocations: Map<string | number, number> = new Map<string | number, number>();
    private uniformLocations: Map<string, WebGLUniformLocation | undefined> = new Map<
        string,
        WebGLUniformLocation | undefined
    >();

    public get webGLProgram(): WebGLProgram {
        return this._webGLProgram;
    }

    constructor(id: number, program: WebGLProgram) {
        this.id = id;
        this._webGLProgram = program;
    }

    public use() {
        RendererServer.contextManager.useProgram(this);
    }

    public getAttributeLocation(index: string | number): number | undefined {
        if (typeof index === 'string' && !this.hasAttributeLocation(index)) {
            this.attributeLocations.set(
                index,
                RendererServer.contextManager.context.getAttribLocation(this._webGLProgram, index),
            );
        }

        return this.attributeLocations.get(index);
    }

    public hasAttributeLocation(index: string | number): boolean {
        return this.attributeLocations.has(index);
    }

    public removeAttributeLocation(index: string | number): void {
        this.attributeLocations.delete(index);
    }

    public getUniformLocation(index: string): WebGLUniformLocation | undefined | null {
        if (!this.hasUniformLocation(index)) {
            this.uniformLocations.set(
                index,
                RendererServer.contextManager.context.getUniformLocation(this._webGLProgram, index) ?? undefined,
            );
        }

        return this.uniformLocations.get(index);
    }

    public hasUniformLocation(index: string): boolean {
        return this.uniformLocations.has(index);
    }

    public removeUniformLocation(index: string): void {
        this.uniformLocations.delete(index);
    }
}
