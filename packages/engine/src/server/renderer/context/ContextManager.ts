import RendererServer from "../RendererServer";
import Program from "../program/Program";

export default class ContextManager {
    public readonly context: WebGL2RenderingContext;

    constructor() {
        this.context = RendererServer.canvasManager.canvas.getWebGl2Context() as WebGL2RenderingContext;
    }

    createProgram(): WebGLProgram {
        return this.context.createProgram() as WebGLProgram;
    }

    createBuffer(): WebGLBuffer {
        return this.context.createBuffer() as WebGLBuffer;
    }

    createShader(type: number, code: string) {
        let sh = this.context.createShader(type) as WebGLShader;

        this.context.shaderSource(sh, code);
        this.context.compileShader(sh);

        if (!this.context.getShaderParameter(sh, this.context.COMPILE_STATUS)) {
            throw new Error(`Compile shader error: \n ${this.context.getShaderInfoLog(sh)} \n ${code}`);
        }

        return sh;
    }
}