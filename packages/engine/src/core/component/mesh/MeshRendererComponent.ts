import EventManager, { EventManagerEvents } from '../../EventManager';
import Graphics from '../../graphics/Graphics';
import Material from '../../graphics/material/Material';
import Shader from '../../graphics/shader/Shader';
import BaseComponent from '../BaseComponent';
import MeshFilterComponent from './MeshFilterComponent';
import { Angle, Matrix4 } from '@nox-engine/mathf';

export default class MeshRendererComponent extends BaseComponent {
    public material: Material = new Material(Shader.find(''));

    public onRendererObject() {
        if (this.hasComponent<MeshFilterComponent>(MeshFilterComponent) && this.material) {
            let m_model = Matrix4.multiplyFromArray([
                Matrix4.translate(this.transform.position),
                Matrix4.zRotation(Angle.degreesToRadians(this.transform.rotateZ)),
                Matrix4.yRotation(Angle.degreesToRadians(this.transform.rotateY)),
                Matrix4.xRotation(Angle.degreesToRadians(this.transform.rotateX)),
                Matrix4.scale(this.transform.scale),
            ]);

            this.material.getUniform('_U_Model')?.set(m_model);
            this.material.getUniform('_U_ModelInvertMatrix')?.set(Matrix4.transpose(Matrix4.inverse(m_model)));

            Graphics.drawMesh(
                this.getComponent<MeshFilterComponent>(MeshFilterComponent).mesh,
                this.material as Material,
            );
        }
    }

    protected preparation(): void {
        EventManager.subscribe(EventManagerEvents.RENDERER_OBJECT, this.onRendererObject.bind(this));
    }
}
