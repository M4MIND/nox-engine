import RendererServer from '../RendererServer';
import GpuProgram from '../manager/program/GpuProgram';
import BaseUniformDescriptor from '../material/uniform/BaseUniformDescriptor';

export default class BaseShader {
    private static uniformDescriptors: Map<string, BaseUniformDescriptor> = new Map<string, BaseUniformDescriptor>();
    public readonly program: GpuProgram;

    constructor(vertexCode: string, fragmentCode: string) {
        this.program = RendererServer.programManager.get(vertexCode, fragmentCode);
    }

    public static use() {
        for (let uniform of this.uniformDescriptors.values()) {
            uniform.use();
        }
    }

    public static addUniform(uniform: BaseUniformDescriptor): BaseUniformDescriptor {
        if (this.hasUniform(uniform.index)) {
            this.removeUniform(uniform.index);
        }

        this.uniformDescriptors.set(uniform.index, uniform);

        return uniform;
    }

    public static hasUniform(index: string): boolean {
        return this.uniformDescriptors.has(index);
    }

    public static getUniform(index: string): BaseUniformDescriptor | undefined {
        return this.uniformDescriptors.get(index);
    }

    public static removeUniform(index: string): void {
        this.uniformDescriptors.delete(index);
    }

    public use() {
        this.program.use();
    }

    public getId(): number {
        return this.program.id;
    }
}
