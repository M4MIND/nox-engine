import { Canvas } from "./Canvas";

export class Shader {
    private api: WebGLRenderingContext;
    
    static VERTEX_SHADER: number = 35633;
    static FRAGMENT_SHADER: number = 35632;

    constructor(private readonly canvas: Canvas) {
        this.api = canvas.api;
    };

    createShader(shaderCode: string, type: number): WebGLShader {
        let sh = this.api.createShader(type) as WebGLShader;
        this.api.shaderSource(sh, shaderCode);
        this.api.compileShader(sh);

        if (!this.api.getShaderParameter(sh, this.api.COMPILE_STATUS)) {
            throw new Error(`Compile shader has error: ${this.api.getShaderInfoLog(sh)}`);
        }

        return sh;
    }
}