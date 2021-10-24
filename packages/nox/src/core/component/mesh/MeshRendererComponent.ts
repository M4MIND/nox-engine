import EventManager, { EventManagerEvents } from '../../EventManager';
import Graphics from '../../graphics/Graphics';
import Material from '../../graphics/material/Material';
import Shader from '../../graphics/shader/Shader';
import BaseComponent from '../BaseComponent';
import MeshFilterComponent from './MeshFilterComponent';
import { Matrix4, Vector3 } from '@nox-engine/mathf';
import { RendererServer } from '@nox-engine/renderer';

export default class MeshRendererComponent extends BaseComponent {
    public material: Material = new Material(Shader.find(''));

    public onRendererObject() {
        if (this.hasComponent<MeshFilterComponent>(MeshFilterComponent) && this.material) {
            let m_model = Matrix4.multiplyFromArray([
                Matrix4.translate(this.transform.position),
                Matrix4.zRotation(0.0174 * this.transform.rotateZ),
                Matrix4.yRotation(0.0174 * this.transform.rotateY),
                Matrix4.xRotation(0.0174 * this.transform.rotateX),
                Matrix4.scale(this.transform.scale),
            ]);

            let m_camera = Matrix4.multiplyFromArray([
                Matrix4.translate(new Vector3(0, -20, -2)),
                Matrix4.zRotation(0.0174 * 0),
                Matrix4.yRotation(0.0174 * 0),
                Matrix4.xRotation(0.0174 * 0),
            ]);

            this.material.getUniform('_U_Color')?.set(this.material.color);
            this.material
                .getUniform('_U_Projection')
                ?.set(
                    Matrix4.projection(
                        (3.14 / 180) * 90,
                        RendererServer.canvasManager.canvas.width / RendererServer.canvasManager.canvas.height,
                    ),
                );

            this.material.getUniform('_U_ModelInvertMatrix')?.set(Matrix4.transpose(Matrix4.inverse(m_model)));
            this.material.getUniform('_U_View')?.set(m_camera);
            this.material.getUniform('_U_Model')?.set(m_model);

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
