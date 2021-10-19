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
            this.material.getUniform('_U_Color')?.set(this.material.color);
            this.material
                .getUniform('_U_Projection')
                ?.set(
                    Matrix4.projection(
                        (3.14 / 180) * 90,
                        RendererServer.canvasManager.canvas.width / RendererServer.canvasManager.canvas.height,
                    ),
                );
            this.material.getUniform('_U_View')?.set(Matrix4.translate(new Vector3(0, 0, -2)));
            this.material.getUniform('_U_Model')?.set(Matrix4.translate(this.transform.position));

            Graphics.drawMesh(
                this.getComponent<MeshFilterComponent>(MeshFilterComponent).mesh,
                this.material as Material,
            );
        }
    }

    protected preparation(): void {
        EventManager.subscribe(EventManagerEvents.ON_RENDERER_OBJECT, this.onRendererObject.bind(this));
    }
}
