import RendererServer from '../../RendererServer';
import { GL_ARRAY_BUFFER, GL_FRAGMENT_SHADER, GL_LINK_STATUS, GL_VERTEX_SHADER } from '../../_webgl_consts';
import IContext from './IContext';

export default class WebGL2Context implements IContext {
    private api: WebGL2RenderingContext;

    constructor() {
        this.api = RendererServer.canvasManager.canvas.getContext('webgl2') as WebGL2RenderingContext;
    }

    public attachShader(program: WebGLProgram, shader: WebGLShader): void {
        this.api.attachShader(program, shader);
    }

    public bindBuffer(type: typeof GL_ARRAY_BUFFER, buffer: WebGLBuffer | null): void {
        this.api.bindBuffer(type, buffer);
    }

    public bufferData(target: GLenum, srcData: BufferSource | null, usage: GLenum) {
        this.api.bufferData(target, srcData, usage);
    }

    public clear(type: GLenum): void {
        this.api.clear(type);
    }

    public clearColor(r: number, g: number, b: number, a: number): void {
        this.api.clearColor(r, g, b, a);
    }

    public compileShader(shader: WebGLShader): void {
        return this.api.compileShader(shader);
    }

    public createBuffer(): WebGLBuffer | null {
        return this.api.createBuffer();
    }

    public createProgram(): WebGLProgram | null {
        return this.api.createProgram();
    }

    public createShader(type: typeof GL_VERTEX_SHADER | typeof GL_FRAGMENT_SHADER): WebGLShader | null {
        return this.api.createShader(type);
    }

    public deleteProgram(program: WebGLProgram | null): void {
        this.api.deleteProgram(program);
    }

    public deleteShader(shader: WebGLShader | null): void {
        this.api.deleteShader(shader);
    }

    public drawArrays(mode: GLenum, first: GLint, count: GLsizei) {
        this.api.drawArrays(mode, first, count);
    }

    public drawElements(mode: GLenum, count: GLsizei, type: GLenum, offset: GLintptr): void {
        this.api.drawElements(mode, count, type, offset);
    }

    public enable(cap: GLenum): void {
        this.api.enable(cap);
    }

    public enableVertexAttribArray(index: GLenum): void {
        this.api.enableVertexAttribArray(index);
    }

    public getAttribLocation(program: WebGLProgram, name: string): GLenum {
        return this.api.getAttribLocation(program, name);
    }

    public getProgramInfoLog(program: WebGLProgram): string | null {
        return this.api.getProgramInfoLog(program);
    }

    public getProgramParameter(program: WebGLProgram, status: typeof GL_LINK_STATUS): boolean {
        return this.api.getProgramParameter(program, status);
    }

    public getShaderInfoLog(shader: WebGLShader): string | null {
        return this.api.getShaderInfoLog(shader);
    }

    public getShaderParameter(shader: WebGLShader, param: GLenum): boolean {
        return this.api.getShaderParameter(shader, param);
    }

    public getShaderSource(shader: WebGLShader): void {
        console.dir(this.api.getShaderSource(shader));
    }

    public getUniformLocation(program: WebGLProgram, name: string): WebGLUniformLocation | null {
        return this.api.getUniformLocation(program, name);
    }

    public linkProgram(program: WebGLProgram): void {
        this.api.linkProgram(program);
    }

    public shaderSource(shader: WebGLShader, code: string): void {
        this.api.shaderSource(shader, code);
    }

    public uniformMatrix4fv(index: WebGLUniformLocation, serialized: boolean, value: number[]): void {
        this.api.uniformMatrix4fv(index, serialized, value);
    }

    public useProgram(program: WebGLProgram | null): void {
        this.api.useProgram(program);
    }

    public vertexAttribPointer(
        index: GLuint,
        size: GLint,
        type: GLenum,
        normalized: GLboolean,
        stride: GLsizei,
        offset: GLintptr,
    ): void {
        this.api.vertexAttribPointer(index, size, type, normalized, stride, offset);
    }

    public viewPort(x0: number, y0: number, x1: number, y1: number): void {
        this.api.viewport(x0, y0, x1, y1);
    }
}
