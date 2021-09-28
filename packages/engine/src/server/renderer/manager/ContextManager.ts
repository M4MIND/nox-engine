import { GL_COMPILE_STATUS, GL_FRAGMENT_SHADER, GL_LINK_STATUS, GL_VERTEX_SHADER } from '../_webgl_consts';
import { IContext } from '../context/IContext';
import Program from './program/Program';

export interface IContextManagerSettings {
    context: new () => IContext;
}

export default class ContextManager {
    public readonly context: IContext;

    constructor(settings: IContextManagerSettings) {
        this.context = new settings.context();
    }

    compileShader(type: typeof GL_FRAGMENT_SHADER | typeof GL_VERTEX_SHADER, code: string): WebGLShader | null {
        let shader = this.context.createShader(type);

        if (!shader) {
            console.error('The shader was not created');

            return null;
        }

        this.context.shaderSource(shader, code);
        this.context.compileShader(shader);

        if (!this.context.getShaderParameter(shader, GL_COMPILE_STATUS)) {
            console.error(this.context.getShaderInfoLog(shader));

            this.context.deleteShader(shader);

            return null;
        }

        return shader;
    }

    compileVertexShader(code: string): WebGLShader | null {
        return this.compileShader(GL_VERTEX_SHADER, code);
    }

    compileFragmentShader(code: string): WebGLShader | null {
        return this.compileShader(GL_FRAGMENT_SHADER, code);
    }

    createProgram(vertex: string, fragment: string): Program | null {
        let vertexShader = this.compileVertexShader(vertex);

        if (!vertexShader) {
            return null;
        }

        let fragmentShader = this.compileFragmentShader(fragment);

        if (!fragmentShader) {
            return null;
        }

        let webGlProgram = this.context.createProgram();

        if (!webGlProgram) {
            return null;
        }

        let program = new Program(webGlProgram);

        if (!program.attachShader(vertexShader)) {
            program.delete();

            return null;
        }

        if (!program.attachShader(fragmentShader)) {
            program.delete();

            return null;
        }

        if (!program.link()) {
            program.delete();

            return null;
        }

        return program;
    }
}
