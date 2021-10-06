import BaseMaterial from '../../server/renderer/material/BaseMaterial';
import BaseShader from '../../server/renderer/shader/BaseShader';
import { UniformType } from '../../server/renderer/shader/uniform/IUniform';
import Color from './color/Color';

export default class Material extends BaseMaterial {
    public color: Color = new Color();

    constructor(shader: BaseShader) {
        super(shader);

        this.createUniform('_U_Object', UniformType.Matrix4x4);
        this.createUniform('_U_Color', UniformType.Fv4);
    }
}
