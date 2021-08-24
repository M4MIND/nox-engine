import { Matrix } from './../../mathf/Matrix';
export class Program {
    private program: WebGLProgram;
    constructor(private readonly api: WebGLRenderingContext) {
        this.program = this.api.createProgram() as WebGLProgram;
    }

    attachShader(shader: WebGLShader): void {
        this.api.attachShader(this.program, shader);
    }

    link(): void {
        this.api.linkProgram(this.program);
    }

    use(): void {
        this.api.useProgram(this.program);
    }

    getAtribbuteLocation(attr: string): GLint {
        return this.api.getAttribLocation(this.program, attr);
    }

    getUniformLocation(uniform: string): WebGLUniformLocation {
        return this.api.getUniformLocation(this.program, uniform) as WebGLUniformLocation;
    }

    setVertexAttributePointer(attr: string): void {
        this.api.vertexAttribPointer(this.getAtribbuteLocation(attr), 3, this.api.FLOAT, false, 0, 0);
        this.api.enableVertexAttribArray(this.getAtribbuteLocation(attr));
    }

    uniformMatrix4fv(uniform: string, params: number[] = new Matrix, transpose: boolean = false): void {
        this.api.uniformMatrix4fv(this.getUniformLocation(uniform), transpose, params);
    }
}