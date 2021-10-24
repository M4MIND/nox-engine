import BaseShader from '../shader/BaseShader';
import BaseUniformDescriptor from './uniform/BaseUniformDescriptor';

export default class BaseMaterial {
    private shader: BaseShader;
    private uniformDescriptors: Map<string, BaseUniformDescriptor> = new Map<string, BaseUniformDescriptor>();

    constructor(baseShader: BaseShader) {
        this.shader = baseShader;
    }

    public addUniform(uniform: BaseUniformDescriptor): BaseUniformDescriptor {
        if (this.hasUniform(uniform.index)) {
            this.removeUniform(uniform.index);
        }

        this.uniformDescriptors.set(uniform.index, uniform);

        return uniform;
    }

    public hasUniform(index: string): boolean {
        return this.uniformDescriptors.has(index);
    }

    public getUniform(index: string): BaseUniformDescriptor | undefined {
        return this.uniformDescriptors.get(index);
    }

    public removeUniform(index: string): void {
        this.uniformDescriptors.delete(index);
    }

    public active() {
        this.shader.use();
    }

    public use() {
        for (let uniform of this.uniformDescriptors.values()) {
            uniform.use();
        }
    }

    public getId(): number {
        return this.shader.getId();
    }
}
