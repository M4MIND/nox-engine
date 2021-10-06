import BaseShader from '../shader/BaseShader';
import { UNIFORM_CLASSES, UniformType } from '../shader/uniform/IUniform';
import UniformBase from '../shader/uniform/UniformBase';

export default class BaseMaterial {
    public readonly shader: BaseShader;
    private readonly uniforms: Map<string, UniformBase> = new Map<string, UniformBase>();

    constructor(shader: BaseShader) {
        this.shader = shader;
    }

    public createUniform(name: string, type: UniformType, serialized: boolean = false): UniformBase {
        return this.setUniform(new UNIFORM_CLASSES[type](name, serialized));
    }

    public setUniform(uniform: UniformBase): UniformBase {
        if (this.hasUniform(uniform.index)) {
            this.removeUniform(uniform.index);
        }

        this.uniforms.set(uniform.index, uniform);
        return uniform;
    }

    public hasUniform(name: string) {
        return this.uniforms.has(name);
    }

    public getUniform(name: string): UniformBase | null {
        return this.uniforms.get(name) ?? null;
    }

    public removeUniform(name: string) {
        this.uniforms.delete(name);
    }

    public getUniformNames(): IterableIterator<string> {
        return this.uniforms.keys();
    }

    public getUniforms(): IterableIterator<UniformBase> {
        return this.uniforms.values();
    }

    public use() {
        this.shader.use();
    }
}
