import { GL_ARRAY_BUFFER, GL_SHADERS } from '../../_webgl_consts';

export interface ICanvasContext {
    createShader(type: typeof GL_SHADERS.VERTEX_SHADER | typeof GL_SHADERS.FRAGMENT_SHADER): WebGLShader | null;

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

    getProgramParameter(program: WebGLProgram, status: typeof GL_SHADERS.LINK_STATUS): any;

    getProgramInfoLog(program: WebGLProgram): string | null;

    getShaderSource(shader: WebGLShader): void;

    useProgram(program: WebGLProgram | null): void;

    createBuffer(): WebGLBuffer | null;

    bindBuffer(type: typeof GL_ARRAY_BUFFER, buffer: WebGLBuffer | null): void;

    bufferData(target: GLenum, srcData: BufferSource | null, usage: GLenum): void;

    enableVertexAttribArray(index: GLenum): void;

    getAttribLocation(program: WebGLProgram, name: string): GLenum;

    vertexAttribPointer(
        index: GLuint,
        size: GLint,
        type: GLenum,
        normalized: GLboolean,
        stride: GLsizei,
        offset: GLintptr,
    ): void;

    drawArrays(mode: GLenum, first: GLint, count: GLsizei): void;

    drawElements(mode: GLenum, count: GLsizei, type: GLenum, offset: GLintptr): void;

    enable(cap: GLenum): void;

    getUniformLocation(program: WebGLProgram, name: string): WebGLUniformLocation | null;

    uniformMatrix4fv(index: WebGLUniformLocation, serialized: boolean, value: Float32Array): void;

    uniform3vf(index: WebGLUniformLocation, value: Float32Array): void;

    uniform4fv(index: WebGLUniformLocation, value: Float32Array): void;

    disableVertexAttribArray(index: number): void;

    lineWidth(width: number): void;

    getActiveAttrib(program: WebGLProgram, index: GLuint): WebGLActiveInfo | null;

    getActiveUniform(program: WebGLProgram, index: GLuint): WebGLActiveInfo | null;
}
