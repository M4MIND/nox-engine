import { RendererServer } from '../../../index';
import { GL_ARRAY_BUFFER, GL_SHADERS } from '../../_webgl_consts';
import { ICanvasContext } from './ICanvasContext';

export default class WebGL2Context implements ICanvasContext {
    public readonly context: WebGL2RenderingContext;

    constructor() {
        let context = RendererServer.canvasManager.getContext('webgl2');

        if (!context) {
            throw new Error(`Failed to get context`);
        }

        this.context = context as WebGL2RenderingContext;
    }

    public attachShader(program: WebGLProgram, shader: WebGLShader): void {
        this.context.attachShader(program, shader);
    }

    public bindBuffer(type: typeof GL_ARRAY_BUFFER, buffer: WebGLBuffer | null): void {
        this.context.bindBuffer(type, buffer);
    }

    public bufferData(target: GLenum, srcData: BufferSource | null, usage: GLenum) {
        this.context.bufferData(target, srcData, usage);
    }

    public clear(type: GLenum): void {
        this.context.clear(type);
    }

    public clearColor(r: number, g: number, b: number, a: number): void {
        this.context.clearColor(r, g, b, a);
    }

    public compileShader(shader: WebGLShader): void {
        return this.context.compileShader(shader);
    }

    public createBuffer(): WebGLBuffer | null {
        return this.context.createBuffer();
    }

    public createProgram(): WebGLProgram | null {
        return this.context.createProgram();
    }

    public createShader(type: typeof GL_SHADERS.VERTEX_SHADER | typeof GL_SHADERS.FRAGMENT_SHADER): WebGLShader | null {
        return this.context.createShader(type);
    }

    public deleteProgram(program: WebGLProgram | null): void {
        this.context.deleteProgram(program);
    }

    public deleteShader(shader: WebGLShader | null): void {
        this.context.deleteShader(shader);
    }

    public drawArrays(mode: GLenum, first: GLint, count: GLsizei) {
        this.context.drawArrays(mode, first, count);
    }

    public drawElements(mode: GLenum, count: GLsizei, type: GLenum, offset: GLintptr): void {
        this.context.drawElements(mode, count, type, offset);
    }

    public enable(cap: GLenum): void {
        this.context.enable(cap);
    }

    public enableVertexAttribArray(index: GLenum): void {
        this.context.enableVertexAttribArray(index);
    }

    public getAttribLocation(program: WebGLProgram, name: string): GLenum {
        return this.context.getAttribLocation(program, name);
    }

    public getProgramInfoLog(program: WebGLProgram): string | null {
        return this.context.getProgramInfoLog(program);
    }

    public getProgramParameter(program: WebGLProgram, status: typeof GL_SHADERS.LINK_STATUS): boolean {
        return this.context.getProgramParameter(program, status);
    }

    public getShaderInfoLog(shader: WebGLShader): string | null {
        return this.context.getShaderInfoLog(shader);
    }

    public getShaderParameter(shader: WebGLShader, param: GLenum): boolean {
        return this.context.getShaderParameter(shader, param);
    }

    public getShaderSource(shader: WebGLShader): void {
        console.dir(this.context.getShaderSource(shader));
    }

    public getUniformLocation(program: WebGLProgram, name: string): WebGLUniformLocation | null {
        return this.context.getUniformLocation(program, name);
    }

    public linkProgram(program: WebGLProgram): void {
        this.context.linkProgram(program);
    }

    public shaderSource(shader: WebGLShader, code: string): void {
        this.context.shaderSource(shader, code);
    }

    public uniformMatrix4fv(index: WebGLUniformLocation, serialized: boolean, value: Float32Array): void {
        this.context.uniformMatrix4fv(index, serialized, value);
    }
    public uniform4fv(index: WebGLUniformLocation, value: Float32Array) {
        this.context.uniform4fv(index, value);
    }

    public useProgram(program: WebGLProgram | null): void {
        this.context.useProgram(program);
    }

    public vertexAttribPointer(
        index: GLuint,
        size: GLint,
        type: GLenum,
        normalized: GLboolean,
        stride: GLsizei,
        offset: GLintptr,
    ): void {
        this.context.vertexAttribPointer(index, size, type, normalized, stride, offset);
    }

    public viewPort(x0: number, y0: number, x1: number, y1: number): void {
        this.context.viewport(x0, y0, x1, y1);
    }
}
