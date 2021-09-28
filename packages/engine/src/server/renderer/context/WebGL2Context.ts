import RendererServer from '../RendererServer';
import { GL_FRAGMENT_SHADER, GL_LINK_STATUS, GL_VERTEX_SHADER } from '../_webgl_consts';
import { IContext } from './IContext';

export default class WebGL2Context implements IContext {
    private api: WebGL2RenderingContext;

    constructor() {
        this.api = RendererServer.canvasManager.canvas.getContext('webgl2') as WebGL2RenderingContext;
    }

    public attachShader(program: WebGLProgram, shader: WebGLShader): void {
        this.api.attachShader(program, shader);
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

    public linkProgram(program: WebGLProgram): void {
        this.api.linkProgram(program);
    }

    public shaderSource(shader: WebGLShader, code: string): void {
        this.api.shaderSource(shader, code);
    }

    public useProgram(program: WebGLProgram | null): void {
        this.api.useProgram(program);
    }

    public viewPort(x0: number, y0: number, x1: number, y1: number): void {
        this.api.viewport(x0, y0, x1, y1);
    }
}
