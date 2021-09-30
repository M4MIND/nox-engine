import RendererServer from '../../RendererServer';
import { GL_ATTACHED_SHADERS, GL_LINK_STATUS } from '../../_webgl_consts';

export default class Program {
    constructor(
        public readonly name: number,
        public readonly webGLProgram: WebGLProgram,
        private readonly attributesLocation: { [index: string]: number } = {},
        private readonly uniformsLocation: { [index: string]: WebGLUniformLocation | null } = {},
    ) {}

    public attachShader(shader: WebGLShader): boolean {
        RendererServer.contextManager.context.attachShader(this.webGLProgram, shader);

        if (!this.getProgramParameter(GL_ATTACHED_SHADERS)) {
            console.error(`Program status: ${this.getProgramInfoLog()}`);

            return false;
        }

        return true;
    }

    public getAttributeLocation(name: string): number {
        if (!this.attributesLocation[name]) {
            this.attributesLocation[name] = RendererServer.contextManager.context.getAttribLocation(
                this.webGLProgram,
                name,
            );
        }

        return this.attributesLocation[name];
    }

    public getUniformLocation(name: string): WebGLUniformLocation | null {
        if (!this.uniformsLocation[name]) {
            this.uniformsLocation[name] = RendererServer.contextManager.context.getUniformLocation(
                this.webGLProgram,
                name,
            );
        }

        return this.uniformsLocation[name];
    }

    public link(): boolean {
        RendererServer.contextManager.context.linkProgram(this.webGLProgram);

        if (!this.getProgramParameter(GL_LINK_STATUS)) {
            console.error(`Program status: ${this.getProgramInfoLog()}`);

            return false;
        }

        return true;
    }

    public use(): void {
        RendererServer.contextManager.context.useProgram(this.webGLProgram);
    }

    public getProgramParameter(code: typeof GL_LINK_STATUS): boolean {
        return RendererServer.contextManager.context.getProgramParameter(this.webGLProgram, code);
    }

    public getProgramInfoLog(): string | null {
        return RendererServer.contextManager.context.getProgramInfoLog(this.webGLProgram);
    }

    public delete(): void {
        RendererServer.contextManager.context.deleteProgram(this.webGLProgram);
    }
}
