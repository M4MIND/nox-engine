import RendererServer from '../../RendererServer';
import { GL_ATTACHED_SHADERS, GL_LINK_STATUS } from '../../_webgl_consts';

export default class Program {
    constructor(private program: WebGLProgram) {}

    public attachShader(shader: WebGLShader): boolean {
        RendererServer.contextManager.context.attachShader(this.program, shader);

        if (!this.getProgramParameter(GL_ATTACHED_SHADERS)) {
            console.error(`Program status: ${this.getProgramInfoLog()}`);

            return false;
        }

        return true;
    }

    public link(): boolean {
        RendererServer.contextManager.context.linkProgram(this.program);

        if (!this.getProgramParameter(GL_LINK_STATUS)) {
            console.error(`Program status: ${this.getProgramInfoLog()}`);

            return false;
        }

        return true;
    }

    public use(): void {
        RendererServer.contextManager.context.useProgram(this.program);
    }

    public getProgramParameter(code: typeof GL_LINK_STATUS): boolean {
        return RendererServer.contextManager.context.getProgramParameter(this.program, code);
    }

    public getProgramInfoLog(): string | null {
        return RendererServer.contextManager.context.getProgramInfoLog(this.program);
    }

    public delete(): void {
        RendererServer.contextManager.context.deleteProgram(this.program);
    }
}
