import Matrix4x4 from '../../../mathf/Matrix4x4';
import Shader from '../shader/Shader';

export default class Material {
    public readonly matrix: { [index: string]: Matrix4x4 } = {};

    constructor(public readonly shader: Shader) {}

    public use() {
        this.shader.use();
    }

    setMatrix(name: string, matrix: number[]): this;
    setMatrix(name: string, matrix: Matrix4x4): this {
        if (this.hasMatrix(name)) {
            this.removeMatrix(name);
        }

        this.matrix[name] = matrix;

        return this;
    }

    getMatrix(name: string): Matrix4x4 {
        return this.matrix[name];
    }

    removeMatrix(name: string): void {
        delete this.matrix[name];
    }

    hasMatrix(name: string): boolean {
        return !!this.matrix[name];
    }
}
