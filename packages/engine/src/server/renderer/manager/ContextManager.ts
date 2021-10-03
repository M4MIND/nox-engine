import { GL_COMPILE_STATUS, GL_FRAGMENT_SHADER, GL_VERTEX_SHADER } from '../_webgl_consts';
import IContext from './context/IContext';
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
            console.error(code);

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

    createProgram(key: number, vertex: string, fragment: string): Program | null {
        let program = this.context.createProgram();

        if (!program) {
            return null;
        }

        let programInstance = new Program(key, program);

        let [vertexShader, fragmentShader] = [this.compileVertexShader(vertex), this.compileFragmentShader(fragment)];

        if (!vertexShader || !fragmentShader) {
            return null;
        }

        if (!programInstance.attachShader(vertexShader)) {
            return null;
        }

        if (!programInstance.attachShader(fragmentShader)) {
            return null;
        }

        programInstance.link();

        return programInstance;
    }
}
