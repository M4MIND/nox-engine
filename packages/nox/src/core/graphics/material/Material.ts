import Shader from '../shader/Shader';
import Color from './color/Color';
import { Matrix4, Vector3 } from '@nox-engine/mathf';
import { BaseMaterial, Uniform3fv, Uniform4fv, UniformMatrix4 } from '@nox-engine/renderer';

export default class Material extends BaseMaterial {
    public color = Color.gray;

    constructor(shader: Shader) {
        super(shader);

        this.addUniform(new Uniform3fv('_U_LightAmbient')).set([0.4, 0.4, 0.4]);
        this.addUniform(new Uniform3fv('_U_LightDirectionColor')).set([1, 1, 1]);
        this.addUniform(new Uniform3fv('_U_LightDirection')).set(Vector3.normalize(new Vector3(0, 0, 1)));

        this.addUniform(new Uniform4fv('_U_Color')).set(this.color);
        this.addUniform(new UniformMatrix4('_U_Projection')).set(new Matrix4());
        this.addUniform(new UniformMatrix4('_U_View')).set(new Matrix4());
        this.addUniform(new UniformMatrix4('_U_Model')).set(new Matrix4());
        this.addUniform(new UniformMatrix4('_U_ModelInvertMatrix')).set(new Matrix4());
    }

    public setMatrix4(index: string, matrix: Matrix4): this {
        this.addUniform(new UniformMatrix4(index)).set(matrix);

        return this;
    }
}
