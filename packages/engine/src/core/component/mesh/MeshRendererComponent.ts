import Matrix4 from '../../../mathf/Matrix4';
import Quaternion from '../../../mathf/Quaternion';
import Vector3 from '../../../mathf/Vector3';
import EventServer from '../../../server/event/EventServer';
import RendererServer from '../../../server/renderer/RendererServer';
import Material from '../../material/Material';
import GameObject from '../../object/GameObject';
import { BaseComponent } from '../BaseComponent';
import CameraComponent from '../rendering/CameraComponent';
import MeshFilterComponent from './MeshFilterComponent';

export default class MeshRendererComponent extends BaseComponent {
    public material: Material | null = null;

    constructor(gameObject: GameObject) {
        super(gameObject);

        EventServer.eventManager.subscribe('onRenderer', this.onRenderer.bind(this));
    }

    public onRenderer() {
        let mesh = this.gameObject.getComponent<MeshFilterComponent>(MeshFilterComponent)?.mesh;

        if (mesh && this.material) {
            this.material.getUniform('_U_Color')?.set(this.material.color);

            this.material
                .getUniform('_U_Object')
                ?.set(
                    Matrix4.multiplyFromArray([
                        CameraComponent.main.getMatrix(),
                        Matrix4.translate(this.gameObject.transform.position),
                        this.gameObject.transform.rotation.toMatrix4(),
                        Matrix4.scale(this.gameObject.transform.scale),
                    ]),
                );

            RendererServer.rendererManager.drawMesh(mesh, this.material, mesh.indices.length);
        }
    }

    public onWillRendererObject() {}
}
