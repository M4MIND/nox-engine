import BaseShader from '../shader/BaseShader';
import { UNIFORM_CLASSES, UniformType } from '../shader/uniform/IUniform';
import UniformBase from '../shader/uniform/UniformBase';

export default class BaseMaterial {
    public readonly shader: BaseShader;
    private readonly uniforms: { [index: string]: UniformBase } = {};

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

        this.uniforms[uniform.index] = uniform;

        return uniform;
    }

    public hasUniform(name: string) {
        return !!this.uniforms[name];
    }

    public getUniform(name: string): UniformBase | null {
        return this.uniforms[name] ?? null;
    }

    public removeUniform(name: string) {
        if (this.hasUniform(name)) {
            delete this.uniforms[name];
        }
    }

    public getUniformNames(): string[] {
        return Object.keys(this.uniforms);
    }

    public getUniforms(): UniformBase[] {
        return Object.values(this.uniforms);
    }

    public use() {
        this.shader.use();
    }
}
