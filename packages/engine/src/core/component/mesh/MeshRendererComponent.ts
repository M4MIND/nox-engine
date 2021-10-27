import EventManager, { CoreEvents } from '../../EventManager';
import Graphics from '../../graphics/Graphics';
import Material from '../../graphics/material/Material';
import Shader from '../../graphics/shader/Shader';
import BaseComponent from '../BaseComponent';
import MeshFilterComponent from './MeshFilterComponent';
import { Matrix4 } from '@nox-engine/mathf';

export default class MeshRendererComponent extends BaseComponent {
    public material: Material = new Material(Shader.find(''));

    public onRendererObject() {
        if (this.hasComponent<MeshFilterComponent>(MeshFilterComponent) && this.material) {
            let m = this.transform.getMatrix();

            this.material.getUniform('_U_Model')?.set(m);
            this.material.getUniform('_U_ModelInvertMatrix')?.set(Matrix4.transpose(Matrix4.inverse(m)));

            Graphics.drawMesh(
                this.getComponent<MeshFilterComponent>(MeshFilterComponent).mesh,
                this.material as Material,
            );
        }
    }

    protected preparation(): void {
        EventManager.subscribe(CoreEvents.RENDERER_OBJECT, this.onRendererObject.bind(this));
    }
}
