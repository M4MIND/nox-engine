import RendererServer from '../RendererServer';
import GpuProgram from '../manager/program/GpuProgram';

export default class BaseShader {
    public readonly program: GpuProgram;

    constructor(vertexCode: string, fragmentCode: string) {
        this.program = RendererServer.programManager.get(vertexCode, fragmentCode);
    }

    public use() {
        this.program.use();
    }

    public getId(): number {
        return this.program.id;
    }
}
