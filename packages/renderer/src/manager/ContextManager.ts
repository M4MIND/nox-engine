import RendererServer from '../RendererServer';
import { GL_SHADERS } from '../_webgl_consts';
import { ICanvasContext } from './context/ICanvasContext';
import GpuProgram from './program/GpuProgram';

export interface IContextManagerSettings {
    context: new () => ICanvasContext;
}

export default class ContextManager {
    public readonly context: ICanvasContext;

    constructor(settings: IContextManagerSettings) {
        this.context = new settings.context();
    }

    public compileShader(
        type: typeof GL_SHADERS.FRAGMENT_SHADER | typeof GL_SHADERS.VERTEX_SHADER,
        code: string,
    ): WebGLShader {
        let shader = this.context.createShader(type);

        if (!shader) {
            throw new Error('Shader was not created');
        }

        this.context.shaderSource(shader, code);
        this.context.compileShader(shader);

        if (!this.context.getShaderParameter(shader, GL_SHADERS.COMPILE_STATUS)) {
            throw new Error(this.context.getShaderInfoLog(shader) as string);
        }

        return shader;
    }

    public useProgram(program: GpuProgram) {
        RendererServer.contextManager.context.useProgram(program.webGLProgram);
        RendererServer.programManager.activeProgram = program;
    }

    public createProgram(): WebGLProgram {
        let program = this.context.createProgram();

        if (!program) {
            throw new Error('GPU Program was not created');
        }

        return program;
    }

    public attachShader(program: WebGLProgram, shader: WebGLShader): void {
        this.context.attachShader(program, shader);
    }
}
