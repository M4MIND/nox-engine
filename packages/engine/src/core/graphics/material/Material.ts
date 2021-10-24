import Shader from '../shader/Shader';
import Color from './color/Color';
import { Matrix4, Vector3 } from '@nox-engine/mathf';
import { BaseMaterial, Uniform3fv, Uniform4fv, UniformMatrix4 } from '@nox-engine/renderer';

export default class Material extends BaseMaterial {
    private _color = Color.gray;

    get color(): Color {
        return this._color;
    }

    set color(value: Color) {
        this._color = value;

        this.getUniform('_U_Color')?.set(value);
    }

    constructor(shader: Shader) {
        super(shader);

        this.addUniform(new Uniform4fv('_U_Color')).set(this._color);
        this.addUniform(new UniformMatrix4('_U_Model'));
        this.addUniform(new UniformMatrix4('_U_ModelInvertMatrix'));
    }

    public setMatrix4(index: string, matrix: Matrix4): this {
        this.addUniform(new UniformMatrix4(index)).set(matrix);

        return this;
    }
}
