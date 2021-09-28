import RendererServer from '../RendererServer';

export default class Program {
    private program: WebGLProgram;

    constructor(program: WebGLProgram, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        this.program = program;

        this.attachShader(vertexShader).attachShader(fragmentShader);
    }

    public attachShader(shader: WebGLShader): this {
        RendererServer.contextManager.context.attachShader(this.program, shader);

        return this;
    }
}
