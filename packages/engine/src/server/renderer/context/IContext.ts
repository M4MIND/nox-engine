import { GL_FRAGMENT_SHADER, GL_LINK_STATUS, GL_VERTEX_SHADER } from '../_webgl_consts';

export interface IContext {
    createShader(type: typeof GL_VERTEX_SHADER | typeof GL_FRAGMENT_SHADER): WebGLShader | null;

    compileShader(shader: WebGLShader): void;

    createProgram(): WebGLProgram | null;

    shaderSource(shader: WebGLShader, code: string): void;

    attachShader(program: WebGLProgram, shader: WebGLShader): void;

    getShaderParameter(shader: WebGLShader, param: GLenum): boolean;

    getShaderInfoLog(shader: WebGLShader): string | null;

    viewPort(x0: number, y0: number, x1: number, y1: number): void;

    clearColor(r: number, g: number, b: number, a: number): void;

    clear(type: GLenum): void;

    deleteShader(shader: WebGLShader | null): void;

    deleteProgram(program: WebGLProgram | null): void;

    linkProgram(program: WebGLProgram): void;

    getProgramParameter(program: WebGLProgram, status: typeof GL_LINK_STATUS): boolean;

    getProgramInfoLog(program: WebGLProgram): string | null;

    getShaderSource(shader: WebGLShader): void;

    useProgram(program: WebGLProgram | null): void;
}
