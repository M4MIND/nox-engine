import RendererServer from '../../RendererServer';
import { GL_ATTACHED_SHADERS, GL_LINK_STATUS } from '../../_webgl_consts';
import IContext from '../context/IContext';

export default class Program {
    constructor(
        public readonly name: number,
        public readonly webGLProgram: WebGLProgram,
        private readonly attributesLocation: Map<string, GLenum> = new Map<string, GLenum>(),
        private readonly uniformsLocation: Map<string, WebGLUniformLocation> = new Map<string, WebGLUniformLocation>(),
        private readonly context: IContext = RendererServer.contextManager.context,
    ) {}

    public attachShader(shader: WebGLShader): boolean {
        this.context.attachShader(this.webGLProgram, shader);

        if (!this.getProgramParameter(GL_ATTACHED_SHADERS)) {
            console.error(`Program status: ${this.getProgramInfoLog()}`);

            return false;
        }

        return true;
    }

    public getAttributeLocation(name: string): number {
        if (!this.hasAttributeLocation(name)) {
            this.setAttributeLocation(name, this.context.getAttribLocation(this.webGLProgram, name));
        }

        return this.attributesLocation.get(name) as GLenum;
    }

    public setAttributeLocation(name: string, attribute: GLenum) {
        this.attributesLocation.set(name, attribute);
    }

    public hasAttributeLocation(name: string) {
        return this.attributesLocation.has(name);
    }

    public getUniformLocation(name: string): WebGLUniformLocation | null {
        if (!this.hasUniformLocation(name)) {
            this.setUniformLocation(name, this.context.getUniformLocation(this.webGLProgram, name));
        }

        return this.uniformsLocation.get(name) as WebGLUniformLocation;
    }

    public hasUniformLocation(name: string): boolean {
        return this.uniformsLocation.has(name);
    }

    public setUniformLocation(name: string, uniform: WebGLUniformLocation | null): WebGLUniformLocation | undefined {
        if (uniform) {
            return this.uniformsLocation.set(name, uniform);
        }
    }

    public link(): boolean {
        this.context.linkProgram(this.webGLProgram);

        if (!this.getProgramParameter(GL_LINK_STATUS)) {
            console.error(`Program status: ${this.getProgramInfoLog()}`);

            return false;
        }

        return true;
    }

    public use(): void {
        this.context.useProgram(this.webGLProgram);
    }

    public getProgramParameter(code: typeof GL_LINK_STATUS): boolean {
        return this.context.getProgramParameter(this.webGLProgram, code);
    }

    public getProgramInfoLog(): string | null {
        return this.context.getProgramInfoLog(this.webGLProgram);
    }

    public delete(): void {
        this.context.deleteProgram(this.webGLProgram);
    }
}
