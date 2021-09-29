import Shader from '../shader/Shader';

export default class Material {
    constructor(public readonly shader: Shader) {}

    public use() {
        this.shader.use();
    }
}
