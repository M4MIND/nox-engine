import { GL_ACTIVE_ATTRIBUTES, GL_ACTIVE_UNIFORMS } from '../../_webgl_consts';
import RendererServer from '../../RendererServer';

export default class GpuProgram {
    public readonly id: number;
    private readonly _webGLProgram: WebGLProgram;

    private attributeLocations: Map<string | number, number> = new Map<string | number, number>();
    private uniformLocations: Map<string, WebGLUniformLocation | undefined> = new Map<string,
        WebGLUniformLocation | undefined>();

    public get webGLProgram(): WebGLProgram {
        return this._webGLProgram;
    }

    constructor(id: number, program: WebGLProgram) {
        this.id = id;
        this._webGLProgram = program;

        for (let i = 0; i < RendererServer.contextManager.context.getProgramParameter(program, GL_ACTIVE_ATTRIBUTES); i++) {
            this.attributeLocations.set(RendererServer.contextManager.context.getActiveAttrib(program, i)!.name, i);
        }
    }

    public enableVertexAttributes() {
        for (let index of this.attributeLocations.values()) {
            RendererServer.contextManager.context.enableVertexAttribArray(index);
        }
    }

    public disableVertexAttributes() {
        for (let index of this.attributeLocations.values()) {
            RendererServer.contextManager.context.disableVertexAttribArray(index);
        }
    }

    public use() {
        RendererServer.contextManager.useProgram(this);
    }

    public getAttributeLocation(index: string | number): number | undefined {
        return this.attributeLocations.get(index);
    }

    public getAttributeLocations(): Iterable<number> {
        return this.attributeLocations.values();
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
